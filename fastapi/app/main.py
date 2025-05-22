from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from app.api import mysql, postgres, mssql, oracle

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

