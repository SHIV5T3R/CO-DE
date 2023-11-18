import secrets
import redis
from flask import Flask
from flask_socketio import SocketIO
from mongoengine import connect


def config_mongodb(_app: Flask):
    global db
    if not _app or not isinstance(_app, Flask):
        raise TypeError("Invalid Flask application instance")

    _app.logger.info("Start mongoengine config")
    db = connect(
        db=_app.config["DB_NAME"],
        port=_app.config["DB_PORT"],
        host=_app.config["DB_HOST"],
        uuidRepresentation="standard",
    )
    _app.logger.info(f"End mongoengine config {db}")


def config_redis(_app: Flask):
    global redis
    try:
        _app.logger.info("Start Redis config")
        redis = redis.StrictRedis(
            host=_app.config["REDIS_HOST"],
            port=_app.config["REDIS_PORT"],
            decode_responses=True,  # decodes response to string
        )
        _app.logger.info(f"End Redis config {redis}")
    except Exception as e:
        _app.logger.error(f"Error during Redis config: {e}")


def config_socketio(_app: Flask):
    global socketio
    try:
        _app.logger.info("Start websocket config")
        socketio = SocketIO(_app, cors_allowed_origins="*")
        _app.logger.info(f"End websocket config {socketio}")
    except Exception as e:
        _app.logger.error(f"Error during websocket config: {e}")


def generate_invite_token() -> str:
    return "code-" + secrets.token_urlsafe(16)


def resolve_origins(config: str) -> list:
    return config.split(",")
