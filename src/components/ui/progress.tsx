import { forwardRef } from "react";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
}

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, ...props }, ref) => (
    <div
      ref={ref}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
      className={`relative h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 ${className || ""}`}
      {...props}
    >
      <div
        className="h-full bg-blue-600 transition-all"
        style={{ width: `${value || 0}%` }}
      />
    </div>
  )
);
Progress.displayName = "Progress";

export { Progress };
