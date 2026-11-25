"use client";

import { Input } from "@/components/ui/input";
import { SCHOOL_YEAR_OPTIONS } from "@/lib/brazil";
import { cn } from "@/lib/utils";

interface SchoolYearPickerProps {
  id?: string;
  value: string | null;
  onChange: (value: string) => void;
}

export function SchoolYearPicker({
  id,
  value,
  onChange,
}: SchoolYearPickerProps) {
  const current = typeof value === "string" ? value : "";
  const isPreset = (SCHOOL_YEAR_OPTIONS as readonly string[]).includes(current);
  const isOther =
    Boolean(current) && !isPreset && current !== "Outro";

  return (
    <div id={id} className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {SCHOOL_YEAR_OPTIONS.map((option) => {
          const selected =
            option === "Outro"
              ? current === "Outro" || isOther
              : current === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option === "Outro" ? (isOther ? current : "Outro") : option)}
              className={cn(
                "min-h-11 rounded-md border px-3.5 text-sm transition-colors",
                selected
                  ? "border-olive bg-olive text-primary-foreground"
                  : "border-charcoal/15 bg-surface text-charcoal hover:border-gold/50",
              )}
            >
              {option}
            </button>
          );
        })}
      </div>

      {(current === "Outro" || isOther) && (
        <Input
          value={isOther ? current : ""}
          onChange={(event) => onChange(event.target.value || "Outro")}
          placeholder="Descreva o ano/série"
          autoComplete="off"
        />
      )}
    </div>
  );
}
