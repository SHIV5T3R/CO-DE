from flask import Blueprint

blueprints = [Blueprint(name="main", import_name=__name__, url_prefix="/v1")]
