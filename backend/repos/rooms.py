from flask import current_app as app
from flask_restful import abort
from mongoengine import ValidationError, NotUniqueError
from models.rooms import Room


class RoomsRepo:
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
