from datetime import datetime

from enums import MessageCategory
from models.rooms import Room
from models.users import User
from mongoengine import (
    CASCADE,
    PULL,
    DateTimeField,
    Document,
    LazyReferenceField,
    ListField,
    StringField,
    URLField,
)


class Message(Document):
    sender = LazyReferenceField(
        User, dbref=False, reverse_delete_rule=CASCADE, required=True
    )
    room = LazyReferenceField(
        Room, dbref=False, reverse_delete_rule=CASCADE, required=True
    )
    url = URLField()
    content = StringField(min_length=1, required=True)
    # TODO use enum field
    # category = EnumField(enum=MessageCategory, default=MessageCategory.TEXT)
    category = StringField(max_length=10, required=True)
    read_by = ListField(LazyReferenceField(User, dbref=False, reverse_delete_rule=PULL))
    sent_at = DateTimeField(default=datetime.utcnow, required=True)
