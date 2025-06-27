import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TaskTable, type Task } from "./task-table";

interface TaskListCardProps {
  tasks: Task[];
  onTaskAction: (taskId: string, action: string) => void;
}

export function TaskListCard({ tasks, onTaskAction }: TaskListCardProps) {
  return (
    <Card className="shadow-lg border-0 bg-card backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            Lista de Tarefas
          </h2>
          <Badge variant="outline" className="text-muted-foreground">
            {tasks.length} itens
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <TaskTable tasks={tasks} onTaskAction={onTaskAction} />
      </CardContent>
    </Card>
  );
}
