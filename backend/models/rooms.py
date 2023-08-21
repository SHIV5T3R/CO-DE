from datetime import datetime

from mongoengine import (
    CASCADE,
    PULL,
    DateTimeField,
    Document,
    LazyReferenceField,
    ListField,
    StringField,
)
from services.utils import generate_invite_token

from .projects import Project
from .users import User


class Room(Document):
    name = StringField(min_length=1, max_length=256, required=True)
    description = StringField(max_length=256)
    owner = LazyReferenceField(User, dbref=False, reverse_delete_rule=CASCADE)
    members = ListField(LazyReferenceField(User, dbref=False, reverse_delete_rule=PULL))
    project = LazyReferenceField(Project, dbref=False)
    invite_token = StringField(
        default=generate_invite_token, unique=True, required=True
    )
    created = DateTimeField(default=datetime.utcnow, required=True)
    modified = DateTimeField(default=datetime.utcnow, required=True)

    def save(self, *args, **kwargs):
        if not self.created:
            self.created = datetime.utcnow()
        self.modified = datetime.utcnow()
        return super(Room, self).save(*args, **kwargs)
