import { z } from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { authenticateUser } from "../services/authenticate-user";

export const authenticateUserRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/login",
    {
      schema: {
        body: z.object({
          email: z.string(),
          password: z.string(),
        }),
      },
    },
    async (request) => {
      const { email, password } = request.body;
      return await authenticateUser({
        email,
        password,
      });
    }
  );
};
