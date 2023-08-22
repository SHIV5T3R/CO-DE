from datetime import datetime

from mongoengine import (
    CASCADE,
    PULL,
    BooleanField,
    DateTimeField,
    Document,
    EnumField,
    LazyReferenceField,
    ListField,
    StringField,
    URLField,
)
from constants import ImportType
from models.users import User


class Project(Document):
    owner = LazyReferenceField(
        User, dbref=False, reverse_delete_rule=CASCADE, null=False
    )
    name = StringField(max_length=256, required=True)
    import_type = EnumField(ImportType, default=ImportType.GITHUB, required=True)
    link = URLField(required=True)
    collaborators = ListField(
        LazyReferenceField(User, dbref=False, reverse_delete_rule=PULL)
    )
    is_directory = BooleanField(default=False)
    read_only = BooleanField(default=False)
    created = DateTimeField(default=datetime.utcnow, required=True)
    modified = DateTimeField(default=datetime.utcnow, required=True)

    def save(self, *args, **kwargs):
        if not self.created:
            self.created = datetime.utcnow()
        self.modified = datetime.utcnow()
        return super(Project, self).save(*args, **kwargs)
