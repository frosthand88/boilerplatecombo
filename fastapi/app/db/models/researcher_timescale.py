from sqlalchemy import Column, Integer, String, DateTime
from app.db.base import TimescaleBase

class Researcher(TimescaleBase):
    __tablename__ = "research_activity"
    id = Column(Integer, primary_key=True)
    time = Column(DateTime)
    researcher = Column(String)
    paper = Column(String)
    topic = Column(String)
    conference = Column(String)
    organization = Column(String)
    citations = Column(Integer)
