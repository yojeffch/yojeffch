import { cn } from "@/lib/utils";
import type { TextareaHTMLAttributes } from "react";

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-32 w-full resize-y rounded-md border border-charcoal/15 bg-surface px-3.5 py-3 text-base text-charcoal placeholder:text-charcoal/40 transition-colors focus:border-olive focus:outline-none focus-visible:ring-2 focus-visible:ring-olive/30",
        className,
      )}
      {...props}
    />
  );
}
