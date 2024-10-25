import { z } from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { editUser } from "../services/edit-user";

export const editUserRoute: FastifyPluginAsyncZod = async (app) => {
  app.put(
    "/users",
    {
      schema: {
        body: z.object({
          id: z.string(),
          updateUser: z.object({
            name: z.optional(z.string()),
            email: z.optional(z.string()),
            password: z.optional(z.string()),
          }),
        }),
      },
    },
    async (request) => {
      const { id, updateUser } = request.body;
      return await editUser({
        id,
        updateUser,
      });
    }
  );
};
