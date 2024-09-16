from sqlalchemy.orm import Session

from app.users.models import User


def get_user(dbs: Session, email: str) -> User | None:
    return dbs.query(User).filter(User.email == email).first()
