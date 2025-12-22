import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import multipart from "@fastify/multipart";
import { registerRoutes } from "./routes";
const fastify = Fastify();

fastify.get(
  "/",
  async function handler(request: FastifyRequest, reply: FastifyReply) {
    return { hello: "world" };
  }
);
fastify.register(multipart);
fastify.register(registerRoutes);

export default fastify;
