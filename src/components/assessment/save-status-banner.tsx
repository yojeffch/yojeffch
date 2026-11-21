"use client";

import { cn } from "@/lib/utils";
import type { SaveStatus } from "@/types/assessment";

interface SaveStatusBannerProps {
  status: SaveStatus;
  message: string | null;
}

export function SaveStatusBanner({ status, message }: SaveStatusBannerProps) {
  if (status === "idle" || !message) {
    return null;
  }

  const isError = status === "error";
  const isSaving = status === "saving";

  return (
    <div
      role={isError ? "alert" : "status"}
      aria-live={isError ? "assertive" : "polite"}
      className={cn(
        "rounded-md px-3.5 py-2.5 text-sm",
        isError && "bg-danger-bg text-danger",
        status === "saved" && "bg-success-bg text-success",
        isSaving && "bg-surface-muted text-charcoal/80",
      )}
    >
      {isSaving ? "Salvando neste aparelho…" : message}
    </div>
  );
}
