from sqlalchemy.orm import Session
from app.users.schemas import UserIn
from app.users.models import User


def create_user(dbs: Session, user_in: UserIn) -> User:
    user = User(**(user_in.dict()))
    dbs.add(user)
    dbs.commit()
    return user
