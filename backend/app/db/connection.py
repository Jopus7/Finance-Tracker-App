from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.config import database_url
from sqlalchemy.orm import DeclarativeBase

engine = create_engine(database_url())
session = sessionmaker(bind=engine)


class BaseModel(DeclarativeBase):
    def __repr__(self) -> str:
        return str(self)


def get_db():
    db = session()
    try:
        yield db
    finally:
        db.close()


