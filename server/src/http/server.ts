import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import fastifyCors from "@fastify/cors";
import { createUserRoute } from "../routes/create-user";
import { authenticateUserRoute } from "../routes/authenticate-user";
import { editUserRoute } from "../routes/edit-user";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: "*",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.get("/", async () => {
  return { hello: "world" };
});

app.register(createUserRoute);
app.register(authenticateUserRoute);
app.register(editUserRoute);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("HTTP server running!");
  });
