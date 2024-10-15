from app.db.connection import BaseModel
from fastapi import HTTPException, status
from typing import TypeVar

DbRecord = TypeVar("DbRecord", bound=BaseModel)

def validate_record_exists(record: DbRecord | None) -> None:
    if not record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Record not found")