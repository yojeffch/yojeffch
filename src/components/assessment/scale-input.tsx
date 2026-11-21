"use client";

import { cn } from "@/lib/utils";

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
}

export function ScaleInput({
  name,
  value,
  onChange,
  disabled,
}: ScaleInputProps) {
  return (
    <fieldset className="space-y-3" disabled={disabled}>
      <legend className="sr-only">Escala de 1 a 5</legend>
      <div className="grid grid-cols-5 gap-2">
        {[1, 2, 3, 4, 5].map((n) => {
          const selected = value === n;
          return (
            <label
              key={n}
              className={cn(
                "relative flex min-h-14 cursor-pointer flex-col items-center justify-center rounded-md border px-1 py-2 text-center transition-colors",
                selected
                  ? "border-olive bg-olive text-primary-foreground"
                  : "border-charcoal/15 bg-surface text-charcoal hover:border-olive/50 hover:bg-surface-muted",
              )}
            >
              <input
                type="radio"
                className="sr-only"
                name={name}
                value={n}
                checked={selected}
                onChange={() => onChange(n)}
              />
              <span className="text-lg font-medium tabular-nums">{n}</span>
            </label>
          );
        })}
      </div>
      {value != null && (
        <p className="text-sm text-charcoal/70">{LABELS[value]}</p>
      )}
    </fieldset>
  );
}
