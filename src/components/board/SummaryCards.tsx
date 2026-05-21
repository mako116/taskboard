import { CheckCircle2, Clock, ListTodo, TrendingUp } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAppSelector } from "@/store/hooks";
import { selectStats } from "@/store/selectors";

export function SummaryCards() {
  const stats = useAppSelector(selectStats);

  const items = [
    {
      label: "Total tasks",
      value: stats.total,
      Icon: ListTodo,
      tint: "text-sky-500",
    },
    {
      label: "In progress",
      value: stats.inProgress,
      Icon: Clock,
      tint: "text-amber-500",
    },
    {
      label: "Completed",
      value: stats.completed,
      Icon: CheckCircle2,
      tint: "text-emerald-500",
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(({ label, value, Icon, tint }) => (
        <Card key={label}>
          <CardContent className="flex items-center justify-between ">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-600 dark:text-gray-400">
                {label}
              </p>
              <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                {value}
              </p>
            </div>
            <Icon className={`h-7 w-7 ${tint}`} />
          </CardContent>
        </Card>
      ))}

      <Card>
        <CardContent className="p-0">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-wide text-gray-600 dark:text-gray-400">
              Productivity
            </p>
            <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
            {stats.completionRate}%
          </p>
          <Progress value={stats.completionRate} className="mt-2 h-1.5" />
        </CardContent>
      </Card>
    </div>
  );
}
