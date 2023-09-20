from flask_restful import Resource, Api, request
from marshmallow import ValidationError

from views.blueprints import users_bp
from repos.users import UsersRepo
from schemas.users import UserSchema, LoginUserSchema

users_api = Api(users_bp)


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
            user = user_serializer.load(request.get_json())
            return user_serializer.dump(UsersRepo.login_user(user))
        except ValidationError as e:
            return e.messages, 422


users_api.add_resource(Users, "/")
users_api.add_resource(LoginUsers, "/login")
