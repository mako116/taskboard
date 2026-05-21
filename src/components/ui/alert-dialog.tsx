import { ReactNode, createContext, useContext, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { buttonVariants } from "./button";

interface DialogContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

interface AlertDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

export function AlertDialog({ open: controlledOpen, onOpenChange, children }: AlertDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  
  const setOpen = (newOpen: boolean) => {
    if (isControlled) {
      onOpenChange?.(newOpen);
    } else {
      setInternalOpen(newOpen);
    }
  };

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
}

function useDialog() {
  const context = useContext(DialogContext);
  if (!context) throw new Error("useDialog must be used within AlertDialog");
  return context;
}

export const AlertDialogTrigger = ({ children, asChild, ...props }: any) => {
  const { setOpen } = useDialog();

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      {...props}
    >
      {children}
    </button>
  );
};

export const AlertDialogPortal = ({ children }: { children: ReactNode }) => {
  const { open } = useDialog();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !open) return null;
  return createPortal(children, document.body);
};

export const AlertDialogOverlay = ({ className = "", ...props }: any) => {
  const { setOpen } = useDialog();

  return (
    <div
      className={`fixed inset-0 z-40 bg-black/50 ${className}`}
      onClick={() => setOpen(false)}
      {...props}
    />
  );
};

export const AlertDialogContent = ({ children, className = "", ...props }: any) => {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <div
        className={`fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-800 dark:bg-gray-950 ${className}`}
        {...props}
      >
        {children}
      </div>
    </AlertDialogPortal>
  );
};

export const AlertDialogHeader = ({ className = "", ...props }: any) => (
  <div className={`mb-4 ${className}`} {...props} />
);

export const AlertDialogFooter = ({ className = "", ...props }: any) => (
  <div className={`mt-6 flex gap-2 sm:justify-end ${className}`} {...props} />
);

export const AlertDialogTitle = ({ className = "", ...props }: any) => (
  <h2 className={`text-lg font-semibold ${className}`} {...props} />
);

export const AlertDialogDescription = ({ className = "", ...props }: any) => (
  <p className={`text-sm text-gray-600 dark:text-gray-400 ${className}`} {...props} />
);

export const AlertDialogAction = ({ onClick, className = "", ...props }: any) => {
  const { setOpen } = useDialog();

  return (
    <button
      type="button"
      onClick={(e) => {
        onClick?.(e);
        setOpen(false);
      }}
      className={buttonVariants({ className })}
      {...props}
    />
  );
};

export const AlertDialogCancel = ({ onClick, className = "", ...props }: any) => {
  const { setOpen } = useDialog();

  return (
    <button
      type="button"
      onClick={(e) => {
        onClick?.(e);
        setOpen(false);
      }}
      className={buttonVariants({ variant: "outline", className })}
      {...props}
    />
  );
};
