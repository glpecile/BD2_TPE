from datetime import timedelta
from typing import List

from fastapi import APIRouter, Depends, status, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from passlib.context import CryptContext
from sqlalchemy.orm import Session

import auth.authConfig as authConfig
import crud.userCrud as userCrud
from crud import models
from crud.database import SessionLocal, engine
from schemas.user import User, UserCreate

routes_user = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

models.Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@routes_user.get("", response_model=List[User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = userCrud.get_users(db, skip=skip, limit=limit)
    return users


@routes_user.get("/{user_id}", response_model=User)
def get_user(user_id: int, db: Session = Depends(get_db)):
    return userCrud.get_user(db, user_id)


@routes_user.post("", response_model=User, status_code=status.HTTP_201_CREATED)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    return userCrud.create_user(db, user)


@routes_user.delete("/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db), current_user: User = Depends(authConfig.get_current_user)):
    if user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden")

    return userCrud.delete_user(db, user_id)


@routes_user.post("/login", response_model=authConfig.Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authConfig.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=authConfig.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = authConfig.create_access_token(
        data={"sub": user.email, "id": user.id}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}
