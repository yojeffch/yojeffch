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
  | "interest_scale"
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

/** Cap. 2 Holland interest areas A–F. */
export type InterestKey =
  | "realistic"
  | "investigative"
  | "artistic"
  | "social"
  | "enterprising"
  | "conventional";

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

/** UI control hint — does not change ebook prompt text. */
export type ShortTextUiHint =
  | "date"
  | "age"
  | "place"
  | "school_year"
  | "grade_score";

export type ChoiceUiHint = "cards" | "radio";

export interface ShortTextQuestion extends QuestionBase {
  type: "short_text";
  placeholder?: string;
  inputMode?: "text" | "numeric" | "decimal";
  uiHint?: ShortTextUiHint;
}

export interface LongTextQuestion extends QuestionBase {
  type: "long_text";
  placeholder?: string;
}

export interface SingleChoiceQuestion extends QuestionBase {
  type: "single_choice";
  options: ChoiceOption[];
  uiHint?: ChoiceUiHint;
}

export interface AptitudeScaleQuestion extends QuestionBase {
  type: "aptitude_scale";
  aptitudeKey: AptitudeKey;
  scaleMin: 1;
  scaleMax: 5;
}

export interface InterestScaleQuestion extends QuestionBase {
  type: "interest_scale";
  interestKey: InterestKey;
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
  | InterestScaleQuestion
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

export interface InterestScore {
  key: InterestKey;
  label: string;
  total: number;
  rank: number;
}

export type ActId = "a1" | "a2" | "a3" | "b1" | "b2" | "c1";

export type BeatKind =
  | "act_start"
  | "act_end"
  | "interstitial"
  | "cluster"
  | "question"
  | "peak";

export interface BeatBase {
  id: string;
  actId: ActId;
  chapterId: ChapterId;
  kind: BeatKind;
}

/** Typographic interstitial — title/body only from ebook. */
export interface InterstitialBeat extends BeatBase {
  kind: "interstitial" | "act_start" | "act_end";
  title: string;
  body?: string;
}

export interface ClusterBeat extends BeatBase {
  kind: "cluster";
  label: string;
  questionIds: string[];
}

export interface QuestionBeat extends BeatBase {
  kind: "question";
  questionId: string;
  /** Burst label e.g. "Aptidão Verbal · 3/5" */
  burstLabel?: string;
  burstIndex?: number;
  burstTotal?: number;
}

export interface PeakBeat extends BeatBase {
  kind: "peak";
  peak: "aptitudes" | "interests";
  title: string;
  body?: string;
}

export type Beat =
  | InterstitialBeat
  | ClusterBeat
  | QuestionBeat
  | PeakBeat;

export interface ActDefinition {
  id: ActId;
  chapterId: ChapterId;
  /** Ebook-anchored act title (section language). */
  title: string;
  subtitle?: string;
  beats: Beat[];
}

export interface AssessmentProgress {
  currentChapterId: ChapterId;
  currentQuestionId: string | null;
  currentBeatId: string | null;
  currentActId: ActId | null;
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
