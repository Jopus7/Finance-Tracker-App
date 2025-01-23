from datetime import date

from fastapi import status

from app.expenses.models import Expense


def test_create_expense(client, authenticated_user, session, category_factory):
    category = category_factory(name="Food")

    response = client.post(
        "api/expenses",
        json={
            "name": "zakupy",
            "description": "Tesco",
            "amount": 80.0,
            "date": "2024-10-08",
            "category_id": category.id,
        },
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
        "date": "2024-10-08",
        "category_id": category.id,
    }


def test_create_expense_when_user_unauthenticated(client, category_factory):
    category = category_factory(name="Food")
    response = client.post(
        "api/expenses",
        json={
            "name": "zakupy",
            "description": "Tesco",
            "amount": 80.0,
            "date": "2024-10-08",
            "category_id": category.id,
        },
    )
    assert response.status_code == 401


def test_expenses_list(client, authenticated_user, expense_factory, category_factory):
    category = category_factory(name="Food")

    expense_1 = expense_factory(
        name="Zakupy",
        description="Masło",
        amount=5.99,
        user=authenticated_user,
        date=date(2024, 10, 10),
        category=category,
    )

    expense_2 = expense_factory(
        name="Zakupy",
        description="Jajka",
        amount=4.99,
        user=authenticated_user,
        date=date(2024, 10, 10),
        category=category,
    )
    expense_factory(name="Zakupy", description="Sałata", amount=5.99, date=date(2024, 10, 10), category=category)
    response = client.get(
        "api/expenses",
    )

    assert response.status_code == 200

    assert response.json() == [
        {
            "id": expense_1.id,
            "name": expense_1.name,
            "user_id": authenticated_user.id,
            "description": expense_1.description,
            "amount": 5.99,
            "date": "2024-10-10",
            "category_id": category.id,
        },
        {
            "id": expense_2.id,
            "name": expense_2.name,
            "user_id": authenticated_user.id,
            "description": expense_2.description,
            "amount": 4.99,
            "date": "2024-10-10",
            "category_id": category.id,
        },
    ]


def test_expenses_list_filter_by_category(client, authenticated_user, expense_factory, category_factory):
    food_category = category_factory(name="Food")
    bills_category = category_factory(name="Bills")

    expense_factory(
        name="Zakupy",
        description="Masło",
        amount=5.99,
        user=authenticated_user,
        date=date(2024, 10, 10),
        category=food_category,
    )

    expense_2 = expense_factory(
        name="Netflix",
        description="Subscription",
        amount=4.99,
        user=authenticated_user,
        date=date(2024, 10, 10),
        category=bills_category,
    )

    expense_3 = expense_factory(
        name="Warm water",
        description="Invoice",
        amount=28.99,
        user=authenticated_user,
        date=date(2024, 10, 10),
        category=bills_category,
    )

    response = client.get("api/expenses", params={"category_id": bills_category.id})

    assert response.status_code == 200

    assert response.json() == [
        {
            "id": expense_2.id,
            "name": "Netflix",
            "user_id": authenticated_user.id,
            "description": "Subscription",
            "amount": 4.99,
            "date": "2024-10-10",
            "category_id": bills_category.id,
        },
        {
            "id": expense_3.id,
            "name": "Warm water",
            "user_id": authenticated_user.id,
            "description": "Invoice",
            "amount": 28.99,
            "date": "2024-10-10",
            "category_id": bills_category.id,
        },
    ]


def test_expense_detail(client, authenticated_user, expense_factory, category_factory):
    category = category_factory(name="Food")
    expense = expense_factory(
        name="Car fix",
        description="tire change",
        amount=200.59,
        user=authenticated_user,
        date=date(2024, 10, 10),
        category=category,
    )

    response = client.get(
        f"/api/expenses/{expense.id}",
    )
    assert response.status_code == 200
    assert response.json() == {
        "id": expense.id,
        "name": "Car fix",
        "user_id": authenticated_user.id,
        "description": "tire change",
        "amount": 200.59,
        "date": "2024-10-10",
        "category_id": category.id,
    }


def test_expense_detail_when_record_not_found(client, authenticated_user, session):
    assert session.query(Expense).count() == 0
    response = client.get(
        "/api/expenses/1",
    )
    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.json() == {"detail": "Record not found"}


def test_expense_detail_when_unauthenticated_user(client):
    response = client.get("/api/expenses/1")
    assert response.status_code == status.HTTP_401_UNAUTHORIZED
    assert response.json() == {"detail": "Not authenticated"}


def test_expense_detail_when_expense_does_not_belong_to_user(client, authenticated_user, expense_factory):
    expense = expense_factory(name="Rent", description="bills", amount=799, date=date(2024, 10, 10))
    response = client.get(f"/api/expenses/{expense.id}")
    assert response.status_code == status.HTTP_403_FORBIDDEN
    assert response.json() == {"detail": "Record does not belong to logged in user"}


def test_expense_delete(client, session, authenticated_user, expense_factory):
    expense = expense_factory(
        name="Shopping", description="Dinner", user=authenticated_user, amount=100, date=date(2024, 10, 22)
    )

    response = client.delete(f"/api/expenses/{expense.id}")

    assert response.status_code == 200
    assert response.json() == {
        "id": expense.id,
        "name": "Shopping",
        "description": "Dinner",
        "user_id": authenticated_user.id,
        "amount": 100.00,
        "date": "2024-10-22",
        "category_id": None,
    }
    assert session.query(Expense).count() == 0
