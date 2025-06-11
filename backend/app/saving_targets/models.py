from typing import TYPE_CHECKING

from sqlalchemy import BigInteger, ForeignKey, String, Float
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.connection import BaseModel

if TYPE_CHECKING:
    from app.users.models import User


class SavingTarget(BaseModel):
    __tablename__ = "saving_targets"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    name: Mapped[str] = mapped_column(String)
    target_amount: Mapped[float] = mapped_column(Float)
    current_amount: Mapped[float] = mapped_column(Float)
    user_id: Mapped[int] = mapped_column(BigInteger, ForeignKey("users.id"), index=True)
 
    user: Mapped["User"] = relationship(back_populates="saving_targets", uselist=False)
    