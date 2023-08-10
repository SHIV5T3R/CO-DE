from mongoengine import Document, StringField, DateTimeField, BooleanField
from werkzeug.security import generate_password_hash, check_password_hash

class User(Document):
    username = StringField(required=True, unique=True, max_length=50)
    full_name = StringField(required=True, max_length=150)
    deleted_at = DateTimeField()
    is_deleted = BooleanField(default=False)
    email = StringField(required=True, unique=True, max_length=100)
    password = StringField(required=True, min_length=6, max_length=255)  # will store hashed password
    gh_access_key = StringField(max_length=255)
    gh_refresh_key = StringField(max_length=255)
    avatar = StringField()

    def set_password(self, password):
        """Hash the clear-text password and store its encrypted form."""
        self.password = generate_password_hash(password)

    def check_password(self, password):
        """Check if the provided password matches the hashed version."""
        return check_password_hash(self.password, password)
