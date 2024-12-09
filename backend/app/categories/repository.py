from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.categories.models import Category
from app.users.models import User


def get_user_categories(dbs: Session, current_user: User) -> list[Category]:
    return dbs.query(Category).filter(or_(Category.user_id == None, Category.user_id == current_user.id)).all()  # noqa: E711
