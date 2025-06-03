dotnet publish -c Release -o ./publish
docker build -t boilerplate-dotnet .
docker run -d --name boilerplate-dotnet --env-file .env -p 64010:5000 boilerplate-dotnet