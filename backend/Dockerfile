# Use Bun image so we can run TS directly with the project's scripts
FROM oven/bun:1.3.4

# Create app directory
WORKDIR /app

# Copy package.json and lockfiles
COPY package*.json ./

# Install dependencies (production)
RUN bun install --production

# Copy source
COPY . .

# Expose backend port
EXPOSE 5000

# Default env (can be overridden at runtime)
ENV NODE_ENV=production

# Start the app (non-watch for container)
CMD ["bun", "run", "index.ts"]
