from models.rooms import Room
from services.serialization import BaseModelSchema


class CreateRoomSchema(BaseModelSchema):
    class Meta:
        model = Room
        load_only = ["name", "description", "project"]
