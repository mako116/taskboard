import { Bell, Moon, Sun, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleTheme } from "@/store/slices/uiSlice";

interface Props {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}

export function Topbar({ title, subtitle, right }: Props) {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((s) => s.ui.theme);

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/90 px-4 backdrop-blur-xl shadow-sm dark:border-slate-800 dark:bg-slate-950/90 lg:px-6">
      <div className="flex items-center gap-3 lg:hidden">
        <Link
          to="/"
          className="grid h-9 w-9 place-items-center rounded-2xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950"
        >
          <Sparkles className="h-4 w-4" />
        </Link>
        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          TaskFlow
        </span>
      </div>

      <div className="hidden min-w-0 flex-1 lg:block">
        <h1 className=" text-[15px] font-semibold text-slate-900 dark:text-slate-100">
          {title}
        </h1>
        {subtitle && (
          <p className="truncate text-[10px] text-slate-500 dark:text-slate-400">{subtitle}</p>
        )}
      </div>

      <div className="ml-auto flex items-center gap-2">
        {right}
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle theme"
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
