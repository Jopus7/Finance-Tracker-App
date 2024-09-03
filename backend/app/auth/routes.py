from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.users.models import User
from datetime import datetime, timedelta, timezone
from fastapi import Depends, HTTPException, status, APIRouter
from app.users.schemas import UserOut
from app.db.connection import db_session


SECRET_KEY = "f119c895a25a17eeb94c2cea964619859ee52c7ab856e34a16c7bba95326b054"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


class Token(BaseModel):
    access_token: str
    token_type: str
    
    
class TokenData(BaseModel):
    email: str | None = None
    
class OAuth2EmailRequestForm(BaseModel):
    email: str
    password: str
    
    
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/token")


auth_router = APIRouter()


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def get_user(dbs: Session, email: str) -> User:
    return dbs.query(User).filter(User.email==email).first()


def authenticate_user(dbs: Session, email: str, password: str) -> User:
    user = get_user(dbs, email)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt



async def get_current_user(dbs: Session = Depends(db_session), token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email)
    except JWTError:
        raise credentials_exception
    user = get_user(dbs, email=token_data.email)
    if user is None:
        raise credentials_exception
    return user



@auth_router.post("/token")
async def login_for_access_token(
    dbs: Session = Depends(db_session),
    form_data: OAuth2EmailRequestForm = Depends(),
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



@auth_router.get("/users/me/", response_model=UserOut)
async def read_users_me(
    current_user: User = Depends(get_current_user),
):
    return current_user
