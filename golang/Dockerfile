FROM golang:1.23-alpine

# Set working directory
WORKDIR /app

# Copy go.mod and go.sum first for caching dependencies
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy Go files
COPY . .

# Build the app binary
RUN go build -o boilerplate-golang

# Expose app port
EXPOSE 8080

# Run the built app
CMD ["./boilerplate-golang"]