from sqlalchemy import Column, Integer, String, DateTime
from app.db.base import MSSQLBase

class Researcher(MSSQLBase):
    __tablename__ = "researcher"
    id = Column(Integer, primary_key=True, autoincrement=True)
    created_at = Column(DateTime)
    name = Column(String(255))
