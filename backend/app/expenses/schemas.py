from datetime import date as dt_date

from pydantic import BaseModel

from app.api.schemas import BaseOrmModel


class ExpenseIn(BaseModel):
    name: str
    description: str
    amount: float
    date: dt_date
    category_id: int


class ExpenseOutTest(BaseOrmModel):
    id: int
    name: str
    user_id: int
    description: str
    amount: float
    date: dt_date
    category_name: str


class ExpenseOut(BaseOrmModel):
    id: int
    name: str
    user_id: int
    description: str
    amount: float
    date: dt_date
    category_id: int
