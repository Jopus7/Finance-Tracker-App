from datetime import datetime
from db.connection import BaseModel
from sqlalchemy import BigInteger, String, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func


class User(BaseModel):
    __tablename__  = 'users'
    
    id: Mapped[int] = mapped_column(BigInteger, primary_key=True)
    email: Mapped[str] = mapped_column(String, unique=True)
    first_name: Mapped[str] = mapped_column(String)
    last_name: Mapped[str] = mapped_column(String)
    password: Mapped[str] = mapped_column(String)
    created_at:Mapped[datetime] = mapped_column(DateTime, server_default=func.now())