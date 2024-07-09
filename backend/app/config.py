import os
from functools import cache
from typing import Optional


@cache
def _environment_variable(variable_name: str, default: Optional[str] = None) -> str:
    variable_value = os.environ.get(variable_name, default)

    if not variable_value:
        raise Exception(f"Variable {variable_name} not found")

    return variable_value


# Database
def database_host() -> str:
    return _environment_variable("DATABASE_HOST")


def database_port() -> str:
    return _environment_variable("DATABASE_PORT")


def database_name() -> str:
    return _environment_variable("DATABASE_NAME")
