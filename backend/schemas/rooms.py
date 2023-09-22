from models.rooms import Room
from services.serialization import BaseModelSchema


class CreateRoomSchema(BaseModelSchema):
    class Meta:
        model = Room
        model_build_obj = False
