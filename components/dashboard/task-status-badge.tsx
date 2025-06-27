import { Badge } from "@/components/ui/badge";

export type TaskStatus = "concluido" | "cancelado";

interface TaskStatusBadgeProps {
  status: TaskStatus;
}

const statusConfig = {
  concluido: {
    label: "Concluído",
    style: {
      backgroundColor: "var(--status-concluido-bg)",
      color: "var(--status-concluido-text)",
      borderColor: "var(--status-concluido-bg)",
    },
  },
  cancelado: {
    label: "Cancelado",
    style: {
      backgroundColor: "var(--status-cancelado-bg)",
      color: "var(--status-cancelado-text)",
      borderColor: "var(--status-cancelado-bg)",
    },
  },
};

export function TaskStatusBadge({ status }: TaskStatusBadgeProps) {
  const { label, style } = statusConfig[status];
  return (
    <Badge
      variant="secondary"
      style={{
        backgroundColor: style.backgroundColor,
        color: style.color,
        borderColor: style.borderColor,
      }}
    >
      {label}
    </Badge>
  );
}
