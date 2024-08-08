from fastapi.testclient import TestClient
from app.api.routes import app


from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from app import config, secrets
from app.db.models import BaseModel
from app.db.connection import db_session
import urllib.parse


def test_database_name() -> str:
    return config.database_name() + "_test"


def test_database_url() -> str:
    return "postgresql+pg8000://{user}:{password}@{host}:{port}/{database}".format(
        host=config.database_host(),
        port=config.database_port(),
        database=test_database_name(),
        user=secrets.database_user(),
        password=urllib.parse.quote(secrets.database_password()),
    )
    
def create_test_database():
    engine = create_engine(
        test_database_url(),
        isolation_level="AUTOCOMMIT",
    )
    
    with engine.connect() as connection:
        connection.execute(text("DROP DATABASE IF EXISTS {db_name}".format(db_name=test_database_name())))
        connection.execute(text("CREATE DATABASE {db_name}".format(db_name=test_database_name())))
        
    test_engine = create_engine(test_database_url())
    return test_engine

engine = create_test_database()

TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


BaseModel.metadata.create_all(bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()


app.dependency_overrides[db_session] = override_get_db


client = TestClient(app)


def test_register_user():
    response = client.post("api/users/register", json={"first_name": "John", "last_name": "Smith", "email": "johnsmith@gmail.com", "password": "password"})
    
    assert response.status_code == 201