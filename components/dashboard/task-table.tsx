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
import { formatDate } from "@/lib/helpers";
import { isOverdue } from "@/lib/tasks/task-helpers";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  startDate: string;
  deadline: string;
  createdAt?: string;
  priority: TaskPriority;
  description: string;
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
              deadline
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
                {task.title}
              </TableCell>
              <TableCell>
                <TaskStatusBadge status={task.status} />
              </TableCell>
              <TableCell>
                <PriorityBadge priority={task.priority} />
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatDate(task.startDate)}
              </TableCell>
              <TableCell
                className={`text-muted-foreground ${
                  isOverdue(task.deadline, task.status)
                    ? "text-destructive font-medium"
                    : ""
                }`}
              >
                {formatDate(task.deadline)}
                {isOverdue(task.deadline, task.status) && (
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
