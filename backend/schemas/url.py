from pydantic import BaseModel
# from redisearch import Document


class Url(BaseModel):
    key: str
    url: str
    owner: int
    clicks: int
