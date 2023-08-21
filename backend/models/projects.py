from datetime import datetime

from mongoengine import DateTimeField, Document, StringField


class Project(Document):
    name = StringField(max_length=256, required=True)
    created = DateTimeField(default=datetime.utcnow, required=True)
    modified = DateTimeField(default=datetime.utcnow, required=True)

    def save(self, *args, **kwargs):
        if not self.created:
            self.created = datetime.utcnow()
        self.modified = datetime.utcnow()
        return super(Project, self).save(*args, **kwargs)
