# Prisma Fastify Docker TypeScript Starter

## Description

A backend template using Prisma, Fastify, and TypeScript with Docker. This template includes a modular schema management system and a basic setup for user and post models.

## Prerequisites

- **Node.js**: Ensure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
- **pnpm**: Install `pnpm` package manager. You can install it globally using npm:
  ```sh
  npm install -g pnpm
  ```
- **Docker**: Ensure you have Docker installed. You can download it from [docker.com](https://www.docker.com/).

## Folder Structure

## Note

The Prisma configuration includes the `previewFeatures = ["prismaSchemaFolder"]` setting, which automatically merges schemas located in the `prisma/schema` folder.

```
project-root/
│
├── prisma/
│   ├── migrations/
│   ├── schema/
│   │   ├── user.prisma
│   │   └── post.prisma
│
│
├── scripts/
│   └── merge-schemas.js
│
├── src/
│   ├── routes/
│   │   ├── users.ts
│   │   └── posts.ts
│   │   └── index.ts
│   ├── services/
│   │   ├── userService.ts
│   │   └── postService.ts
│   ├── prisma/
│   │   └── client.ts
│   ├── server.ts
│   └── app.ts
│
├── .env
├── docker-compose.yml
├── Dockerfile
├── package.json
├── tsconfig.json
└── README.md
```

## Setup

1. **Clone the Repository:**

   ```sh
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install Dependencies:**

   ```sh
   pnpm install
   ```

3. **Environment Variables:**

   Copy the `.env.example` file to `.env` in the root directory and add your database URL:

   ```env
   DATABASE_URL="your-database-url"
   ```

4. **Merge Schemas and Generate Prisma Client:**

   ```sh
   pnpm run prisma:generate
   ```

5. **Run Migrations:**

   ```sh
   pnpm run prisma:migrate
   ```

6. **Start the Server:**

   ```sh
   pnpm start
   pnpm dev
   pnpm docker:up
   ```

   - `pnpm start`: Starts the Fastify server in production mode.
   - `pnpm dev`: Starts the Fastify server in development mode with hot-reloading.
   - `pnpm docker:up`: Starts the Docker containers as defined in the `docker-compose.yml` file.

   Note: The `NODE_ENV` environment variable (set to either `development` or `production`) affects the behavior of the Docker setup. Ensure you set it appropriately in your `.env` file.

## Docker Setup

1. **Build and Run Docker Containers:**

   ```sh
   pnpm docker:up
   ```

2. **Stop and Remove Docker Containers:**

   ```sh
   pnpm docker:down
   ```

Ensure you have a `docker-compose.yml` file in your project root. The provided scripts will handle building and running the Docker containers.

## Scripts

- `pnpm run prisma:generate`: Merges schema files and generates the Prisma client.
- `pnpm run prisma:migrate`: Merges schema files and runs migrations.
- `pnpm start`: Starts the Fastify server.
- `scripts/prismagm.sh`: Will run after posgres server loaded in docker to generate and migrate automatically.
