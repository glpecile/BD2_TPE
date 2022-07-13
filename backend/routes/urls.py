from fastapi import APIRouter
from schemas.url import Url

import urlCrud


routes_url = APIRouter()


@routes_url.get("/{key}")
def get_url(key: str):
    return urlCrud.get_url(key)


@routes_url.get("/user/{username}")
def get_urls_by_username(username: str):
    # TODO get_urls_by_username
    return urlCrud.get_urls_by_username(username)


@routes_url.post("", response_model=Url)
def create_url(key: str, url: str, owner: int):
    return urlCrud.create_url(key, url, owner)


@routes_url.delete("/{key}")
def delete_url(key: str):
    return urlCrud.delete_url(key)
