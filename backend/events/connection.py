from flask import current_app as app
from services.utils import socketio


@socketio.on("connect")
def handle_connect():
    app.logger.info("A user has connected!")
