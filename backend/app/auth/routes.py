from fastapi import Depends, HTTPException, status, APIRouter
from app.auth.schemas import OAuth2EmailRequestForm, Token
from datetime import timedelta
from app.auth.helpers import authenticate_user, create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES
from sqlalchemy.orm import Session
from app.db.connection import db_session



auth_router = APIRouter()


@auth_router.post("/token")
async def login_for_access_token(
    form_data: OAuth2EmailRequestForm,
    dbs: Session = Depends(db_session)
) -> Token:
    user = authenticate_user(dbs, form_data.email, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")
