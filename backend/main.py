from fastapi import FastAPI

from routes.urls import routes_url
from routes.users import routes_user

app = FastAPI()

app.include_router(routes_user, prefix="/users")
app.include_router(routes_url, prefix="/url")
