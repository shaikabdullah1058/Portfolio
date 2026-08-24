"use client";

import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-text-primary text-bg-primary hover:opacity-85 border border-text-primary",
  secondary:
    "bg-transparent text-text-primary border border-border hover:border-text-primary",
  ghost:
    "bg-transparent text-text-secondary hover:text-text-primary border border-transparent",
};

export default function Button({
  as: Comp = "button",
  variant = "primary",
  className,
  children,
  ...props
}) {
  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-sm px-5 py-2.5 text-sm font-medium tracking-tight transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-2",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
