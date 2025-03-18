"""add_currency_to_expenses

Revision ID: 5037b6491c5e
Revises: eb186c7f688d
Create Date: 2025-03-13 18:05:07.255311

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '5037b6491c5e'
down_revision: Union[str, None] = 'eb186c7f688d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('expenses', sa.Column('currency', sa.String(), nullable=False))


def downgrade() -> None:
    op.drop_column('expenses', 'currency')

