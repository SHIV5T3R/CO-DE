from flask import current_app as app
from flask_restful import abort
from models import Room, User
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
            user = User.objects.get(username=data["owner"].username)
            Room.objects(owner=user).update(has_ended=True)
            app.logger.info(
                f"Room with invite token [{data['invite_token']}] ended successfully"
            )
        except User.DoesNotExist as e:
            app.logger.error("Failed Room Ending: User Object Does Not Exist")
            abort(400, status=False, error=str(e))
        except ValidationError as e:
            app.logger.error("Failed Room Ending: Validation Error")
            abort(400, status=False, error=e._format_errors())
        return Room.objects(invite_token=data["invite_token"]).first()

    @classmethod
    def join_room(cls, data):
        try:
            app.logger.info("Joining room session...")
            user = User.objects.get(username=data["owner"].username)
            room = Room.objects.get(invite_token=data["invite_token"])
            if not room.has_ended:
                room.members.append(user)
                room.save()
                app.logger.info(
                    f"User {user.username} joined room with token {room.invite_token}"
                )
            return room
        except User.DoesNotExist as e:
            app.logger.error("Failed Room Joining: User Object Does Not Exist")
            abort(400, status=False, error=str(e))
        except Room.DoesNotExist as e:
            app.logger.error("Failed Room Joining: Room Object Does Not Exist")
            abort(400, status=False, error=str(e))
        except ValidationError as e:
            app.logger.error("Failed Room Joining: Validation Error")
            abort(400, status=False, error=e._format_errors())
