from fastapi import FastAPI, Depends, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, func, asc, desc
from sqlalchemy.orm import sessionmaker, Session
from typing import List, Optional
from models import Researcher, Base  # Assuming your model is in models.py

DATABASE_URL = "postgresql://frosthand_postgres_username:frosthand_postgres_password@host.docker.internal:5432/frosthand_postgres_db"  # Replace with your real DB URL

engine = create_engine(DATABASE_URL, connect_args={})
SessionLocal = sessionmaker(bind=engine)

Base.metadata.create_all(bind=engine)

app = FastAPI()
# Allow all origins, methods, and headers
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_sort_column(sort_by: str):
    mapping = {
        "name": Researcher.name,
        "age": Researcher.age,
        "created_at": Researcher.created_at,
    }
    return mapping.get(sort_by.lower(), Researcher.id)

@app.get("/postgres/researcher")
def get_researchers(
    page: int = 1,
    pageSize: int = 10,
    sortBy: str = "id",
    ascending: bool = True,
    filter: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(Researcher)

    # Filtering
    if filter:
        query = query.filter(Researcher.name.ilike(f"%{filter}%"))

    # Count before pagination
    total_count = query.order_by(None).count()

    # Sorting
    sort_column = get_sort_column(sortBy)
    query = query.order_by(asc(sort_column) if ascending else desc(sort_column))

    # Pagination
    researchers = query.offset((page - 1) * pageSize).limit(pageSize).all()

    return {
        "data": [r.__dict__ for r in researchers],
        "totalCount": total_count
    }

