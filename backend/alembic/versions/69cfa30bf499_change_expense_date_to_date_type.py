"""change expense date to date type

Revision ID: 69cfa30bf499
Revises: 52432da05293
Create Date: 2024-10-08 17:42:16.706935

"""

from typing import Sequence, Union

import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

from alembic import op

# revision identifiers, used by Alembic.
revision: str = "69cfa30bf499"
down_revision: Union[str, None] = "52432da05293"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.alter_column("expenses", "date", existing_type=postgresql.TIMESTAMP(), type_=sa.Date(), existing_nullable=False)


def downgrade() -> None:
    op.alter_column("expenses", "date", existing_type=sa.Date(), type_=postgresql.TIMESTAMP(), existing_nullable=False)
