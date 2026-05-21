import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "./index";
import type { Task, TaskStatus } from "./slices/taskSlice";

const selectTasksState = (s: RootState) => s.tasks;
const selectFilters = (s: RootState) => s.filters;

export const selectAllTasks = createSelector(selectTasksState, (t): Task[] =>
  t.allIds.map((id) => t.byId[id]).filter(Boolean),
);

export const selectFilteredTasks = createSelector(
  [selectAllTasks, selectFilters],
  (tasks, filters) => {
    const q = filters.search.trim().toLowerCase();
    return tasks.filter((task) => {
      if (filters.userId !== "all" && task.userId !== filters.userId)
        return false;
      if (filters.priority !== "all" && task.priority !== filters.priority)
        return false;
      if (filters.completion === "completed" && !task.completed) return false;
      if (filters.completion === "pending" && task.completed) return false;
      if (q && !task.title.toLowerCase().includes(q)) return false;
      return true;
    });
  },
);

export const selectTasksByStatus = createSelector(
  selectFilteredTasks,
  (tasks) => {
    const groups: Record<TaskStatus, Task[]> = {
      todo: [],
      in_progress: [],
      done: [],
    };
    tasks.forEach((t) => groups[t.status].push(t));
    (Object.keys(groups) as TaskStatus[]).forEach((k) => {
      groups[k].sort((a, b) => a.order - b.order);
    });
    return groups;
  },
);

export const selectTaskById = (id: number) =>
  createSelector([(state: RootState) => state.tasks.byId], (byId) => byId[id]);

export const selectUserById = (id: number | undefined) =>
  createSelector([(state: RootState) => state.users.byId], (byId) =>
    id !== undefined ? byId[id] : undefined,
  );

export const selectStats = createSelector(selectAllTasks, (tasks) => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const inProgress = tasks.filter((t) => t.status === "in_progress").length;
  return {
    total,
    completed,
    inProgress,
    pending: total - completed,
    completionRate: total ? Math.round((completed / total) * 100) : 0,
  };
});

export const selectAllUsers = createSelector(
  [(state: RootState) => state.users.allIds, (state: RootState) => state.users.byId],
  (allIds, byId) => allIds.map((id) => byId[id]).filter(Boolean),
);
