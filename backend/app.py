import os
import logging
from flask import Flask, jsonify
from argparse import ArgumentParser
from flask_limiter import Limiter


from config import get_config
from services.utils import config_socketio, config_mongodb

def register_endpoints(_app):
    from views.blueprints import blueprints
    for bp in blueprints:
        _app.register_blueprint(bp)
        # _app.logger.info(f"endpoints: {bp}")

    _app.logger.info(f"Endpoints registered")
    @_app.route('/')
    def status():
        return jsonify({'status': 'OK'})
    
def create_app():
    app = Flask(__name__)
    app.config.from_object(get_config())
    Limiter(app)
    app.logger.setLevel(logging.INFO)
    app.logger.info(f"Flask env: {os.getenv('FLASK_ENV')}")
    app.url_map.strict_slashes = False # more forgiving with trailing slashes in url
    config_mongodb(app)
    config_socketio(app)
    register_endpoints(app)
    return app


# NOTE: Use 'py app.py' to run or this gets ignored
if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default = 5000, type = int, help = 'port to listen on')
    args = parser.parse_args()
    port = args.port

    app = create_app()
    app.logger.info(f"Debug Mode: {app.debug}")
    app.logger.info("Server configured")
    app.run(host = '0.0.0.0', port = port, use_reloader =True)
    