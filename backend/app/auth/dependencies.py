from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from app.auth.constants import SECRET_KEY
from app.auth.repository import get_user
from app.auth.schemas import TokenData
from app.db.connection import db_session
from app.users.models import User

ALGORITHM = "HS256"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/token")


async def authentication(dbs: Session = Depends(db_session), token: str = Depends(oauth2_scheme)) -> User | None:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email)
    except JWTError:
        raise credentials_exception
    assert token_data.email
    user = get_user(dbs, email=token_data.email)
    if user is None:
        raise credentials_exception
    return user
