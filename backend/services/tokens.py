import jwt
import datetime

from config import Config


class JWTGenerator:
    ACCESS_TOKEN_SECRET = Config.ACCESS_TOKEN_SECRET
    ACCESS_TOKEN_EXPIRE_MINUTES = Config.ACCESS_TOKEN_EXPIRE_MINUTES
    REFRESH_TOKEN_SECRET = Config.REFRESH_TOKEN_SECRET
    REFRESH_TOKEN_EXPIRE_MINUTES = Config.REFRESH_TOKEN_EXPIRE_MINUTES

    @classmethod
    def generate_access_token(cls, payload, **kwargs):
        return cls.generate_token(
            payload,
            cls.ACCESS_TOKEN_EXPIRE_MINUTES,
            cls.ACCESS_TOKEN_SECRET,
            **kwargs
        )

    @classmethod
    def generate_refresh_token(cls, payload, **kwargs):
        return cls.generate_token(
            payload,
            cls.REFRESH_TOKEN_EXPIRE_MINUTES,
            cls.REFRESH_TOKEN_SECRET,
            **kwargs
        )

    @classmethod
    def generate_token(cls, payload, expire_delta, secret, **kwargs):
        return jwt.encode(
            {
                **payload,
                "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=expire_delta)
            },
            secret,
            **kwargs
        )
