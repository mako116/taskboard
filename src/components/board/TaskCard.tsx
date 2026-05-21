import { CheckCircle2, Circle } from "lucide-react";
import { memo } from "react";
import { Link } from "react-router-dom";
import type { DragEventHandler } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Button, buttonVariants } from "@/components/ui/button";
import { UserAvatar } from "@/components/common/UserAvatar";
import { PriorityBadge } from "@/components/common/PriorityBadge";
import type { Task } from "@/store/slices/taskSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleComplete } from "@/store/slices/taskSlice";
import { selectUserById } from "@/store/selectors";

interface Props {
  task: Task;
  onOpen: (id: number) => void;
  draggable?: boolean;
  onDragStart?: DragEventHandler<HTMLDivElement>;
  onDragOver?: DragEventHandler<HTMLDivElement>;
  onDragLeave?: DragEventHandler<HTMLDivElement>;
  onDragEnd?: DragEventHandler<HTMLDivElement>;
  onDrop?: DragEventHandler<HTMLDivElement>;
  isDropTarget?: boolean;
}

function TaskCardImpl({
  task,
  onOpen,
  draggable = false,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDragEnd,
  onDrop,
  isDropTarget = false,
}: Props) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserById(task.userId));

  return (
    <div
      draggable={draggable}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDragEnd={onDragEnd}
      onDrop={onDrop}
      aria-grabbed={draggable}
      className={`group relative rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-950 ${
        isDropTarget ? "ring-2 ring-blue-500/60" : ""
      }`}
    >
      <div className="flex items-start gap-2">
        <div className="flex-1">
          <div className="flex items-start gap-2">
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => dispatch(toggleComplete(task.id))}
              className="mt-0.5"
              aria-label="Mark complete"
            />
            <p
              className={`flex-1 text-sm leading-snug text-gray-900 dark:text-gray-100 ${
                task.completed
                  ? "text-gray-600 line-through decoration-gray-400 dark:text-gray-400 dark:decoration-gray-600"
                  : ""
              }`}
            >
              {task.title}
            </p>
          </div>

          <div className="mt-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <PriorityBadge priority={task.priority} />
              <span className="inline-flex items-center gap-1 text-[11px] text-gray-600 dark:text-gray-400">
                {task.completed ? (
                  <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                ) : (
                  <Circle className="h-3 w-3" />
                )}
                TASK-{task.id}
              </span>
            </div>
            <UserAvatar userId={task.userId} name={user?.name} size="sm" />
          </div>

          <div className="mt-2 flex items-center justify-between">
            <Link
              to={`/tasks/${task.id}`}
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
                className: "-ml-2 h-7 px-2 text-xs text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white",
              })}
            >
              Open
            </Link>
            <Button
              variant="link"
              size="sm"
              onClick={() => onOpen(task.id)}
              className="h-7 px-0 text-xs"
            >
              View details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const TaskCard = memo(TaskCardImpl);
