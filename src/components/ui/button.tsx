import { forwardRef } from "react";

export type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
export type ButtonSize = "default" | "sm" | "lg" | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variants: Record<ButtonVariant, string> = {
  default: "bg-blue-600 text-white hover:bg-blue-700",
  destructive: "bg-red-600 text-white hover:bg-red-700",
  outline: "border border-gray-300 text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-800",
  secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100",
  ghost: "hover:bg-gray-100 dark:hover:bg-gray-800",
  link: "text-blue-600 underline hover:text-blue-700 dark:text-blue-400",
};

const sizes: Record<ButtonSize, string> = {
  default: "h-9 px-4 py-2",
  sm: "h-8 px-3 text-sm rounded-md",
  lg: "h-10 px-8 rounded-md",
  icon: "h-9 w-9",
};

export const buttonVariants = ({ variant = "default", size = "default", className = "" }: { variant?: ButtonVariant | null; size?: ButtonSize | null; className?: string } = {}) => {
  const base = "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium cursor-pointer transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
  return `${base} ${variants[variant || "default"]} ${sizes[size || "default"]} ${className}`.trim();
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
