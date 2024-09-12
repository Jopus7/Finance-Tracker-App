from fastapi import APIRouter, FastAPI

from app.auth.routes import auth_router
from app.users.routes import user_router

app = FastAPI()

api_router = APIRouter()
api_router.include_router(user_router, prefix="/users")
api_router.include_router(auth_router, prefix="/auth")

app.include_router(api_router, prefix="/api")
