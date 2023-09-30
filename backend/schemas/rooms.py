from models.rooms import Room
from services.serialization import BaseModelSchema


class RoomSchema(BaseModelSchema):
    class Meta:
        model = Room
        model_build_obj = False


class UpdateRoomSchema(BaseModelSchema):
    class Meta:
        model = Room
        model_build_obj = False
        load_only = ["id"]
