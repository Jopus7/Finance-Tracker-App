from pydantic import BaseModel

from app.api.schemas import BaseOrmModel


class CategoryIn(BaseModel):
    name: str


class CategoryOut(BaseOrmModel):
    id: int
    name: str
    user_id: int | None
