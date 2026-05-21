import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface DialogContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

export function Dialog({ open: controlledOpen, onOpenChange, children }: DialogProps) {
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
  if (!context) throw new Error("useDialog must be used within Dialog");
  return context;
}

export const DialogTrigger = ({ children, ...props }: any) => {
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

export const DialogPortal = ({ children }: { children: ReactNode }) => {
  const { open } = useDialog();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !open) return null;
  return createPortal(children, document.body);
};

export const DialogOverlay = ({ className = "", ...props }: any) => {
  const { setOpen } = useDialog();
  return (
    <div
      className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm ${className}`}
      onClick={() => setOpen(false)}
      {...props}
    />
  );
};

export const DialogContent = ({ children, className = "", ...props }: any) => {
  const { setOpen } = useDialog();
  return (
    <DialogPortal>
      <DialogOverlay />
      <div
        className={`fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-800 dark:bg-gray-950 ${className}`}
        {...props}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 transition-opacity focus:outline-none"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        {children}
      </div>
    </DialogPortal>
  );
};

export const DialogHeader = ({ className = "", ...props }: any) => (
  <div className={`mb-4 ${className}`} {...props} />
);

export const DialogFooter = ({ className = "", ...props }: any) => (
  <div className={`mt-6 flex gap-2 sm:justify-end ${className}`} {...props} />
);

export const DialogTitle = ({ className = "", ...props }: any) => (
  <h2 className={`text-lg font-semibold ${className}`} {...props} />
);

export const DialogDescription = ({ className = "", ...props }: any) => (
  <p className={`text-sm text-gray-600 dark:text-gray-400 ${className}`} {...props} />
);

export const DialogClose = ({ onClick, className = "", ...props }: any) => {
  const { setOpen } = useDialog();
  return (
    <button
      type="button"
      onClick={(e) => {
        onClick?.(e);
        setOpen(false);
      }}
      className={className}
      {...props}
    />
  );
};
