import pytest
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

from app.config import database_host, database_name, database_port
from app.db.models import BaseModel
from app.secrets import database_password, database_user


def test_database_name() -> str:
    return database_name() + "_test"


@pytest.fixture(scope="session")
def create_test_database():
    engine = create_engine(
        "postgresql+pg8000://{user}:{password}@{host}:{port}".format(
            user=database_user(),
            password=database_password(),
            host=database_host(),
            port=database_port(),
        ),
        isolation_level="AUTOCOMMIT",
    )
    with engine.connect() as connection:
        connection.execute(text("DROP DATABASE IF EXISTS {db_name}".format(db_name=test_database_name())))
        connection.execute(text("CREATE DATABASE {db_name}".format(db_name=test_database_name())))
    engine.dispose()


@pytest.fixture(scope="session")
def database_engine(create_test_database):
    return create_engine(
        "postgresql+pg8000://{user}:{password}@{host}:{port}/{database}".format(
            user="postgres",
            password="password",
            host=database_host(),
            port=database_port(),
            database=test_database_name(),
        )
    )


@pytest.fixture(scope="session")
def connection(database_engine):
    with database_engine.connect() as connection:
        with connection.begin():
            BaseModel.metadata.create_all(bind=database_engine)
        yield connection
    connection.close()


@pytest.fixture
def session(connection):
    transaction = connection.begin()

    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=connection)
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()
        transaction.rollback()
