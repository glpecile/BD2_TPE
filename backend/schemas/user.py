from pydantic import BaseModel, validator
from fastapi import HTTPException, status
import re


class UserCreate(BaseModel):
    email: str
    password: str

    @validator('email')
    def validate_email(cls, v):
        email_pattern = r"^\S+@\S+\.\S+$"
        if not re.fullmatch(email_pattern, v):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                                detail="Emails should be a valid email")
        return v

    @validator('password')
    def validate_password(cls, v):
        password_pattern = "[^<\/>](?=.*[A-Za-z\d])[A-Za-z\d@$!%*#?&_-]{7,}"
        if not re.fullmatch(password_pattern, v):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                                detail="Password should include at least one Uppercase and up to 8 characters")
        return v


class User(BaseModel):
    email: str
    id: int

    class Config:
        orm_mode = True
