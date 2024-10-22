from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.auth.dependencies import authentication
from app.db.connection import db_session
from app.users.models import User
from app.expenses.models import Expense
from app.expenses.schemas import ExpenseIn, ExpenseOut
from app.expenses.repository import create_expense, get_expenses, get_expense_by_id, delete_expense
from app.api.validators import validate_record_exists, validate_ownership

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

    validate_ownership(expense.user_id, user.id)
    
    return expense


@expense_router.delete("/{expense_id}", response_model=ExpenseOut)
async def expense_delete(expense_id: int, dbs: Session = Depends(db_session), user: User = Depends(authentication)) -> Expense:
    expense = get_expense_by_id(dbs, expense_id)
    
    validate_record_exists(expense)
    assert expense
    validate_ownership(expense.user_id, user.id)
    
    delete_expense(dbs, expense_id)
    return
