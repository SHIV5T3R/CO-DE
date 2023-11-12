from flask import Blueprint

blueprints = []

main_bp = Blueprint(name="main", import_name=__name__, url_prefix="/v1")

blueprints.append(main_bp)
