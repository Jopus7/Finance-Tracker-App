"""add expense model

Revision ID: 52432da05293
Revises: 2c82ea6da391
Create Date: 2024-10-01 17:07:00.594180

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '52432da05293'
down_revision: Union[str, None] = '2c82ea6da391'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table('expenses',
    sa.Column('id', sa.BigInteger(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('user_id', sa.BigInteger(), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.Column('amount', sa.Float(), nullable=False),
    sa.Column('date', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_expenses_user_id'), 'expenses', ['user_id'], unique=False)


def downgrade() -> None:
    op.drop_index(op.f('ix_expenses_user_id'), table_name='expenses')
    op.drop_table('expenses')
