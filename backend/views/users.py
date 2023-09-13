from flask_restful import Resource, Api, request
from marshmallow import ValidationError, fields
from flask import make_response

from views.blueprints import users_bp
from repos.users import UsersRepo
from models.users import User
from services.serialization import BaseModelSchema
from services.decorators import validate

users_api = Api(users_bp)


class UserSchema(BaseModelSchema):
    class Meta:
        model = User
        load_only = ["password"]
        exclude = ["is_deleted"]


class LoginUserSchema(BaseModelSchema):
    class Meta:
        model = User
        load_only = ["password"]
        dump_only = ["username", "full_name"]
        exclude = ["is_deleted"]

    access_token = fields.Str(dump_only=True)
    refresh_token = fields.Str(dump_only=True)


class Users(Resource):
    def post(self):
        try:
            user_serializer = UserSchema()
            user = user_serializer.load(request.get_json())
            return user_serializer.dump(UsersRepo.create_user(user))
        except ValidationError as e:
            return {"error": "Validation failed", "messages": e.messages}, 400


class LoginUsers(Resource):
    def post(self):
        try:
            user_serializer = LoginUserSchema()
            user = user_serializer.load(request.get_json())
            logged_user, access_token = UsersRepo.login_user(user)

            response_data = user_serializer.dump(logged_user)
            response = make_response(response_data, 200)

            response.set_cookie('user_id', str(logged_user.id), httponly=True)
            response.set_cookie('access_token', access_token, httponly=True)

            return response
        except ValidationError as e:
            return {"error": "Validation failed", "messages": e.messages}, 400


# can delete later
class TestAuthGuard(Resource):
    @validate
    def get(self):
        return {"message": "Authorized by guard"}


users_api.add_resource(Users, "/")
users_api.add_resource(LoginUsers, "/login")
users_api.add_resource(TestAuthGuard, "/test")
