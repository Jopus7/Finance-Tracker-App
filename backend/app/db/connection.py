from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app import config, secrets
from sqlalchemy.orm import DeclarativeBase
import urllib.parse


def database_url() -> str:
    return "postgresql+pg8000://{user}:{password}@{host}:{port}/{database}".format(
        host=config.database_host(),
        port=config.database_port(),
        database=config.database_name(),
        user=secrets.database_user(),
        password=urllib.parse.quote(secrets.database_password()),
    )


engine = create_engine(database_url())
_session = sessionmaker(bind=engine)


class BaseModel(DeclarativeBase):
    def __repr__(self) -> str:
        return str(self)


def db_session():
    db = _session()
    try:
        yield db
        db.commit()
    finally:
        db.close()
