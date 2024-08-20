import fastify from "./app";

const port = Number(process.env.PORT) || 4000;
const host = process.env.HOST || "0.0.0.0";

fastify.listen({ port, host }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
