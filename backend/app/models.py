from app.database import Base, Session
from sqlalchemy import Column, Integer, String
from sqlalchemy_serializer import SerializerMixin


class User(Base, SerializerMixin):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)

    def __repr__(self):
        return f'User(id={self.id}, username={self.username}, email={self.email})'