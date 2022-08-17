import datetime

from sqlalchemy import Column, Integer, String, ForeignKey, DateTime

from crud.database import Base


class User(Base):
    __tablename__ = "users"
 
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)


class Url(Base):
    __tablename__ = "urls"

    alias = Column(String, primary_key=True, index=True)
    url = Column(String, nullable=False)
    owner = Column(Integer,  ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    clicks = Column(Integer, nullable=False, default=0)
    date = Column(DateTime, nullable=False, default=datetime.datetime.now)

    