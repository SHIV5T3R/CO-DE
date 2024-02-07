from app import api
from flask import make_response, request
from flask_restx import Resource, fields
from marshmallow import ValidationError
from repos import AuthRepo
from schemas import GithubAuthResponseSchema, GithubAuthSchema
from services.decorators import validate
from services.github import Github

ns = api.namespace("Auth", path="/v1")


@ns.route("/oauth/generate-access-token")
class GenerateAccessToken(Resource):
    @ns.doc("generate_token")
    @ns.response(
        200,
        "Success",
        api.model(
            "success",
            {
                "status": fields.Boolean,
                "message": fields.String,
                "data": fields.Nested(
                    api.model("nested", {"access_token": fields.String})
                ),
            },
        ),
    )
    @ns.response(
        400,
        "Error",
        api.model(
            "validation_error",
            {
                "status": fields.Boolean(default=False),
                "message": fields.String,
                "errors": fields.String,
            },
        ),
    )
    @ns.response(
        401,
        "Error (Github)",
        api.model(
            "github_error",
            {
                "status": fields.Boolean(default=False),
                "error": fields.String,
                "error_description": fields.String,
                "error_uri": fields.Url,
            },
        ),
    )
    @ns.expect(api.model("token_payload", {"code": fields.String}))
    def post(self):
        try:
            auth_serializer = GithubAuthSchema()
            auth_data = auth_serializer.load(request.json)
            res = AuthRepo.get_access_token(auth_data["code"])
            if res.get("error"):
                error_res = {"status": False}
                error_res.update(res)
                return error_res, 401

            response = {
                "status": True,
                "message": "Oauth successful!",
                "data": {"access_token": res["access_token"]},
            }
            auth_response_serializer = GithubAuthResponseSchema()
            auth_response_serializer.dump(response["data"])
            api_response = make_response(response, 200)

            github = Github(response["data"]["access_token"])
            user_res = github.get_user_info()
            response.set_cookie("username", user_res["login"], httponly=True)
            response.set_cookie(
                "access_token", response["data"]["access_token"], httponly=True
            )

            AuthRepo.create_user_if_not_exist(
                response["data"]["access_token"], user_res
            )

            return api_response
        except ValidationError as e:
            return e.messages, 400


@ns.route("/test")
class TestAuthGuard(Resource):
    @validate
    @ns.response(
        401,
        "Unauthorised",
        api.model("guard_response", {"message": fields.String}),
    )
    def get(self):
        return {"message": "Authorized by guard"}
