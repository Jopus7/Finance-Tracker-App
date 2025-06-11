from app.saving_targets.schemas import SavingTargetIn
from app.users.models import User
from sqlalchemy.orm import Session
from app.saving_targets.models import SavingTarget
from sqlalchemy import asc, desc



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
) -> list:
    sort_column = getattr(SavingTarget, sort_by)
    order_by = asc(sort_column) if order == "asc" else desc(sort_column)  
    saving_targets_query = (
        dbs.query(
            SavingTarget.id,
            SavingTarget.name,
            SavingTarget.target_amount,
            SavingTarget.current_amount,
            SavingTarget.user_id,
        )
        .filter(SavingTarget.user_id == user.id)
    )

    return saving_targets_query.order_by(order_by).all()
