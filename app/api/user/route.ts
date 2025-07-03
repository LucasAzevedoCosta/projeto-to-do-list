import { getUserIdFromRequest } from "@/lib/auth/auth-helper";
import { getUserById } from "@/lib/user/user-controller";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(req);
    const user = await getUserById(userId);

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar o usuario" },
      { status: 500 }
    );
  }
}
