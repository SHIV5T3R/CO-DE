import json

from flask_socketio import emit
from mongoengine import ValidationError
from repos.rooms import RoomRepo
from schemas.rooms import RoomSchema, UpdateRoomSchema
from services.utils import socketio


@socketio.on("create_room")
def handle_create_room(data):
    try:
        schema = RoomSchema()
        deserialized_data = schema.loads(data)
        res = RoomRepo.create_room(deserialized_data)
        emit("create_room", schema.dumps(res))
    except ValidationError as e:
        emit("create_room", json.dumps(e.message))


@socketio.on("end_room")
def handle_end_room(data):
    try:
        schema = UpdateRoomSchema()
        deserialized_data = schema.loads(data, partial=True)
        res = RoomRepo.end_room(deserialized_data)
        emit("end_room", schema.dumps(res))
    except ValidationError as e:
        emit("end_room", schema.dumps(e.message))
