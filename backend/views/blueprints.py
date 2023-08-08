from flask import Blueprint

blueprints = []

websockets_bp = Blueprint(name='websockets', import_name=__name__, url_prefix='/websockets')

blueprints.append(websockets_bp)
