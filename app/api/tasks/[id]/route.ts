import { NextRequest, NextResponse } from "next/server";
import { deleteTask, updateTask } from "@/lib/tasks/task-controller";

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  try {
    const taskId = context.params.id;
    const body = await req.json();

    const updated = await updateTask(taskId, body);
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    return NextResponse.json({ error: "Erro ao atualizar" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  try {
    const taskId = context.params.id;

    const deleted = await deleteTask(taskId);
    return NextResponse.json(deleted);
  } catch (error) {
    console.error("Erro ao deletar tarefa:", error);
    return NextResponse.json({ error: "Erro ao deletar" }, { status: 500 });
  }
}