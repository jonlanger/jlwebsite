"use client";

import { useEffect, useRef, useState } from "react";

import type { HeadlineArticle } from "@/lib/headlines";
import { cn } from "@/lib/utils";

const ARTICLE_DURATION_MS = 10_000;

type FetchState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; articles: HeadlineArticle[] };

export function HeadlinesLiveDemo({ className }: { className?: string }) {
  const [state, setState] = useState<FetchState>({ status: "loading" });
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch("/api/headlines");
        const data = (await response.json()) as {
          articles?: HeadlineArticle[];
          error?: string;
        };
        if (cancelled) return;
        if (!response.ok || !data.articles?.length) {
          setState({
            status: "error",
            message:
              data.error ?? "Unable to load headlines. Please try again later.",
          });
          return;
        }
        setState({ status: "ready", articles: data.articles });
        setIndex(0);
      } catch {
        if (!cancelled) {
          setState({
            status: "error",
            message: "Unable to load headlines. Please try again later.",
          });
        }
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (state.status !== "ready" || state.articles.length === 0) return;

    progressRef.current = 0;
    setProgress(0);

    if (intervalRef.current) clearInterval(intervalRef.current);

    const tickMs = ARTICLE_DURATION_MS / 100;
    intervalRef.current = setInterval(() => {
      progressRef.current += 1;
      if (progressRef.current >= 100) {
        progressRef.current = 0;
        setProgress(0);
        setIndex((i) => (i + 1) % state.articles.length);
        return;
      }
      setProgress(progressRef.current);
    }, tickMs);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [state]);

  const article =
    state.status === "ready" ? state.articles[index] : undefined;

  return (
    <div
      className={cn(
        "flex min-h-[28rem] flex-col justify-between rounded-[20px] border border-[#ddd] bg-[#6a1b9a] px-6 py-8 text-white sm:min-h-[32rem] sm:px-12 sm:py-14 md:min-h-[36rem] md:px-16",
        className
      )}
      aria-live="polite"
      aria-busy={state.status === "loading"}
    >
      <div className="flex-1">
        {state.status === "loading" ? (
          <p className="text-lg text-white/70">Loading headlines…</p>
        ) : null}

        {state.status === "error" ? (
          <p className="text-lg text-white/80">{state.message}</p>
        ) : null}

        {article ? (
          <article className="mt-4 sm:mt-8">
            <p className="text-base leading-7 text-[#ddd] sm:text-lg sm:leading-8">
              Source: {article.author}
            </p>
            <h3 className="mt-4 font-heading text-[clamp(1.75rem,5vw,4.5rem)] font-bold leading-[1.15] text-white sm:mt-6">
              {article.title}
            </h3>
            {article.description ? (
              <p className="mt-4 max-w-3xl text-base leading-7 text-[#ddd] sm:mt-6 sm:text-lg sm:leading-8">
                {article.description}
              </p>
            ) : null}
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex h-11 min-w-[7.5rem] items-center justify-center rounded-[5px] bg-white px-5 text-sm font-bold text-[#6a1b9a] transition-colors hover:bg-[#e0e0e0]"
            >
              Read More
            </a>
          </article>
        ) : null}
      </div>

      <div
        className="mt-8 h-2.5 w-full overflow-hidden rounded-[10px] bg-[#6a1b9a]"
        aria-hidden
      >
        <div
          className="h-full rounded-[10px] bg-white transition-[width] duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
