import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { TaskPriority } from "./taskSlice";

export type CompletionFilter = "all" | "completed" | "pending";

interface FiltersState {
  search: string;
  userId: number | "all";
  priority: TaskPriority | "all";
  completion: CompletionFilter;
}

const initialState: FiltersState = {
  search: "",
  userId: "all",
  priority: "all",
  completion: "all",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setUserFilter(state, action: PayloadAction<number | "all">) {
      state.userId = action.payload;
    },
    setPriorityFilter(state, action: PayloadAction<TaskPriority | "all">) {
      state.priority = action.payload;
    },
    setCompletionFilter(state, action: PayloadAction<CompletionFilter>) {
      state.completion = action.payload;
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const {
  setSearch,
  setUserFilter,
  setPriorityFilter,
  setCompletionFilter,
  resetFilters,
} = filtersSlice.actions;
export default filtersSlice.reducer;
