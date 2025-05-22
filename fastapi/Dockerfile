FROM python:3.11-bullseye

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc g++ build-essential curl gnupg \
    unixodbc unixodbc-dev \
    libpq-dev \
    default-libmysqlclient-dev \
    libaio1 \
    && rm -rf /var/lib/apt/lists/*

# (Optional) Add Microsoft ODBC Driver for MSSQL
RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - && \
    curl https://packages.microsoft.com/config/debian/11/prod.list > /etc/apt/sources.list.d/mssql-release.list && \
    apt-get update && ACCEPT_EULA=Y apt-get install -y --no-install-recommends \
    msodbcsql18 odbcinst \
    && rm -rf /var/lib/apt/lists/*

# Set environment variables for MSSQL
ENV ACCEPT_EULA=Y
ENV DEBIAN_FRONTEND=noninteractive

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy your app code
COPY . /app
WORKDIR /app

# Expose and run
EXPOSE 5000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "5000"]
