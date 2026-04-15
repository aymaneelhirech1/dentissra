# Use an official Node.js image to build both apps
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Install Bun for the backend
RUN npm install -g bun

# Copy root package files if they exist (though this project is split into folders)
COPY . .

# Build the Backend
WORKDIR /app/backend
RUN bun install

# Build the Frontend
WORKDIR /app/frontend
RUN npm install
RUN npm run build

# Final Stage: Run the Backend and serve the Frontend
FROM node:20-alpine
WORKDIR /app

# Re-install Bun in final stage
RUN npm install -g bun

# Copy all built assets from the builder stage
COPY --from=builder /app /app

# Install 'serve' or use a simple static server if needed, 
# but usually, the backend serves the frontend in a single-container setup.
# If your backend serves static files, this is simple. 
# Otherwise, we can use an Express static middleware later.

EXPOSE 5000
WORKDIR /app/backend

# Current Backend server starts on port 5000
CMD ["bun", "run", "index.ts"]
