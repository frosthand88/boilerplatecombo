import os
import json
import boto3
from botocore.exceptions import BotoCoreError, ClientError
from dotenv import load_dotenv
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession

load_dotenv()

# 1. ENV VARS REQUIRED
region = os.getenv("AWS_REGION")
if not region:
    raise RuntimeError("AWS_REGION environment variable is not set")

role_arn = "arn:aws:iam::022499021574:role/fh-read-secret-role"
secret_name = "MyAppSecret"

# 2. Create STS client using default credentials (env vars or ~/.aws/credentials)
sts_client = boto3.client("sts", region_name=region)

def get_aws_secret(secret_name: str, region_name: str) -> dict:
    # 3. Assume the role
    try:
        response = sts_client.assume_role(
            RoleArn=role_arn,
            RoleSessionName="python-session"
        )
        credentials = response['Credentials']
    except ClientError as e:
        raise RuntimeError(f"Failed to assume role: {e}")

    client = boto3.client("secretsmanager", region_name=region_name,
    aws_access_key_id=credentials['AccessKeyId'],
    aws_secret_access_key=credentials['SecretAccessKey'],
    aws_session_token=credentials['SessionToken'])
    response = client.get_secret_value(SecretId=secret_name)
    return json.loads(response["SecretString"])

# Fetch secrets and replace passwords
secret_data = get_aws_secret("MyAppSecret", os.getenv("AWS_REGION"))

def inject_password(url_env_var: str, db_key: str):
    url = os.getenv(url_env_var)
    password = secret_data.get(db_key)
    if url and password and '__SECRET__' in url:
        return url.replace('__SECRET__', password)
    return url

MYSQL_URL = inject_password("MYSQL_URL", "mysql")
POSTGRES_URL = inject_password("POSTGRES_URL", "postgresql")
MSSQL_URL = inject_password("MSSQL_URL", "mssql")
ORACLE_URL = inject_password("ORACLE_URL", "oracle")

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
