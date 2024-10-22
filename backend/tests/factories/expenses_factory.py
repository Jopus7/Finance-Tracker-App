import pytest
from collections import Counter
from app.expenses.models import Expense

@pytest.fixture
def expense_factory(session, user_factory):
    counter = Counter()
    
    def factory(
        name,
        description,
        amount,
        date,
        user=None,
    ):
        expense = Expense(
            name=name,
            description=description,
            user=user or user_factory(),
            amount=amount,
            date=date
            )
        session.add(expense)
        session.commit()
        counter[Expense.id] += 1
        return expense
    return factory
    
    