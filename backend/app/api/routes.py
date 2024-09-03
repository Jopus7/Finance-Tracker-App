from fastapi import APIRouter, FastAPI

from app.users.routes import user_router
from app.auth.routes import auth_router

app = FastAPI()

api_router = APIRouter()
app.include_router(api_router, prefix="/api")

api_router.include_router(user_router, prefix="/users")
api_router.include_router(auth_router, prefix="/auth")
