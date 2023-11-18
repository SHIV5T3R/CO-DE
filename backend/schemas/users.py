from marshmallow import fields
from models.users import User
from services.serialization import BaseModelSchema


class UserSchema(BaseModelSchema):
    class Meta:
        model = User
        load_only = ["password"]
        exclude = ["is_deleted"]


class LoginUserSchema(BaseModelSchema):
    class Meta:
        model = User
        load_only = ["password"]
        dump_only = ["username", "full_name"]
        exclude = ["is_deleted"]

    access_token = fields.Str(dump_only=True)
    refresh_token = fields.Str(dump_only=True)
