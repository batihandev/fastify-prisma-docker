# Base image
FROM node:20-slim AS base

# Install OpenSSL
RUN apt-get update -y && apt-get install -y openssl postgresql-client

RUN corepack enable

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"



# Set working directory to /app
WORKDIR /app

# Final stage for development

FROM base AS development

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Use cache for pnpm store and install all dependencies
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install

# Copy the application source code
COPY . /app
RUN chmod +x /app/scripts/prismagm.sh


# Install tsx for development
RUN pnpm add -g tsx

# Expose the port the app runs on
EXPOSE ${PORT}

# Run the application in development mode with tsx watch mode
# CMD ["tsx", "watch", "src/server.ts","scripts/prismagm.sh"]
CMD ["sh", "-c", "scripts/prismagm.sh postgres:${POSTGRES_PORT} -- pnpm prisma:generate && pnpm prisma:migrate deploy && tsx watch src/server.ts"]


# Production stage
FROM base AS production

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install only production dependencies
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod

# Copy the application source code
COPY . /app
RUN chmod +x /app/scripts/prismagm.sh

# Expose the port the app runs on
EXPOSE ${PORT}

# Command to run the application
# CMD ["node", "dist/server.js","scripts/prismagm.sh"]
CMD ["sh", "-c", "scripts/prismagm.sh postgres:${POSTGRES_PORT} -- pnpm prisma:generate && pnpm prisma:migrate deploy && node dist/server.js"]