import { CHAPTER_1_QUESTIONS } from "@/lib/mocks/chapter-1";
import {
  aptitudeQuestionIds,
  CHAPTER_2_QUESTIONS,
  interestQuestionIds,
} from "@/lib/mocks/chapter-2";
import type {
  ChapterDefinition,
  ChapterId,
  ChapterMeta,
  Question,
} from "@/types/assessment";

export {
  APTITUDE_BLURBS,
  INTEREST_BLURBS,
  SCALE_HELP,
  aptitudeQuestionIds,
  interestQuestionIds,
} from "@/lib/mocks/chapter-2";

const CHAPTER_META: ChapterMeta[] = [
  {
    id: 1,
    title: "Questionário de Autoconhecimento",
    subtitle: "Capítulo 1",
    interactive: true,
  },
  {
    id: 2,
    title: "Questionário de Aptidões e Interesses",
    subtitle: "Capítulo 2",
    interactive: true,
  },
  {
    id: 3,
    title: "Questionário de Frases Incompletas",
    subtitle: "Capítulo 3",
    interactive: false,
  },
  {
    id: 4,
    title: "Árvore Genealógica das Profissões",
    subtitle: "Capítulo 4",
    interactive: false,
  },
  {
    id: 5,
    title: "Questionário de Expectativas Familiares",
    subtitle: "Capítulo 5",
    interactive: false,
  },
  {
    id: 6,
    title: "Questionário de Profissões Consideradas",
    subtitle: "Capítulo 6",
    interactive: false,
  },
  {
    id: 7,
    title: "Mapa da Clareza (Mapa Final)",
    subtitle: "Capítulo 7",
    interactive: false,
  },
];

function stubQuestions(chapterId: ChapterId, title: string): Question[] {
  return [
    {
      id: `c${chapterId}-stub`,
      chapterId,
      section: title,
      type: "instruction",
      prompt:
        "Este capítulo estará disponível nas próximas fases. Por enquanto você pode navegar pelos Capítulos 1 e 2.",
    },
  ];
}

const CHAPTERS: ChapterDefinition[] = [
  { meta: CHAPTER_META[0], questions: CHAPTER_1_QUESTIONS },
  { meta: CHAPTER_META[1], questions: CHAPTER_2_QUESTIONS },
  {
    meta: CHAPTER_META[2],
    questions: stubQuestions(3, "Questionário de Frases Incompletas"),
  },
  {
    meta: CHAPTER_META[3],
    questions: stubQuestions(4, "Árvore Genealógica das Profissões"),
  },
  {
    meta: CHAPTER_META[4],
    questions: stubQuestions(5, "Questionário de Expectativas Familiares"),
  },
  {
    meta: CHAPTER_META[5],
    questions: stubQuestions(6, "Questionário de Profissões Consideradas"),
  },
  {
    meta: CHAPTER_META[6],
    questions: stubQuestions(7, "Mapa da Clareza (Mapa Final)"),
  },
];

export function getAllChapters(): ChapterDefinition[] {
  return CHAPTERS;
}

export function getChapterMetaList(): ChapterMeta[] {
  return CHAPTER_META;
}

export function getChapter(id: ChapterId): ChapterDefinition | undefined {
  return CHAPTERS.find((chapter) => chapter.meta.id === id);
}

export function getQuestion(
  chapterId: ChapterId,
  questionId: string,
): Question | undefined {
  return getChapter(chapterId)?.questions.find((q) => q.id === questionId);
}

export function getQuestionById(questionId: string): Question | undefined {
  for (const chapter of CHAPTERS) {
    const found = chapter.questions.find((q) => q.id === questionId);
    if (found) return found;
  }
  return undefined;
}

export function isChapterId(value: number): value is ChapterId {
  return Number.isInteger(value) && value >= 1 && value <= 7;
}
