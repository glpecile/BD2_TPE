from pydantic import BaseModel


class UserCreate(BaseModel):
    email: str
    password: str


class User(BaseModel):
    email: str
    id: int

    class Config:
        orm_mode = True
