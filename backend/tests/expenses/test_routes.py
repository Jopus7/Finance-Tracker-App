from app.expenses.models import Expense
from datetime import date

def test_create_expense(client, authenticated_user, session):
    response = client.post(
        "api/expenses",
        json={
            "name": "zakupy",
            "description": "Tesco",
            "amount": 80.0,
            "date": "2024-10-08"
            }
    )
    assert response.status_code == 200
    
    assert session.query(Expense).count() == 1
    expense = session.query(Expense).first()    

    assert response.json() == {
        "id": expense.id,
        "name": "zakupy",
        "user_id": authenticated_user.id,
        "description": "Tesco",
        "amount": 80.0,
        "date": "2024-10-08"
    }

def test_create_expense_when_user_unauthenticated(client):
    response = client.post(
        "api/expenses",
        json={
            "name": "zakupy",
            "description": "Tesco",
            "amount": 80.0,
            "date": "2024-10-08"
            }
    )
    assert response.status_code == 401

def test_expenses_list(client, authenticated_user, session, expense_factory):
    
    expense_factory(name="a", description="a", amount=1, user_id=authenticated_user.id, date=date(2024, 10, 10))
    
    response = client.get(
        "api/expenses",
        )
    
    breakpoint()
    
    assert response.status_code == 200