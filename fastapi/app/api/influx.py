from fastapi import APIRouter, Depends, Query
from app.db.database import INFLUX_TOKEN
from app.db.models.researcher2 import Researcher2
from influxdb_client import InfluxDBClient, Point, WritePrecision
import os

router = APIRouter(prefix="/influx")

@router.get("/researchers")
async def get_researchers(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
    filter: str = Query(None),
    sort_by: str = Query("researcher"),
    ascending: bool = Query(True)
):
    url = os.getenv("INFLUX_URL")
    org = os.getenv("INFLUX_ORG")
    bucket = os.getenv("INFLUX_BUCKET")

    client = InfluxDBClient(url=url, token=INFLUX_TOKEN, org=org)

    query = f'from(bucket:"{bucket}") |> range(start: -1w)'
    tables = client.query_api().query(query, org=org)

    result = []
    for table in tables:
        for record in table.records:
            result.append({
                "time": record.get_time().isoformat(),
                "field": record.get_field(),
                "value": record.get_value(),
            })
    return result
