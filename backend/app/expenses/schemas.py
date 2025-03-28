from datetime import date as dt_date
from typing import Optional

from pydantic import BaseModel

from app.api.schemas import BaseOrmModel


class ExpenseIn(BaseModel):
    name: str
    description: str
    amount: float
    date: dt_date
    currency: str
    category_id: Optional[int]


class ExpenseOutListItem(BaseOrmModel):
    id: int
    name: str
    user_id: int
    description: str
    amount: float
    date: dt_date
    category_name: str
    currency: str


class ExpenseOut(BaseOrmModel):
    id: int
    name: str
    user_id: int
    description: str
    amount: float
    date: dt_date
    category_id: Optional[int]
    currency: str
