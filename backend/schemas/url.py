import datetime

from pydantic import BaseModel, validator
from fastapi import HTTPException, status
import re


# from redisearch import Document


class UrlCreate(BaseModel):
    alias: str = 'google'
    url: str = 'https://www.google.com/'

    @validator('alias')
    def validate_alias(cls, v):
        if len(v) < 4 or len(v) > 12:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                                detail="Shortened urls should be between 4 and 12 valid characters")
        pat = re.compile(r"[^</>][A-Za-z\d_-]+")
        if not re.fullmatch(pat, v):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                                detail="Shortened urls should contain only alphanumeric characters and dashes")
        return v

    @validator('url')
    def validate_url(cls, v):
        if len(v) < 1:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                                detail="Urls should be greater than 0")
        url_pattern = "^https?:\\/\\/(?:www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)$"
        if not re.match(url_pattern, v):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                                detail="Urls must be a valid url")
        return v


class Url(BaseModel):
    alias: str = 'google'
    url: str = 'https://www.google.com/'
    owner: int
    clicks: int
    date: datetime.datetime

    class Config:
        orm_mode = True
