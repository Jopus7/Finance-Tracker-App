from app.expenses.models import Expense

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