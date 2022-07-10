import redis

r = redis.Redis(host='localhost', port=6379, db=0)


def get_url(key: str):
    url_object = r.hgetall(key)
    if url_object:
        r.hincrby(key, 'clicks', 1)
    return url_object

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
