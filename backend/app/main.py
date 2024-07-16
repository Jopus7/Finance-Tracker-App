from fastapi import FastAPI, APIRouter
from app.users.routes import user_router

app = FastAPI()

# api_router = APIRouter()
# api_router.include_router(user_router, prefix="/users")

# app.include_router(api_router, prefix="/api")


@app.get("/asd")
async def root() -> dict[str, str]:
    return {"message": "Hello   World"}



from fastapi import APIRouter, HTTPException, Depends
from app.users.models import User
from app.db.connection import db_session 
from app.users.schemas import UserOut, UserCreate
from sqlalchemy.orm import Session

user_router = APIRouter(prefix="/users")

@app.post("/users/", response_model=UserOut )
async def register_user(
    user_in: UserCreate,
    dbs: Session = Depends(db_session)
    ):
    # if user.id in db: 
    #     raise HTTPException(status_code=400, detail="already registered")
    
    user = User(**(user_in.dict()))
    dbs.add(user)
    dbs.commit()
