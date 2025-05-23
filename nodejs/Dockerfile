FROM node:20-slim

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libsqlite3-dev \
    libpq-dev \
    default-libmysqlclient-dev \
    unixodbc unixodbc-dev \
    libaio1 curl ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm install --omit=dev

# Copy rest of the source
COPY . .

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
