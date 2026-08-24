import { cn } from "@/lib/utils";

export default function Card({ children, className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-sm border border-border bg-bg-secondary transition-all duration-300 ease-out",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
