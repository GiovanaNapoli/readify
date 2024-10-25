import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";

interface EditUserRequest {
  id: string;
  updateUser: {
    name?: string;
    email?: string;
    password?: string;
  };
}

export async function editUser({ id, updateUser }: EditUserRequest) {
  console.log(updateUser);
  const result = await db
    .update(users)
    .set({ ...updateUser })
    .where(eq(users.id, id))
    .returning();

  const user = result[0];

  if (!user) {
    throw new Error("ERROR: something went wrong, user not updated");
  }

  return {
    user,
    message: "user updated",
    ok: true,
  };
}
