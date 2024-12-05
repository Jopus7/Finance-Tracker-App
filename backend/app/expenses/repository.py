from typing import Any, Optional

from sqlalchemy.orm import Session

from app.categories.models import Category
from app.expenses.models import Expense
from app.expenses.schemas import ExpenseIn
from app.users.models import User


def create_expense(dbs: Session, user: User, expense_in: ExpenseIn) -> Expense:
    expense_data = expense_in.model_dump()
    expense = Expense(**expense_data, user=user)
    dbs.add(expense)
    dbs.commit()
    return expense


def get_expenses(dbs: Session, user: User) -> list[Any]:
    expenses = (
        dbs.query(
            Expense.id,
            Expense.name,
            Expense.user_id,
            Expense.description,
            Expense.amount,
            Expense.date,
            Category.name.label("category_name"),
        )
        .join(Expense.category)
        .filter(Expense.user_id == user.id)
        .all()
    )

    return expenses


def get_expense_by_id(dbs: Session, expense_id: int) -> Optional[Expense]:
    return dbs.query(Expense).filter(Expense.id == expense_id).first()


def delete_expense(dbs: Session, expense: Expense) -> None:
    dbs.delete(expense)
    dbs.commit()
