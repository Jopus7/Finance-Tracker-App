from typing import TypeVar

from fastapi import HTTPException, status

from app.db.connection import BaseModel

DbRecord = TypeVar("DbRecord", bound=BaseModel)


def validate_record_exists(record: DbRecord | None) -> None:
    if not record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Record not found")


def validate_ownership(record_owner_id: int, logged_in_user_id: int) -> None:
    if record_owner_id != logged_in_user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Record does not belong to logged in user")
