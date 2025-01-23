from typing import Any, Optional

from sqlalchemy import asc, desc
from sqlalchemy.orm import Session

from app.expenses.models import Expense
from app.expenses.schemas import ExpenseIn
from app.users.models import User


def create_expense(dbs: Session, user: User, expense_in: ExpenseIn) -> Expense:
    expense_data = expense_in.model_dump()
    expense = Expense(**expense_data, user=user)
    dbs.add(expense)
    dbs.commit()
    return expense


def get_expenses(
    dbs: Session, user: User, sort_by: str = "date", order: str = "desc", category_id: Optional[int] = None
) -> list[Any]:
    sort_column = getattr(Expense, sort_by)
    order_by = asc(sort_column) if order == "asc" else desc(sort_column)  # type: ignore

    expenses_query = dbs.query(Expense).outerjoin(Expense.category).filter(Expense.user_id == user.id)

    if category_id is not None:
        expenses_query = expenses_query.filter(Expense.category_id == category_id)

    return expenses_query.order_by(order_by).all()


def get_expense_by_id(dbs: Session, expense_id: int) -> Optional[Expense]:
    return dbs.query(Expense).filter(Expense.id == expense_id).first()


def delete_expense(dbs: Session, expense: Expense) -> None:
    dbs.delete(expense)
    dbs.commit()
