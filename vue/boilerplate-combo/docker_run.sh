npm run build
docker build -t boilerplate-vue .
docker run -d --name boilerplate-vue -p 3020:80 boilerplate-vue