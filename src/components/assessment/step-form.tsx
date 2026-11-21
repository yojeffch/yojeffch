"use client";

import { AptitudeSummary } from "@/components/assessment/aptitude-summary";
import { QuestionField } from "@/components/assessment/question-field";
import { SaveStatusBanner } from "@/components/assessment/save-status-banner";
import { ChapterProgress } from "@/components/layout/chapter-progress";
import { Button } from "@/components/ui/button";
import { useAssessment } from "@/hooks/use-assessment";
import { getChapterMetaList } from "@/lib/mocks/chapters";
import type {
  AnswerValue,
  ChapterDefinition,
  Question,
} from "@/types/assessment";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface StepFormProps {
  chapter: ChapterDefinition;
  initialQuestionId?: string;
}

function isAnswered(question: Question, value: AnswerValue): boolean {
  if (question.type === "instruction") return true;
  if (value == null) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (typeof value === "number") return value >= 1 && value <= 5;
  return false;
}

export function StepForm({ chapter, initialQuestionId }: StepFormProps) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const {
    state,
    hydrated,
    saveStatus,
    saveMessage,
    setAnswer,
    setProgress,
  } = useAssessment();

  const questions = chapter.questions;
  const chapters = getChapterMetaList();

  const initialIndex = useMemo(() => {
    if (!initialQuestionId) return 0;
    const found = questions.findIndex((q) => q.id === initialQuestionId);
    return found >= 0 ? found : 0;
  }, [initialQuestionId, questions]);

  const [stepIndex, setStepIndex] = useState(initialIndex);
  const [draft, setDraft] = useState<AnswerValue>(null);
  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const question = questions[stepIndex];
  const isLast = stepIndex >= questions.length - 1;
  const isCap2 = chapter.meta.id === 2;

  useEffect(() => {
    setStepIndex(initialIndex);
  }, [chapter.meta.id, initialIndex]);

  useEffect(() => {
    if (!question || !hydrated) return;
    const stored = state.answers[question.id] ?? null;
    setDraft(stored);
    setError(null);
    setShowResults(false);
    setProgress(chapter.meta.id, question.id);
    // Sync draft + progress only when the active question changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question?.id, hydrated, chapter.meta.id]);

  if (!question) {
    return null;
  }

  function commitDraft(nextValue: AnswerValue = draft): boolean {
    if (question.type === "instruction") {
      return true;
    }

    if (question.required && !isAnswered(question, nextValue)) {
      setError("Responda este bloco antes de continuar.");
      return false;
    }

    const result = setAnswer(question.id, nextValue);
    if (!result.ok) {
      setError(result.message);
      return false;
    }

    setError(null);
    return true;
  }

  function handleChange(value: AnswerValue) {
    setDraft(value);
    setError(null);
    if (question.type === "instruction") return;
    // Persist immediately so edit-anytime never loses data silently.
    const result = setAnswer(question.id, value);
    if (!result.ok) {
      setError(result.message);
    }
  }

  function goNext() {
    if (!commitDraft()) return;

    if (!isLast) {
      setStepIndex((index) => index + 1);
      return;
    }

    if (isCap2) {
      setShowResults(true);
      return;
    }

    const nextChapter = Math.min(7, chapter.meta.id + 1);
    router.push(`/assessment/${nextChapter}`);
  }

  function goBack() {
    if (showResults) {
      setShowResults(false);
      return;
    }

    if (stepIndex > 0) {
      commitDraft();
      setStepIndex((index) => index - 1);
      return;
    }

    if (chapter.meta.id > 1) {
      router.push(`/assessment/${chapter.meta.id - 1}`);
    } else {
      router.push("/");
    }
  }

  const motionProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -6 },
        transition: { duration: 0.18 },
      };

  return (
    <div className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-6 px-4 pb-28 pt-6 sm:px-6">
      <header className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-olive">{chapter.meta.subtitle}</p>
            <h1 className="font-display text-3xl leading-tight text-charcoal text-balance">
              {chapter.meta.title}
            </h1>
          </div>
          <Link
            href="/"
            className="text-sm text-charcoal/65 underline-offset-4 hover:text-charcoal hover:underline"
          >
            Início
          </Link>
        </div>
        <ChapterProgress
          chapters={chapters}
          currentChapterId={chapter.meta.id}
          stepIndex={stepIndex}
          stepTotal={questions.length}
        />
        <SaveStatusBanner status={saveStatus} message={saveMessage} />
        {!hydrated ? (
          <p className="text-sm text-charcoal/60">Carregando rascunho local…</p>
        ) : null}
      </header>

      <AnimatePresence mode="wait">
        {showResults ? (
          <motion.div key="results" {...motionProps} className="space-y-6">
            <AptitudeSummary answers={state.answers} />
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button variant="secondary" onClick={goBack} className="sm:flex-1">
                Voltar às respostas
              </Button>
              <Button
                className="sm:flex-1"
                onClick={() => router.push("/assessment/3")}
              >
                Ir ao Capítulo 3
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div key={question.id} {...motionProps} className="space-y-6">
            {question.section ? (
              <p className="text-sm font-medium uppercase tracking-[0.08em] text-charcoal/55">
                {question.section}
              </p>
            ) : null}

            <QuestionField
              question={question}
              value={draft}
              error={error}
              onChange={handleChange}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {!showResults ? (
        <div className="fixed inset-x-0 bottom-0 z-20 border-t border-charcoal/10 bg-sand/95 backdrop-blur-sm">
          <div className="mx-auto flex w-full max-w-xl gap-3 px-4 py-3 sm:px-6">
            <Button
              variant="secondary"
              onClick={goBack}
              className="min-w-[7.5rem] flex-1 sm:flex-none"
            >
              Voltar
            </Button>
            <Button onClick={goNext} className="flex-[1.4]">
              {isLast
                ? isCap2
                  ? "Ver resultado"
                  : chapter.meta.interactive
                    ? "Próximo capítulo"
                    : "Continuar"
                : "Continuar"}
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
