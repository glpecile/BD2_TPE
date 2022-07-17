from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

import crud.userCrud as userCrud
from crud.database import SessionLocal

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="users/login")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def fake_decode_token(db: Session, token: str):
    return userCrud.get_user_by_email(db, token)


async def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    user = fake_decode_token(db, token)
    return user
