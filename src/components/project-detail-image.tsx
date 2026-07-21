"use client";

import Image from "next/image";
import { useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type ProjectDetailImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  quality?: number;
  priority?: boolean;
};

export function ProjectDetailImage({
  src,
  alt,
  width,
  height,
  sizes,
  quality,
  priority,
}: ProjectDetailImageProps) {
  const [ready, setReady] = useState(false);

  return (
    <div
      className="relative w-full overflow-hidden rounded-lg ring-1 ring-foreground/10"
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {!ready ? (
        <Skeleton
          aria-hidden
          className="absolute inset-0 z-0 size-full rounded-lg"
        />
      ) : null}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "relative z-[1] h-auto w-full rounded-lg transition-opacity duration-300",
          ready ? "opacity-100" : "opacity-0"
        )}
        sizes={sizes}
        quality={quality}
        priority={priority}
        onLoadingComplete={() => {
          setTimeout(() => setReady(true), 0);
        }}
        onError={() => {
          setTimeout(() => setReady(true), 0);
        }}
      />
    </div>
  );
}
