import { cn } from "@/lib/utils";
import { forwardRef, type InputHTMLAttributes } from "react";

const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-xl border border-secondary/20 bg-white px-4 py-2.5 text-secondary-800 placeholder:text-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";
export default Input;
