import pytest
from flask import Flask
from mongoengine import disconnect
from app import create_app
from models.users import User


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

    # Delete all user documents
    User.objects().delete()

    # Close database connection
    disconnect()


@pytest.fixture
def client(app: Flask):
    return app.test_client()


@pytest.fixture
def socket_client(app: Flask):
    from services.utils import socketio

    return socketio.test_client(app)
