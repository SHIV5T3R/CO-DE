import json

from flask_socketio import SocketIOTestClient
from constants import ImportType
from models.projects import Project


def test_create_room(socket_client: SocketIOTestClient, project: Project):
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
