import os
from functools import cache
from typing import Optional


@cache
def _environment_variable(variable_name: str, default: Optional[str] = None) -> str:
    variable_value = os.environ.get(variable_name, default)
    
    if not variable_value:
        raise Exception(f"Variable {variable_name} not found")
    
    return variable_value
