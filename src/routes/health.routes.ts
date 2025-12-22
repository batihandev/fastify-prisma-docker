import { FastifyInstance } from "fastify";
import { prisma } from "../prisma/client";

export async function healthRoutes(fastify: FastifyInstance) {
  fastify.get("/health", async () => ({ ok: true }));

  fastify.get("/ready", async () => {
    await prisma.$queryRaw`SELECT 1`;
    return { ready: true };
  });
}
