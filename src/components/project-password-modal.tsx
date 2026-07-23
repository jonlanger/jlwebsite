"use client";

import { Lock, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { Button } from "@/components/ui/button";
import { PROJECT_UNLOCK_PASSWORD } from "@/lib/protected-projects";

type ProjectPasswordModalProps = {
  open: boolean;
  onUnlock: () => void;
  onCancel: () => void;
};

export function ProjectPasswordModal({
  open,
  onUnlock,
  onCancel,
}: ProjectPasswordModalProps) {
  const titleId = useId();
  const descId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [mounted, setMounted] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      setPassword("");
      setError(false);
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCancel();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [open, onCancel]);

  if (!mounted || !open) return null;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const value = password || inputRef.current?.value || "";
    if (value === PROJECT_UNLOCK_PASSWORD) {
      setError(false);
      onUnlock();
      return;
    }
    setError(true);
    inputRef.current?.select();
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descId}
      className="fixed inset-0 z-[110] flex items-center justify-center p-4"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        aria-label="Close password dialog"
        onClick={onCancel}
      />
      <div className="relative z-[111] w-full max-w-md rounded-xl border border-border bg-popover p-6 text-popover-foreground shadow-lg">
        <button
          type="button"
          className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Close"
          onClick={onCancel}
        >
          <X className="size-4" />
        </button>

        <div className="mb-5 flex items-start gap-3 pr-8">
          <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
            <Lock className="size-4" aria-hidden />
          </span>
          <div>
            <h2 id={titleId} className="font-heading text-lg font-semibold tracking-tight">
              Password required
            </h2>
            <p id={descId} className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Enter the password to view this project. One unlock opens all
              protected case studies.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="project-password"
              className="text-sm font-medium text-foreground"
            >
              Password
            </label>
            <input
              ref={inputRef}
              id="project-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                if (error) setError(false);
              }}
              aria-invalid={error}
              aria-describedby={error ? "project-password-error" : undefined}
              className="flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20"
              placeholder="Enter password"
            />
            {error ? (
              <p
                id="project-password-error"
                className="text-sm text-destructive"
                role="alert"
              >
                Incorrect password. Try again.
              </p>
            ) : null}
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" size="lg" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" size="lg">
              Unlock
            </Button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
