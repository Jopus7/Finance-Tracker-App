from passlib.context import CryptContext
from sqlalchemy.orm import Session

from app.users.models import User
from app.users.schemas import UserIn

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def create_user(dbs: Session, user_in: UserIn) -> User:
    hashed_password = pwd_context.hash(user_in.password)
    user_data = user_in.model_dump()
    user_data["password"] = hashed_password
    user = User(**user_data)
    dbs.add(user)
    dbs.commit()
    return user


def update_user_info(dbs: Session, current_user: User, user_in: UserIn) -> User:
    current_user.first_name = user_in.first_name
    current_user.last_name = user_in.last_name
    current_user.email = user_in.email
    dbs.commit()
    return current_user