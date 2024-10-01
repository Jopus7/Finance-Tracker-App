from datetime import datetime
from typing import TYPE_CHECKING
from sqlalchemy import BigInteger, DateTime, String, Float, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.models import BaseModel

if TYPE_CHECKING:
    from app.users.models import User


class Expense(BaseModel):
    __tablename__ = "expenses"
    
    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    name: Mapped[str] = mapped_column(String)
    user_id: Mapped[int] = mapped_column(BigInteger, ForeignKey("users.id"), index=True)
    description: Mapped[str] = mapped_column(String)
    amount: Mapped[float] = mapped_column(Float)
    date: Mapped[datetime] = mapped_column(DateTime)
    
    user: Mapped["User"] = relationship(back_populates="expenses")
