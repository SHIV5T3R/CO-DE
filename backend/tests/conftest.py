from typing import Iterable

import pytest
from app import create_app
from constants import ImportType
from flask import Flask
from models.projects import Project
from models.rooms import Room
from models.users import User
from mongoengine import disconnect


@pytest.fixture(scope="session")
def app():
    app = create_app(testing=True)

    test_user = User(
        email="test@email.com",
        username="test_user",
        full_name="Testing User",
        password="0iHXk!1X",
    )
    test_user.save()

    yield app

    # Clear documents in database
    User.objects().delete()
    Room.objects().delete()
    Project.objects.delete()

    # Close database connection
    disconnect()


@pytest.fixture
def client(app: Flask):
    return app.test_client()


@pytest.fixture
def socket_client(app: Flask):
    from services.utils import socketio

    return socketio.test_client(app)


# For parameterized testing
params = [
    {
        "name": "Test project",
        "import_type": ImportType.GITHUB,
        "is_directory": True,
    },
    {
        "name": "Test project 2",
        "import_type": ImportType.LOCAL,
        "is_directory": True,
    },
    {
        "name": "Test project 3",
        "import_type": ImportType.LOCAL,
        "is_directory": False,
    },
]


@pytest.fixture(params=params)
def project(request: Iterable[object]):
    user = User.objects(email="test@email.com").get()
    project = Project(
        owner=user.id,
        name=request.param["name"],
        import_type=request.param["import_type"],
        is_directory=request.param["is_directory"],
        link="https://github.com/SHIV5T3R/CO-DE",
    )
    project.save()
    return project
