"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";

import { ExpandableImage } from "@/components/expandable-image";
import type { ProjectCarouselSlide } from "@/data/past-projects";
import { cn } from "@/lib/utils";

export function ProjectImageCarousel({
  slides,
  className,
  ariaLabel = "Product screens",
}: {
  slides: readonly ProjectCarouselSlide[];
  className?: string;
  ariaLabel?: string;
}) {
  const labelId = useId();
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const count = slides.length;
  const safeIndex = count === 0 ? 0 : ((index % count) + count) % count;
  const slide = slides[safeIndex];

  const goTo = useCallback(
    (next: number) => {
      if (count === 0) return;
      setIndex(((next % count) + count) % count);
    },
    [count]
  );

  const goPrev = useCallback(() => goTo(safeIndex - 1), [goTo, safeIndex]);
  const goNext = useCallback(() => goTo(safeIndex + 1), [goTo, safeIndex]);

  useEffect(() => {
    if (safeIndex !== index) setIndex(safeIndex);
  }, [index, safeIndex]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    } else if (event.key === "Home") {
      event.preventDefault();
      goTo(0);
    } else if (event.key === "End") {
      event.preventDefault();
      goTo(count - 1);
    }
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    touchStartX.current = event.clientX;
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (touchStartX.current == null) return;
    const delta = event.clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 48) return;
    if (delta > 0) goPrev();
    else goNext();
  };

  if (!slide || count === 0) return null;

  return (
    <div
      className={cn("w-full", className)}
      role="region"
      aria-roledescription="carousel"
      aria-labelledby={labelId}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div className="flex items-end justify-between gap-4">
        <div className="min-w-0">
          <p id={labelId} className="sr-only">
            {ariaLabel}
          </p>
          {slide.title ? (
            <p className="text-sm font-medium text-foreground md:text-base">
              {slide.title}
            </p>
          ) : null}
          {slide.caption ? (
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {slide.caption}
            </p>
          ) : null}
        </div>
        <p
          className="shrink-0 text-xs tabular-nums text-muted-foreground md:text-sm"
          aria-live="polite"
        >
          {safeIndex + 1} / {count}
        </p>
      </div>

      <div
        className="relative mt-4 touch-pan-y"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          touchStartX.current = null;
        }}
      >
        <figure className="m-0">
          <ExpandableImage
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            width={slide.width}
            height={slide.height}
            sizes="(max-width: 900px) 100vw, 900px"
            className="rounded-lg"
            priority={safeIndex === 0}
          />
        </figure>

        {count > 1 ? (
          <>
            <button
              type="button"
              onClick={goPrev}
              className={cn(
                "absolute top-1/2 left-2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full",
                "border border-border/80 bg-background/90 text-foreground shadow-sm backdrop-blur-sm",
                "hover:bg-background focus-visible:ring-2 focus-visible:ring-ring outline-none",
                "md:left-3 md:size-10"
              )}
              aria-label="Previous screen"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={goNext}
              className={cn(
                "absolute top-1/2 right-2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full",
                "border border-border/80 bg-background/90 text-foreground shadow-sm backdrop-blur-sm",
                "hover:bg-background focus-visible:ring-2 focus-visible:ring-ring outline-none",
                "md:right-3 md:size-10"
              )}
              aria-label="Next screen"
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </>
        ) : null}
      </div>

      {count > 1 ? (
        <div
          className="mt-4 flex flex-wrap items-center justify-center gap-2"
          role="tablist"
          aria-label={`${ariaLabel} slides`}
        >
          {slides.map((item, i) => (
            <button
              key={item.src}
              type="button"
              role="tab"
              aria-selected={i === safeIndex}
              aria-label={`Show slide ${i + 1}: ${item.title ?? item.alt}`}
              onClick={() => goTo(i)}
              className={cn(
                "h-2 rounded-full transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring",
                i === safeIndex
                  ? "w-6 bg-foreground"
                  : "w-2 bg-border hover:bg-muted-foreground/50"
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
