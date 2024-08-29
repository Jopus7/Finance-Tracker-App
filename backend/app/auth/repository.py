from sqlalchemy.orm import Session
from app.auth.helpers import get_password_hash, verify_password
from app.users.models import User


def authenticate_user(db: Session, email: str, password: str) -> User:
    user = db.query(User).filter(User.email==email).first()
    if not user:
        return None
    if not verify_password(password, user.password):
        return None
    return user