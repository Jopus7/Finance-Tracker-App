from pydantic import BaseModel, EmailStr
from app.api.schemas import BaseOrmModel

class UserCreate(BaseModel):
    first_name: str
    last_name:str
    email: EmailStr
    password: str

class UserOut(BaseOrmModel):
    id: int
    email:EmailStr
    first_name:str
    last_name:str
