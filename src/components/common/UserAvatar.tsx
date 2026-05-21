// import { colorForId, initialsOf } from "@/lib/avatar";

import { colorForId ,initialsOf} from "@/constant/avatarColors";

interface Props {
  userId: number;
  name?: string;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  xs: "h-5 w-5 text-[10px]",
  sm: "h-7 w-7 text-xs",
  md: "h-9 w-9 text-sm",
  lg: "h-12 w-12 text-base",
};

export function UserAvatar({ userId, name, size = "sm", className }: Props) {
  return (
    <div
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white ring-2 ring-background ${colorForId(userId)} ${sizes[size]} ${className || ""}`}
      title={name}
      aria-label={name}
    >
      {name ? initialsOf(name) : "?"}
    </div>
  );
}
