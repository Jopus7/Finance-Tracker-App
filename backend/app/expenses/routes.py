from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.auth.dependencies import authentication
from app.db.connection import db_session
from app.users.models import User
from app.expenses.models import Expense
from app.expenses.schemas import ExpenseIn, ExpenseOut
from app.expenses.repository import create_expense, get_expenses, get_expense_by_id
from app.api.validators import validate_record_exists

expense_router = APIRouter()


@expense_router.post("/", response_model=ExpenseOut)
async def expense_create(expense_in: ExpenseIn, dbs: Session = Depends(db_session), user: User = Depends(authentication)) -> Expense:
    return create_expense(dbs, user, expense_in)

@expense_router.get("/", response_model=list[ExpenseOut])
async def expense_list(dbs: Session = Depends(db_session), user: User = Depends(authentication)) -> list[Expense]:
   return get_expenses(dbs, user)

@expense_router.get("/{expense_id}", response_model=ExpenseOut)
async def expense_detail(expense_id: int, dbs: Session = Depends(db_session), user: User = Depends(authentication)) -> Expense:
    expense = get_expense_by_id(dbs, expense_id)
    
    validate_record_exists(expense)
    assert expense

    if expense.user_id != user.id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Expense does not belong to logged in user")
    
    return expense