import { NextRequest, NextResponse } from "next/server";
import { deleteTask, updateTask } from "@/lib/tasks/task-controller";
import { getUserIdFromRequest } from "@/lib/auth/auth-helper";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = await getUserIdFromRequest(req);
    const taskId = params.id;
    const body = await req.json();

    const updated = await updateTask(taskId, userId, body);
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    return NextResponse.json({ error: "Erro ao atualizar" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = await getUserIdFromRequest(req);
    const taskId = params.id;

    const deleted = await deleteTask(taskId, userId);
    return NextResponse.json(deleted);
  } catch (error) {
    console.error("Erro ao deletar tarefa:", error);
    return NextResponse.json({ error: "Erro ao deletar" }, { status: 500 });
  }
}
