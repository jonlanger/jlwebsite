"use client";

import { Dialog } from "@base-ui/react/dialog";
import Image from "next/image";
import { Maximize2, X } from "lucide-react";

import { cn } from "@/lib/utils";

export function ExpandableImage({
  src,
  alt,
  width,
  height,
  className,
  sizes = "(max-width: 900px) 100vw, 900px",
  priority,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <Dialog.Root modal>
      <Dialog.Trigger
        className={cn(
          "group relative block w-full max-w-full overflow-hidden rounded-lg p-0 text-left outline-none",
          "cursor-zoom-in focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          className
        )}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-auto w-full rounded-lg transition-[filter] duration-200 group-hover:brightness-[0.98]"
          sizes={sizes}
          priority={priority}
        />
        <span
          className="pointer-events-none absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-background/90 px-2 py-1 text-xs font-medium text-foreground shadow-sm opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
          aria-hidden
        >
          <Maximize2 className="size-3.5" />
          Full screen
        </span>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-[2px] transition-[opacity] data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup
          className={cn(
            "pointer-events-none fixed inset-0 z-[110] flex items-center justify-center p-4 pt-16 outline-none",
            "transition-[opacity,transform] data-[ending-style]:scale-[0.98] data-[ending-style]:opacity-0 data-[starting-style]:scale-[0.98] data-[starting-style]:opacity-0"
          )}
          initialFocus={false}
        >
          <Dialog.Title className="sr-only">{alt}</Dialog.Title>
          <Dialog.Close
            className="pointer-events-auto fixed top-[max(1rem,env(safe-area-inset-top))] right-[max(1rem,env(safe-area-inset-right))] z-[120] flex size-11 items-center justify-center rounded-full bg-background/95 text-foreground shadow-md ring-1 ring-border transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Close full screen image"
          >
            <X className="size-5" />
          </Dialog.Close>
          <div className="pointer-events-auto flex max-h-[min(100dvh-5rem,100%)] max-w-full items-center justify-center overflow-auto">
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              className="h-auto max-h-[min(100dvh-5rem,100%)] w-auto max-w-full object-contain"
              sizes="100vw"
            />
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
