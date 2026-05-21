export function Card({ className = "", ...props }: any) {
  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950 ${className}`}
      {...props}
    />
  );
}

export function CardHeader({ className = "", ...props }: any) {
  return (
    <div className={`mb-4 ${className}`} {...props} />
  );
}

export function CardTitle({ className = "", ...props }: any) {
  return (
    <h2 className={`text-lg font-semibold ${className}`} {...props} />
  );
}

export function CardDescription({ className = "", ...props }: any) {
  return (
    <p className={`text-sm text-gray-600 dark:text-gray-400 ${className}`} {...props} />
  );
}

export function CardContent({ className = "", ...props }: any) {
  return (
    <div className={`${className}`} {...props} />
  );
}

export function CardFooter({ className = "", ...props }: any) {
  return (
    <div className={`mt-6 flex items-center justify-between ${className}`} {...props} />
  );
}
