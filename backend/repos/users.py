from flask import current_app as app
from flask_restful import abort
from mongoengine import ValidationError, NotUniqueError, DoesNotExist
from services.utils import redis
# model used to structure user in db
from models.users import User


class UsersRepo:
    @classmethod
    # create a new user and add to our db
    def create_user(cls, user):
        app.logger.info("Creating user")
        # create user object
        new_user = User(
            username=user["username"],
            full_name=user["full_name"],
            email=user["email"],
            password=user["password"],
        )

        try:
            new_user.save()
            app.logger.info("User successfully saved!")
            return new_user
        except ValidationError as e:
            # Exception raised for invalid fields
            app.logger.error("Failed User Creation: Validation Error")
            abort(400, status=False, error=e._format_errors())
        except NotUniqueError as e:
            # Exception raised for duplicating field values
            app.logger.error("Failed User Creation: Email or Username already exists")
            abort(
                400,
                status=False,
                message="Unable to register user",
                error="A user with that email or username already exists",
            )

    @classmethod
    def login_user(cls, user_data):
        app.logger.info("Logging in User...")

        try:
            user = User.objects(email=user_data["email"]).get()
            if not user.check_password(user_data["password"]):
                raise ValueError()

            app.logger.info("User successfully logged in")
            user.generate_tokens()

            #store refresh token in Redis
            cls.store_refresh_token_in_redis(user.id, user.refresh_token)
            return user, user.access_token
        except (DoesNotExist, ValueError) as e:
            app.logger.error(f"Authentication Failed: User doesnt exist {e}")
            abort(
                401,
                status=False,
                message="Unable to login user",
                error="Invalid email or password",
            )

    @classmethod
    def store_refresh_token_in_redis(cls, id, r_token):
        try:
            redis_key = f"refresh_token:{id}"
            redis.set(redis_key, r_token)
            redis.expire(redis_key, 3600) # 1hr exps
        except Exception as e:
            app.logger.error(f"Error storing refresh token in redis for user {id}: {e}")
        
