# Base: Ubuntu
FROM ubuntu:22.04

# Install Node.js (LTS) and required tools
RUN apt-get update && apt-get install -y curl gnupg \
  && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
  && apt-get install -y nodejs \
  && apt-get clean

# Create app directory
WORKDIR /usr/src/app

# Copy package.json + package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the code
COPY . .

# Expose port (default for Express)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
