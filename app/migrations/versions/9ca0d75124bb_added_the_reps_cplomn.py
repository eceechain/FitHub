"""Added the reps cplomn

Revision ID: 9ca0d75124bb
Revises: c8cc734bbb52
Create Date: 2024-02-21 17:45:44.014935

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9ca0d75124bb'
down_revision = 'c8cc734bbb52'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('workout_log', schema=None) as batch_op:
        batch_op.add_column(sa.Column('reps', sa.Integer(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('workout_log', schema=None) as batch_op:
        batch_op.drop_column('reps')

    # ### end Alembic commands ###
