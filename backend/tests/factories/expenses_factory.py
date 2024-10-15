import pytest
from collections import Counter
from app.expenses.models import Expense

@pytest.fixture
def expense_factory(session, user_factory):
    counter = Counter()
    user = user_factory()
    
    def factory(
        name,
        description,
        amount,
        date,
        user_id=None,
    ):
        expense = Expense(
            name=name,
            description=description,
            user_id=user_id or user.id,
            amount=amount,
            date=date
            )
        session.add(expense)
        session.commit()
        counter[Expense.id] += 1
        return expense
    return factory
    
    