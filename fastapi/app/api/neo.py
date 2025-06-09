from fastapi import APIRouter, Depends, Query
from app.db.database import NEO4J_PASSWORD
from neo4j import GraphDatabase, AsyncGraphDatabase
import os

router = APIRouter(prefix="/neo")

@router.get("/researchers")
async def get_researchers(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
    filter: str = Query(None),
    sort_by: str = Query("researcher"),
    ascending: bool = Query(True)
):
    uri = os.getenv("NEO4J_URL")
    user = os.getenv("NEO4J_USER")
    password = NEO4J_PASSWORD
    driver = AsyncGraphDatabase.driver(uri, auth=(user, password))

    async with driver.session() as session:
        query = """
        MATCH (city:City)-[:IN_COUNTRY]->(country:Country)
        RETURN city, country
        ORDER BY city.name ASC
        SKIP $skip
        LIMIT $limit
        """
        cities = []
        result = await session.run(query, skip=page * page_size, limit=page_size)
        async for record in result:
            city = record["city"]
            country = record["country"]
            cities.append({
                "city_name": city["name"],
                "population": city.get("population", 0),
                "country": {
                    "code": country["code"],
                    "name": country["name"],
                    "continent": country["continent"]
                }
            })
        return cities
