"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AgeStepperProps {
  id?: string;
  value: string | number | null;
  onChange: (value: string) => void;
  min?: number;
  max?: number;
  hint?: string | null;
}

export function AgeStepper({
  id,
  value,
  onChange,
  min = 10,
  max = 25,
  hint,
}: AgeStepperProps) {
  const numeric =
    typeof value === "number"
      ? value
      : typeof value === "string" && value.trim()
        ? Number(value)
        : NaN;
  const age = Number.isFinite(numeric) ? numeric : 16;

  function setAge(next: number) {
    const clamped = Math.min(max, Math.max(min, next));
    onChange(String(clamped));
  }

  return (
    <div id={id} className="space-y-3">
      <div className="flex items-center justify-center gap-4 rounded-lg border border-charcoal/10 bg-surface px-4 py-5 shadow-[var(--shadow-soft)]">
        <Button
          type="button"
          variant="secondary"
          aria-label="Diminuir idade"
          className="size-12 shrink-0 rounded-full px-0 text-xl"
          onClick={() => setAge(age - 1)}
        >
          −
        </Button>
        <div className="min-w-[5.5rem] text-center">
          <p
            className={cn(
              "font-display text-5xl tabular-nums leading-none text-charcoal",
            )}
          >
            {age}
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.12em] text-olive">
            anos
          </p>
        </div>
        <Button
          type="button"
          variant="secondary"
          aria-label="Aumentar idade"
          className="size-12 shrink-0 rounded-full px-0 text-xl"
          onClick={() => setAge(age + 1)}
        >
          +
        </Button>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {[14, 15, 16, 17, 18].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setAge(n)}
            className={cn(
              "min-h-10 min-w-12 rounded-md border px-3 text-sm transition-colors",
              age === n
                ? "border-olive bg-olive text-primary-foreground"
                : "border-charcoal/15 bg-surface text-charcoal hover:border-gold/60",
            )}
          >
            {n}
          </button>
        ))}
      </div>

      {hint ? <p className="text-sm text-charcoal/65">{hint}</p> : null}
    </div>
  );
}
