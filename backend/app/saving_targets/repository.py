from typing import Any

from sqlalchemy import asc, desc
from sqlalchemy.orm import Session
from sqlalchemy.sql.elements import UnaryExpression

from app.saving_targets.models import SavingTarget
from app.saving_targets.schemas import SavingTargetIn
from app.users.models import User


def saving_target_create(saving_target_in: SavingTargetIn, dbs: Session, user: User) -> SavingTarget:
    saving_target_data = saving_target_in.model_dump()
    saving_target = SavingTarget(**saving_target_data, user=user)
    dbs.add(saving_target)
    dbs.commit()
    return saving_target


def get_saving_targets(
    dbs: Session,
    user: User,
    sort_by: str = "name",
    order: str = "asc",
) -> list[SavingTarget]:
    sort_column = getattr(SavingTarget, sort_by)
    order_by: UnaryExpression[Any] = asc(sort_column) if order == "asc" else desc(sort_column)
    return dbs.query(SavingTarget).filter(SavingTarget.user_id == user.id).order_by(order_by).all()
