import { Badge } from "@/components/ui/badge";

export type TaskStatus = "concluido" | "nao_concluido";

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
  nao_concluido: {
    label: "Não concluído",
    style: {
      backgroundColor: "var(--status-nao_concluido-bg)",
      color: "var(--status-nao_concluido-text)",
      borderColor: "var(--status-nao_concluido-bg)",
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
