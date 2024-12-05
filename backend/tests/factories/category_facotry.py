from collections import Counter

import pytest

from app.categories.models import Category


@pytest.fixture
def category_factory(session):
    counter = Counter()

    def factory(
        name,
        user=None,
    ):
        category = Category(name=name, user=user)
        session.add(category)
        session.commit()
        counter[Category.id] += 1
        return category

    return factory
