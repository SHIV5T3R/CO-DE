from models import Message
from services.serialization import BaseModelSchema


class MessageSchema(BaseModelSchema):
    class Meta:
        model = Message
        model_build_obj = False
