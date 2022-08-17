from typing import List

from fastapi import APIRouter, Depends, status, HTTPException, Query
from sqlalchemy.orm import Session

from crud.database import SessionLocal
from schemas.url import Url, UrlCreate

import auth.authConfig as authConfig
import crud.urlCrudPsql as urlCrud
from schemas.user import User

routes_url = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@routes_url.get("", response_model=List[Url])
def get_urls_by_user(owner: int,
                     sort: str = Query(default='date', regex="^(date|clicks)$"),
                     order: str = Query(default='desc', regex="^(asc|desc)$"),
                     db: Session = Depends(get_db)):
    return urlCrud.get_urls_by_user(db, owner, sort, order)


@routes_url.post("", response_model=Url, status_code=status.HTTP_201_CREATED)
def create_url(url: UrlCreate,
               current_user: User = Depends(authConfig.get_current_user),
               db: Session = Depends(get_db)):
    if not current_user:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED)
    return urlCrud.create_url(db, url.alias, url.url, current_user.id)


@routes_url.get("/{alias}", response_model=Url)
def get_url(alias: str,
            db: Session = Depends(get_db)):
    return urlCrud.get_url(db, alias)


@routes_url.delete("/{alias}", status_code=status.HTTP_204_NO_CONTENT)
def delete_url(alias: str,
               current_user: User = Depends(authConfig.get_current_user),
               db: Session = Depends(get_db)):
    url = urlCrud.get_url(alias)
    if url and url['owner'] != current_user.id:
        raise HTTPException(status.HTTP_403_FORBIDDEN)
    return urlCrud.delete_url(db, alias)
