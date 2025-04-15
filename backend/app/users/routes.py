from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.auth.dependencies import authentication
from app.db.connection import db_session
from app.users.models import User
from app.users.repository import create_user, update_user_default_currency
from app.users.schemas import UserIn, UserOut, UpdateDefaultCurrency

user_router = APIRouter()


@user_router.post("/register", response_model=UserOut)
async def register_user(user_in: UserIn, dbs: Session = Depends(db_session)) -> User:
    db_user = dbs.query(User).filter(User.email == user_in.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="User with given email alredy exists")
    return create_user(dbs, user_in)


@user_router.get("/me", response_model=UserOut)
async def current_user(current_user: User = Depends(authentication)) -> User:
    return current_user


@user_router.patch("/default-currency", response_model=UserOut)
def update_default_currency(
    currency_update: UpdateDefaultCurrency,
    current_user: User = Depends(authentication),
    dbs: Session = Depends(db_session)
):
    return update_user_default_currency(dbs, current_user, currency_update.currency_update)
