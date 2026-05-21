import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, Mail, Phone, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

import { UserAvatar } from "@/components/common/UserAvatar";
import { PriorityBadge } from "@/components/common/PriorityBadge";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectTaskById, selectUserById } from "@/store/selectors";
import { toggleComplete } from "@/store/slices/taskSlice";

interface Props {
  taskId: number | null;
  onClose: () => void;
}

export function TaskDetailDialog({ taskId, onClose }: Props) {
  const dispatch = useAppDispatch();
  const task = useAppSelector((s) =>
    taskId !== null ? selectTaskById(taskId)(s) : undefined,
  );
  const user = useAppSelector((s) =>
    task ? selectUserById(task.userId)(s) : undefined,
  );

  return (
    <Dialog open={taskId !== null} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg">
        {task ? (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                <span>TASK-{task.id}</span>
                <span>·</span>
                <Badge
                  variant={task.completed ? "default" : "secondary"}
                  className="capitalize"
                >
                  {task.status.replace("_", " ")}
                </Badge>
                <PriorityBadge priority={task.priority} />
              </div>
              <DialogTitle className="pt-2 text-lg leading-snug">
                {task.title}
              </DialogTitle>
            </DialogHeader>

            <Separator />

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
                Assignee
              </p>
              {user ? (
                <div className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-800 dark:bg-gray-900/50">
                  <UserAvatar userId={user.id} name={user.name} size="lg" />
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      @{user.username}
                    </p>
                    <div className="mt-2 space-y-1 text-xs text-gray-600 dark:text-gray-400">
                      <p className="flex items-center gap-1.5">
                        <Mail className="h-3 w-3" /> {user.email}
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Phone className="h-3 w-3" /> {user.phone}
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Building2 className="h-3 w-3" /> {user.company.name}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-600 dark:text-gray-400">Loading user…</p>
              )}
            </div>

            <div className="flex items-center justify-between gap-2 pt-2">
               
              <Button
                size="sm"
                onClick={() => dispatch(toggleComplete(task.id))}
              >
                {task.completed ? "Mark as pending" : "Mark complete"}
              </Button>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
