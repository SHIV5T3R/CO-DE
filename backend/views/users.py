from flask_restful import Resource, Api, request
from marshmallow import ValidationError, fields

from views.blueprints import users_bp
from repos.users import UsersRepo
from models.users import User
from services.serialization import BaseModelSchema
from services.auth import require_auth

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
            return e.messages, 422

    @require_auth(load_user=True)
    def get(self):
        user_serializer = UserSchema()
        user = getattr(request, "user")
        return user_serializer.dump(user)
    

class LoginUsers(Resource):
    def post(self):
        try:
            user_serializer = LoginUserSchema()
            user = user_serializer.load(request.get_json())
            return user_serializer.dump(UsersRepo.login_user(user))
        except ValidationError as e:
            return e.messages, 422


users_api.add_resource(Users, '/')
users_api.add_resource(LoginUsers, '/login')
