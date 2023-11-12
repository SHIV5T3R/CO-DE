import json

from flask_socketio import emit, join_room
from mongoengine import ValidationError
from models import Room
from repos.rooms import RoomRepo
from schemas import MessageSchema, RoomSchema, UpdateRoomSchema
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


@socketio.on("join_room")
def handle_join_room(data):
    try:
        schema = UpdateRoomSchema()
        deserialized_data = schema.loads(data, partial=True)
        res = RoomRepo.join_room(deserialized_data)
        emit("join_room", schema.dumps(res))
    except ValidationError as e:
        emit("join_room", schema.dumps(e.message))


@socketio.on("send_message")
def handle_send_message(data):
    try:
        schema = MessageSchema()
        deserialized_data = schema.loads(data)
        res = RoomRepo.send_message(deserialized_data)
        room = Room.objects.get(id=res.room.id)
        emit("send_message", schema.dumps(res), to=room.invite_token, broadcast=True)
    except ValidationError as e:
        emit(
            "send_message", schema.dumps(e.message), to=room.invite_token, broadcast=True
        )
