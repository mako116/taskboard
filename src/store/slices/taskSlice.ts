import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ApiTodo } from "../../types/types";
import apiClient from "../api";
import { TODO_LIST } from "@/utility/urlConfig";

export type TaskStatus = "todo" | "in_progress" | "done";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
  status: TaskStatus;
  priority: TaskPriority;
  order: number;
}

interface TasksState {
  byId: Record<number, Task>;
  allIds: number[];
  loading: boolean;
  error: string | null;
  loadedAt: number | null;
}

const initialState: TasksState = {
  byId: {},
  allIds: [],
  loading: false,
  error: null,
  loadedAt: null,
};

const derivePriority = (id: number): TaskPriority => {
  const mod = id % 7;
  if (mod === 0 || mod === 5) return "high";
  if (mod === 1 || mod === 3) return "medium";
  return "low";
};

const deriveStatus = (todo: ApiTodo, index: number): TaskStatus => {
  if (todo.completed) return "done";
  return index % 5 === 0 ? "in_progress" : "todo";
};

export const fetchTasks = createAsyncThunk(
  TODO_LIST,
  async (_: void, { rejectWithValue }) => {
    try {
      const todos = await apiClient.fetchTodos();
      return todos;
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : "Failed");
    }
  },
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    toggleComplete(state, action: PayloadAction<number>) {
      const t = state.byId[action.payload];
      if (!t) return;
      t.completed = !t.completed;
      t.status = t.completed ? "done" : "todo";
    },
    setStatus(
      state,
      action: PayloadAction<{ id: number; status: TaskStatus }>,
    ) {
      const t = state.byId[action.payload.id];
      if (!t) return;
      t.status = action.payload.status;
      t.completed = action.payload.status === "done";
    },
    setPriority(
      state,
      action: PayloadAction<{ id: number; priority: TaskPriority }>,
    ) {
      const t = state.byId[action.payload.id];
      if (!t) return;
      t.priority = action.payload.priority;
    },
    reorderTasks(
      state,
      action: PayloadAction<{ status: TaskStatus; orderedIds: number[] }>,
    ) {
      action.payload.orderedIds.forEach((id, idx) => {
        const t = state.byId[id];
        if (t) {
          t.status = action.payload.status;
          t.completed = action.payload.status === "done";
          t.order = idx;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.loadedAt = Date.now();
        if (state.allIds.length === 0) {
          action.payload.forEach((todo, idx) => {
            state.byId[todo.id] = {
              id: todo.id,
              userId: todo.userId,
              title: todo.title,
              completed: todo.completed,
              status: deriveStatus(todo, idx),
              priority: derivePriority(todo.id),
              order: idx,
            };
            state.allIds.push(todo.id);
          });
        }
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? "Failed to load tasks";
      });
  },
});

export const { toggleComplete, setStatus, setPriority, reorderTasks } =
  tasksSlice.actions;
export default tasksSlice.reducer;
