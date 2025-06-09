from fastapi import APIRouter, Depends, Query
from app.db.models.researcher2 import Researcher2
from dotenv import load_dotenv
import os
import duckdb

load_dotenv()
DUCK_URL = os.getenv("DUCK_URL")

router = APIRouter(prefix="/duck")

@router.get("/researchers")
async def get_researchers(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
    filter: str = Query(None),
    sort_by: str = Query("researcher"),
    ascending: bool = Query(True)
):
    conn = duckdb.connect(DUCK_URL)
    offset = (page - 1) * page_size
    order = 'ASC' if ascending else 'DESC'
    query = f"SELECT * FROM research_activity ORDER BY {sort_by} {order} LIMIT {page_size} OFFSET {offset}"
    if filter:
        query = f"SELECT * FROM research_activity WHERE name LIKE '%{filter}%' ORDER BY {sort_by} {order} LIMIT {page_size} OFFSET {offset}"

    result = conn.execute(query).fetchall()
    researchers = [Researcher2(researcher=row[0], paper=row[1], topic=row[2]) for row in result]

    total_count = conn.execute("SELECT COUNT(*) FROM research_activity").fetchone()[0]
    return researchers, total_count
