"use client";

import { AptitudeSummary } from "@/components/assessment/aptitude-summary";
import { InterestSummary } from "@/components/assessment/interest-summary";
import { InterstitialScreen } from "@/components/assessment/interstitial-screen";
import { QuestionField } from "@/components/assessment/question-field";
import { SaveStatusBanner } from "@/components/assessment/save-status-banner";
import { NestedProgress } from "@/components/layout/nested-progress";
import { Button } from "@/components/ui/button";
import { useAssessment } from "@/hooks/use-assessment";
import {
  countAnswerBeats,
  findBeatIndex,
  flattenBeats,
  getAct,
  getActsForChapter,
} from "@/lib/journey/acts";
import { getChapterMetaList, getQuestionById } from "@/lib/mocks/chapters";
import { EASE, MOTION } from "@/lib/motion";
import type {
  ActDefinition,
  AnswerMap,
  AnswerValue,
  Beat,
  ChapterId,
  Question,
} from "@/types/assessment";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

interface ExperienceEngineProps {
  chapterId: ChapterId;
  initialBeatId?: string;
}

function isAnswered(question: Question, value: AnswerValue): boolean {
  if (question.type === "instruction") return true;
  if (value == null) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (typeof value === "number") return value >= 1 && value <= 5;
  return false;
}

function answerBeatsCompleted(act: ActDefinition, answers: AnswerMap): number {
  let done = 0;
  for (const beat of act.beats) {
    if (beat.kind === "question") {
      const q = getQuestionById(beat.questionId);
      if (q && isAnswered(q, answers[beat.questionId] ?? null)) done += 1;
    }
    if (beat.kind === "cluster") {
      const all = beat.questionIds.every((id) => {
        const q = getQuestionById(id);
        return q ? isAnswered(q, answers[id] ?? null) : false;
      });
      if (all) done += 1;
    }
  }
  return done;
}

