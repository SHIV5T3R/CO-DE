from flask import Blueprint

blueprints = []

users_bp = Blueprint(name="users", import_name=__name__, url_prefix="/users")

blueprints.append(users_bp)
