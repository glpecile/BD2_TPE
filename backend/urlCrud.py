import redis

r = redis.Redis(host='localhost', port=6379, db=0)


class Url:
    def __init__(self, d=None):
        if d is not None:
            self.url = d['url']
            self.owner = int(d['owner'])
            self.clicks = int(d['clicks'])


def get_url(key: str):
    url = r.hget(key, 'url')
    if url is None:
        return
    r.hincrby(key, 'clicks', 1)
    h_url = r.hgetall(key)
    h_url = {y.decode('ascii'): h_url.get(y).decode('ascii') for y in h_url.keys()}
    return Url(h_url)


# TODO
def get_urls_by_username():
    return None


# TODO Validar si se va a pasar el owner como objeto o como int
def create_url(key: str, url: str, owner: int):
    if get_url(key):
        return
    url_object = {
        'url': url,
        'owner': owner,
        'clicks': 0
    }
    r.hset(key, mapping=url_object)


def delete_url(key: str):
    r.hdel(key, 'url', 'owner', 'clicks')

