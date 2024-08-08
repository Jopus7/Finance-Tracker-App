from passlib.context import CryptContext
from sqlalchemy.orm import Session

from app.users.models import User
from app.users.schemas import UserIn

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def create_user(dbs: Session, user_in: UserIn) -> User:
    hashed_password = pwd_context.hash(user_in.password)
    user_data = user_in.dict()
    user_data["password"] = hashed_password
    user = User(**user_data)
    dbs.add(user)
    dbs.commit()
    return user
