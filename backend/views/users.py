from flask_restful import Resource, Api, request
from marshmallow import ValidationError, fields
from mongoengine import DoesNotExist

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


class RegisterUsers(Resource):
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
            user = user_serializer.load(request.get_json())
            return user_serializer.dump(UsersRepo.login_user(user))
        except ValidationError as e:
            return e.messages, 422


class SingleUser(Resource):
    def get(self, user_id):
        try:
            user = UsersRepo.get_user(user_id)
            return UserSchema().dump(user)
        except DoesNotExist as e:
            return {
                "status": False,
                "message": "Not Found",
                "Error": f"User with id={user_id} doesnt exist."
            }, 404


class SelfUser(Resource):
    @require_auth(load_user=True)
    def get(self):
        user_serializer = UserSchema()
        user = getattr(request, "user")
        return user_serializer.dump(user)


users_api.add_resource(RegisterUsers, '/register')
users_api.add_resource(SelfUser, '/self')
users_api.add_resource(LoginUsers, '/login')
users_api.add_resource(SingleUser, '/<string:user_id>')
