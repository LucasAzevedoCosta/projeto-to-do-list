import { db } from "@/db/drizzle";
import { session } from "@/db/schema";
import { getSessionCookie } from "better-auth/cookies";
import { and, eq, sql } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function getUserIdFromRequest(request: NextRequest) {
  const sessionTokenRaw = getSessionCookie(request);
  console.log("Token recebido (bruto):", sessionTokenRaw);

  if (!sessionTokenRaw) throw new Error("Sessão não encontrada.");

  const sessionToken = decodeURIComponent(sessionTokenRaw).split(".")[0];
  console.log("Token usado na busca:", sessionToken);

  const userSession = await db
    .select()
    .from(session)
    .where(
      and(
        eq(session.token, sessionToken),
        sql`${session.expiresAt} > NOW()`
      )
    )
    .limit(1);

  console.log("Sessão encontrada:", userSession);

  if (userSession.length === 0) {
    throw new Error("Sessão inválida ou expirada.");
  }

  return userSession[0].userId;
}

