import { cn } from "@/lib/utils";

export function PageShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto max-w-6xl px-6 md:px-10 lg:px-14 py-20 md:py-28",
        className
      )}
    >
      {children}
    </div>
  );
}
