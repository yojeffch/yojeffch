/**
 * Assessment domain types for Mapa da Clareza.
 * Content prompts come from the ebook inventory — do not invent copy.
 */

export type ChapterId = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type QuestionType =
  | "short_text"
  | "long_text"
  | "single_choice"
  | "aptitude_scale"
  | "instruction";

/** Cap. 2 aptitude keys — exact labels from the ebook. */
export type AptitudeKey =
  | "verbal"
  | "numerical"
  | "logical"
  | "spatial"
  | "mechanical"
  | "artistic"
  | "musical"
  | "bodily"
  | "interpersonal"
  | "organizational";

export type AptitudeBand = "strong" | "developing" | "low";

export interface ChoiceOption {
  value: string;
  label: string;
}

export interface QuestionBase {
  id: string;
  chapterId: ChapterId;
  section?: string;
  prompt: string;
  helpText?: string;
  required?: boolean;
}

export interface ShortTextQuestion extends QuestionBase {
  type: "short_text";
  placeholder?: string;
}

export interface LongTextQuestion extends QuestionBase {
  type: "long_text";
  placeholder?: string;
}

export interface SingleChoiceQuestion extends QuestionBase {
  type: "single_choice";
  options: ChoiceOption[];
}

export interface AptitudeScaleQuestion extends QuestionBase {
  type: "aptitude_scale";
  aptitudeKey: AptitudeKey;
  scaleMin: 1;
  scaleMax: 5;
}

export interface InstructionBlock extends QuestionBase {
  type: "instruction";
}

export type Question =
  | ShortTextQuestion
  | LongTextQuestion
  | SingleChoiceQuestion
  | AptitudeScaleQuestion
  | InstructionBlock;

export interface ChapterMeta {
  id: ChapterId;
  title: string;
  subtitle?: string;
  /** When false, chapter is a stub shell for later phases. */
  interactive: boolean;
}

export interface ChapterDefinition {
  meta: ChapterMeta;
  questions: Question[];
}

/** Stored answer value — string for text/choice; number 1–5 for scales. */
export type AnswerValue = string | number | null;

export type AnswerMap = Record<string, AnswerValue>;

export interface AptitudeScore {
  key: AptitudeKey;
  label: string;
  total: number;
  band: AptitudeBand;
  rank: number;
}

export interface AssessmentProgress {
  /** Last visited chapter */
  currentChapterId: ChapterId;
  /** Question id within chapter */
  currentQuestionId: string | null;
  /** Chapters the user has opened */
  visitedChapterIds: ChapterId[];
}

export type SaveStatus = "idle" | "saving" | "saved" | "error";

export interface AssessmentState {
  version: 1;
  updatedAt: string;
  answers: AnswerMap;
  progress: AssessmentProgress;
}

export interface PersistResult {
  ok: boolean;
  status: SaveStatus;
  message: string;
  error?: string;
}

/** Cap. 3–7 stubs — structure only until content is wired. */
export type FutureChapterStub = {
  chapterId: Exclude<ChapterId, 1 | 2>;
  status: "stub";
};
