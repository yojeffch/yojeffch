"use client";

import { Button } from "@/components/ui/button";

interface InterstitialScreenProps {
  title: string;
  body?: string;
  ctaLabel?: string;
  onContinue: () => void;
  variant?: "page" | "act";
}

export function InterstitialScreen({
  title,
  body,
  ctaLabel = "Continuar",
  onContinue,
  variant = "page",
}: InterstitialScreenProps) {
  if (variant === "act") {
    return (
      <div className="act-wash relative flex min-h-[70dvh] flex-col justify-end overflow-hidden rounded-lg px-5 py-10 text-primary-foreground sm:px-8">
        <div className="paper-grain absolute inset-0 opacity-[0.12]" aria-hidden />
        <div
          className="pointer-events-none absolute -right-8 top-10 h-40 w-40 rounded-full bg-gold/30 blur-2xl"
          aria-hidden
        />
        <div className="relative space-y-6">
          <h2 className="font-display text-4xl leading-tight text-balance sm:text-5xl">
            {title}
          </h2>
          {body ? (
            <p className="max-w-md whitespace-pre-line text-base text-primary-foreground/85">
              {body}
            </p>
          ) : null}
          <Button
            onClick={onContinue}
            className="bg-gold text-charcoal hover:bg-gold-soft"
          >
            {ctaLabel}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative space-y-6 rounded-lg border border-charcoal/10 bg-surface-muted/50 px-5 py-8 sm:px-6">
      <div className="paper-grain absolute inset-0 rounded-lg opacity-[0.1]" aria-hidden />
      <div className="relative space-y-4">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-olive">
          Momento
        </p>
        <h2 className="font-display text-3xl leading-tight text-charcoal text-balance sm:text-4xl">
          {title}
        </h2>
        {body ? (
          <p className="whitespace-pre-line text-base leading-relaxed text-charcoal/80">
            {body}
          </p>
        ) : null}
        <Button onClick={onContinue} className="mt-2">
          {ctaLabel}
        </Button>
      </div>
    </div>
  );
}
