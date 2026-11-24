import { interestQuestionIds } from "@/lib/mocks/chapter-2";
import type { AnswerMap, InterestKey, InterestScore } from "@/types/assessment";

export const INTEREST_LABELS: Record<InterestKey, string> = {
  realistic: "A — Fazer com as mãos (Realista)",
  investigative: "B — Pesquisar e descobrir (Investigativo)",
  artistic: "C — Criar e se expressar (Artístico)",
  social: "D — Ajudar e cuidar (Social)",
  enterprising: "E — Liderar e empreender (Empreendedor)",
  conventional: "F — Organizar e planejar (Convencional)",
};

export const INTEREST_ORDER: InterestKey[] = [
  "realistic",
  "investigative",
  "artistic",
  "social",
  "enterprising",
  "conventional",
];

export function sumInterest(
  answers: AnswerMap,
  questionIds: string[],
): number {
  return questionIds.reduce((sum, id) => {
    const value = answers[id];
    return sum + (typeof value === "number" ? value : 0);
  }, 0);
}

export function rankInterests(
  totals: Partial<Record<InterestKey, number>>,
): InterestScore[] {
  const scored: InterestScore[] = INTEREST_ORDER.map((key) => ({
    key,
    label: INTEREST_LABELS[key],
    total: totals[key] ?? 0,
    rank: 0,
  }));

  scored.sort((a, b) => b.total - a.total || a.label.localeCompare(b.label, "pt-BR"));
  scored.forEach((item, index) => {
    item.rank = index + 1;
  });
  return scored;
}

export function computeInterestTotals(answers: AnswerMap) {
  return Object.fromEntries(
    INTEREST_ORDER.map((key) => [
      key,
      sumInterest(answers, interestQuestionIds(key)),
    ]),
  ) as Record<InterestKey, number>;
}
