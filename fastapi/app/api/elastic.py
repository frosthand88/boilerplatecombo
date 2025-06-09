from fastapi import APIRouter, Depends, Query
from app.db.database import ELASTIC_URL
from app.db.models.researcher2 import Researcher2
from elasticsearch import Elasticsearch
from elasticsearch.exceptions import NotFoundError

router = APIRouter(prefix="/elastic")

@router.get("/researchers")
async def get_researchers(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
    filter: str = Query(None),
    sort_by: str = Query("researcher"),
    ascending: bool = Query(True)
):
    es = Elasticsearch(ELASTIC_URL)
    INDEX = "researchers"

    from_ = (page - 1) * page_size
    query = {"match_all": {}} if not filter else {"query_string": {"query": filter}}

    sort_order = f"{sort_by}:{'asc' if ascending else 'desc'}"

    response = es.search(index=INDEX, query=query, sort=[sort_order], from_=from_, size=page_size)
    hits = response["hits"]["hits"]

    researchers = [Researcher2(id=hit["_source"]["id"], name=hit["_source"]["name"], age=hit["_source"].get("age")) for
                   hit in hits]
    return researchers
