from fastapi.testclient import TestClient
from app.main import app
from app.models import User, Session
from app.utils import get_password_hash

client = TestClient(app)


def test_read_health():
    response = client.get('/health')
    assert response.status_code == 200
    assert response.json() == {'status': 'ok', 'timestamp': response.json()['timestamp']}


def test_read_users():
    response = client.get('/users')
    assert response.status_code == 200
    assert response.json() == {'users': [], 'total': 0}


def test_create_user():
    user_data = {'username': 'test', 'email': 'test@example.com', 'password': 'test'}
    response = client.post('/users', json=user_data)
    assert response.status_code == 200
    assert response.json()['username'] == 'test'
    assert response.json()['email'] == 'test@example.com'
    user = Session.query(User).filter(User.username == 'test').first()
    Session.delete(user)
    Session.commit()


def test_read_user():
    user_data = {'username': 'test', 'email': 'test@example.com', 'password': 'test'}
    response = client.post('/users', json=user_data)
    user_id = response.json()['id']
    response = client.get(f'/users/{user_id}')
    assert response.status_code == 200
    assert response.json()['username'] == 'test'
    assert response.json()['email'] == 'test@example.com'
    user = Session.query(User).filter(User.username == 'test').first()
    Session.delete(user)
    Session.commit()


def test_update_user():
    user_data = {'username': 'test', 'email': 'test@example.com', 'password': 'test'}
    response = client.post('/users', json=user_data)
    user_id = response.json()['id']
    update_data = {'username': 'test2', 'email': 'test2@example.com'}
    response = client.put(f'/users/{user_id}', json=update_data)
    assert response.status_code == 200
    assert response.json()['username'] == 'test2'
    assert response.json()['email'] == 'test2@example.com'
    user = Session.query(User).filter(User.username == 'test2').first()
    Session.delete(user)
    Session.commit()


def test_delete_user():
    user_data = {'username': 'test', 'email': 'test@example.com', 'password': 'test'}
    response = client.post('/users', json=user_data)
    user_id = response.json()['id']
    response = client.delete(f'/users/{user_id}')
    assert response.status_code == 200
    assert response.json()['message'] == 'User deleted'


def test_login():
    user_data = {'username': 'test', 'email': 'test@example.com', 'password': 'test'}
    response = client.post('/users', json=user_data)
    login_data = {'username': 'test', 'password': 'test'}
    response = client.post('/login', data=login_data)
    assert response.status_code == 200
    assert response.json()['access_token'] is not None
    assert response.json()['token_type'] == 'bearer'
    user = Session.query(User).filter(User.username == 'test').first()
    Session.delete(user)
    Session.commit()