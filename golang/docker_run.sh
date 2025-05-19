docker build -t boilerplate-golang .
docker run -d --name boilerplate-golang -p 64050:8080 boilerplate-golang