import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "@/prisma/client";

export const createUser = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const parts = request.parts();
  let name = "";
  let email = "";

  for await (const part of parts) {
    if (part.type === "field") {
      if (part.fieldname === "name") {
        name = part.value as string;
      } else if (part.fieldname === "email") {
        email = part.value as string;
      }
    }
  }

  try {
    const user = await prisma.user.create({
      data: { name, email },
    });
    reply.status(201).send(user);
  } catch (error) {
    if (error instanceof Error) {
      reply.status(400).send({ error: error.message });
    } else {
      reply.status(500).send({ error: "An error occurred" });
    }
  }
};

export const getAllUsers = async (
  request: FastifyRequest,
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
