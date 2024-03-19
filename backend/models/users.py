import re

from mongoengine import (
    Document,
    StringField,
    DateTimeField,
    BooleanField,
    ValidationError,
)
from constants import REGEX


def is_email(email):
    """Validate string is a valid email format"""
    if not re.match(REGEX.EMAIL, email):
        raise ValidationError("Invalid Email Format")


class User(Document):
    email = StringField(required=True, unique=True, max_length=100, validation=is_email)
    username = StringField(required=True, unique=True, max_length=50)
    full_name = StringField(required=True, max_length=150)
    avatar = StringField()
    gh_access_token = StringField(max_length=255)
    is_deleted = BooleanField(default=False)
    deleted_at = DateTimeField()

    def __str__(self):
        return f"{self.email}"
