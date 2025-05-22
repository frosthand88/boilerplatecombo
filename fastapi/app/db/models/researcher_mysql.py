from sqlalchemy import Column, Integer, String, DateTime
from app.db.base import MySQLBase

class Researcher(MySQLBase):
    __tablename__ = "researcher"
    id = Column(Integer, primary_key=True, autoincrement=True)
    created_at = Column(DateTime)
    name = Column(String(255))
