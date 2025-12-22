# Base image (Node LTS)
FROM node:24.12.0-slim AS base

# OS deps often needed by Prisma engines / TLS
RUN apt-get update -y \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

# Enable Corepack + pin pnpm
RUN corepack enable && corepack prepare pnpm@10.26.1 --activate

WORKDIR /app

# ---------------------------
# Development stage
# ---------------------------
FROM base AS development

COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install

COPY . .

EXPOSE 4000
CMD ["sh", "-c", "pnpm prisma:generate && pnpm prisma:migrate && pnpm dev"]

# ---------------------------
# Build stage (compile TS)
# ---------------------------
FROM base AS build

COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install

COPY . .
RUN pnpm prisma:generate
RUN pnpm build

# ---------------------------
# Production stage
# ---------------------------
FROM base AS production

COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod

# Copy only what runtime needs
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma

EXPOSE 4000
CMD ["sh", "-c", "pnpm prisma:migrate && pnpm start"]
