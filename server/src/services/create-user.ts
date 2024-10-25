import { db } from "../db";
import { users } from "../db/schema";

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export async function createUser({ email, name, password }: CreateUserRequest) {
  const result = await db
    .insert(users)
    .values({
      email,
      name,
      password,
    })
    .returning();

  const user = result[0];

  if (!user) {
    throw new Error("ERROR: something went wrong, user not created");
  }

  return {
    user,
    message: "user created",
    ok: true,
  };
}
