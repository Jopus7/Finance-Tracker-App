from sqlalchemy.orm import Session
from app.users.models import User
from app.categories.models import Category


def get_user_categories(dbs: Session, current_user: User) -> list[Category]:
    return dbs.query(Category).filter((Category.user_id == None) | (Category.user_id == current_user.id)).all()