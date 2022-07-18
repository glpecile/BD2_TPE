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
    return urlCrud.create_url(url.alias, url.url, current_user.id)


@routes_url.get("/{alias}", response_model=Url)
def get_url(alias: str):
    return urlCrud.get_url(alias)


@routes_url.delete("/{alias}")
def delete_url(alias: str, current_user: User = Depends(authConfig.get_current_user)):
    url = urlCrud.get_url(alias)
    if url and url['owner'] != current_user.id:
        raise HTTPException(status.HTTP_403_FORBIDDEN)
    return urlCrud.delete_url(alias)
