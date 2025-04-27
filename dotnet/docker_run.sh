dotnet publish -c Release -o ./publish
docker build -t boilerplate-dotnet .
docker run -d --name boilerplate-dotnet -p 64010:5000 boilerplate-dotnet