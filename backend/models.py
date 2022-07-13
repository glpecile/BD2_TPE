from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, null
from sqlalchemy.orm import relationship
from database import Base
 
 
class User(Base):
    __tablename__ = "users"
 
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)

    