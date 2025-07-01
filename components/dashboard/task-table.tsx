"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TaskActions } from "./task-actions";
import { TaskStatusBadge, type TaskStatus } from "./task-status-badge";
import { PriorityBadge, type TaskPriority } from "./priority-badge";

export interface Task {
  id: string;
  titulo: string;
  status: TaskStatus;
  dataInicio: string;
  prazo: string;
  dataCriacao?: string;
  prioridade: TaskPriority;
  descricao: string;
}

interface TaskTableProps {
  tasks: Task[];
  onTaskAction: (taskId: string, action: string) => void;
}

export function TaskTable({ tasks, onTaskAction }: TaskTableProps) {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  const handleTaskAction = (taskId: string, action: string) => {
    onTaskAction(taskId, action);
    setSelectedTask(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const isOverdue = (prazo: string, status: TaskStatus) => {
    if (status === "concluido") return false;
    const today = new Date();
    const deadline = new Date(prazo);
    return deadline < today;
  };

  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted">
            <TableHead className="font-semibold text-foreground">
              Título
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Status
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Prioridade
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Data de Início
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Prazo
            </TableHead>
            <TableHead className="font-semibold text-foreground text-right">
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow
              key={task.id}
              className="hover:bg-muted/50 transition-colors"
            >
              <TableCell className="font-medium text-foreground">
                {task.titulo}
              </TableCell>
              <TableCell>
                <TaskStatusBadge status={task.status} />
              </TableCell>
              <TableCell>
                <PriorityBadge priority={task.prioridade} />
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatDate(task.dataInicio)}
              </TableCell>
              <TableCell
                className={`text-muted-foreground ${
                  isOverdue(task.prazo, task.status)
                    ? "text-destructive font-medium"
                    : ""
                }`}
              >
                {formatDate(task.prazo)}
                {isOverdue(task.prazo, task.status) && (
                  <span className="ml-1 text-destructive">⚠️</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <TaskActions
                  taskId={task.id}
                  isOpen={selectedTask === task.id}
                  onOpenChange={(open) =>
                    setSelectedTask(open ? task.id : null)
                  }
                  onAction={handleTaskAction}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
