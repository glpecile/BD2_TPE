from typing import List

from fastapi import APIRouter
from schemas.url import Url, UrlCreate

import urlCrud

routes_url = APIRouter()


@routes_url.get("", response_model=List[Url])
def get_urls_by_user(owner: int):
    return urlCrud.get_urls_by_user(owner)


@routes_url.post("", response_model=Url, status_code=201)
def create_url(url: UrlCreate):
    return urlCrud.create_url(url.key, url.url, 0)


@routes_url.get("/{key}", response_model=Url)
def get_url(key: str):
    return urlCrud.get_url(key)


@routes_url.delete("/{key}")
def delete_url(key: str):
    return urlCrud.delete_url(key)
