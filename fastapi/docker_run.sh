docker build -t boilerplate-fastapi .
docker run -d --name boilerplate-fastapi -p 64020:5000 boilerplate-fastapi