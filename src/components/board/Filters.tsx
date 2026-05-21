import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setCompletionFilter,
  setPriorityFilter,
  setSearch,
  setUserFilter,
  type CompletionFilter,
} from "@/store/slices/filtersSlice";
import { selectAllUsers } from "@/store/selectors";
import type { TaskPriority } from "../../store/slices/taskSlice";

export function Filters() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((s) => s.filters);
  const users = useAppSelector(selectAllUsers);

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-3 lg:flex-row lg:items-center lg:justify-between dark:border-gray-800 dark:bg-gray-950">
      <div className="relative w-full lg:max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600 dark:text-gray-400" />
        <Input
          value={filters.search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          placeholder="Search tasks..."
          className="pl-9"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <select
          value={String(filters.userId)}
          onChange={(e) => {
            const v = e.target.value;
            dispatch(setUserFilter(v === "all" ? "all" : Number(v)));
          }}
          className="flex h-9 w-[170px] items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
        >
          <option value="all">All assignees</option>
          {users.map((u) => (
            <option key={u.id} value={String(u.id)}>
              {u.name}
            </option>
          ))}
        </select>

        <select
          value={filters.priority}
          onChange={(e) =>
            dispatch(setPriorityFilter(e.target.value as TaskPriority | "all"))
          }
          className="flex h-9 w-[140px] items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
        >
          <option value="all">All priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <div className="inline-flex h-9 items-center justify-center rounded-md bg-gray-200 p-1 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
          {["all", "pending", "completed"].map((tab) => {
            const isActive = filters.completion === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() =>
                  dispatch(setCompletionFilter(tab as CompletionFilter))
                }
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus:outline-none ${isActive ? "bg-white text-gray-900 shadow-sm dark:bg-gray-900 dark:text-white" : "hover:bg-white/60 hover:text-gray-900 dark:hover:bg-gray-900/60 dark:hover:text-white"}`}
              >
                {tab === "all" ? "All" : tab === "pending" ? "Pending" : "Done"}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
