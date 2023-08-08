from flask_socketio import SocketIO



def config_socketio(_app):
    global socketio
    _app.logger.info("Start websocket config")
    socketio = SocketIO(_app)
    _app.logger.info(f"End websocket config {socketio}")