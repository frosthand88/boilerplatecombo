# Use Ubuntu as the base image
FROM ubuntu:22.04

# Install required tools: curl, unzip, JDK 21, etc.
RUN apt-get update && apt-get install -y \
    openjdk-21-jdk \
    curl \
    unzip \
    gradle \
    && rm -rf /var/lib/apt/lists/*

# Set environment variables
ENV JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64
ENV PATH="$JAVA_HOME/bin:$PATH"

# Set the working directory
WORKDIR /app

# Copy the project files
COPY . .

# Optionally build using Gradle wrapper if present
RUN ./gradlew build --no-daemon

# Expose default Spring Boot port
EXPOSE 8080

# Run the app
CMD ["java", "-jar", "build/libs/BoilerplateSpringboot-0.0.1-SNAPSHOT.jar"]