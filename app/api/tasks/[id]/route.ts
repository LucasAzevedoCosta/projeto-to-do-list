import { NextRequest, NextResponse } from "next/server";
import { deleteTask, updateTask } from "@/lib/tasks/task-controller";

export async function PUT(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/").pop();
    const body = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "ID não encontrado na URL" },
        { status: 400 }
      );
    }

    const updated = await updateTask(id, body);
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    return NextResponse.json({ error: "Erro ao atualizar" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { error: "ID não encontrado na URL" },
        { status: 400 }
      );
    }

    const deleted = await deleteTask(id);
    return NextResponse.json(deleted);
  } catch (error) {
    console.error("Erro ao deletar tarefa:", error);
    return NextResponse.json({ error: "Erro ao deletar" }, { status: 500 });
  }
}
