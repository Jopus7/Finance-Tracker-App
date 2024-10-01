from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.auth.dependencies import authentication
from app.db.connection import db_session
from app.users.models import User
from app.expenses.models import Expense
from app.expenses.schemas import ExpenseIn, ExpenseOut
from app.expenses.repository import expense_create

expense_router = APIRouter()


@expense_router.post("/", response_model=ExpenseOut)
async def create_expense(expense_in: ExpenseIn, dbs: Session = Depends(db_session), user: User = Depends(authentication)) -> Expense:
    return expense_create(dbs, user, expense_in)
