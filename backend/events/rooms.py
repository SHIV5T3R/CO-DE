from flask_socketio import emit
from services.utils import socketio


@socketio.on("create_room")
def handle_create_room(json):
    emit("create_room", json)
