import { z } from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { createUser } from "../services/create-user";

export const createUserRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/users",
    {
      schema: {
        body: z.object({
          name: z.string(),
          email: z.string(),
          password: z.string(),
        }),
      },
    },
    async (request) => {
      const { name, email, password } = request.body;
      await createUser({
        name,
        email,
        password,
      });
    }
  );
};
