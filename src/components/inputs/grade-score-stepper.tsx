"use client";

import { cn } from "@/lib/utils";

interface GradeScoreStepperProps {
  id?: string;
  value: string | null;
  onChange: (value: string) => void;
}

const PRESETS = ["5", "6", "7", "8", "9", "10"];

export function GradeScoreStepper({
  id,
  value,
  onChange,
}: GradeScoreStepperProps) {
  const current = typeof value === "string" ? value : "";

  return (
    <div id={id} className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((n) => {
          const selected = current === n;
          return (
            <button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              className={cn(
                "flex size-12 items-center justify-center rounded-md border text-lg font-medium tabular-nums transition-colors",
                selected
                  ? "border-olive bg-olive text-primary-foreground shadow-[inset_0_-2px_0_0_var(--color-gold)]"
                  : "border-charcoal/15 bg-surface text-charcoal hover:border-gold/50",
              )}
            >
              {n}
            </button>
          );
        })}
      </div>
      <label className="block space-y-1.5 text-sm text-charcoal/70">
        Outra nota
        <input
          type="text"
          inputMode="decimal"
          value={PRESETS.includes(current) ? "" : current}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Ex.: 7,5"
          className="min-h-11 w-full rounded-md border border-charcoal/15 bg-surface px-3.5 py-2.5 text-base text-charcoal placeholder:text-charcoal/40 focus:border-olive focus:outline-none focus-visible:ring-2 focus-visible:ring-olive/30"
        />
      </label>
    </div>
  );
}
