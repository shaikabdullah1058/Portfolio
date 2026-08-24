import { cn } from "@/lib/utils";

export default function Badge({ children, className, solid = false }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider",
        solid
          ? "border-text-primary bg-text-primary text-bg-primary"
          : "border-border text-text-secondary",
        className
      )}
    >
      {children}
    </span>
  );
}
