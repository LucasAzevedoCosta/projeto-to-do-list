import { db } from "@/db/drizzle";
import { task } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

export interface TaskInput {
  titulo: string;
  descricao: string;
  status: "concluido" | "nao_concluido";
  prioridade: "urgente" | "alta" | "media" | "baixa";
  dataInicio: string;
  prazo: string;
  userId: string;
}

export async function getTasksByUser(userId: string) {
  const tasks = await db.select().from(task).where(eq(task.userId, userId));
  return tasks.map((t) => ({
    id: t.id,
    titulo: t.title,
    descricao: t.description,
    status: t.status,
    prioridade: t.priority,
    userId: t.userId,
    dataCriacao: t.createdAt,
    prazo: t.deadline,
    dataInicio: t.startDate,
  }));
}

export async function createTask(input: TaskInput) {
  const newTask = {
    id: uuidv4(),
    title: input.titulo,
    description: input.descricao,
    status: input.status,
    priority: input.prioridade,
    startDate: new Date(input.dataInicio),
    deadline: new Date(input.prazo),
    userId: input.userId,
  };

  const result = await db.insert(task).values(newTask).returning();

  const created = result[0];

  return {
    id: created.id,
    titulo: created.title,
    descricao: created.description,
    status: created.status,
    prioridade: created.priority,
    userId: created.userId,
    dataCriacao: created.createdAt,
    prazo: created.deadline,
    dataInicio: created.startDate,
  };
}

export async function updateTask(taskId: string, input: Partial<TaskInput>) {
  const updated = await db
    .update(task)
    .set({
      ...(input.titulo && { title: input.titulo }),
      ...(input.descricao && { description: input.descricao }),
      ...(input.status && { status: input.status }),
      ...(input.prioridade && { priority: input.prioridade }),
      ...(input.dataInicio && { startDate: new Date(input.dataInicio) }),
      ...(input.prazo && { deadline: new Date(input.prazo) }),
    })
    .where(eq(task.id, taskId))
    .returning();

  const result = updated[0];

  return {
    id: result.id,
    titulo: result.title,
    descricao: result.description,
    status: result.status,
    prioridade: result.priority,
    userId: result.userId,
    dataCriacao: result.createdAt,
    prazo: result.deadline,
    dataInicio: result.startDate,
  };
}

export async function deleteTask(taskId: string) {
  const deleted = await db.delete(task).where(eq(task.id, taskId)).returning();

  return deleted[0];
}
