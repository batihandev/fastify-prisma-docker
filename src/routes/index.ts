import { FastifyInstance } from "fastify";
import { usersRoutes } from "./users.routes";
import { healthRoutes } from "./health.routes";

export async function registerRoutes(fastify: FastifyInstance) {
  await fastify.register(healthRoutes);
  await fastify.register(usersRoutes);
}
