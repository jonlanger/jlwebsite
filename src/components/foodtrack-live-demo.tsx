"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const PROTOTYPE_PATH = "/projects/foodtrack/prototype.html?v=6";
const PROTOTYPE_EXTERNAL = "https://jonlanger.github.io/track/track_app.html";
const MIN_HEIGHT = 560;

export function FoodtrackLiveDemo({ className }: { className?: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(MIN_HEIGHT);

  const hugContent = useCallback(() => {
    const iframe = iframeRef.current;
    const doc = iframe?.contentDocument;
    if (!iframe || !doc?.body) return;

    const next = Math.ceil(
      Math.max(
        doc.body.scrollHeight,
        doc.documentElement.scrollHeight,
        doc.body.offsetHeight,
        doc.documentElement.offsetHeight,
        MIN_HEIGHT
      )
    );

    setHeight((prev) => (Math.abs(prev - next) > 1 ? next : prev));
  }, []);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    function onMessage(event: MessageEvent) {
      const data = event.data;
      if (
        data &&
        typeof data === "object" &&
        data.source === "foodtrack-prototype" &&
        data.type === "resize" &&
        typeof data.height === "number" &&
        data.height > 0
      ) {
        setHeight(Math.max(MIN_HEIGHT, Math.ceil(data.height)));
      }
    }

    function onLoad() {
      // Let layout settle, then hug.
      requestAnimationFrame(() => {
        hugContent();
        window.setTimeout(hugContent, 50);
        window.setTimeout(hugContent, 250);
      });
    }

    window.addEventListener("message", onMessage);
    iframe.addEventListener("load", onLoad);
    if (iframe.contentDocument?.readyState === "complete") onLoad();

    const poll = window.setInterval(hugContent, 1000);

    return () => {
      window.removeEventListener("message", onMessage);
      iframe.removeEventListener("load", onLoad);
      window.clearInterval(poll);
    };
  }, [hugContent]);

  return (
    <div className={cn("mt-8", className)}>
      <div className="rounded-xl border border-border bg-muted/30">
        <iframe
          ref={iframeRef}
          title="Foodtrack interactive prototype"
          src={PROTOTYPE_PATH}
          className="block w-full border-0 bg-background"
          style={{ height: `${height}px` }}
          scrolling="no"
        />
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        <a
          href={PROTOTYPE_EXTERNAL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:text-foreground"
        >
          Open prototype in a new tab
        </a>
      </p>
    </div>
  );
}