export function ExperienceEngine({
  chapterId,
  initialBeatId,
}: ExperienceEngineProps) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const {
    state,
    hydrated,
    saveStatus,
    saveMessage,
    setAnswer,
    setAnswers,
    setProgress,
  } = useAssessment();

  const acts = useMemo(() => getActsForChapter(chapterId), [chapterId]);
  const beats = useMemo(() => flattenBeats(chapterId), [chapterId]);
  const chapters = getChapterMetaList();

  const [beatIndex, setBeatIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [clusterDraft, setClusterDraft] = useState<AnswerMap>({});
  const [draft, setDraft] = useState<AnswerValue>(null);
  const [error, setError] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const didResume = useRef(false);
  const beatIndexRef = useRef(0);

  const beat = beats[beatIndex];
  const act = beat ? getAct(beat.actId) : undefined;

  // Stub chapters (3–7): no acts — simple shell
  const isStub = acts.length === 0;

  useEffect(() => {
    didResume.current = false;
    beatIndexRef.current = 0;
    setBeatIndex(0);
  }, [chapterId]);

  useEffect(() => {
    if (didResume.current || !hydrated || beats.length === 0) return;
    didResume.current = true;
    let next = 0;
    if (initialBeatId) {
      const found = findBeatIndex(chapterId, initialBeatId);
      if (found >= 0) next = found;
    } else if (
      state.progress.currentBeatId &&
      state.progress.currentChapterId === chapterId
    ) {
      const found = findBeatIndex(chapterId, state.progress.currentBeatId);
      if (found >= 0) next = found;
    }
    beatIndexRef.current = next;
    setBeatIndex(next);
    // Only resume once per chapter mount from stored progress / URL.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, beats.length, chapterId, initialBeatId]);

  useEffect(() => {
    return () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!beat || !hydrated || !act) return;

    setError(null);
    setConfirming(false);

    if (beat.kind === "question") {
      setDraft(state.answers[beat.questionId] ?? null);
    } else if (beat.kind === "cluster") {
      const next: AnswerMap = {};
      for (const id of beat.questionIds) {
        next[id] = state.answers[id] ?? null;
      }
      setClusterDraft(next);
    }

    setProgress({
      chapterId,
      beatId: beat.id,
      actId: beat.actId,
      questionId: beat.kind === "question" ? beat.questionId : null,
    });

    headingRef.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beat?.id, hydrated, chapterId]);

  function goToIndex(nextIndex: number, dir: number) {
    if (nextIndex < 0) {
      if (chapterId > 1) {
        router.push(`/assessment/${chapterId - 1}`);
      } else {
        router.push("/");
      }
      return;
    }
    if (nextIndex >= beats.length) {
      const nextChapter = Math.min(7, chapterId + 1) as ChapterId;
      router.push(`/assessment/${nextChapter}`);
      return;
    }
    setDirection(dir);
    beatIndexRef.current = nextIndex;
    setBeatIndex(nextIndex);
  }

  function goNext() {
    goToIndex(beatIndexRef.current + 1, 1);
  }

  function goBack() {
    if (advanceTimer.current) {
      clearTimeout(advanceTimer.current);
      advanceTimer.current = null;
      setConfirming(false);
    }
    goToIndex(beatIndexRef.current - 1, -1);
  }

  function handleScaleSelect(question: Question, value: number) {
    setDraft(value);
    setError(null);
    const result = setAnswer(question.id, value);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    setConfirming(true);
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    advanceTimer.current = setTimeout(() => {
      setConfirming(false);
      goNext();
    }, MOTION.likertConfirmMs);
  }

  function handleSingleQuestionContinue(question: Question) {
    if (question.required && !isAnswered(question, draft)) {
      setError("Responda este bloco antes de continuar.");
      return;
    }
    if (question.type !== "instruction") {
      const result = setAnswer(question.id, draft);
      if (!result.ok) {
        setError(result.message);
        return;
      }
    }
    goNext();
  }

  function handleClusterContinue(questionIds: string[]) {
    const patch: AnswerMap = {};
    for (const id of questionIds) {
      const q = getQuestionById(id);
      const value = clusterDraft[id] ?? null;
      if (q?.required && !isAnswered(q, value)) {
        setError("Preencha os campos obrigatórios deste bloco.");
        return;
      }
      patch[id] = value;
    }
    const result = setAnswers(patch);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    goNext();
  }

  if (isStub) {
    return (
      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-6 px-4 py-10 sm:px-6">
        <InterstitialScreen
          title={chapters.find((c) => c.id === chapterId)?.title ?? `Capítulo ${chapterId}`}
          body="Este capítulo estará disponível nas próximas fases. Por enquanto você pode navegar pelos Capítulos 1 e 2."
          ctaLabel={chapterId < 7 ? "Próximo capítulo" : "Voltar ao início"}
          onContinue={() => {
            if (chapterId < 7) router.push(`/assessment/${chapterId + 1}`);
            else router.push("/");
          }}
          variant="act"
        />
        <Button variant="secondary" onClick={() => router.push(`/assessment/${Math.max(1, chapterId - 1)}`)}>
          Voltar
        </Button>
      </div>
    );
  }

  if (!beat || !act) {
    return (
      <div className="mx-auto max-w-xl px-4 py-10 text-charcoal/70">
        Carregando jornada…
      </div>
    );
  }

  const isStory =
    beat.kind === "interstitial" ||
    beat.kind === "act_start" ||
    beat.kind === "act_end";
  const answerTotal = countAnswerBeats(act);
  const answerDone = answerBeatsCompleted(act, state.answers);
  const beatIndexInAct = act.beats.findIndex((b) => b.id === beat.id);

  const showStickyNav =
    beat.kind === "question" || beat.kind === "cluster" || beat.kind === "peak";

  const question =
    beat.kind === "question" ? getQuestionById(beat.questionId) : null;
  const isScale =
    question?.type === "aptitude_scale" || question?.type === "interest_scale";

  const motionInitial = reduceMotion
    ? { opacity: 0 }
    : isStory
      ? { opacity: 0, y: MOTION.slideStory }
      : { opacity: 0, x: direction >= 0 ? MOTION.slideStep : -MOTION.slideStep };
  const motionAnimate = reduceMotion
    ? { opacity: 1 }
    : { opacity: 1, x: 0, y: 0 };
  const motionExit = reduceMotion
    ? { opacity: 0 }
    : isStory
      ? { opacity: 0, y: -MOTION.slideStory / 2 }
      : { opacity: 0, x: direction >= 0 ? -MOTION.slideStep : MOTION.slideStep };

  return (
    <div className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-5 px-4 pb-28 pt-6 sm:px-6">
      <header className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-olive">Capítulo {chapterId}</p>
            <h1
              ref={headingRef}
              tabIndex={-1}
              className="font-display text-2xl leading-tight text-charcoal outline-none sm:text-3xl"
            >
              {act.title}
            </h1>
          </div>
          <Link
            href="/"
            className="text-sm text-charcoal/65 underline-offset-4 hover:text-charcoal hover:underline"
          >
            Início
          </Link>
        </div>
        <NestedProgress
          chapters={chapters}
          act={act}
          beat={beat}
          beatIndexInAct={Math.max(0, beatIndexInAct)}
          answerBeatsDone={answerDone}
          answerBeatsTotal={answerTotal}
        />
        <SaveStatusBanner status={saveStatus} message={saveMessage} />
        {!hydrated ? (
          <p className="text-sm text-charcoal/60">Carregando rascunho local…</p>
        ) : (
          <p className="text-xs text-charcoal/55">
            Pode voltar e editar a qualquer momento. O rascunho fica neste
            aparelho.
          </p>
        )}
      </header>

      <AnimatePresence mode="wait">
        <motion.div
          key={beat.id}
          initial={motionInitial}
          animate={motionAnimate}
          exit={motionExit}
          transition={{
            duration: reduceMotion
              ? 0.01
              : isStory
                ? MOTION.emphasis
                : MOTION.base,
            ease: [...EASE.enter],
          }}
          className="space-y-6"
        >
          {(beat.kind === "act_start" || beat.kind === "act_end") && (
            <InterstitialScreen
              title={beat.title}
              body={beat.body}
              variant="act"
              ctaLabel={beat.kind === "act_end" ? "Continuar" : "Começar"}
              onContinue={goNext}
              onBack={goBack}
            />
          )}

          {beat.kind === "interstitial" && (
            <InterstitialScreen
              title={beat.title}
              body={beat.body}
              onContinue={goNext}
              onBack={goBack}
            />
          )}

          {beat.kind === "peak" && (
            <div className="space-y-6">
              {beat.peak === "aptitudes" ? (
                <AptitudeSummary answers={state.answers} body={beat.body} />
              ) : (
                <InterestSummary answers={state.answers} body={beat.body} />
              )}
            </div>
          )}

          {beat.kind === "cluster" && (
            <div className="space-y-5">
              <p className="text-sm font-medium uppercase tracking-[0.08em] text-charcoal/55">
                {beat.label}
              </p>
              {beat.questionIds.map((id) => {
                const q = getQuestionById(id);
                if (!q) return null;
                return (
                  <QuestionField
                    key={id}
                    question={q}
                    value={clusterDraft[id] ?? null}
                    showHeading
                    onChange={(value) => {
                      setClusterDraft((prev) => ({ ...prev, [id]: value }));
                      setError(null);
                      const result = setAnswer(id, value);
                      if (!result.ok) setError(result.message);
                    }}
                  />
                );
              })}
              {error ? (
                <p className="text-sm text-danger" role="alert">
                  {error}
                </p>
              ) : null}
            </div>
          )}

          {beat.kind === "question" && question && (
            <div className="space-y-4">
              {question.section ? (
                <p className="text-sm font-medium uppercase tracking-[0.08em] text-charcoal/55">
                  {question.section}
                </p>
              ) : null}
              <QuestionField
                question={question}
                value={draft}
                error={error}
                confirming={confirming}
                onChange={(value) => {
                  if (
                    typeof value === "number" &&
                    (question.type === "aptitude_scale" ||
                      question.type === "interest_scale")
                  ) {
                    handleScaleSelect(question, value);
                    return;
                  }
                  setDraft(value);
                  setError(null);
                  if (question.type === "single_choice") {
                    const result = setAnswer(question.id, value);
                    if (!result.ok) {
                      setError(result.message);
                      return;
                    }
                    setConfirming(true);
                    if (advanceTimer.current) clearTimeout(advanceTimer.current);
                    advanceTimer.current = setTimeout(() => {
                      setConfirming(false);
                      goNext();
                    }, MOTION.likertConfirmMs);
                    return;
                  }
                  const result = setAnswer(question.id, value);
                  if (!result.ok) setError(result.message);
                }}
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {showStickyNav ? (
        <div className="fixed inset-x-0 bottom-0 z-20 border-t border-charcoal/10 bg-sand/95 backdrop-blur-sm">
          <div className="mx-auto flex w-full max-w-xl gap-3 px-4 py-3 sm:px-6">
            <Button
              variant="secondary"
              onClick={goBack}
              className="min-w-[7.5rem] flex-1 sm:flex-none"
            >
              Voltar
            </Button>
            {!(isScale && beat.kind === "question") ? (
              <Button
                onClick={() => {
                  if (beat.kind === "cluster") {
                    handleClusterContinue(beat.questionIds);
                    return;
                  }
                  if (beat.kind === "question" && question) {
                    handleSingleQuestionContinue(question);
                    return;
                  }
                  goNext();
                }}
                className="flex-[1.4]"
              >
                Continuar
              </Button>
            ) : (
              <p className="flex flex-[1.4] items-center justify-center text-sm text-charcoal/60">
                Toque 1–5 para avançar
              </p>
            )}
          </div>
        </div>
      ) : (
        beat.kind !== "act_start" &&
        beat.kind !== "act_end" &&
        beat.kind !== "interstitial" && (
          <div className="fixed inset-x-0 bottom-0 z-20 border-t border-charcoal/10 bg-sand/95 backdrop-blur-sm">
            <div className="mx-auto flex w-full max-w-xl gap-3 px-4 py-3 sm:px-6">
              <Button variant="secondary" onClick={goBack}>
                Voltar
              </Button>
            </div>
          </div>
        )
      )}

    </div>
  );
}
