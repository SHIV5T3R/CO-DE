import bson

from flask import current_app as app
from flask_restful import abort
from models.rooms import Room
from mongoengine import NotUniqueError, ValidationError


class RoomRepo:
    @classmethod
    def create_room(cls, data):
        try:
            app.logger.info("Creating room...")
            room = Room(**data)
            room.save()
            app.logger.info(f"Room with token {room.invite_token} created successfully")
        except ValidationError as e:
            app.logger.error("Failed Room Creation: Validation Error")
            abort(400, status=False, error=e._format_errors())
        except NotUniqueError as e:
            app.logger.error("Failed Room Creation: Room already exists")
            abort(
                400,
                status=False,
                message="Unable to create room",
                error="Room with invite token already exists",
            )
        return room

    @classmethod
    def end_room(cls, data):
        try:
            app.logger.info("Ending room session...")
            room_id = bson.ObjectId(data["id"])
            Room.objects(id=room_id).update(has_ended=True)
            app.logger.info(f"Room with id [{room_id}] ended successfully")
        except ValidationError as e:
            app.logger.error("Failed Room Ending: Validation Error")
            abort(400, status=False, error=e._format_errors())
        return Room.objects(id=room_id).first()
