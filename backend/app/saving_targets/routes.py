from app.saving_targets.schemas import SavingTargetIn, SavingTargetOut
from app.db.connection import db_session
from app.saving_targets.models import SavingTarget
from app.users.models import User
from app.auth.dependencies import authentication
from app.saving_targets.repository import saving_target_create, get_saving_targets
from fastapi import HTTPException, status


from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session


saving_target_router = APIRouter()

@saving_target_router.post("/", response_model=SavingTargetOut)
async def create_saving_target(
    saving_target_in: SavingTargetIn, dbs: Session = Depends(db_session), user: User = Depends(authentication)
    ) -> SavingTarget:
    return saving_target_create(saving_target_in, dbs, user)


@saving_target_router.get("/", response_model=list[SavingTargetOut])
async def saving_target_list(
    sort_by: str = "name",
    order: str = "asc",
    dbs: Session = Depends(db_session),
    user: User = Depends(authentication),
) -> list[SavingTarget]:
    return get_saving_targets(dbs, user, sort_by, order)   



@saving_target_router.delete("/{saving_target_id}", response_model=SavingTargetOut)
async def delete_saving_target(
    saving_target_id: int,
    dbs: Session = Depends(db_session),
    user: User = Depends(authentication)
)-> SavingTarget:
    saving_target = dbs.query(SavingTarget).filter(SavingTarget.id == saving_target_id).first()
    
    if not saving_target:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Record not found")
    
    if saving_target.user_id != user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="It's not your target")

    
    dbs.delete(saving_target)
    dbs.commit()
    
    return saving_target


# def detail_target + testy
# def edit_target + testy