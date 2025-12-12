from app.models import User, Session
from app.utils import get_password_hash


def test_user_model():
    user = User(username='test', email='test@example.com', password='test')
    user.password = get_password_hash(user.password)
    Session.add(user)
    Session.commit()
    assert user.id is not None
    assert user.username == 'test'
    assert user.email == 'test@example.com'
    Session.delete(user)
    Session.commit()