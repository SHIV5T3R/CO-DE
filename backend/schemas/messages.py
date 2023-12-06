from models import Message
from services.serialization import BaseModelSchema


class MessageSchema(BaseModelSchema):
    class Meta:
        model = Message
        model_build_obj = False
        # load_only = ["sender", "room", "content", "category"]
        # dump_only = ["sender", "room", "content", "category"]
