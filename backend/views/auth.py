from flask import make_response, request
from flask_restx import fields, Resource
from marshmallow import ValidationError
from app import api
from repos import AuthRepo
from schemas import GithubAuthSchema, GithubAuthResponseSchema
from services.decorators import validate
from services.github import Github


ns = api.namespace("Auth", path="/v1")


@ns.route("/oauth/generate-access-token")
class GenerateAccessToken(Resource):
    @ns.doc("generate_token")
    @ns.marshal_with(
        api.model(
            "token_response",
            {
                "data": fields.Nested(
                    api.model("nested", {"access_token": fields.String})
                ),
                "status": fields.Boolean,
            },
        )
    )
    @ns.expect(api.model("token_payload", {"code": fields.String}))
    def post(self):
        try:
            auth_serializer = GithubAuthSchema()
            auth_data = auth_serializer.load(request.form)
            res = AuthRepo.get_access_token(auth_data["code"])

            if res.get("error"):
                return res, 400

            auth_response_serializer = GithubAuthResponseSchema()
            response = make_response(auth_response_serializer.dump(res), 200)

            access_token = res["access_token"]
            github = Github(access_token)
            user_res = github.get_user_info()
            response.set_cookie("email", user_res["email"], httponly=True)
            response.set_cookie("access_token", access_token, httponly=True)

            AuthRepo.create_user_if_not_exist(access_token, user_res)

            return response
        except ValidationError as e:
            return {"error": "Validation failed", "messages": e.messages}, 400


@ns.route("/test")
class TestAuthGuard(Resource):
    @validate
    @ns.marshal_with(
        api.model("guard_response", {"message": fields.String}),
        description="Unauthorised",
        code=401,
    )
    def get(self):
        return {"message": "Authorized by guard"}
