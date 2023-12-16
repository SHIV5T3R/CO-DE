from mongoengine import (
    Document,
    StringField,
    DateTimeField,
    BooleanField,
    ValidationError,
    signals,
)
from werkzeug.security import generate_password_hash, check_password_hash
import re

from constants import REGEX
from services.tokens import JWTGenerator


def is_email(email):
    """Validate string is a valid email format"""
    if not re.match(REGEX.EMAIL, email):
        raise ValidationError("Invalid Email Format")


def is_secure_password(password):
    """
    Validate that a password is secure
    Secure Conditions:
        1. At least 8 characters long
        2. At least 1 uppercase characters
        3. At least 1 lowercase characters
        4. At least 1 special characters [!@#$&*]
        5. At least 1 number
    :param password: the password to be validated
    :raise ValidationError: if password doesnt match format
    """
    if not re.match(REGEX.PASSWORD, password):
        raise ValidationError("Invalid Password Format")


class User(Document):
    username = StringField(required=True, unique=True, max_length=50)
    full_name = StringField(required=True, max_length=150)
    deleted_at = DateTimeField()
    is_deleted = BooleanField(default=False)
    email = StringField(required=True, unique=True, max_length=100, validation=is_email)
    # will store hashed password
    password = StringField(
        required=True,
        min_length=6,
        max_length=255,
        validation=is_secure_password,
    )
    gh_access_key = StringField(max_length=255)
    gh_refresh_key = StringField(max_length=255)
    avatar = StringField()

    def __init__(self, *args, **kwargs):
        super(User, self).__init__(*args, **kwargs)
        # Define virtual fields
        self.access_token = None
        self.refresh_token = None

    def set_password(self, password):
        """Hash the clear-text password and store its encrypted form."""
        self.password = generate_password_hash(password)

    def check_password(self, password):
        """Check if the provided password matches the hashed version."""
        return check_password_hash(self.password, password)

    def generate_tokens(self):
        access_payload = {"id": str(self.id), "token_type": "access"}
        refresh_payload = {"id": str(self.id), "token_type": "refresh"}

        self.access_token = JWTGenerator.generate_access_token(access_payload)
        self.refresh_token = JWTGenerator.generate_refresh_token(refresh_payload)

    @classmethod
    def pre_save_post_validation(cls, sender, document, **kwargs):
        """Encrypts the password before initial save"""
        document.set_password(document.password)


# Attach pre-save event handler to user document
signals.pre_save_post_validation.connect(User.pre_save_post_validation, sender=User)
