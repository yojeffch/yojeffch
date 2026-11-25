"use client";

import { Input } from "@/components/ui/input";
import {
  POPULAR_UF,
  UF_LIST,
  formatPlace,
  parsePlace,
  type UfCode,
} from "@/lib/brazil";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

interface PlacePickerProps {
  id?: string;
  value: string | null;
  onChange: (value: string) => void;
}

export function PlacePicker({ id, value, onChange }: PlacePickerProps) {
  const parsed = parsePlace(typeof value === "string" ? value : "");
  const [showAllUf, setShowAllUf] = useState(
    Boolean(parsed.uf && !POPULAR_UF.includes(parsed.uf as UfCode)),
  );

  const ufOptions = useMemo(
    () => (showAllUf ? [...UF_LIST] : POPULAR_UF),
    [showAllUf],
  );

  function setCity(city: string) {
    onChange(formatPlace(city, parsed.uf));
  }

  function setUf(uf: string) {
    onChange(formatPlace(parsed.city, uf));
  }

  return (
    <div id={id} className="space-y-4">
      <div className="space-y-2">
        <p className="text-sm font-medium text-charcoal">Estado (UF)</p>
        <div className="flex flex-wrap gap-2">
          {ufOptions.map((uf) => {
            const selected = parsed.uf === uf;
            return (
              <button
                key={uf}
                type="button"
                onClick={() => setUf(uf)}
                className={cn(
                  "min-h-11 min-w-12 rounded-md border px-3 text-sm font-medium transition-colors",
                  selected
                    ? "border-olive bg-olive text-primary-foreground shadow-[inset_0_-2px_0_0_var(--color-gold)]"
                    : "border-charcoal/15 bg-surface text-charcoal hover:border-gold/50 hover:bg-surface-muted",
                )}
              >
                {uf}
              </button>
            );
          })}
          {!showAllUf ? (
            <button
              type="button"
              onClick={() => setShowAllUf(true)}
              className="min-h-11 rounded-md border border-dashed border-charcoal/25 px-3 text-sm text-charcoal/70 hover:border-olive/40"
            >
              Mais UFs
            </button>
          ) : null}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor={`${id ?? "place"}-city`} className="text-sm font-medium text-charcoal">
          Cidade
        </label>
        <Input
          id={`${id ?? "place"}-city`}
          value={parsed.city}
          onChange={(event) => setCity(event.target.value)}
          placeholder="Ex.: Salvador"
          autoComplete="address-level2"
        />
      </div>

      {parsed.city || parsed.uf ? (
        <p className="rounded-md bg-surface-muted/80 px-3 py-2 text-sm text-charcoal/75">
          {formatPlace(parsed.city, parsed.uf) || "—"}
        </p>
      ) : null}
    </div>
  );
}
