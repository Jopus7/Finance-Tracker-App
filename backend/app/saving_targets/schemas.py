from pydantic import BaseModel


class SavingTargetIn(BaseModel):
    name: str
    target_amount: float
    current_amount: float | None = 0

class SavingTargetOut(BaseModel):
    id: int
    name: str
    target_amount: float
    current_amount: float | None = 0
    user_id: int
