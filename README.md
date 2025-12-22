# Prisma Fastify Docker TypeScript Starter

A minimal backend starter using **Fastify**, **Prisma**, **TypeScript**, and **Docker**.

## Stack

- Fastify
- Prisma (PostgreSQL)
- TypeScript
- Docker & Docker Compose
- pnpm

## Requirements

- **Node.js (LTS recommended)**
- **pnpm**

  ```sh
  npm install -g pnpm
  ```

- **Docker**

## Project Structure

```
prisma/
  migrations/
  schema/
    user.prisma
    post.prisma

src/
  routes/
  services/
  schemas/
  prisma/client.ts
  app.ts
  server.ts

docker-compose.yml
Dockerfile
nginx.conf
.env.example.*
```

## Environment Files

Choose **one** depending on how you run the app.

### Local backend + Docker Postgres

```sh
cp .env.example.local .env
```

### Full Docker stack

```sh
cp .env.example.docker .env
```

## Running the App

### Local development

```sh
docker compose up -d postgres

pnpm install
pnpm prisma:generate
pnpm prisma:migrate:dev
pnpm dev
```

### Full Docker

```sh
cp .env.example.docker .env
docker compose up --build
```

## API Testing

### Get users

```sh
curl http://127.0.0.1:4000/users
```

### Create user

```sh
curl -X POST http://127.0.0.1:4000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"TestUser","email":"test@example.com"}'
```

Via Nginx:

```sh
curl http://127.0.0.1/api/backend/users
```
