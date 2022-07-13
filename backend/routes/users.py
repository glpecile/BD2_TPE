from fastapi import APIRouter, Depends
from schemas.user import User
from database import SessionLocal, engine
from sqlalchemy.orm import Session

import userCrud
import models

routes_user = APIRouter()

models.Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@routes_user.get("/{user_id}", response_model=User)
def get_user(user_id: int, db: Session = Depends(get_db)):
    return userCrud.get_user(db, user_id)


@routes_user.post("", response_model=User)
def create_user(user: User, db: Session = Depends(get_db)):
    return userCrud.create_user(db, user)


@routes_user.delete("/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    # TODO DELETE
    return user_id
