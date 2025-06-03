from app.saving_targets.schemas import SavingTargetIn
from app.users.models import User
from sqlalchemy.orm import Session
from app.saving_targets.models import SavingTarget


def saving_target_create(saving_target_in: SavingTargetIn, dbs: Session, user: User) -> SavingTarget:
    saving_target_data = saving_target_in.model_dump()
    saving_target = SavingTarget(**saving_target_data, user=user)
    dbs.add(saving_target)
    dbs.commit()
    return saving_target