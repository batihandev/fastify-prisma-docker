import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "@/prisma/client";
import { CreateUserSchema, type CreateUserDto } from "@/schemas/user.schema";

export const createUser = async (
  request: FastifyRequest<{ Body: CreateUserDto }>,
  reply: FastifyReply
) => {
  const parsed = CreateUserSchema.safeParse(request.body);
  if (!parsed.success) {
    return reply.code(400).send({
      error: "Validation error",
      issues: parsed.error.issues.map((i) => ({
        path: i.path.join("."),
        message: i.message,
        code: i.code,
      })),
    });
  }
  const { name, email } = parsed.data;
  const user = await prisma.user.create({ data: { name, email } });
  return reply.code(201).send(user);
};

export const getAllUsers = async (
  _request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const users = await prisma.user.findMany();
    reply.status(200).send(users);
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ error: error.message });
    } else {
      reply.status(500).send({ error: "An error occurred" });
    }
  }
};
