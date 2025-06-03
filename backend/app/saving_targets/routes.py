from app.saving_targets.schemas import SavingTargetIn, SavingTargetOut
from app.db.connection import db_session
from app.saving_targets.models import SavingTarget
from app.users.models import User
from app.auth.dependencies import authentication


from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session


saving_target_router = APIRouter()

@saving_target_router.post("", response_model=SavingTargetOut)
async def create_saving_target(
    saving_target_in: SavingTargetIn, dbs: Session = Depends(db_session), user: User = Depends(authentication)
    ) -> SavingTarget:
   saving_target_data = saving_target_in.model_dump()
   saving_target = SavingTarget(**saving_target_data, user=user)
   dbs.add(saving_target)
   dbs.commit()
   return saving_target
    
    
    # return saving_target_create(dbs, user, saving_target_in)