from sqlalchemy import Column, Integer, String, DateTime
from app.db.base import PostgresBase

class Researcher(PostgresBase):
    __tablename__ = "researcher"
    id = Column(Integer, primary_key=True)
    created_at = Column(DateTime)
    name = Column(String)
    age = Column(Integer)
