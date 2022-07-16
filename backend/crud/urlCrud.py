import redis
from redis import ResponseError
from redisearch import Client, IndexDefinition, TextField, NumericField, Document
from fastapi import HTTPException, status

r = redis.Redis(host='localhost', port=6379, db=0)


SCHEMA = (
    TextField("url"),
    TextField("owner"),
    NumericField("clicks")
)

owner_idx = Client("owner-idx")

definition = IndexDefinition(prefix=['key:'])

try:
    owner_idx.info()
except ResponseError:
    # Index does not exist. We need to create it!
    owner_idx.create_index(SCHEMA, definition=definition)


class Url:
    def __init__(self, key: str, url: str, owner: int, clicks: int):
        self.key: str = key
        self.url: str = url
        self.owner: int = owner
        self.clicks: int = clicks

    @staticmethod
    def from_dict(key: str, d=None):
        if d is not None:
            return Url(key, d['url'], int(d['owner']), int(d['clicks']))

    @staticmethod
    def from_document(doc: Document):
        if doc is not None:
            return Url(doc.id.replace('key:', ''), doc.url, doc.owner, doc.clicks)


def create_url(key: str, url: str, owner: int):
    k = 'key:' + key
    if r.hget(k, 'url'):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Shorten url already registered")

    url_object = {
        'url': url,
        'owner': owner,
        'clicks': 0
    }
    r.hset(k, mapping=url_object)
    h_url = r.hgetall(k)
    h_url = {y.decode('ascii'): h_url.get(y).decode('ascii') for y in h_url.keys()}
    return Url.from_dict(key, h_url).__dict__


def get_url(key: str):
    k = 'key:' + key
    url = r.hget(k, 'url')
    if url is None:
        return
    r.hincrby(k, 'clicks', 1)
    h_url = r.hgetall(k)
    h_url = {y.decode('ascii'): h_url.get(y).decode('ascii') for y in h_url.keys()}
    return Url.from_dict(key, h_url).__dict__


def get_urls_by_user(owner: int):
    url_docs = owner_idx.search("@owner:" + str(owner))
    urls = list(map(Url.from_document, url_docs.docs))
    urls_dict = []
    for u in urls:
        urls_dict.append(u.__dict__)
    return urls_dict


def delete_url(key: str):
    r.hdel('key:' + key, 'url', 'owner', 'clicks')