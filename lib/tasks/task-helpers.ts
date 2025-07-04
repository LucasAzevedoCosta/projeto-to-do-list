import { Task } from "@/components/dashboard/task-table";

export async function updateTaskById(id: string, task: Partial<Task>) {
  const res = await fetch(`/api/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!res.ok) throw new Error("Erro ao atualizar tarefa");
  return res.json();
}

export async function deleteTaskApi(taskId: string) {
  const res = await fetch(`/api/tasks/${taskId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Erro ao deletar a tarefa");
  }

  return res.json();
}

export const isOverdue = (deadline: string, status: string) => {
    if (status === "concluido") return false;
    const today = new Date();
    const aDeadline = new Date(deadline);
    return aDeadline < today;
  };