from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.auth.dependencies import authentication
from app.db.connection import db_session
from app.users.models import User
from app.expenses.models import Expense
from app.expenses.schemas import ExpenseIn, ExpenseOut
from app.expenses.repository import create_expense, get_expenses

expense_router = APIRouter()


@expense_router.post("/", response_model=ExpenseOut)
async def expense_create(expense_in: ExpenseIn, dbs: Session = Depends(db_session), user: User = Depends(authentication)) -> Expense:
    return create_expense(dbs, user, expense_in)

@expense_router.get("/", response_model=list[ExpenseOut])
async def expense_list(dbs: Session = Depends(db_session), user: User = Depends(authentication)) -> list[Expense]:
   return get_expenses(dbs, user)