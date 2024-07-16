from fastapi import APIRouter, HTTPException, Depends
from app.users.models import User
from app.db.connection import db_session 
from app.users.schemas import UserOut, UserCreate
from sqlalchemy.orm import Session

user_router = APIRouter(prefix="/users")

@user_router.post("/register", response_model=UserOut )
async def register_user(
    user_in: UserCreate,
    dbs: Session = Depends(db_session)
    ):
    # if user.id in db: 
    #     raise HTTPException(status_code=400, detail="already registered")
    
    user = User(**(user_in.dict()))
    dbs.add(user)
    dbs.commit()

    # user_id = len(users_db) + 1 #jakoś połączyć z bazą danych aby automatycznie dodawało id +1
    # user_data = {
    #     "id": user_id,
    #     "first_name": user.first_name,
    #     "last_name": user.last_name,
    #     "email": user.email,
    #     "password": user.password
    # }
    # users_db[user.first_name] = user_data
    # return user_data
    
    
    
@user_router.get("")
async def root() -> dict[str, str]:
    return {"message": "users"}