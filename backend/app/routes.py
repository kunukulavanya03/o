from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from app.database import Session
from app.models import User
from app.utils import get_password_hash, verify_password
from app.settings import settings
from jose import jwt
from datetime import datetime, timedelta

router = APIRouter()

@router.get('/health')
def read_health():
    return {'status': 'ok', 'timestamp': datetime.now().isoformat()}

@router.get('/users')
def read_users():
    users = Session.query(User).all()
    return {'users': [user.to_dict() for user in users], 'total': len(users)}

@router.post('/users')
def create_user(user: User):
    existing_user = Session.query(User).filter(User.username == user.username).first()
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Username already exists')
    user.password = get_password_hash(user.password)
    Session.add(user)
    Session.commit()
    return user.to_dict()

@router.get('/users/{user_id}')
def read_user(user_id: int):
    user = Session.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='User not found')
    return user.to_dict()

@router.put('/users/{user_id}')
def update_user(user_id: int, user: User):
    existing_user = Session.query(User).filter(User.id == user_id).first()
    if not existing_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='User not found')
    existing_user.username = user.username
    existing_user.email = user.email
    Session.commit()
    return existing_user.to_dict()

@router.delete('/users/{user_id}')
def delete_user(user_id: int):
    user = Session.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='User not found')
    Session.delete(user)
    Session.commit()
    return {'message': 'User deleted'}

@router.post('/login')
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = Session.query(User).filter(User.username == form_data.username).first()
    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Incorrect username or password')
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = jwt.create_access_token(sub=user.username, expires_delta=access_token_expires)
    return {'access_token': access_token, 'token_type': 'bearer'}