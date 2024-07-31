from fastapi import FastAPI, APIRouter
from app.users.routes import user_router

app = FastAPI()

api_router = APIRouter()
api_router.include_router(user_router, prefix="/users")

app.include_router(api_router, prefix="/api")
