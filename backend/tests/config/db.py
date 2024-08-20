import urllib.parse

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.api.routes import app
from app.config import database_host, database_name, database_port
from app.db.connection import db_session
from app.db.models import BaseModel
from app.secrets import database_password, database_user


def test_database_name() -> str:
    return database_name() + "_test"


def test_database_url() -> str:
    return "postgresql+pg8000://{user}:{password}@{host}:{port}/{database}".format(
        host=database_host(),
        port=database_port(),
        database=test_database_name(),
        user=database_user(),
        password=urllib.parse.quote(database_password()),
    )


@pytest.fixture(scope="session")
def engine():
    engine = create_engine(test_database_url(), isolation_level="AUTOCOMMIT")
    BaseModel.metadata.create_all(bind=engine)
    yield engine
    BaseModel.metadata.drop_all(bind=engine)
    engine.dispose()


@pytest.fixture()
def session(engine):
    connection = engine.connect()
    transaction = connection.begin()

    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=connection)
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()
        transaction.rollback()
        connection.close()


@pytest.fixture()
def client(session):
    def override_get_db():
        yield session

    app.dependency_overrides[db_session] = override_get_db

    with TestClient(app) as test_client:
        yield test_client
