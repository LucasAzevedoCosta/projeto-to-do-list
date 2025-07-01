import { NextRequest, NextResponse } from "next/server";
import { getTasksByUser, createTask } from "@/lib/tasks/task-controller";
import { getUserIdFromRequest } from "@/lib/auth/auth-helper";

export async function GET(req: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(req);
    const tasks = await getTasksByUser(userId);
    return NextResponse.json(tasks);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar tarefas" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(req);
    const body = await req.json();

    const newTask = await createTask({ ...body, userId });
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    return NextResponse.json(
      { error: "Erro ao criar tarefa" },
      { status: 500 }
    );
  }
}
