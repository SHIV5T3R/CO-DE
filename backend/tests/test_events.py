import json

from flask_socketio import SocketIOTestClient


def test_create_room(socket_client: SocketIOTestClient):
    socket_client.emit("create_room", json.dumps({"test": 1}))
    assert "create_room_response" == socket_client.get_received()[0]["name"]
