import pytest
from collections import Counter
from app.expenses.models import Expense

@pytest.fixture
def expense_factory(session):
    counter = Counter()
    
    def factory(
        name,
        description,
        user_id,
        amount,
        date
    ):
        expense = Expense(
            name=name,
            description=description,
            user_id=user_id,
            amount=amount,
            date=date
            )
        session.add(expense)
        session.commit()
        counter[Expense.id] += 1
        return expense
    return factory
    
    