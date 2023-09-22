import logging
from argparse import ArgumentParser

from flask import Flask, jsonify
from flask_cors import CORS
from flask_limiter import Limiter
from config import get_config, get_testing_config
from services.utils import config_mongodb, config_socketio, resolve_origins, config_redis

def register_endpoints(_app):
    from views.blueprints import blueprints

    for bp in blueprints:
        _app.register_blueprint(bp)
        # _app.logger.info(f"endpoints: {bp}")

    _app.logger.info(f"Endpoints registered")

    @_app.route("/")
    def status():
        return jsonify({"status": "OK"})


def register_sockets(_app):
    import events

    _app.logger.info(f"Websockets registered")


def create_app(testing=False):
    app = Flask(__name__)

    if testing:
        app.config.from_object(get_testing_config())
    else:
        app.config.from_object(get_config())

    origins = resolve_origins(app.config["CORS_ALLOWED_ORIGINS"])
    CORS(app, origins=origins, supports_credentials=True)  # Enable CORS
    Limiter(app)
    app.logger.setLevel(logging.INFO)
    app.logger.info(f"Flask env: {app.config['FLASK_ENV']}")
    app.url_map.strict_slashes = False  # more forgiving with trailing slashes in url
    config_mongodb(app)
    config_redis(app)
    config_socketio(app)
    register_sockets(app)
    
    register_endpoints(app)
    return app


# NOTE: Use 'py app.py' to run or this gets ignored
if __name__ == "__main__":
    parser = ArgumentParser()
    parser.add_argument(
        "-p", "--port", default=5000, type=int, help="port to listen on"
    )
    args = parser.parse_args()
    port = args.port
    app = create_app()
    app.logger.info(f"Debug Mode: {app.debug}")
    app.logger.info("Server configured")
    app.run(host="0.0.0.0", port=port, use_reloader=True)
