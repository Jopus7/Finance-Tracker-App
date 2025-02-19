"""add default currency

Revision ID: eb186c7f688d
Revises: e6cc3ad2abea
Create Date: 2025-02-05 17:19:25.260555

"""

from typing import Sequence, Union

import sqlalchemy as sa

from alembic import op

# revision identifiers, used by Alembic.
revision: str = "eb186c7f688d"
down_revision: Union[str, None] = "e6cc3ad2abea"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column("users", sa.Column("default_currency", sa.String(), nullable=False))


def downgrade() -> None:
    op.drop_column("users", "default_currency")
