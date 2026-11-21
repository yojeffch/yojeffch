import { z } from "zod";
import type {
  AssessmentState,
  ChapterId,
  PersistResult,
} from "@/types/assessment";

export const STORAGE_KEY = "mapa-da-clareza:assessment:v1";

const chapterIdSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
  z.literal(6),
  z.literal(7),
]);

const assessmentStateSchema = z.object({
  version: z.literal(1),
  updatedAt: z.string(),
  answers: z.record(z.string(), z.union([z.string(), z.number(), z.null()])),
  progress: z.object({
    currentChapterId: chapterIdSchema,
    currentQuestionId: z.string().nullable(),
    visitedChapterIds: z.array(chapterIdSchema),
  }),
});

export function createEmptyState(
  chapterId: ChapterId = 1,
): AssessmentState {
  return {
    version: 1,
    updatedAt: new Date().toISOString(),
    answers: {},
    progress: {
      currentChapterId: chapterId,
      currentQuestionId: null,
      visitedChapterIds: [chapterId],
    },
  };
}

export function loadAssessmentState(): {
  state: AssessmentState;
  fromStorage: boolean;
  error?: string;
} {
  if (typeof window === "undefined") {
    return { state: createEmptyState(), fromStorage: false };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { state: createEmptyState(), fromStorage: false };
    }

    const parsed = assessmentStateSchema.safeParse(JSON.parse(raw));
    if (!parsed.success) {
      return {
        state: createEmptyState(),
        fromStorage: false,
        error: "Rascunho local inválido. Começamos um novo.",
      };
    }

    return { state: parsed.data, fromStorage: true };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Falha ao ler o armazenamento.";
    return {
      state: createEmptyState(),
      fromStorage: false,
      error: message,
    };
  }
}

export function saveAssessmentState(state: AssessmentState): PersistResult {
  if (typeof window === "undefined") {
    return {
      ok: false,
      status: "error",
      message: "Salvamento só funciona no navegador.",
      error: "window-unavailable",
    };
  }

  try {
    const next: AssessmentState = {
      ...state,
      updatedAt: new Date().toISOString(),
    };
    const payload = JSON.stringify(next);
    window.localStorage.setItem(STORAGE_KEY, payload);

    const verify = window.localStorage.getItem(STORAGE_KEY);
    if (verify !== payload) {
      return {
        ok: false,
        status: "error",
        message:
          "Não foi possível confirmar o salvamento neste aparelho. Tente novamente.",
        error: "verify-mismatch",
      };
    }

    return {
      ok: true,
      status: "saved",
      message: "Resposta salva neste aparelho.",
    };
  } catch (error) {
    const isQuota =
      error instanceof DOMException &&
      (error.name === "QuotaExceededError" ||
        error.name === "NS_ERROR_DOM_QUOTA_REACHED");

    return {
      ok: false,
      status: "error",
      message: isQuota
        ? "Espaço insuficiente no navegador. Libere memória ou use outro aparelho."
        : "Falha ao salvar. Suas respostas podem não estar guardadas.",
      error: error instanceof Error ? error.message : "unknown",
    };
  }
}

export function clearAssessmentState(): PersistResult {
  if (typeof window === "undefined") {
    return {
      ok: false,
      status: "error",
      message: "Limpeza só funciona no navegador.",
    };
  }

  try {
    window.localStorage.removeItem(STORAGE_KEY);
    return {
      ok: true,
      status: "saved",
      message: "Rascunho local apagado.",
    };
  } catch (error) {
    return {
      ok: false,
      status: "error",
      message: "Não foi possível apagar o rascunho local.",
      error: error instanceof Error ? error.message : "unknown",
    };
  }
}
