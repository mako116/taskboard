import { createContext, useContext, useState } from "react";

interface AvatarContextType {
  hasError: boolean;
  setHasError: (val: boolean) => void;
}

const AvatarContext = createContext<AvatarContextType | undefined>(undefined);

export function Avatar({ className = "", ...props }: any) {
  const [hasError, setHasError] = useState(false);
  return (
    <AvatarContext.Provider value={{ hasError, setHasError }}>
      <div
        className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}
        {...props}
      />
    </AvatarContext.Provider>
  );
}

export function AvatarImage({ className = "", src, alt, ...props }: any) {
  const context = useContext(AvatarContext);
  const hasError = context?.hasError || false;
  const setHasError = context?.setHasError || (() => {});

  if (hasError || !src) return null;
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className={`aspect-square h-full w-full object-cover ${className}`}
      {...props}
    />
  );
}

export function AvatarFallback({ className = "", children, ...props }: any) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
