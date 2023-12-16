from flask.testing import FlaskClient


def test_login(client: FlaskClient):
    response = client.post(
        "/v1/login", json={"email": "test@email.com", "password": "0iHXk!1X"}
    )
    assert response.json["status"] == True
    assert "access_token" in response.json["data"].keys()


def test_register(client: FlaskClient):
    response = client.post(
        "/v1/register",
        json={
            "email": "test2r4zeqwxsf@email.com",
            "full_name": "Testing User 2",
            "username": "test_daemon",
            "password": "0iHXk!1X",
        },
    )
    assert response.json["status"] == True
    assert "id" in response.json["data"].keys()
