export type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}

const variants: Record<BadgeVariant, string> = {
  default: "bg-blue-600 text-white",
  secondary: "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100",
  destructive: "bg-red-600 text-white",
  outline: "border border-gray-300 text-gray-900 dark:border-gray-600 dark:text-gray-100",
};

export function Badge({ className = "", variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
