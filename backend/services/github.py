import requests
from config import Config


class Github:
    def __init__(self, access_token):
        self.headers = {
            "Accept": "application/vnd.github+json",
            "Authorization": f"Bearer {access_token}",
        }

    def get_user_info(self):
        try:
            url = f"{Config.GITHUB_REST_API_URL}/user"
            res = requests.get(url, headers=self.headers)
            return res.json()
        except requests.RequestException as e:
            return e
