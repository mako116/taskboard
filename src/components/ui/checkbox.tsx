import { forwardRef } from "react";
import { Check } from "lucide-react";

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, onCheckedChange, ...props }, ref) => {
    return (
      <div className={`relative flex h-4 w-4 items-center justify-center rounded border border-blue-600 cursor-pointer ${checked ? 'bg-blue-600' : 'bg-white dark:bg-gray-800'} ${className || ""}`}>
        <input
          type="checkbox"
          ref={ref}
          checked={checked}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          {...props}
        />
        {checked && <Check className="h-3 w-3 text-white z-10" />}
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
