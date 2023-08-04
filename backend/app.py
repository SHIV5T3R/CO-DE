from argparse import ArgumentParser

from flask import Flask

from api.routes import test


def create_app():
    app = Flask(__name__)

    app.config.from_pyfile('config.py')
    app.register_blueprint(test)

    return app

if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default = 5000, type = int, help = 'port to listen on')
    args = parser.parse_args()
    port = args.port

    app = create_app()
    app.run(host = '0.0.0.0', port = port, debug = True, use_reloader =True)