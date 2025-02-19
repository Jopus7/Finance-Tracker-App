from pydantic import BaseModel

from app.api.schemas import BaseOrmModel


class UserIn(BaseModel):
    first_name: str
    last_name: str
    email: str
    password: str
    default_currency: str


class UserOut(BaseOrmModel):
    id: int
    email: str
    first_name: str
    last_name: str
    default_currency: str
