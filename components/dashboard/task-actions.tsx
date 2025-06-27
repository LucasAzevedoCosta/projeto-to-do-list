"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";

interface TaskActionsProps {
  taskId: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAction: (taskId: string, action: string) => void;
}

export function TaskActions({
  taskId,
  isOpen,
  onOpenChange,
  onAction,
}: TaskActionsProps) {
  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2" align="end">
        <div className="space-y-1">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-left font-normal"
            onClick={() => onAction(taskId, "view")}
          >
            <Eye className="mr-2 h-4 w-4" />
            Visualizar
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-left font-normal"
            onClick={() => onAction(taskId, "edit")}
          >
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-left font-normal text-destructive hover:text-destructive hover:bg-destructive/20"
            onClick={() => onAction(taskId, "delete")}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Excluir
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
