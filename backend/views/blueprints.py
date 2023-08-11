from flask import Blueprint

blueprints = []

websockets_bp = Blueprint(name='websockets', import_name=__name__, url_prefix='/websockets')
users_bp = Blueprint(name='users', import_name=__name__, url_prefix='/users')

blueprints.append(websockets_bp)
blueprints.append(users_bp)
