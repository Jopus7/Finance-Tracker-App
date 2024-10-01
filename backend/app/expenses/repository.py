from sqlalchemy.orm import Session
from app.expenses.schemas import ExpenseIn
from app.expenses.models import Expense
from app.users.models import User

def expense_create(dbs: Session, user: User, expense_in: ExpenseIn) -> Expense:
    expense_data = expense_in.model_dump()
    expense = Expense(**expense_data, user=user)
    dbs.add(expense)
    dbs.commit()
    return expense