import { db } from "@/db/drizzle";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUserById(userId: string) {
  const users = await db.select().from(user).where(eq(user.id, userId));

  const u = users[0];

  return {
    name: u.name,
    email: u.email,
    createdAt: u.createdAt,
  };
}