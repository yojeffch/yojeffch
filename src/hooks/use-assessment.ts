"use client";

import {
  createEmptyState,
  loadAssessmentState,
  saveAssessmentState,
} from "@/lib/storage";
import type {
  ActId,
  AnswerMap,
  AnswerValue,
  AssessmentState,
  ChapterId,
  PersistResult,
  SaveStatus,
} from "@/types/assessment";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

function subscribeToStorage(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }
  const handler = (event: StorageEvent) => {
    if (event.key === null || event.key.startsWith("mapa-da-clareza:")) {
      onStoreChange();
    }
  };
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export function useHydrated() {
  return useSyncExternalStore(
    subscribeToStorage,
    getClientSnapshot,
    getServerSnapshot,
  );
}

export interface ProgressPatch {
  chapterId: ChapterId;
  questionId?: string | null;
  beatId?: string | null;
  actId?: ActId | null;
}

export interface AssessmentStore {
  state: AssessmentState;
  hydrated: boolean;
  saveStatus: SaveStatus;
  saveMessage: string | null;
  setAnswer: (questionId: string, value: AnswerValue) => PersistResult;
  setAnswers: (patch: AnswerMap) => PersistResult;
  setProgress: (patch: ProgressPatch) => PersistResult;
  persist: (next: AssessmentState) => PersistResult;
  reload: () => void;
}

export function useAssessment(): AssessmentStore {
  const hydrated = useHydrated();
  const [state, setState] = useState<AssessmentState>(() => createEmptyState());
  const stateRef = useRef(state);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    if (!hydrated) return;
    const loaded = loadAssessmentState();
    setState(loaded.state);
    stateRef.current = loaded.state;
    if (loaded.error) {
      setSaveStatus("error");
      setSaveMessage(loaded.error);
    } else if (loaded.fromStorage) {
      setSaveStatus("saved");
      setSaveMessage("Rascunho recuperado neste aparelho.");
    }
  }, [hydrated]);

  const persist = useCallback(
    (next: AssessmentState, successMessage?: string): PersistResult => {
      setSaveStatus("saving");
      const result = saveAssessmentState(next);
      if (result.ok) {
        stateRef.current = next;
        setState(next);
        setSaveStatus("saved");
        setSaveMessage(successMessage ?? result.message);
      } else {
        setSaveStatus("error");
        setSaveMessage(result.message);
      }
      return result;
    },
    [],
  );

  const setAnswer = useCallback(
    (questionId: string, value: AnswerValue): PersistResult => {
      const current = stateRef.current;
      const next: AssessmentState = {
        ...current,
        answers: {
          ...current.answers,
          [questionId]: value,
        },
      };
      return persist(next, "Resposta salva neste aparelho.");
    },
    [persist],
  );

  const setAnswers = useCallback(
    (patch: AnswerMap): PersistResult => {
      const current = stateRef.current;
      const next: AssessmentState = {
        ...current,
        answers: {
          ...current.answers,
          ...patch,
        },
      };
      return persist(next, "Respostas salvas neste aparelho.");
    },
    [persist],
  );

  const setProgress = useCallback(
    (patch: ProgressPatch): PersistResult => {
      const current = stateRef.current;
      const nextQuestionId =
        patch.questionId === undefined
          ? current.progress.currentQuestionId
          : patch.questionId;
      const nextBeatId =
        patch.beatId === undefined
          ? current.progress.currentBeatId
          : patch.beatId;
      const nextActId =
        patch.actId === undefined
          ? current.progress.currentActId
          : patch.actId;

      const same =
        current.progress.currentChapterId === patch.chapterId &&
        current.progress.currentQuestionId === nextQuestionId &&
        current.progress.currentBeatId === nextBeatId &&
        current.progress.currentActId === nextActId;

      if (same) {
        return {
          ok: true,
          status: "saved",
          message: "Progresso já sincronizado.",
        };
      }

      const visited = new Set(current.progress.visitedChapterIds);
      visited.add(patch.chapterId);
      const next: AssessmentState = {
        ...current,
        progress: {
          currentChapterId: patch.chapterId,
          currentQuestionId: nextQuestionId ?? null,
          currentBeatId: nextBeatId ?? null,
          currentActId: nextActId ?? null,
          visitedChapterIds: Array.from(visited).sort(
            (a, b) => a - b,
          ) as ChapterId[],
        },
      };
      return persist(next, "Progresso salvo neste aparelho.");
    },
    [persist],
  );

  const reload = useCallback(() => {
    const loaded = loadAssessmentState();
    setState(loaded.state);
    stateRef.current = loaded.state;
  }, []);

  return {
    state,
    hydrated,
    saveStatus,
    saveMessage,
    setAnswer,
    setAnswers,
    setProgress,
    persist: (next) => persist(next),
    reload,
  };
}
