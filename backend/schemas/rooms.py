from marshmallow import fields
from models import Room
from services.serialization import BaseModelSchema

from .users import UserSchema


class RoomSchema(BaseModelSchema):
    class Meta:
        model = Room
        model_build_obj = False


class UpdateRoomSchema(BaseModelSchema):
    owner = fields.Nested(UserSchema)

    class Meta:
        model = Room
        model_build_obj = False
