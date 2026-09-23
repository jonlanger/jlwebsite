"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";

export function ExpandableImage({
  src,
  alt,
  width,
  height,
  className,
  sizes = "(max-width: 900px) 100vw, 900px",
  priority,
  /** Carousel preview: crop to a fixed frame. Lightbox always shows the full image. */
  previewFit = "natural",
  /** Used when previewFit is cover (default 16/9). */
  previewAspectClassName = "aspect-video",
  /** object-position for cover previews (e.g. object-top for tall screens). */
  previewObjectPositionClassName = "object-center",
  /** Controlled lightbox state (lets a parent keep it open across slides). */
  open: openProp,
  onOpenChange,
  /** Prev/next controls inside the lightbox (arrows, arrow keys, swipe). */
  lightboxNav,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  previewFit?: "natural" | "cover";
  previewAspectClassName?: string;
  previewObjectPositionClassName?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  lightboxNav?: { onPrev: () => void; onNext: () => void; position?: string };
}) {
  const titleId = useId();
  const [openState, setOpenState] = useState(false);
  const open = openProp ?? openState;
  const setOpen = (next: boolean) => {
    if (openProp === undefined) setOpenState(next);
    onOpenChange?.(next);
  };
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const suppressClick = useRef(false);
  const [mounted, setMounted] = useState(false);
  const cover = previewFit === "cover";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      else if (lightboxNav && event.key === "ArrowLeft") {
        event.preventDefault();
        lightboxNav.onPrev();
      } else if (lightboxNav && event.key === "ArrowRight") {
        event.preventDefault();
        lightboxNav.onNext();
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, lightboxNav?.onPrev, lightboxNav?.onNext]);

  const onLightboxPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    suppressClick.current = false;
    if (!lightboxNav) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    swipeStart.current = { x: event.clientX, y: event.clientY };
  };

  const onLightboxPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = swipeStart.current;
    swipeStart.current = null;
    if (!start || !lightboxNav) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
    // A swipe that ends on the backdrop would otherwise register as a close.
    suppressClick.current = true;
    if (dx > 0) lightboxNav.onPrev();
    else lightboxNav.onNext();
  };

  const navButtonClassName =
    "absolute top-1/2 z-[120] flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/95 text-foreground shadow-md ring-1 ring-border transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "group relative block w-full max-w-full overflow-hidden rounded-lg p-0 text-left outline-none",
          "cursor-zoom-in focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          cover && previewAspectClassName,
          className
        )}
        aria-label={`View larger: ${alt}`}
      >
        {cover ? (
          <Image
            src={src}
            alt={alt}
            fill
            className={cn(
              "rounded-lg object-cover transition-[filter] duration-200 group-hover:brightness-[0.98]",
              previewObjectPositionClassName
            )}
            sizes={sizes}
            priority={priority}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="h-auto w-full rounded-lg transition-[filter] duration-200 group-hover:brightness-[0.98]"
            sizes={sizes}
            priority={priority}
            // The preview is optimized; the lightbox below deliberately loads
            // the full-resolution original, and only once it is opened.
          />
        )}
        <span
          className="pointer-events-none absolute bottom-2 right-2 z-[1] flex items-center gap-1 rounded-md bg-background/90 px-2 py-1 text-xs font-medium text-foreground shadow-sm opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
          aria-hidden
        >
          <Maximize2 className="size-3.5" />
          Full screen
        </span>
      </button>

      {mounted && open
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="fixed inset-0 z-[110] touch-pan-y"
              onPointerDown={onLightboxPointerDown}
              onPointerUp={onLightboxPointerUp}
              onPointerCancel={() => {
                swipeStart.current = null;
              }}
            >
              <button
                type="button"
                className="absolute inset-0 bg-black/85 backdrop-blur-[2px]"
                aria-label="Close full screen image"
                onClick={() => {
                  if (suppressClick.current) {
                    suppressClick.current = false;
                    return;
                  }
                  setOpen(false);
                }}
              />
              <h2 id={titleId} className="sr-only">
                {alt}
              </h2>
              <button
                type="button"
                className="absolute top-[max(1rem,env(safe-area-inset-top))] right-[max(1rem,env(safe-area-inset-right))] z-[120] flex size-11 items-center justify-center rounded-full bg-background/95 text-foreground shadow-md ring-1 ring-border transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Close full screen image"
                onClick={() => setOpen(false)}
              >
                <X className="size-5" />
              </button>
              {lightboxNav ? (
                <>
                  {lightboxNav.position ? (
                    <p
                      className="absolute top-[max(1rem,env(safe-area-inset-top))] left-[max(1rem,env(safe-area-inset-left))] z-[120] flex h-11 items-center rounded-full bg-background/95 px-4 text-sm tabular-nums text-foreground shadow-md ring-1 ring-border"
                      aria-live="polite"
                    >
                      {lightboxNav.position}
                    </p>
                  ) : null}
                  <button
                    type="button"
                    className={cn(
                      navButtonClassName,
                      "left-[max(0.5rem,env(safe-area-inset-left))] md:left-4"
                    )}
                    aria-label="Previous image"
                    onClick={lightboxNav.onPrev}
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    type="button"
                    className={cn(
                      navButtonClassName,
                      "right-[max(0.5rem,env(safe-area-inset-right))] md:right-4"
                    )}
                    aria-label="Next image"
                    onClick={lightboxNav.onNext}
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </>
              ) : null}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-auto p-4 pt-16">
                {/*
                  Native img scales to the viewport. next/image width/height was
                  capping lightbox size at the asset's intrinsic pixels (~1152px).
                */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={alt}
                  draggable={false}
                  className={cn(
                    "pointer-events-auto max-h-[calc(100dvh-5rem)] h-auto w-auto object-contain select-none",
                    lightboxNav
                      ? "max-w-[calc(100vw-2rem)] md:max-w-[calc(100vw-9rem)]"
                      : "max-w-[calc(100vw-2rem)]"
                  )}
                />
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
