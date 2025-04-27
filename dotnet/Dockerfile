# Use a minimal Ubuntu image
FROM ubuntu:22.04

# Install .NET 9 Runtime
RUN apt-get update && \
    apt-get install -y wget apt-transport-https && \
    wget https://packages.microsoft.com/config/ubuntu/22.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb && \
    dpkg -i packages-microsoft-prod.deb && \
    rm packages-microsoft-prod.deb && \
    apt-get update && \
    apt-get install -y aspnetcore-runtime-9.0 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Create app directory and copy published output
WORKDIR /app
COPY ./publish/ .

# Expose port if web app
EXPOSE 5000

# Run the app
ENTRYPOINT ["dotnet", "BoilerplateCombo.dll"]