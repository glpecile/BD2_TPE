from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.urls import routes_url
from routes.users import routes_user

app = FastAPI()


# CORS
origins = [
    "http://localhost:3000",
    "http://localhost:8080"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

app.include_router(routes_user, prefix="/users")
app.include_router(routes_url, prefix="/urls")
