from datetime import date as dt_date
from typing import TYPE_CHECKING

from sqlalchemy import BigInteger, Date, Float, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.models import BaseModel

if TYPE_CHECKING:
    from app.categories.models import Category
    from app.users.models import User


class Expense(BaseModel):
    __tablename__ = "expenses"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    name: Mapped[str] = mapped_column(String)
    user_id: Mapped[int] = mapped_column(BigInteger, ForeignKey("users.id"), index=True)
    category_id: Mapped[int] = mapped_column(BigInteger, ForeignKey("categories.id"), index=True, nullable=True)
    description: Mapped[str] = mapped_column(String)
    amount: Mapped[float] = mapped_column(Float)
    date: Mapped[dt_date] = mapped_column(Date)

    user: Mapped["User"] = relationship(back_populates="expenses")
    category: Mapped["Category"] = relationship(back_populates="expenses", uselist=False)
