"use client";

import {
  MONTHS_PT,
  daysInMonth,
  formatDatePtBr,
  parseIsoDate,
  toIsoDate,
} from "@/lib/brazil";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useRef } from "react";

interface DateWheelPickerProps {
  id?: string;
  value: string | null;
  onChange: (isoDate: string) => void;
  minYear?: number;
  maxYear?: number;
}

function Column({
  label,
  values,
  selected,
  onSelect,
  format = (n: number) => String(n),
}: {
  label: string;
  values: number[];
  selected: number;
  onSelect: (n: number) => void;
  format?: (n: number) => string;
}) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = listRef.current;
    if (!root) return;
    const el = root.querySelector<HTMLButtonElement>(`[data-value="${selected}"]`);
    el?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [selected]);

  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <p className="mb-2 text-center text-xs font-medium uppercase tracking-[0.12em] text-olive">
        {label}
      </p>
      <div
        ref={listRef}
        role="listbox"
        aria-label={label}
        tabIndex={0}
        className="relative h-44 overflow-y-auto overscroll-contain rounded-md border border-charcoal/10 bg-surface snap-y snap-mandatory scroll-smooth"
        onKeyDown={(event) => {
          const idx = values.indexOf(selected);
          if (event.key === "ArrowDown" || event.key === "ArrowRight") {
            event.preventDefault();
            onSelect(values[Math.min(values.length - 1, idx + 1)] ?? selected);
          }
          if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
            event.preventDefault();
            onSelect(values[Math.max(0, idx - 1)] ?? selected);
          }
        }}
      >
        <div className="pointer-events-none absolute inset-x-1 top-1/2 z-10 h-10 -translate-y-1/2 rounded-md border border-gold/50 bg-gold/10" />
        <div className="flex flex-col py-[72px]">
          {values.map((n) => {
            const active = n === selected;
            return (
              <button
                key={n}
                type="button"
                role="option"
                data-value={n}
                aria-selected={active}
                onClick={() => onSelect(n)}
                className={cn(
                  "snap-center px-2 py-2 text-center text-base transition-colors",
                  active
                    ? "relative z-20 font-semibold text-charcoal"
                    : "text-charcoal/45 hover:text-charcoal/80",
                )}
              >
                {format(n)}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function DateWheelPicker({
  id,
  value,
  onChange,
  minYear = 1995,
  maxYear = new Date().getFullYear(),
}: DateWheelPickerProps) {
  const now = new Date();
  const parsed = parseIsoDate(typeof value === "string" ? value : null);
  const year = parsed?.year ?? 2008;
  const month = parsed?.month ?? 1;
  const maxDay = daysInMonth(year, month - 1);
  const day = Math.min(parsed?.day ?? 1, maxDay);

  const years = useMemo(() => {
    const list: number[] = [];
    for (let y = maxYear; y >= minYear; y -= 1) list.push(y);
    return list;
  }, [minYear, maxYear]);

  const months = useMemo(() => Array.from({ length: 12 }, (_, i) => i + 1), []);
  const days = useMemo(
    () => Array.from({ length: maxDay }, (_, i) => i + 1),
    [maxDay],
  );

  function commit(nextDay: number, nextMonth: number, nextYear: number) {
    const capped = Math.min(nextDay, daysInMonth(nextYear, nextMonth - 1));
    onChange(toIsoDate(capped, nextMonth, nextYear));
  }

  const display = formatDatePtBr(toIsoDate(day, month, year));
  const hasSavedValue = Boolean(parsed);

  return (
    <div id={id} className="space-y-3">
      <div className="flex items-center justify-between gap-3 rounded-md border border-charcoal/10 bg-surface-muted/70 px-3.5 py-3">
        <div>
          <p className="text-xs uppercase tracking-[0.1em] text-charcoal/55">
            {hasSavedValue ? "Selecionado" : "Toque nas colunas"}
          </p>
          <p className="font-display text-xl text-charcoal tabular-nums">
            {display}
          </p>
        </div>
        <button
          type="button"
          className="rounded-full bg-olive px-2.5 py-1 text-xs font-medium text-primary-foreground"
          onClick={() => commit(day, month, year)}
        >
          Usar esta data
        </button>
      </div>

      <div className="flex gap-2">
        <Column
          label="Dia"
          values={days}
          selected={day}
          onSelect={(d) => commit(d, month, year)}
        />
        <Column
          label="Mês"
          values={months}
          selected={month}
          format={(m) => MONTHS_PT[m - 1]}
          onSelect={(m) => commit(day, m, year)}
        />
        <Column
          label="Ano"
          values={years}
          selected={year}
          onSelect={(y) => commit(day, month, y)}
        />
      </div>

      <p className="text-xs text-charcoal/55">
        Deslize ou use as setas do teclado. Hoje:{" "}
        {formatDatePtBr(
          toIsoDate(now.getDate(), now.getMonth() + 1, now.getFullYear()),
        )}
        .
      </p>
    </div>
  );
}
