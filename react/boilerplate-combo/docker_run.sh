npm run build
docker build -t boilerplate-react .
docker run -d --name boilerplate-react -p 3010:80 boilerplate-react