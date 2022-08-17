import datetime

from sqlalchemy import text
from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from crud.models import Url


def create_url(db: Session, alias: str, url: str, owner: int):
    if db.query(Url).filter(Url.alias == alias).first():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Shortened url already registered")
    db_url = Url(alias=alias, url=url, owner=owner, clicks=0, date=datetime.datetime.now())
    db.add(db_url)
    db.commit()
    db.refresh(db_url)
    return db_url


def get_url(db: Session, alias: str):
    url = db.query(Url).filter(Url.alias == alias).first()
    url.clicks += 1
    db.commit()
    return url


def get_urls_by_user(db: Session, owner: int, sort: str = "clicks", order: str = "desc"):
    q = db.query(Url).filter(Url.owner == owner).order_by(text(sort + ' ' + order)).limit(10)
    return q.all()


def delete_url(db: Session, alias: str):
    db.query(Url).filter(Url.alias == alias).delete()
    return db.commit()
