import { db } from "@/db/drizzle";
import { task } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

export interface TaskInput {
  title: string;
  description: string;
  status: "concluido" | "nao_concluido";
  priority: "urgente" | "alta" | "media" | "baixa";
  startDate: string;
  deadline: string;
  userId: string;
}

export async function getTasksByUser(userId: string) {
  const tasks = await db.select().from(task).where(eq(task.userId, userId));
  return tasks.map((t) => ({
    id: t.id,
    title: t.title,
    description: t.description,
    status: t.status,
    priority: t.priority,
    userId: t.userId,
    createdAt: t.createdAt,
    deadline: t.deadline,
    startDate: t.startDate,
  }));
}

export async function createTask(input: TaskInput) {
  const newTask = {
    id: uuidv4(),
    title: input.title,
    description: input.description,
    status: input.status,
    priority: input.priority,
    startDate: new Date(input.startDate),
    deadline: new Date(input.deadline),
    userId: input.userId,
  };

  const result = await db.insert(task).values(newTask).returning();

  const created = result[0];

  return {
    id: created.id,
    title: created.title,
    description: created.description,
    status: created.status,
    priority: created.priority,
    userId: created.userId,
    createdAt: created.createdAt,
    deadline: created.deadline,
    startDate: created.startDate,
  };
}

export async function updateTask(taskId: string, input: Partial<TaskInput>) {
  const updated = await db
    .update(task)
    .set({
      ...(input.title && { title: input.title }),
      ...(input.description && { description: input.description }),
      ...(input.status && { status: input.status }),
      ...(input.priority && { priority: input.priority }),
      ...(input.startDate && { startDate: new Date(input.startDate) }),
      ...(input.deadline && { deadline: new Date(input.deadline) }),
    })
    .where(eq(task.id, taskId))
    .returning();

  const result = updated[0];

  return {
    id: result.id,
    title: result.title,
    description: result.description,
    status: result.status,
    priority: result.priority,
    userId: result.userId,
    createdAt: result.createdAt,
    deadline: result.deadline,
    startDate: result.startDate,
  };
}

export async function deleteTask(taskId: string) {
  const deleted = await db.delete(task).where(eq(task.id, taskId)).returning();

  return deleted[0];
}
