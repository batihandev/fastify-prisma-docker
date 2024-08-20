import { FastifyInstance } from "fastify";
import { createUser, getAllUsers } from "../services/userService";

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.post("/users", createUser);
  fastify.get("/users", getAllUsers);
}
