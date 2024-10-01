from pydantic import BaseModel
from datetime import datetime

from app.api.schemas import BaseOrmModel


class ExpenseIn(BaseModel):
    name: str
    description: str
    amount: float
    date: datetime
    
class ExpenseOut(BaseOrmModel):
    id: int
    name: str
    user_id: int
    description: str
    amount: float
    date: datetime