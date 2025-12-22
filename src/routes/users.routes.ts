import { FastifyInstance } from "fastify";
import { createUser, getAllUsers } from "@/services/user.service";
import { CreateUserSchema } from "@/schemas/user.schema";

export async function usersRoutes(fastify: FastifyInstance) {
  fastify.get("/users", getAllUsers);

  fastify.post(
    "/users",
    {
      schema: {
        body: CreateUserSchema,
      },
    },
    createUser
  );
}
