"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

const LABELS: Record<number, string> = {
  1: "Não tem nada a ver comigo",
  2: "Tem pouco a ver comigo",
  3: "Às vezes sou assim",
  4: "Tem bastante a ver comigo",
  5: "Sou exatamente assim",
};

interface ScaleInputProps {
  name: string;
  value: number | null;
  onChange: (value: number) => void;
  disabled?: boolean;
  confirming?: boolean;
}

export function ScaleInput({
  name: _name,
  value,
  onChange,
  disabled,
  confirming,
}: ScaleInputProps) {
  void _name;
  return (
    <div
      className="space-y-3"
      role="radiogroup"
      aria-label="Escala de 1 a 5"
      aria-disabled={disabled || undefined}
    >
      <div className="grid grid-cols-5 gap-2">
        {[1, 2, 3, 4, 5].map((n) => {
          const selected = value === n;
          return (
            <motion.button
              key={n}
              type="button"
              role="radio"
              disabled={disabled}
              whileTap={disabled ? undefined : { scale: 0.97 }}
              aria-checked={selected}
              aria-label={`${n} — ${LABELS[n]}`}
              onClick={() => onChange(n)}
              className={cn(
                "relative flex min-h-14 flex-col items-center justify-center rounded-md border px-1 py-2 text-center transition-colors",
                selected
                  ? "border-olive bg-olive text-primary-foreground shadow-[inset_0_-3px_0_0_var(--color-gold)]"
                  : "border-charcoal/15 bg-surface text-charcoal hover:border-olive/50 hover:bg-surface-muted",
                confirming && selected && "ring-2 ring-gold/70",
              )}
            >
              <span className="pointer-events-none text-lg font-medium tabular-nums">
                {n}
              </span>
            </motion.button>
          );
        })}
      </div>
      {value != null && (
        <p className="text-sm text-charcoal/70">{LABELS[value]}</p>
      )}
    </div>
  );
}
