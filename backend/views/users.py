from flask_restful import Resource, Api, request
from marshmallow_mongoengine import ModelSchema
from marshmallow import ValidationError, fields

from views.blueprints import users_bp
from repos.users import UsersRepo
from models.users import User

users_api = Api(users_bp)


class UserSchema(ModelSchema):
    class Meta:
        model = User
        load_only = ["password"]
        exclude = ["is_deleted"]


class LoginUserSchema(ModelSchema):
    class Meta:
        model = User
        load_only = ["password"]
        dump_only = ["username", "full_name"]
        exclude = ["is_deleted"]

    access_token = fields.Str(dump_only=True)
    refresh_token = fields.Str(dump_only=True)


class Users(Resource):
    def post(self):
        user_serializer = UserSchema()
        user = user_serializer.load(request.get_json())
        return user_serializer.dump(UsersRepo.create_user(user))


class LoginUsers(Resource):
    def post(self):
        try:
            user_serializer = LoginUserSchema()
            user = user_serializer.load(request.get_json())
            return user_serializer.dump(UsersRepo.login_user(user))
        except ValidationError as e:
            return {
                "status": 422,
                "error": "Invalid Input",
                "messages": e.messages
            }, 422


users_api.add_resource(Users, '/')
users_api.add_resource(LoginUsers, '/login')
