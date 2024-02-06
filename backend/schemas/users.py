from models import User
from services.serialization import BaseModelSchema


class UserSchema(BaseModelSchema):
    class Meta:
        model = User
        exclude = ["is_deleted"]
