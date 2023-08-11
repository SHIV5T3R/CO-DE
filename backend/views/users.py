from flask_restful import Resource, Api, fields, marshal_with, reqparse

from views.blueprints import users_bp
from repos.users import UsersRepo

users_api = Api(users_bp)

user_api_model = {
    "id": fields.String,
    "username": fields.String,
    "fullName": fields.String(attribute='full_name'),
    "email": fields.String,
    "avatar": fields.String
}

create_user_parser = reqparse.RequestParser()
create_user_parser.add_argument('username', location='json', required=True)
create_user_parser.add_argument('full_name', location='json', required=True)
create_user_parser.add_argument('email', location='json', required=True)
create_user_parser.add_argument('password', location='json', required=True)


login_user_parser = reqparse.RequestParser()
login_user_parser.add_argument('email', location='json', required=True)
login_user_parser.add_argument('password', location='json', required=True)


class Users(Resource):
    @marshal_with(user_api_model)
    def post(self):
        user = create_user_parser.parse_args()
        return UsersRepo.create_user(user)


class LoginUsers(Resource):
    @marshal_with(login_api_model)
    def post(self):
        user = login_user_parser.parse_args()
        return UsersRepo.login_user(user)


users_api.add_resource(Users, '/')
users_api.add_resource(LoginUsers, '/login')
