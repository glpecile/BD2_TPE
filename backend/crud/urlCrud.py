import datetime
import time

import redis
from redis import ResponseError
from redisearch import Client, IndexDefinition, TextField, NumericField, Document, Query
from fastapi import HTTPException, status

r = redis.Redis(host='localhost', port=6379, db=0)

SCHEMA = (
    TextField("url"),
    TextField("owner"),
    NumericField("clicks", sortable=True),
    NumericField("date", sortable=True)
)

owner_idx = Client("owner-idx")

definition = IndexDefinition(prefix=['key:'])

try:
    owner_idx.info()
except ResponseError:
    # Index does not exist. We need to create it!
    owner_idx.create_index(SCHEMA, definition=definition)


class Url:
    def __init__(self, alias: str, url: str, owner: int, clicks: int, date):
        self.alias: str = alias
        self.url: str = url
        self.owner: int = owner
        self.clicks: int = clicks
        self.date: datetime.datetime = date

    @staticmethod
    def from_dict(key: str, d=None):
        if d is not None:
            return Url(key.replace('key:', ''), d['url'], int(d['owner']), int(d['clicks']), datetime.datetime.fromtimestamp(int(d['date'])))

    @staticmethod
    def from_document(doc: Document):
        if doc is not None:
            return Url(doc.id.replace('key:', ''), doc.url, doc.owner, doc.clicks, datetime.datetime.fromtimestamp(int(doc.date)))


def create_url(alias: str, url: str, owner: int):
    key = get_complete_key(alias)
    if r.hget(key, 'url'):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Shortened url already registered")
    url_object = {
        'url': url,
        'owner': owner,
        'clicks': 0,
        'date': int(time.time())
    }
    r.hset(key, mapping=url_object)
    return get_url_from_complete_key(key)


def get_url(alias: str):
    key = get_complete_key(alias)
    url = r.hget(key, 'url')
    if url is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="Shortened url not found")
    r.hincrby(key, 'clicks', 1)
    return get_url_from_complete_key(key)


def get_urls_by_user(owner: int, sort: str = "clicks", order: str = "desc"):
    # url_docs = owner_idx.search("@owner:" + str(owner))
    q = Query("@owner:" + str(owner)).sort_by(sort, asc=order == 'asc')
    url_docs = owner_idx.search(q)
    urls = list(map(Url.from_document, url_docs.docs))
    urls_dict = []
    for u in urls:
        urls_dict.append(u.__dict__)
    return urls_dict


def delete_url(alias: str):
    key = get_complete_key(alias)
    r.hdel(key, 'url', 'owner', 'clicks', 'date')


def get_complete_key(alias: str):
    return 'key:' + alias


def get_url_from_complete_key(key: str):
    h_url = r.hgetall(key)
    h_url = {y.decode('ascii'): h_url.get(y).decode('ascii') for y in h_url.keys()}
    return Url.from_dict(key, h_url).__dict__
