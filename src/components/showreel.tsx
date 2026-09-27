"use client";

import { ArrowRight, Pause, Play } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

import { SHOWREEL_CLIPS } from "@/data/showreel";
import { cn } from "@/lib/utils";

const COUNT = SHOWREEL_CLIPS.length;
const CROSSFADE_MS = 350;
const pad = (n: number) => String(n).padStart(2, "0");
const wrap = (i: number) => ((i % COUNT) + COUNT) % COUNT;

type Slot = 0 | 1;

const MOBILE_QUERY = "(max-width: 767px)";
const subscribeMobile = (cb: () => void) => {
  const mq = window.matchMedia(MOBILE_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/**
 * Plays the showreel as a playlist of per-project clips. Two <video> elements
 * alternate: one plays while the other preloads the next clip, then they
 * crossfade — so clips can be added or re-recorded independently and viewers
 * only download what they watch.
 */
export function Showreel({ className }: { className?: string }) {
  const videoRefs = useRef<[HTMLVideoElement | null, HTMLVideoElement | null]>([null, null]);
  const fillRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const rootRef = useRef<HTMLElement>(null);

  // Which clip each video element holds, and which one is on screen.
  const [slots, setSlots] = useState<[number, number]>([0, wrap(1)]);
  const [active, setActive] = useState<Slot>(0);
  const [playing, setPlaying] = useState(false);
  // Phones get the lighter 720p clips; no source is chosen during SSR.
  const variant = useSyncExternalStore(
    subscribeMobile,
    () => (window.matchMedia(MOBILE_QUERY).matches ? "mobile" : "desktop"),
    () => null
  );

  const wantsPlay = useRef(true); // false once the viewer pauses
  const visible = useRef(false);
  const index = slots[active];
  const clip = SHOWREEL_CLIPS[index];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) wantsPlay.current = false;
  }, []);

  const syncPlayback = useCallback(() => {
    const v = videoRefs.current[active];
    if (!v) return;
    if (wantsPlay.current && visible.current) v.play().catch(() => {});
    else v.pause();
  }, [active]);

  // Autoplay only while on screen.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting;
        syncPlayback();
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [syncPlayback]);

  // When the on-screen slot changes: start it, and park the other one.
  useEffect(() => {
    const other = videoRefs.current[active === 0 ? 1 : 0];
    if (other) other.pause();
    syncPlayback();
  }, [active, slots, variant, syncPlayback]);

  const goTo = useCallback(
    (target: number, { crossfade }: { crossfade: boolean }) => {
      const next = wrap(target);
      const standby: Slot = active === 0 ? 1 : 0;
      if (crossfade && slots[standby] === next) {
        // The next clip is already buffered in the standby slot: swap, then
        // load the one after into the slot we just left (after the fade).
        setActive(standby);
        window.setTimeout(() => {
          setSlots((s) => {
            const copy: [number, number] = [s[0], s[1]];
            copy[active] = wrap(next + 1);
            return copy;
          });
        }, CROSSFADE_MS + 50);
        return;
      }
      // Jump: load the target into the visible slot, queue the one after.
      const copy: [number, number] = [0, 0];
      copy[active] = next;
      copy[standby] = wrap(next + 1);
      setSlots(copy);
      const v = videoRefs.current[active];
      if (v && slots[active] === next) v.currentTime = 0;
    },
    [active, slots]
  );

  // Chapter bars follow the playing clip.
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const v = videoRefs.current[active];
      const p = v && v.duration ? Math.min(v.currentTime / v.duration, 1) : 0;
      fillRefs.current.forEach((el, i) => {
        if (el) el.style.transform = `scaleX(${i < index ? 1 : i === index ? p : 0})`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, index]);

  const toggle = () => {
    wantsPlay.current = !playing;
    if (wantsPlay.current) visible.current = true;
    syncPlayback();
  };

  if (COUNT === 0) return null;

  return (
    <figure ref={rootRef} className={cn("w-full", className)} aria-label="Showreel of live product interactions">
      <div className="relative aspect-video w-full overflow-clip rounded-xl bg-[#0a0a0a] shadow-2xl shadow-black/20 ring-1 ring-black/10 dark:ring-white/10">
        {([0, 1] as const).map((slot) => {
          const c = SHOWREEL_CLIPS[slots[slot]];
          const onScreen = slot === active;
          return (
            <video
              key={slot}
              ref={(el) => {
                videoRefs.current[slot] = el;
              }}
              className={cn(
                "absolute inset-0 size-full cursor-pointer object-cover transition-opacity ease-out",
                onScreen ? "opacity-100" : "pointer-events-none opacity-0"
              )}
              style={{ transitionDuration: `${CROSSFADE_MS}ms` }}
              src={variant ? c.video[variant] : undefined}
              poster={c.poster}
              muted
              playsInline
              preload={onScreen ? "auto" : "metadata"}
              aria-hidden={!onScreen}
              onClick={toggle}
              onPlay={() => onScreen && setPlaying(true)}
              onPause={() => onScreen && setPlaying(false)}
              onEnded={() => onScreen && goTo(index + 1, { crossfade: true })}
            />
          );
        })}

        <button
          type="button"
          onClick={toggle}
          className="absolute right-2 top-2 z-10 flex size-8 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-colors hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-4 sm:top-4 sm:size-9"
          aria-label={playing ? "Pause showreel" : "Play showreel"}
        >
          {playing ? <Pause className="size-4" /> : <Play className="size-4 translate-x-px" />}
        </button>
      </div>

      {/* Chapter bars: one per project, sized to its share of the reel. */}
      <div className="mt-4 flex gap-1 sm:gap-1.5">
        {SHOWREEL_CLIPS.map((c, i) => (
          <button
            key={c.slug}
            type="button"
            onClick={() => goTo(i, { crossfade: false })}
            className="group/seg relative h-5 min-w-0 focus-visible:outline-none"
            style={{ flexGrow: c.duration }}
            aria-label={`Jump to ${c.title}`}
            aria-current={i === index ? "step" : undefined}
          >
            <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-foreground/15 transition-[height] group-hover/seg:h-[5px] group-focus-visible/seg:ring-2 group-focus-visible/seg:ring-ring">
              <span
                ref={(el) => {
                  fillRefs.current[i] = el;
                }}
                className="absolute inset-0 origin-left rounded-full bg-foreground"
                style={{ transform: "scaleX(0)" }}
              />
            </span>
          </button>
        ))}
      </div>

      <figcaption className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
        <div key={clip.slug} className="min-w-0 animate-in fade-in slide-in-from-bottom-1 duration-500">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {pad(index + 1)} / {pad(COUNT)} · {clip.kind}
          </p>
          <p className="mt-1.5 font-heading text-xl font-semibold tracking-tight text-foreground md:text-2xl">
            {clip.title}
          </p>
          <p className="mt-1 min-h-[2lh] text-[15px] leading-snug text-muted-foreground sm:min-h-0">{clip.line}</p>
        </div>
        <Link
          href={`/projects/${clip.slug}`}
          className="group inline-flex shrink-0 items-center gap-1.5 text-[15px] font-medium text-foreground underline-offset-4 hover:underline"
        >
          View case study
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </figcaption>
      <p className="sr-only" aria-live="polite">
        {playing ? "" : `${clip.title}: ${clip.line}`}
      </p>
    </figure>
  );
}
