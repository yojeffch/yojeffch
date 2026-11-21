import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "min-h-11 w-full rounded-md border border-charcoal/15 bg-surface px-3.5 py-2.5 text-base text-charcoal placeholder:text-charcoal/40 transition-colors focus:border-olive focus:outline-none focus-visible:ring-2 focus-visible:ring-olive/30",
        className,
      )}
      {...props}
    />
  );
}
