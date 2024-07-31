from fastapi import APIRouter, HTTPException, Depends
from app.users.models import User
from app.db.connection import db_session 
from app.users.schemas import UserOut, UserCreate
from sqlalchemy.orm import Session

user_router = APIRouter()

@user_router.post("/register", response_model=UserOut )
async def register_user(
    user_in: UserCreate,
    dbs: Session = Depends(db_session)
    ):
    user = User(
        first_name=user_in.first_name,
        last_name=user_in.last_name,
        email=user_in.email,
        password=user_in.password
    )
    dbs.add(user)
    dbs.commit()
    return user

    
    
@user_router.get("")
async def get_users(dbs: Session = Depends(db_session)) -> list[UserOut]:
    users = dbs.query(User).all()
    return users