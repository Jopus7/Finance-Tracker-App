from fastapi import APIRouter, HTTPException, Depends
from app.users.models import User
from app.db.connection import db_session
from app.users.schemas import UserOut, UserIn
from sqlalchemy.orm import Session
from app.users.repository import create_user

user_router = APIRouter()


@user_router.post("/register", response_model=UserOut)
async def register_user(user_in: UserIn, dbs: Session = Depends(db_session)):
    db_user = dbs.query(User).filter(User.email == user_in.email).first()
    if db_user:
        raise HTTPException(
            status_code=400, detail="User with given email alredy exists"
        )
    return create_user(dbs, user_in)


@user_router.get("")
async def get_users(dbs: Session = Depends(db_session)) -> list[UserOut]:
    users = dbs.query(User).all()
    return users
