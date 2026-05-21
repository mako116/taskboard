import { ArrowDown, ArrowUp, Equal } from "lucide-react";
import type { TaskPriority } from "../../store/slices/taskSlice";

const config: Record<
  TaskPriority,
  { label: string; cls: string; Icon: typeof ArrowUp }
> = {
  high: {
    label: "High",
    cls: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    Icon: ArrowUp,
  },
  medium: {
    label: "Medium",
    cls: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    Icon: Equal,
  },
  low: {
    label: "Low",
    cls: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
    Icon: ArrowDown,
  },
};

export function PriorityBadge({
  priority,
  className,
}: {
  priority: TaskPriority;
  className?: string;
}) {
  const c = config[priority];
  const Icon = c.Icon;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[11px] font-medium ${c.cls} ${className || ""}`}
    >
      <Icon className="h-3 w-3" />
      {c.label}
    </span>
  );
}
