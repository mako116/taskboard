import { Plus } from "lucide-react";
import { useState, useRef, type DragEvent } from "react";

import { TaskCard } from "./TaskCard";
import type { Task, TaskStatus } from "../../store/slices/taskSlice";
import { ColumnConfig } from "@/types/types";
import { useAppDispatch } from "../../store/hooks";
import { reorderTasks } from "../../store/slices/taskSlice";

export const COLUMNS: ColumnConfig[] = [
  { id: "todo", label: "To Do", accent: "bg-slate-400" },
  { id: "in_progress", label: "In Progress", accent: "bg-amber-500" },
  { id: "done", label: "Done", accent: "bg-emerald-500" },
];

interface Props {
  config: ColumnConfig;
  tasks: Task[];
  onOpen: (id: number) => void;
}

export function Column({ config, tasks, onOpen }: Props) {
  const dispatch = useAppDispatch();
  const [dragOverId, setDragOverId] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragPreviewRef = useRef<HTMLElement | null>(null);

  const getDraggedId = (event: DragEvent<HTMLDivElement>): number | null => {
    const rawValue = event.dataTransfer.getData("text/plain");
    const id = Number(rawValue);
    return Number.isNaN(id) ? null : id;
  };

  const removeDragPreview = () => {
    if (dragPreviewRef.current?.parentElement) {
      dragPreviewRef.current.parentElement.removeChild(dragPreviewRef.current);
    }
    dragPreviewRef.current = null;
  };

  const handleDragStart = (event: DragEvent<HTMLDivElement>, draggedId: number) => {
    setIsDragging(true);
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", String(draggedId));

    const target = event.currentTarget as HTMLElement;
    target.classList.add("dragging-card", "opacity-60");

    const dragPreview = target.cloneNode(true) as HTMLElement;
    dragPreview.setAttribute("aria-hidden", "true");
    dragPreview.style.position = "absolute";
    dragPreview.style.top = "-9999px";
    dragPreview.style.left = "-9999px";
    dragPreview.style.width = `${target.offsetWidth}px`;
    dragPreview.style.boxSizing = "border-box";
    dragPreview.style.pointerEvents = "none";
    dragPreview.style.opacity = "0.95";
    dragPreview.style.transform = "scale(1.03)";
    dragPreview.style.filter = "drop-shadow(0 10px 30px rgba(15, 23, 42, 0.15))";

    document.body.appendChild(dragPreview);
    dragPreviewRef.current = dragPreview;

    requestAnimationFrame(() => {
      event.dataTransfer.setDragImage(dragPreview, 20, 20);
    });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDragOverId(null);

    document.querySelectorAll(".dragging-card").forEach((element) => {
      element.classList.remove("dragging-card", "opacity-60");
    });

    removeDragPreview();
  };

  const moveTask = (draggedId: number, targetId: number | null) => {
    const existingIds = tasks.map((task) => task.id).filter((id) => id !== draggedId);

    const orderedIds = targetId
      ? existingIds.reduce<number[]>((acc, id) => {
          if (id === targetId) {
            acc.push(draggedId);
          }
          acc.push(id);
          return acc;
        }, [])
      : [...existingIds, draggedId];

    if (!orderedIds.includes(draggedId)) {
      orderedIds.push(draggedId);
    }

    dispatch(
      reorderTasks({
        status: config.id as TaskStatus,
        orderedIds,
      }),
    );

    setDragOverId(null);
  };

  const handleDropOnCard = (event: DragEvent<HTMLDivElement>, targetId: number) => {
    event.preventDefault();
    const draggedId = getDraggedId(event);

    if (draggedId === null || draggedId === targetId) {
      setDragOverId(null);
      return;
    }

    moveTask(draggedId, targetId);
    handleDragEnd();
  };

  const handleDropOnColumn = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const draggedId = getDraggedId(event);

    if (draggedId === null) {
      return;
    }

    moveTask(draggedId, null);
    handleDragEnd();
  };

  return (
    <div
      className={`flex h-full min-w-[280px] flex-1 flex-col rounded-lg border border-gray-200 bg-gray-50 p-1 transition-colors duration-200 dark:border-gray-800 dark:bg-gray-900 ${
        isDragging ? "bg-slate-100 dark:bg-slate-950" : ""
      }`}
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleDropOnColumn}
    >
      <div className="flex items-center justify-between rounded-lg border-b border-gray-200 bg-white px-3 py-2.5 dark:border-gray-800 dark:bg-slate-950">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${config.accent}`} />
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            {config.label}
          </h3>
          <span className="rounded-md bg-white px-1.5 py-0.5 text-[11px] font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
            {tasks.length}
          </span>
        </div>
        <button
          className="rounded p-1 text-gray-600 hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
          aria-label="Add task"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto p-2">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onOpen={onOpen}
            draggable
            onDragStart={(event) => handleDragStart(event, task.id)}
            onDragEnd={handleDragEnd}
            onDragOver={(event) => {
              event.preventDefault();
              setDragOverId(task.id);
            }}
            onDragLeave={() => setDragOverId(null)}
            onDrop={(event) => handleDropOnCard(event, task.id)}
            isDropTarget={dragOverId === task.id}
          />
        ))}

        {tasks.length === 0 && (
          <div className="flex h-24 items-center justify-center rounded-md border border-dashed border-gray-300 text-xs text-gray-600 dark:border-gray-700 dark:text-gray-400">
            Drag a card here
          </div>
        )}
      </div>
    </div>
  );
}

