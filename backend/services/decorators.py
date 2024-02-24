from flask import current_app as app, request
from services.utils import redis
from functools import wraps


def validate(func):
    @wraps(func)
    def decorated(*args, **kwargs):
        access_token = request.cookies.get('access_token')
        app.logger.info(f"redis: {redis}")
        if not access_token:
            return {"message": "Unauthorized!", "status": False}, 401
        # if not redis.exists(f"refresh_token:{access_token}"):
        #     return {"message": "Unauthorized"}, 401

        return func(*args, **kwargs)

    return decorated
