import requests
from config import Config
from flask import current_app as app
from flask_restful import abort
from requests.exceptions import RequestException


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
                Config.GITHUB_ACCESS_TOKEN_ENDPOINT,
                data,
                headers={"Accept": "application/json"},
            )
            return res.json()
        except RequestException as e:
            app.logger.error(f"Error generating access token: {e}")
            abort(400, status=False, error=str(e))
