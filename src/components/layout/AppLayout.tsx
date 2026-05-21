import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { useAppSelector } from "@/store/hooks";

interface Props {
  title: string;
  subtitle?: string;
  topbarRight?: React.ReactNode;
  children: React.ReactNode;
}

export function AppLayout({ title, subtitle, topbarRight, children }: Props) {
  const theme = useAppSelector((s) => s.ui.theme);

  return (
    <div
      className={`relative min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100 ${
        theme === "dark" ? "dark" : ""
      }`}
    >
      <Sidebar />
      <div className="lg:ml-[200px] flex min-h-screen flex-col">
        <Topbar title={title} subtitle={subtitle} right={topbarRight} />
        <main className="flex-1 overflow-auto bg-slate-100 p-4 lg:p-6 dark:bg-slate-950">
          {children}
        </main>
      </div>
    </div>
  );
}
