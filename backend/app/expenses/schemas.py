from pydantic import BaseModel
from datetime import date as dt_date

from app.api.schemas import BaseOrmModel


class ExpenseIn(BaseModel):
    name: str
    description: str
    amount: float
    date: dt_date
    
class ExpenseOut(BaseOrmModel):
    id: int
    name: str
    user_id: int
    description: str
    amount: float
    date: dt_date