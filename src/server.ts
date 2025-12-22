import app from "./app";

const port = Number(process.env.PORT) || 4000;
const host = process.env.HOST || "0.0.0.0";

try {
  const address = await app.listen({ port, host });
  console.log(`Server listening at ${address}`);
} catch (err) {
  console.error(err);
  process.exit(1);
}
