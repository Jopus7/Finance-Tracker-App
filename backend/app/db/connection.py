from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.config import database_url

engine = create_engine(database_url())
session = sessionmaker(bind=engine)

def get_db():
    db = session()
    try:
        yield db
    finally:
        db.close()
