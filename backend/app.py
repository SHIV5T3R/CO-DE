import logging
from argparse import ArgumentParser

from flask import Flask
from flask_cors import CORS
from flask_limiter import Limiter
from config import get_config, get_testing_config

from services.utils import (
    config_mongodb,
    config_socketio,
    resolve_origins,
    config_redis,
)

app = Flask(__name__)
api = None


def register_endpoints(_app):
    from flask_restx import Api

    global api
    api = Api(_app, version="1", title="CO-DE API",
              description="Backend for CO-DE")

    from views import auth

    _app.logger.info(f"Endpoints registered")


def create_app(testing=False):
    if testing:
        app.config.from_object(get_testing_config())
    else:
        app.config.from_object(get_config())
    origins = resolve_origins(app.config["CORS_ALLOWED_ORIGINS"])
    CORS(app, origins=origins, supports_credentials=True)
    Limiter(app)
    app.logger.setLevel(logging.INFO)
    app.logger.info(f"Flask env: {app.config['FLASK_ENV']}")
    app.url_map.strict_slashes = False  # more forgiving with trailing slashes in url
    config_mongodb(app)
    config_redis(app)
    config_socketio(app)
    register_endpoints(app)


# NOTE: Use 'py app.py' to run or this gets ignored
if __name__ == "__main__":
    parser = ArgumentParser()
    parser.add_argument("-p", "--port", default=5000,
                        type=int, help="port to listen on")
    args = parser.parse_args()
    port = args.port
    create_app()
    app.logger.info(f"Debug Mode: {app.debug}")
    app.logger.info("Server configured")
    app.run(host="0.0.0.0", port=port, use_reloader=True)
else:
    create_app()
