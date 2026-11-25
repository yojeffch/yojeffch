"use client";

import { cn } from "@/lib/utils";
import type { ChoiceOption } from "@/types/assessment";
import { motion } from "motion/react";

interface ChoiceCardsProps {
  name: string;
  options: ChoiceOption[];
  value: string | null;
  onChange: (value: string) => void;
}

export function ChoiceCards({
  name,
  options,
  value,
  onChange,
}: ChoiceCardsProps) {
  return (
    <div className="grid gap-2.5" role="radiogroup" aria-label={name}>
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <motion.button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            whileTap={{ scale: 0.985 }}
            onClick={() => onChange(option.value)}
            className={cn(
              "flex min-h-14 items-center justify-between gap-3 rounded-lg border px-4 py-3.5 text-left text-base transition-colors",
              selected
                ? "border-olive bg-olive text-primary-foreground shadow-[inset_0_-3px_0_0_var(--color-gold)]"
                : "border-charcoal/15 bg-surface text-charcoal hover:border-olive/40 hover:bg-surface-muted",
            )}
          >
            <span className="font-medium capitalize">{option.label}</span>
            <span
              className={cn(
                "flex size-6 items-center justify-center rounded-full border text-xs",
                selected
                  ? "border-gold bg-gold text-charcoal"
                  : "border-charcoal/20 text-transparent",
              )}
              aria-hidden
            >
              ✓
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
