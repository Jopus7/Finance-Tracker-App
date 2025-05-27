"""saving_target_model

Revision ID: 6ad86672fd66
Revises: 5037b6491c5e
Create Date: 2025-05-27 17:49:16.269757

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = '6ad86672fd66'
down_revision: Union[str, None] = '5037b6491c5e'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table('saving_targets',
    sa.Column('id', sa.BigInteger(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('target_amount', sa.Float(), nullable=False),
    sa.Column('current_amount', sa.Float(), nullable=False),
    sa.Column('user_id', sa.BigInteger(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_saving_targets_user_id'), 'saving_targets', ['user_id'], unique=False)


def downgrade() -> None:
    op.drop_index(op.f('ix_saving_targets_user_id'), table_name='saving_targets')
    op.drop_table('saving_targets')
