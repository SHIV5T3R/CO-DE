from flask import current_app as app
from services.utils import socketio


@socketio.on("connect")
def handle_connect():
    app.logger.info("A user has connected! ⚡")


@socketio.on("disconnect")
def handle_disconnect():
    app.logger.info("A user has disconnected! 🔌")
