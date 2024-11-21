from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.categories.schemas import CategoryOut
from app.db.connection import db_session
from app.auth.dependencies import authentication
from app.users.models import User
from app.categories.repository import get_user_categories

from app.categories.models import Category

category_router = APIRouter()

@category_router.get("/", response_model=list[CategoryOut])
async def category_list(current_user: User = Depends(authentication), dbs: Session = Depends(db_session)) -> list[Category]:
    return get_user_categories(dbs, current_user)