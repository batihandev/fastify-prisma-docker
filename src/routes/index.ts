import { FastifyInstance } from "fastify";
import userRoutes from "./users";

export default async function routes(fastify: FastifyInstance) {
  fastify.register(userRoutes);
}
