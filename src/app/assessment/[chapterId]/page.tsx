import { ExperienceEngine } from "@/components/assessment/experience-engine";
import { isChapterId } from "@/lib/mocks/chapters";
import type { ChapterId } from "@/types/assessment";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface AssessmentPageProps {
  params: Promise<{ chapterId: string }>;
  searchParams: Promise<{ beat?: string }>;
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
  const { beat } = await searchParams;
  const numericId = Number(rawId);

  if (!isChapterId(numericId)) {
    notFound();
  }

  const chapterId = numericId as ChapterId;
  return <ExperienceEngine chapterId={chapterId} initialBeatId={beat} />;
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
