from fastapi import APIRouter, Depends, Query
from app.db.database import MONGO_URL
from app.db.models.researcher2 import Researcher2
from motor.motor_asyncio import AsyncIOMotorClient

router = APIRouter(prefix="/mongo")

@router.get("/researchers")
async def get_researchers(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
    filter: str = Query(None),
    sort_by: str = Query("researcher"),
    ascending: bool = Query(True)
):
    client = AsyncIOMotorClient(MONGO_URL)
    db = client["bench"]
    col = db["researchers"]

    skip = (page - 1) * page_size
    sort_dir = 1 if ascending else -1

    query = {}
    if filter:
        query = {"name": {"$regex": filter, "$options": "i"}}

    cursor = col.find(query).sort(sort_by, sort_dir).skip(skip).limit(page_size)
    items = [Researcher2(id=doc.get("researcher_id"), name=doc.get("name"), age=doc.get("age")) async for doc in cursor]
    total_count = await col.count_documents(query)
    return items, total_count
