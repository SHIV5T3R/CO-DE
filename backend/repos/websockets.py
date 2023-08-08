from flask import current_app as app
from services.utils import socketio

class WebsocketsRepo:
    @classmethod
    def connect_user(self):
        app.logger.info(f"Testing socketio instance is set globally: {socketio}")
        app.logger.info("User succesfully connected")
        return 200