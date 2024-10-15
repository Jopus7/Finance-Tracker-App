import pytest
from app.api.routes import app
from app.auth.dependencies import authentication
from app.db.connection import db_session
from fastapi.testclient import TestClient

@pytest.fixture
def client(session):
    def override_get_db():
        yield session

    app.dependency_overrides[db_session] = override_get_db

    with TestClient(app) as test_client:
        yield test_client



@pytest.fixture
def authenticated_user(user_factory):
    test_user = user_factory(first_name="Chris")
    
    app.dependency_overrides[authentication] = lambda: test_user
    
    yield test_user
    
    app.dependency_overrides = {}
