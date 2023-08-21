import json

from flask_socketio import SocketIOTestClient


def test_create_room(socket_client: SocketIOTestClient):
    data = {
        "name": "Test room",
        "description": "Test description",
        "project": "https://project-link.com",
    }
    socket_client.emit("create_room", json.dumps(data))
    response = list(
        filter(lambda dict: dict["name"] == "create_room", socket_client.get_received())
    )[0]
    assert "id" in json.loads(response["args"][0])
    assert data["project"] == json.loads(response["args"][0]["project"])
