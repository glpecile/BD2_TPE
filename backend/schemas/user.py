from pydantic import BaseModel

<<<<<<< HEAD:backend/schemas/user.py

class UserBase(BaseModel):
    id: int
    username: str
    email: str
    password: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
=======
class User(BaseModel):
    id: int
    email: str
    password: str
>>>>>>> user table fxed:backend/schemas.py
    is_active: bool

    class Config:
        orm_mode = True
