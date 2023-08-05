import os
from argparse import ArgumentParser
from flask import Flask, send_from_directory
from flask_socketio import SocketIO
from api.routes import test

def create_app():
    app = Flask(__name__, static_folder="../frontend/dist", template_folder="../frontend/dist")

    app.config.from_pyfile('config.py')
    app.register_blueprint(test)

    @app.route("/", defaults={'path': ''})
    @app.route('/<path:path>')
    def serve(path):
        if path != "" and os.path.exists("../frontend/dist/" + path):
            return send_from_directory("../frontend/dist", path)
        else:
            return send_from_directory("../frontend/dist", 'index.html')
    return app

if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default = 5000, type = int, help = 'port to listen on')
    args = parser.parse_args()
    port = args.port
    
    app = create_app()
    socketio = SocketIO(app)

    @socketio.on('connect')
    def handle_connect():
        print("Client connected")

    @socketio.on('yjs-update')
    def handle_update(update):
        # Broadcast the update to all clients (except the sender)
        socketio.emit('yjs-update', update, include_self=False)
        print(update)


    socketio.run(app, host='0.0.0.0', port=port, debug=True)