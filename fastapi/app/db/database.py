import os
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from dotenv import load_dotenv

load_dotenv()

MYSQL_URL = os.getenv("MYSQL_URL")
POSTGRES_URL = os.getenv("POSTGRES_URL")
MSSQL_URL = os.getenv("MSSQL_URL")
ORACLE_URL = os.getenv("ORACLE_URL")

mysql_engine = create_async_engine(MYSQL_URL, echo=True) if MYSQL_URL else None
postgres_engine = create_async_engine(POSTGRES_URL, echo=True) if POSTGRES_URL else None
mssql_engine = create_async_engine(MSSQL_URL, echo=True) if MSSQL_URL else None
oracle_engine = create_async_engine(ORACLE_URL, echo=True) if ORACLE_URL else None

mysql_session = async_sessionmaker(mysql_engine, expire_on_commit=False) if mysql_engine else None
postgres_session = async_sessionmaker(postgres_engine, expire_on_commit=False) if postgres_engine else None
mssql_session = async_sessionmaker(mssql_engine, expire_on_commit=False) if mssql_engine else None
oracle_session = async_sessionmaker(oracle_engine, expire_on_commit=False) if oracle_engine else None


# Dependency functions for FastAPI

async def get_mysql_session() -> AsyncSession:
    if not mysql_session:
        raise RuntimeError("MySQL database is not configured")
    async with mysql_session() as session:
        yield session

async def get_postgres_session() -> AsyncSession:
    if not postgres_session:
        raise RuntimeError("PostgreSQL database is not configured")
    async with postgres_session() as session:
        yield session

async def get_mssql_session() -> AsyncSession:
    if not mssql_session:
        raise RuntimeError("MSSQL database is not configured")
    async with mssql_session() as session:
        yield session

async def get_oracle_session() -> AsyncSession:
    if not oracle_session:
        raise RuntimeError("Oracle database is not configured")
    async with oracle_session() as session:
        yield session
