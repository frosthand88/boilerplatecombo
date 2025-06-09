from starlette.middleware.cors import CORSMiddleware
from app.api import mysql, postgres, mssql, oracle, timescale, cockroach, maria, duck, redis, neo, mongo, influx, elastic
from fastapi import FastAPI

app = FastAPI()

# Allow all origins, methods, and headers
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

app.include_router(mysql.router)
app.include_router(postgres.router)
app.include_router(mssql.router)
app.include_router(oracle.router)
app.include_router(timescale.router)
app.include_router(cockroach.router)
app.include_router(maria.router)
app.include_router(duck.router)
app.include_router(redis.router)
app.include_router(neo.router)
app.include_router(mongo.router)
app.include_router(influx.router)
app.include_router(elastic.router)
