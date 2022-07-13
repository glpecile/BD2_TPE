from pydantic import BaseModel


class Url(BaseModel):
    url: str
    owner: int
    clicks: int
