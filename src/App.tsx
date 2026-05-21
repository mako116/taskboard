import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { fetchUsers } from "./store/slices/usersSlice";
import { fetchTasks } from "./store/slices/taskSlice";
import { Loader2 } from "lucide-react";
import { AppLayout } from "./components/layout/AppLayout";
import { SummaryCards } from "./components/board/SummaryCards";
import { Filters } from "./components/board/Filters";
import { KanbanBoard } from "./components/board/BoardsFunctions";
import { TaskDetailDialog } from "./components/board/TaskDetailDialog";

function App() {
  const dispatch = useAppDispatch();
  const [activeTaskId, setActiveTaskId] = useState<number | null>(null);

  const loadingUsers = useAppSelector((state) => state.users.loading);
  const loadingTasks = useAppSelector((state) => state.tasks.loading);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <AppLayout title="Taskboard" subtitle="Manage your tasks efficiently">
      {loadingUsers || loadingTasks ? (
        <div className="flex min-h-[500px] flex-col items-center justify-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl" />
            <div
              className="
          relative flex h-20 w-20 items-center justify-center
          rounded-full border border-border bg-background/80
          shadow-lg backdrop-blur
        "
            >
              <Loader2 className="h-10 w-10 animate-spin [animation-duration:1.2s] text-primary" />
            </div>
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in duration-500">
          <section>
            <SummaryCards />
          </section>

          <section className="my-4">
            <Filters />
            <div className="h-[600px] rounded-xl border border-border bg-card/50 p-4 overflow-hidden">
              <KanbanBoard onOpen={(id) => setActiveTaskId(id)} />
            </div>
          </section>
        </div>
      )}

      <TaskDetailDialog
        taskId={activeTaskId}
        onClose={() => setActiveTaskId(null)}
      />
    </AppLayout>
  );
}

export default App;
