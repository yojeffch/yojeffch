"use client";

import {
  computeInterestTotals,
  rankInterests,
} from "@/lib/scoring/interests";
import type { AnswerMap } from "@/types/assessment";

interface InterestSummaryProps {
  answers: AnswerMap;
  body?: string;
}

export function InterestSummary({ answers, body }: InterestSummaryProps) {
  const totals = computeInterestTotals(answers);
  const ranked = rankInterests(totals);
  const top = ranked.slice(0, 3);

  return (
    <section className="space-y-5 rounded-lg border border-charcoal/10 bg-surface px-4 py-5 shadow-[var(--shadow-soft)] sm:px-5">
      <div className="space-y-1">
        <h2 className="font-display text-2xl text-charcoal">
          Seu resultado de interesses
        </h2>
        {body ? (
          <p className="text-sm text-charcoal/70">{body}</p>
        ) : (
          <p className="text-sm text-charcoal/70">
            Totais de 6 a 30 pontos — conforme o ebook.
          </p>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium uppercase tracking-wide text-olive">
          Áreas mais fortes
        </h3>
        <ol className="space-y-2">
          {top.map((item) => (
            <li
              key={item.key}
              className="flex items-baseline justify-between gap-3 border-b border-charcoal/10 pb-2"
            >
              <span>
                {item.rank}. {item.label}
              </span>
              <span className="tabular-nums text-charcoal/70">
                {item.total} pts
              </span>
            </li>
          ))}
        </ol>
      </div>

      <ul className="space-y-3">
        {ranked.map((item) => (
          <li key={item.key} className="space-y-1.5">
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span>
                #{item.rank} {item.label}
              </span>
              <span className="tabular-nums">{item.total}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-surface-muted">
              <div
                className="h-full rounded-full bg-olive"
                style={{ width: `${(item.total / 30) * 100}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
