from flask import current_app as app, request
from services.utils import redis
from functools import wraps

def validate(func):
        @wraps(func)
        def decorated(*args, **kwargs):
            user_id = request.cookies.get('user_id')
            app.logger.info(f"redis: {redis}")
            if not user_id:
                return {"message": "Unauthorized"}, 401
            if not redis.exists(f"refresh_token:{user_id}"):
                return {"message": "Unauthorized"}, 401
            
            return func(*args, **kwargs)

        return decorated
                            