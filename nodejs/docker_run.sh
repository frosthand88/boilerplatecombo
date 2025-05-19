docker build -t boilerplate-node .
docker run -d --name boilerplate-node -p 64040:3000 boilerplate-node
