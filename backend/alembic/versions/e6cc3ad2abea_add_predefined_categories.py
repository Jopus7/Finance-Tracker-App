"""add predefined categories

Revision ID: e6cc3ad2abea
Revises: db080d7760ee
Create Date: 2024-11-12 18:14:25.615485

"""

from typing import Sequence, Union

import sqlalchemy as sa

from alembic import op

# revision identifiers, used by Alembic.
revision: str = "e6cc3ad2abea"
down_revision: Union[str, None] = "db080d7760ee"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

predefined_categories = [
    {"name": "Groceries", "user_id": None},
    {"name": "Bills", "user_id": None},
    {"name": "Travel", "user_id": None},
    {"name": "Entertainment", "user_id": None},
    {"name": "Healthcare", "user_id": None},
    {"name": "Education", "user_id": None},
    {"name": "Shopping", "user_id": None},
]


def upgrade() -> None:
    op.bulk_insert(
        sa.table(
            "categories",
            sa.column("name", sa.String),
            sa.column("user_id", sa.BigInteger),
        ),
        predefined_categories,
    )


def downgrade() -> None:
    op.execute(
        "DELETE FROM categories WHERE name IN ('Groceries', 'Bills', 'Travel', 'Entertainment', 'Healthcare', 'Education', 'Shopping' )"
    )
