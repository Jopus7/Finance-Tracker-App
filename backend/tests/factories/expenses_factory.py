from collections import Counter

import pytest

from app.expenses.models import Expense


@pytest.fixture
def expense_factory(session, user_factory):
    counter = Counter()

    def factory(name, description, amount, date, user=None, category=None):
        category_id = category.id if category else None
        expense = Expense(
            name=name,
            description=description,
            user=user or user_factory(),
            amount=amount,
            date=date,
            category_id=category_id,
        )
        session.add(expense)
        session.commit()
        counter[Expense.id] += 1
        return expense

    return factory
