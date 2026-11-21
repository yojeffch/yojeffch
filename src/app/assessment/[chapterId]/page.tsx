import { StepForm } from "@/components/assessment/step-form";
import { getChapter, isChapterId } from "@/lib/mocks/chapters";
import type { ChapterId } from "@/types/assessment";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface AssessmentPageProps {
  params: Promise<{ chapterId: string }>;
  searchParams: Promise<{ q?: string }>;
}

export function generateStaticParams() {
  return [1, 2, 3, 4, 5, 6, 7].map((id) => ({
    chapterId: String(id),
  }));
}

async function AssessmentChapterContent({
  params,
  searchParams,
}: AssessmentPageProps) {
  const { chapterId: rawId } = await params;
  const { q } = await searchParams;
  const numericId = Number(rawId);

  if (!isChapterId(numericId)) {
    notFound();
  }

  const chapterId = numericId as ChapterId;
  const chapter = getChapter(chapterId);
  if (!chapter) {
    notFound();
  }

  return <StepForm chapter={chapter} initialQuestionId={q} />;
}

function AssessmentFallback() {
  return (
    <div className="mx-auto w-full max-w-xl px-4 py-10 text-charcoal/70">
      Carregando capítulo…
    </div>
  );
}

export default function AssessmentChapterPage(props: AssessmentPageProps) {
  return (
    <Suspense fallback={<AssessmentFallback />}>
      <AssessmentChapterContent {...props} />
    </Suspense>
  );
}
