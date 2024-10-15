import pytest
from faker import Faker
from app.users.models import User
from collections import Counter
from datetime import datetime, timezone


fake = Faker()

@pytest.fixture
def user_factory(session):
    counter = Counter()

    def factory(
        first_name=None,
        last_name=None,
        email=None,
        password=None,
        created_at=None,
    ):
        user = User(
            email=email or f"user{counter[User.id]}@test.com",
            first_name=first_name or fake.first_name(),
            last_name=last_name or fake.last_name(),
            password=password or "password",
            created_at=created_at or datetime.now(timezone.utc)
        )
        session.add(user)
        session.commit()
        counter[User.id] += 1
        return user

    return factory
