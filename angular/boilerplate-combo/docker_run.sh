docker build -t boilerplate-angular .
docker run -d --name boilerplate-angular -p 3030:80 boilerplate-angular
