from flask import current_app as app
from flask_restful import abort
from mongoengine import ValidationError, NotUniqueError, DoesNotExist

# model used to structure user in db
from models.users import User


class UsersRepo:
    @classmethod
    # create a new user and add to our db
    def create_user(cls, user):
        app.logger.info("Creating user")
        # create user object
        new_user = User(
            username=user['username'],
            full_name=user['full_name'],
            email=user['email'],
            password=user['password']
        )

        try:
            new_user.save()
            app.logger.info("User successfully saved!")
            return user
        except ValidationError as e:
            # Exception raised for invalid fields
            app.logger.error("Failed User Creation: Validation Error")
            abort(400, status=400, message=e._format_errors())
        except NotUniqueError as e:
            # Exception raised for duplicating field values
            app.logger.error("Failed User Creation: Email or Username already exists")
            abort(400, message="A user with that email or username already exists")

    @classmethod
    def login_user(cls, user_data):
        app.logger.info("Logging in User...")

        try:
            user = User.objects(email=user_data["email"]).get()
            if not user.check_password(user_data["password"]):
                raise ValueError()

            app.logger.info("User successfully logged in")
            return user
        except (DoesNotExist, ValueError) as e:
            app.logger.error("Authentication Failed: User doesnt exist")
            abort(401, message="Login failed; Invalid email or password")
