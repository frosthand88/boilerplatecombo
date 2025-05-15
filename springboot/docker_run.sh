docker build -t boilerplate-springboot .
docker run -d --name boilerplate-springboot -p 64030:8080 boilerplate-springboot