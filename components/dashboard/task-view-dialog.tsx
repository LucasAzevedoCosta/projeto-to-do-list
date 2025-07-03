"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { TaskStatusBadge } from "./task-status-badge";
import { PriorityBadge } from "./priority-badge";
import { Calendar, Clock, FileText, AlertTriangle } from "lucide-react";
import { type Task } from "./task-table";
import { formatDate } from "@/lib/helpers";

interface TaskViewDialogProps {
  task: Task | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TaskViewDialog({
  task,
  isOpen,
  onOpenChange,
}: TaskViewDialogProps) {
  if (!task) return null;


  const isOverdue = (prazo: string, status: string) => {
    if (status === "concluido") return false;
    const today = new Date();
    const deadline = new Date(prazo);
    return deadline < today;
  };

  const getDaysUntilDeadline = (prazo: string) => {
    const today = new Date();
    const deadline = new Date(prazo);
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilDeadline = getDaysUntilDeadline(task.prazo);
  const overdue = isOverdue(task.prazo, task.status);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Detalhes da Tarefa</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {task.titulo}
            </h3>
            <div className="flex gap-2 flex-wrap">
              <TaskStatusBadge status={task.status} />
              <PriorityBadge priority={task.prioridade} />
              {overdue && (
                <Badge
                  variant="destructive"
                  className="bg-destructive/20 text-destructive"
                >
                  ⚠️ Atrasado
                </Badge>
              )}
              {!overdue &&
                task.status !== "concluido" &&
                daysUntilDeadline <= 3 &&
                daysUntilDeadline > 0 && (
                  <Badge
                    variant="secondary"
                    className="bg-secondary/20 text-secondary-foreground"
                  >
                    ⏰ Vence em {daysUntilDeadline} dia
                    {daysUntilDeadline > 1 ? "s" : ""}
                  </Badge>
                )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
              <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground mb-1">
                  Descrição
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {task.descricao}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Data de Início
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(task.dataInicio)}
                  </p>
                </div>
              </div>

              <div
                className={`flex items-center space-x-3 p-3 rounded-lg ${
                  overdue ? "bg-destructive/20" : "bg-muted"
                }`}
              >
                <AlertTriangle
                  className={`h-5 w-5 ${
                    overdue ? "text-destructive" : "text-secondary"
                  }`}
                />
                <div>
                  <p className="text-sm font-medium text-foreground">Prazo</p>
                  <p
                    className={`text-sm ${
                      overdue
                        ? "text-destructive font-medium"
                        : "text-muted-foreground"
                    }`}
                  >
                    {formatDate(task.prazo)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg sm:col-span-2">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Criada em
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {task.dataCriacao ? formatDate(task.dataCriacao) : 'Sem data de criação'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
