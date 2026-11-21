"use client";

import { cn } from "@/lib/utils";
import type { ChapterId, ChapterMeta } from "@/types/assessment";
import Link from "next/link";

interface ChapterProgressProps {
  chapters: ChapterMeta[];
  currentChapterId: ChapterId;
  stepIndex: number;
  stepTotal: number;
}

export function ChapterProgress({
  chapters,
  currentChapterId,
  stepIndex,
  stepTotal,
}: ChapterProgressProps) {
  const overall = ((currentChapterId - 1) / 7) * 100 + (stepIndex / Math.max(stepTotal, 1) / 7) * 100;

  return (
    <div className="space-y-3">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="font-display text-sm tracking-wide text-olive">
            Capítulo {currentChapterId} de 7
          </p>
          <p className="text-sm text-charcoal/70">
            Bloco {Math.min(stepIndex + 1, stepTotal)} de {stepTotal}
          </p>
        </div>
        <p className="text-xs text-charcoal/55 tabular-nums">
          {Math.round(overall)}%
        </p>
      </div>

      <div
        className="h-1.5 overflow-hidden rounded-full bg-surface-muted"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(overall)}
        aria-label="Progresso geral do mapa"
      >
        <div
          className="h-full rounded-full bg-olive transition-[width] duration-300 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, overall))}%` }}
        />
      </div>

      <nav aria-label="Capítulos" className="flex gap-1.5 overflow-x-auto pb-1">
        {chapters.map((chapter) => {
          const active = chapter.id === currentChapterId;
          return (
            <Link
              key={chapter.id}
              href={`/assessment/${chapter.id}`}
              className={cn(
                "inline-flex min-h-10 min-w-10 shrink-0 items-center justify-center rounded-md border text-sm transition-colors",
                active
                  ? "border-olive bg-olive text-primary-foreground"
                  : "border-charcoal/15 bg-surface text-charcoal/80 hover:border-olive/40 hover:bg-surface-muted",
                !chapter.interactive && !active && "opacity-60",
              )}
              aria-current={active ? "step" : undefined}
              title={chapter.title}
            >
              {chapter.id}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
