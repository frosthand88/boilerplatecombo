docker build -t boilerplate-golang .
docker run -d --name boilerplate-golang -e SWAGGER_HOST=localhost:64050 -p 64050:8080 boilerplate-golang