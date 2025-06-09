from fastapi import APIRouter, Depends, Query
from app.db.database import REDIS_URL
import redis
import json

router = APIRouter(prefix="/redis")

@router.get("/researchers")
async def get_researchers(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
    filter: str = Query(None),
    sort_by: str = Query("researcher"),
    ascending: bool = Query(True)
):
    conn = redis.Redis.from_url(REDIS_URL)
    content = conn.hgetall("researcher:1")
    print(f"Content: {json.dumps({k.decode(): v.decode() for k, v in content.items()}, indent=2)}")
    return [], 0
