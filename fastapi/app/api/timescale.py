from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import asc, desc, func
from app.db.database import get_timescale_session
from app.db.models.researcher_timescale import Researcher

router = APIRouter(prefix="/timescale")

@router.get("/researchers")
async def get_researchers(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
    filter: str = Query(None),
    sort_by: str = Query("researcher"),
    ascending: bool = Query(True),
    session: AsyncSession = Depends(get_timescale_session),
):
    query = select(Researcher)

    if filter:
        query = query.where(Researcher.researcher.contains(filter))

    sort_column_map = {
        "time": Researcher.time,
        "researcher": Researcher.researcher,
        "paper": Researcher.paper,
        "topic": Researcher.topic,
        "conference": Researcher.conference,
        "organization": Researcher.organization,
        "citations": Researcher.citations,
    }
    sort_column = sort_column_map.get(sort_by.lower(), Researcher.researcher)
    sort_order = asc(sort_column) if ascending else desc(sort_column)

    query = query.order_by(sort_order)

    total_query = select(func.count()).select_from(query.subquery())
    total_result = await session.execute(total_query)
    total_count = total_result.scalar_one()

    query = query.offset((page - 1) * page_size).limit(page_size)
    result = await session.execute(query)
    researchers = result.scalars().all()

    return {
        "data": researchers,
        "pagination": {
            "page": page,
            "page_size": page_size,
            "total": total_count
        }
    }
