import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Settings,
  Sparkles,
} from "lucide-react";



const nav = [
  { label: "Board", to: "/", Icon: LayoutDashboard },
];

export function Sidebar() {
  return (
    <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-20 lg:flex h-screen w-[200px] flex-col border-r border-slate-200 bg-white text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
      <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-6 dark:border-slate-800">
        <div className="grid h-9 w-9 place-items-center rounded-2xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950">
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-semibold leading-none">TaskFlow</p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Productivity OS</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-5">
        <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Workspace
        </p>
        <div className="space-y-2">
          {nav.map(({ label, to, Icon }, i) => (
            <Link
              key={label + i}
              to={to}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                i === 0
                  ? "bg-slate-100 text-slate-900 shadow-sm dark:bg-slate-900 dark:text-slate-100"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-slate-100"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </div>
      </nav>

      <div className="border-t border-slate-200 p-5 dark:border-slate-800">
        <button className="flex w-full items-center gap-2 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
          <Settings className="h-4 w-4" />
          Settings
        </button>
      </div>
    </aside>
  );
}
