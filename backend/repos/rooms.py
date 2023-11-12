import bson
from flask import current_app as app
from flask_restful import abort
from flask_socketio import join_room, leave_room
from models import Room, User, Message
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
            leave_room(data["invite_token"])
        except User.DoesNotExist as e:
            app.logger.error("Failed Room Ending: User object does not exist")
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
                join_room(room.invite_token)
                room.members.append(user)
                room.save()
                app.logger.info(
                    f"User {user.username} joined room with token {room.invite_token}"
                )
            return room
        except User.DoesNotExist as e:
            app.logger.error("Failed Room Joining: User object does not exist")
            abort(400, status=False, error=str(e))
        except Room.DoesNotExist as e:
            app.logger.error("Failed Room Joining: Room object does not exist")
            abort(400, status=False, error=str(e))
        except ValidationError as e:
            app.logger.error("Failed Room Joining: Validation error")
            abort(400, status=False, error=e._format_errors())

    @classmethod
    def send_message(cls, data):
        try:
            app.logger.info("Sending message...")
            user = User.objects.get(username=data["sender"].username)
            room = Room.objects.get(invite_token=data["room"].invite_token)
            join_room(room.invite_token)
            if room.has_ended:
                raise Room.DoesNotExist
            if user not in room.members:
                raise User.DoesNotExist
            message = Message(
                sender=user.id,
                room=room.id,
                content=data["content"],
                category=data["category"],
            )
            message.save()
            return message
        except User.DoesNotExist as e:
            app.logger.error("Failed Message Sending: User does not belong to room")
            abort(400, status=False, error="User does not belong to room.")
        except Room.DoesNotExist as e:
            app.logger.error("Failed Message Sending: Room session has ended")
            abort(400, status=False, error="Room session has ended.")
        except ValidationError as e:
            app.logger.error("Failed Message Sending: Validation Error")
            abort(400, status=False, error=e._format_errors())
