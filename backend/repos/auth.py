import requests

from requests.exceptions import RequestException
from flask_restx import abort
from mongoengine import DoesNotExist, ValidationError
from app import app
from config import Config
from models import User


class AuthRepo:
    @classmethod
    def get_access_token(cls, code):
        try:
            data = {
                "client_id": Config.GITHUB_OAUTH_CLIENT_ID,
                "client_secret": Config.GITHUB_OAUTH_CLIENT_SECRET,
                "code": code,
            }
            res = requests.post(
                Config.GITHUB_ACCESS_TOKEN_URL,
                data,
                headers={"Accept": "application/json"},
            )
            return res.json()
        except RequestException as e:
            app.logger.error(f"Error generating access token: {e}")
            abort(400, status=False, error=str(e))

    @classmethod
    def create_user_if_not_exist(cls, access_token, user_data):
        try:
            User.objects(email=user_data["email"]).get()
        except DoesNotExist:
            try:
                new_user = User(
                    email=user_data["email"],
                    username=user_data["login"],
                    gh_access_token=access_token,
                )
                new_user.save()
                app.logger.info("User successfully saved!")
            except ValidationError as e:
                app.logger.error("Failed User Creation: Validation Error")
                abort(400, status=False, error=e._format_errors())
