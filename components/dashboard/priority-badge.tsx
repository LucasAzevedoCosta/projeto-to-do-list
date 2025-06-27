import { Badge } from "@/components/ui/badge";

export type TaskPriority = "urgente" | "alta" | "media" | "baixa";

interface PriorityBadgeProps {
  priority: TaskPriority;
}

const priorityConfig = {
  urgente: {
    label: "⚡ Urgente",
    style: {
      backgroundColor: "var(--priority-urgente-bg)",
      color: "var(--priority-urgente-text)",
      borderColor: "var(--priority-urgente-bg)",
    },
  },
  alta: {
    label: "🔴 Alta",
    style: {
      backgroundColor: "var(--priority-alta-bg)",
      color: "var(--priority-alta-text)",
      borderColor: "var(--priority-alta-bg)",
    },
  },
  media: {
    label: "🟡 Média",
    style: {
      backgroundColor: "var(--priority-media-bg)",
      color: "var(--priority-media-text)",
      borderColor: "var(--priority-media-bg)",
    },
  },
  baixa: {
    label: "🟢 Baixa",
    style: {
      backgroundColor: "var(--priority-baixa-bg)",
      color: "var(--priority-baixa-text)",
      borderColor: "var(--priority-baixa-bg)",
    },
  },
};

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const { label, style } = priorityConfig[priority];
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
