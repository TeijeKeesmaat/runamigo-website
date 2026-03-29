import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "accent" | "outline";
}

export default function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        {
          "bg-secondary/10 text-secondary": variant === "default",
          "bg-primary/10 text-primary-600": variant === "primary",
          "bg-accent/10 text-accent-700": variant === "accent",
          "border border-secondary/20 text-secondary-600": variant === "outline",
        },
        className
      )}
      {...props}
    />
  );
}
