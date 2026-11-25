import type {
  AnswerMap,
  AptitudeBand,
  AptitudeKey,
  AptitudeScore,
} from "@/types/assessment";

/** Exact aptitude names from the ebook (Cap. 2). */
export const APTITUDE_LABELS: Record<AptitudeKey, string> = {
  verbal: "Aptidão Verbal",
  numerical: "Aptidão Numérica",
  logical: "Raciocínio Lógico",
  spatial: "Aptidão Espacial",
  mechanical: "Aptidão Mecânica",
  artistic: "Aptidão Artística e Criativa",
  musical: "Aptidão Musical",
  bodily: "Aptidão Corporal",
  interpersonal: "Aptidão Interpessoal (Social)",
  organizational: "Aptidão Organizacional",
};

export const APTITUDE_ORDER: AptitudeKey[] = [
  "verbal",
  "numerical",
  "logical",
  "spatial",
  "mechanical",
  "artistic",
  "musical",
  "bodily",
  "interpersonal",
  "organizational",
];

/**
 * Ebook bands (exact):
 * - 20–25: ponto forte
 * - 13–19: pode crescer com treino
 * - até 12: não é a maior facilidade
 */
export function bandForTotal(total: number): AptitudeBand {
  if (total >= 20) return "strong";
  if (total >= 13) return "developing";
  return "low";
}

export function bandLabel(band: AptitudeBand): string {
  switch (band) {
    case "strong":
      return "de 20 a 25 pontos é um ponto forte seu";
    case "developing":
      return "de 13 a 19, uma aptidão que pode crescer com treino";
    case "low":
      return "até 12, algo que hoje não é sua maior facilidade";
  }
}

/** Sum of 1–5 item answers for one aptitude (expected 5 items → total 5–25). */
export function sumAptitude(
  answers: AnswerMap,
  questionIds: string[],
): number {
  return questionIds.reduce((sum, id) => {
    const value = answers[id];
    return sum + (typeof value === "number" ? value : 0);
  }, 0);
}

export function rankAptitudes(
  totals: Partial<Record<AptitudeKey, number>>,
): AptitudeScore[] {
  const scored: AptitudeScore[] = APTITUDE_ORDER.map((key) => {
    const total = totals[key] ?? 0;
    return {
      key,
      label: APTITUDE_LABELS[key],
      total,
      band: bandForTotal(total),
      rank: 0,
    };
  });

  scored.sort((a, b) => b.total - a.total || a.label.localeCompare(b.label, "pt-BR"));
  scored.forEach((item, index) => {
    item.rank = index + 1;
  });
  return scored;
}
