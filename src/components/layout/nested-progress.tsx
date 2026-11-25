"use client";

import { cn } from "@/lib/utils";
import type { ActDefinition, Beat, ChapterMeta } from "@/types/assessment";
import { motion } from "motion/react";
import Link from "next/link";

interface NestedProgressProps {
  chapters: ChapterMeta[];
  act: ActDefinition;
  beat: Beat;
  beatIndexInAct: number;
  answerBeatsDone: number;
  answerBeatsTotal: number;
}

export function NestedProgress({
  chapters,
  act,
  beat,
  beatIndexInAct,
  answerBeatsDone,
  answerBeatsTotal,
}: NestedProgressProps) {
  const actPct =
    answerBeatsTotal === 0
      ? 0
      : Math.min(100, Math.round((answerBeatsDone / answerBeatsTotal) * 100));

  const burstLabel =
    beat.kind === "question" && beat.burstLabel
      ? `${beat.burstLabel} · ${beat.burstIndex}/${beat.burstTotal}`
      : beat.kind === "cluster"
        ? beat.label
        : null;

  return (
    <div className="space-y-3">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="font-display text-sm tracking-wide text-olive">
            {act.title}
          </p>
          <p className="text-sm text-charcoal/70">
            {act.subtitle ?? `Capítulo ${act.chapterId}`}
            {burstLabel ? ` · ${burstLabel}` : null}
          </p>
        </div>
        <p className="text-xs tabular-nums text-charcoal/55">
          {answerBeatsDone}/{answerBeatsTotal}
        </p>
      </div>

      <div
        className="h-1.5 overflow-hidden rounded-full bg-surface-muted"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={actPct}
        aria-label="Progresso desta parte"
      >
        <motion.div
          className="h-full rounded-full bg-olive"
          layout
          initial={false}
          animate={{ width: `${actPct}%` }}
          transition={{ type: "spring", visualDuration: 0.35, bounce: 0.12 }}
        />
      </div>

      {beat.kind === "question" && beat.burstTotal ? (
        <div className="flex gap-1">
          {Array.from({ length: beat.burstTotal }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1 flex-1 rounded-full",
                i < (beat.burstIndex ?? 0)
                  ? "bg-gold"
                  : "bg-surface-muted",
              )}
            />
          ))}
        </div>
      ) : null}

      <nav aria-label="Capítulos" className="flex gap-1.5 overflow-x-auto pb-1">
        {chapters.map((chapter) => {
          const active = chapter.id === act.chapterId;
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

      <p className="sr-only">
        Passo {beatIndexInAct + 1} desta parte.
      </p>
    </div>
  );
}
