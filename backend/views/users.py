from flask_restful import Resource, Api, request
from marshmallow import ValidationError

from views.blueprints import users_bp
from repos.users import UsersRepo
from models.users import User
from services.serialization import BaseModelSchema

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


class Users(Resource):
    def post(self):
        try:
            user_serializer = UserSchema()
            user = user_serializer.load(request.get_json())
            return user_serializer.dump(UsersRepo.create_user(user))
        except ValidationError as e:
            return e.messages, 422


class LoginUsers(Resource):
    def post(self):
        try:
            user_serializer = LoginUserSchema()
            user_data = user_serializer.load(request.get_json())
            user = UsersRepo.login_user(user_data)
            return user_serializer.dump(user), 200, {
                "Set-Cookie": [
                    f"access_token={user.access_token}; HttpOnly",
                    f"refresh_token={user.access_token}; HttpOnly; Path=/users/refresh"
                ]
            }
        except ValidationError as e:
            return e.messages, 422


users_api.add_resource(Users, '/')
users_api.add_resource(LoginUsers, '/login')
