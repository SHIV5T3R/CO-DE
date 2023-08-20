
from flask_restful import request, current_app as app
from jwt import ExpiredSignatureError

from services.tokens import JWTGenerator
from models.users import User


def require_auth(load_user=False):
    def get_auth_token():
        token = None
        if "Authorization" in request.headers:
            token = request.headers["Authorization"].split(" ")[1]
        return token
    
    def decode_token(token):
        return JWTGenerator.decode_access_token(token)

    def unauth_response(message, error):
        app.logger.error(f"Authentication Field: {message}")
        if error:
            app.logger.error(error)
        return {
            "status": False,
            "message": f"Authentication Field: {message}"
        }, 401

    def load_user_doc(user_id):
        user = User.objects(id=user_id).get()
        setattr(request, "user", user)

    def inner(func):
        def wrapped(*args, **kwargs):
            token = get_auth_token()
            if not token:
                return unauth_response("Mssing access token")

            try:
                decoded_data = decode_token(token)
                setattr(request, "user_id", decoded_data["id"])
                if load_user:
                    load_user_doc(decoded_data["id"])
                return func(*args, **kwargs)
            except ExpiredSignatureError as e:
                return unauth_response("Token Expired", e)
            except Exception as e:
                return unauth_response("Invalid Token", e)
    
        return wrapped
        
    return inner
