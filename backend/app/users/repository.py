from passlib.context import CryptContext
from sqlalchemy.orm import Session
from app.auth.helpers import get_password_hash
from app.users.models import User
from app.users.schemas import UserIn

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def create_user(dbs: Session, user_in: UserIn) -> User:
    user_data = user_in.model_dump()
    user_data["password"] = get_password_hash(user_in.password)
    user = User(**user_data)
    dbs.add(user)
    dbs.commit()
    return user
