from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Researcher(Base):
    __tablename__ = 'researcher'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    age = Column(Integer)
    created_at = Column(DateTime)