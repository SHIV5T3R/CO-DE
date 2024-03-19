import json

from constants import ImportType
from enums import MessageCategory
from flask_socketio import SocketIOTestClient
from models import Project, User

INVITE_TOKEN: str


def test_create_room(socket_client: SocketIOTestClient, project: Project):
    global INVITE_TOKEN
    data = {
        "owner": str(project.owner.id),
        "name": "Test room",
        "description": "Test description",
        "project": str(project.id),
    }
    socket_client.emit("create_room", json.dumps(data))

    response = list(
        filter(lambda dict: dict["name"] == "create_room", socket_client.get_received())
    )[0]
    response_data = json.loads(response["args"][0])["data"]

    # Check if `id` property is returned in response and that
    # the project id of the payload matches the response
    assert "id" in response_data
    assert data["project"] == response_data["project"]

    if project.import_type == ImportType.GITHUB:
        # Github projects should always be a directory
        assert project.is_directory == True

    INVITE_TOKEN = str(response_data["invite_token"])


def test_join_room(socket_client: SocketIOTestClient):
    data = {"owner": {"username": "test_user"}, "invite_token": INVITE_TOKEN}
    socket_client.emit("join_room", json.dumps(data))
    response = json.loads(
        list(
            filter(lambda dict: dict["name"] == "join_room", socket_client.get_received())
        )[0]["args"][0]
    )

    assert response["status"] == True

    # Check if user among room members
    user = User.objects.get(username="test_user")
    assert str(user.id) in response["data"]["members"]


def test_send_message(socket_client: SocketIOTestClient):
    from bson import ObjectId
    from models import Room

    room = Room.objects.get(invite_token=INVITE_TOKEN)
    user = User.objects.get(username="test_user")

    data = {
        "sender": str(ObjectId(user.id)),
        "room": str(ObjectId(room.id)),
        "content": "Test message",
        "category": MessageCategory.TEXT.value,
    }
    socket_client.emit("send_message", json.dumps(data))
    response = json.loads(
        list(
            filter(
                lambda dict: dict["name"] == "send_message", socket_client.get_received()
            )
        )[0]["args"][0]
    )
    assert response["status"] == True
    assert response["data"]["content"] == "Test message"
    assert response["data"]["room"] == str(ObjectId(room.id))


def test_end_room(socket_client: SocketIOTestClient):
    data = {"owner": {"username": "test_user"}, "invite_token": INVITE_TOKEN}
    socket_client.emit("end_room", json.dumps(data))
    response = json.loads(
        list(
            filter(lambda dict: dict["name"] == "end_room", socket_client.get_received())
        )[0]["args"][0]
    )

    assert response["status"] == True
    assert response["data"]["has_ended"] == True
