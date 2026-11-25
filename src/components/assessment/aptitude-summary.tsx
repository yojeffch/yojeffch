"use client";

import { aptitudeQuestionIds } from "@/lib/mocks/chapter-2";
import {
  APTITUDE_ORDER,
  bandLabel,
  rankAptitudes,
  sumAptitude,
} from "@/lib/scoring/aptitudes";
import type { AnswerMap } from "@/types/assessment";

interface AptitudeSummaryProps {
  answers: AnswerMap;
  body?: string;
}

export function AptitudeSummary({ answers, body }: AptitudeSummaryProps) {
  const totals = Object.fromEntries(
    APTITUDE_ORDER.map((key) => [
      key,
      sumAptitude(answers, aptitudeQuestionIds(key)),
    ]),
  );

  const ranked = rankAptitudes(totals);
  const topThree = ranked.slice(0, 3);

  return (
    <section className="space-y-5 rounded-lg border border-charcoal/10 bg-surface px-4 py-5 shadow-[var(--shadow-soft)] sm:px-5">
      <div className="space-y-1">
        <h2 className="font-display text-2xl text-charcoal">
          Seu resultado de aptidões
        </h2>
        {body ? (
          <p className="text-sm text-charcoal/70">{body}</p>
        ) : (
          <p className="text-sm text-charcoal/70">
            Totais de 5 a 25 pontos, ranqueados do maior para o menor — conforme o
            ebook.
          </p>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium uppercase tracking-wide text-olive">
          Suas três aptidões mais fortes
        </h3>
        <ol className="space-y-2">
          {topThree.map((item) => (
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
                style={{
                  width: `${(item.total / 25) * 100}%`,
                  backgroundImage:
                    item.rank <= 3
                      ? "linear-gradient(90deg, var(--color-olive), color-mix(in srgb, var(--color-gold) 55%, var(--color-olive)))"
                      : undefined,
                }}
              />
            </div>
            <p className="text-xs text-charcoal/60">{bandLabel(item.band)}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
