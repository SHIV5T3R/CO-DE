from flask import make_response
from flask_restful import Api, Resource, request
from marshmallow import ValidationError
from repos import AuthRepo, UsersRepo
from schemas import GithubAuthSchema, LoginUserSchema, UserSchema
from services.decorators import validate
from views.blueprints import main_bp

main_api = Api(main_bp)


class RegisterUser(Resource):
    def post(self):
        try:
            user_serializer = UserSchema()
            user = user_serializer.load(request.get_json())
            return user_serializer.dump(UsersRepo.create_user(user))
        except ValidationError as e:
            return {"error": "Validation failed", "messages": e.messages}, 400


class LoginUser(Resource):
    def post(self):
        try:
            user_serializer = LoginUserSchema()
            user = user_serializer.load(request.get_json())
            logged_user, access_token = UsersRepo.login_user(user)

            response_data = user_serializer.dump(logged_user)
            response = make_response(response_data, 200)

            response.set_cookie("user_id", str(logged_user.id), httponly=True)
            response.set_cookie("access_token", access_token, httponly=True)

            return response
        except ValidationError as e:
            return {"error": "Validation failed", "messages": e.messages}, 400


class GenerateAccessToken(Resource):
    def post(self):
        try:
            auth_serializer = GithubAuthSchema()
            auth_data = auth_serializer.load(request.get_json())
            res = AuthRepo.get_access_token(auth_data["code"])
            if res["error"]:
                return res, 400
            return auth_serializer.dump(res), 200
        except ValidationError as e:
            return {"error": "Validation failed", "messages": e.messages}, 400


# can delete later
class TestAuthGuard(Resource):
    @validate
    def get(self):
        return {"message": "Authorized by guard"}


main_api.add_resource(RegisterUser, "/register")
main_api.add_resource(LoginUser, "/login")
main_api.add_resource(TestAuthGuard, "/test")
main_api.add_resource(GenerateAccessToken, "/oauth/generate-access-token")
