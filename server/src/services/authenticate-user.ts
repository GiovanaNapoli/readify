import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";

interface AuthenticateUserRequest {
  email: string;
  password: string;
}

export async function authenticateUser({
  email,
  password,
}: AuthenticateUserRequest) {
  const result = await db
    .select({
      name: users.name,
    })
    .from(users)
    .where(and(eq(users.email, email), eq(users.password, password)));

  const user = result[0];

  if (!user) {
    throw new Error("Invalid credentials");
  }

  return {
    user,
    token: "token",
    refreshToken: "refreshToken",
    ok: true,
    message: "Authenticated",
  };
}
