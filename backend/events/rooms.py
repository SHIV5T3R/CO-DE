import json

from flask_socketio import emit
from mongoengine import ValidationError
from repos.rooms import RoomsRepo
from schemas.rooms import CreateRoomSchema
from services.utils import socketio


@socketio.on("create_room")
def handle_create_room(data):
    try:
        schema = CreateRoomSchema()
        deserialized_data = schema.load(data)
        res = RoomsRepo.create_room(deserialized_data)
        emit("create_room", json.dump(res))
    except ValidationError as e:
        emit("create_room", json.dump(e.message))
