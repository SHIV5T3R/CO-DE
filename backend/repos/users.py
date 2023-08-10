from flask import current_app as app

from services.utils import db
# model used to structure user in db
from models.users import User

# NOTE: example to show adding to database
class UsersRepo:
    @classmethod
    # create a new user and add to our db
    def create_user(self, user):
        app.logger.info("Creating user")
        # create user object
        new_user = User(
            username=user['username'],
            full_name=user['full_name'],
            email=user['email'],
            password=user['password']
        )
        # add user to db
        new_user.save()
        app.logger.info("User succesfully saved!")
        return user