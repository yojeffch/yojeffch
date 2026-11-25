"use client";

import { ScaleInput } from "@/components/assessment/scale-input";
import { AgeStepper } from "@/components/inputs/age-stepper";
import { ChoiceCards } from "@/components/inputs/choice-cards";
import { DateWheelPicker } from "@/components/inputs/date-wheel-picker";
import { GradeScoreStepper } from "@/components/inputs/grade-score-stepper";
import { PlacePicker } from "@/components/inputs/place-picker";
import { SchoolYearPicker } from "@/components/inputs/school-year-picker";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ageFromIsoDate, formatDatePtBr } from "@/lib/brazil";
import { cn } from "@/lib/utils";
import type { AnswerValue, Question } from "@/types/assessment";

interface QuestionFieldProps {
  question: Question;
  value: AnswerValue;
  error?: string | null;
  onChange: (value: AnswerValue) => void;
  confirming?: boolean;
  showHeading?: boolean;
  /** Optional linked DOB ISO value — used to hint age from birth date. */
  linkedDob?: string | null;
}

export function QuestionField({
  question,
  value,
  error,
  onChange,
  confirming,
  showHeading = true,
  linkedDob,
}: QuestionFieldProps) {
  if (question.type === "instruction") {
    return (
      <div className="rounded-lg border border-charcoal/10 bg-surface-muted/60 px-4 py-5">
        <p className="text-base leading-relaxed text-charcoal/90">
          {question.prompt}
        </p>
        {question.helpText ? (
          <p className="mt-3 text-sm text-charcoal/65">{question.helpText}</p>
        ) : null}
      </div>
    );
  }

  const derivedAge =
    question.type === "short_text" &&
    question.uiHint === "age" &&
    linkedDob
      ? ageFromIsoDate(linkedDob)
      : null;

  return (
    <div className="space-y-3">
      {showHeading ? (
        <div className="space-y-1.5">
          <label
            htmlFor={question.id}
            className="block font-display text-xl leading-snug text-charcoal text-balance sm:text-2xl"
          >
            {question.prompt}
          </label>
          {question.helpText &&
          question.type !== "aptitude_scale" &&
          question.type !== "interest_scale" ? (
            <p className="text-sm text-charcoal/65">{question.helpText}</p>
          ) : null}
          {question.type === "short_text" &&
          question.uiHint === "date" &&
          typeof value === "string" &&
          value ? (
            <p className="text-sm text-olive">
              {formatDatePtBr(value)}
            </p>
          ) : null}
        </div>
      ) : (
        <label htmlFor={question.id} className="block text-sm font-medium text-charcoal">
          {question.prompt}
        </label>
      )}

      {question.type === "short_text" && question.uiHint === "date" && (
        <DateWheelPicker
          id={question.id}
          value={typeof value === "string" ? value : null}
          onChange={onChange}
        />
      )}

      {question.type === "short_text" && question.uiHint === "age" && (
        <AgeStepper
          id={question.id}
          value={value}
          onChange={onChange}
          hint={
            derivedAge != null
              ? `Pela data de nascimento: ${derivedAge} anos (você pode ajustar).`
              : null
          }
        />
      )}

      {question.type === "short_text" && question.uiHint === "place" && (
        <PlacePicker
          id={question.id}
          value={typeof value === "string" ? value : null}
          onChange={onChange}
        />
      )}

      {question.type === "short_text" && question.uiHint === "school_year" && (
        <SchoolYearPicker
          id={question.id}
          value={typeof value === "string" ? value : null}
          onChange={onChange}
        />
      )}

      {question.type === "short_text" && question.uiHint === "grade_score" && (
        <GradeScoreStepper
          id={question.id}
          value={typeof value === "string" ? value : null}
          onChange={onChange}
        />
      )}

      {question.type === "short_text" && !question.uiHint && (
        <Input
          id={question.id}
          value={typeof value === "string" ? value : ""}
          onChange={(event) => onChange(event.target.value)}
          placeholder={question.placeholder}
          inputMode={question.inputMode}
          autoComplete="off"
        />
      )}

      {question.type === "long_text" && (
        <Textarea
          id={question.id}
          value={typeof value === "string" ? value : ""}
          onChange={(event) => onChange(event.target.value)}
          placeholder={question.placeholder}
        />
      )}

      {question.type === "single_choice" &&
        (question.uiHint === "cards" || !question.uiHint) && (
          <ChoiceCards
            name={question.id}
            options={question.options}
            value={typeof value === "string" ? value : null}
            onChange={onChange}
          />
        )}

      {question.type === "single_choice" && question.uiHint === "radio" && (
        <div className="grid gap-2" role="radiogroup" aria-labelledby={question.id}>
          <span id={question.id} className="sr-only">
            {question.prompt}
          </span>
          {question.options.map((option) => {
            const selected = value === option.value;
            return (
              <label
                key={option.value}
                className={cn(
                  "flex min-h-12 cursor-pointer items-center gap-3 rounded-md border px-4 py-3 transition-colors",
                  selected
                    ? "border-olive bg-olive/10"
                    : "border-charcoal/15 bg-surface hover:border-olive/40",
                )}
              >
                <input
                  type="radio"
                  className="size-4 accent-[var(--color-olive)]"
                  name={question.id}
                  value={option.value}
                  checked={selected}
                  onChange={() => onChange(option.value)}
                />
                <span>{option.label}</span>
              </label>
            );
          })}
        </div>
      )}

      {(question.type === "aptitude_scale" ||
        question.type === "interest_scale") && (
        <ScaleInput
          name={question.id}
          value={typeof value === "number" ? value : null}
          onChange={onChange}
          confirming={confirming}
        />
      )}

      {error ? (
        <p className="text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
