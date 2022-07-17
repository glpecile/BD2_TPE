from typing import List

from fastapi import APIRouter, Depends, status, HTTPException, Query

from schemas.url import Url, UrlCreate

import auth.authConfig as authConfig
import crud.urlCrud as urlCrud
from schemas.user import User

routes_url = APIRouter()


@routes_url.get("", response_model=List[Url])
def get_urls_by_user(owner: int,
                     sort: str = Query(default='date', regex="^(date|clicks)$"),
                     order: str = Query(default='desc', regex="^(asc|desc)$")):
    return urlCrud.get_urls_by_user(owner, sort, order)


@routes_url.post("", response_model=Url, status_code=201)
def create_url(url: UrlCreate, current_user: User = Depends(authConfig.get_current_user)):
    if not current_user:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED)
    return urlCrud.create_url(url.key, url.url, current_user.id)


@routes_url.get("/{key}", response_model=Url)
def get_url(key: str):
    return urlCrud.get_url(key)


@routes_url.delete("/{key}")
def delete_url(key: str, current_user: User = Depends(authConfig.get_current_user)):
    url = urlCrud.get_url(key)
    if url and url['owner'] != current_user.id:
        raise HTTPException(status.HTTP_403_FORBIDDEN)
    return urlCrud.delete_url(key)
