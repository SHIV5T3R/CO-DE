from flask import Flask
from flask_socketio import SocketIO
from mongoengine import connect

def config_mongodb(_app):
    global db
    if not _app or not isinstance(_app, Flask):
        raise TypeError("Invalid Flask application instance")
    
    _app.logger.info("Start mongoengine config")
    db = connect(
        db=_app.config["DB_NAME"],
        port=_app.config["DB_PORT"],
        host=_app.config["DB_HOST"],
    )
    _app.logger.info(f"End mongoengine config {db}")

def config_socketio(_app):
    global socketio
    _app.logger.info("Start websocket config")
    socketio = SocketIO(_app, cors_allowed_origins="*")
    _app.logger.info(f"End websocket config {socketio}")