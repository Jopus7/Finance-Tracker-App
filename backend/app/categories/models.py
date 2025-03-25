from typing import TYPE_CHECKING

from sqlalchemy import BigInteger, ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.connection import BaseModel

if TYPE_CHECKING:
    from app.expenses.models import Expense
    from app.users.models import User


class Category(BaseModel):
    __tablename__ = "categories"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    name: Mapped[str] = mapped_column(String)
    user_id: Mapped[int] = mapped_column(BigInteger, ForeignKey("users.id"), index=True, nullable=True)

    user: Mapped["User"] = relationship(back_populates="categories", uselist=False)
    expenses: Mapped["Expense"] = relationship(back_populates="category")
