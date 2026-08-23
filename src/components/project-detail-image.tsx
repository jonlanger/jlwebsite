import Image from "next/image";

type ProjectDetailImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  quality?: number;
  /** Load immediately instead of lazily — for the first image on the page. */
  eager?: boolean;
};

export function ProjectDetailImage({
  src,
  alt,
  width,
  height,
  sizes,
  quality,
  eager,
}: ProjectDetailImageProps) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-lg bg-muted/40 ring-1 ring-foreground/10"
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="relative z-[1] h-auto w-full rounded-lg"
        sizes={sizes}
        quality={quality}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : undefined}
        // Case-study boards are extremely tall (~7500 CSS px when laid out).
        // Chromium's async decode path drops images that large and paints
        // nothing, so decode them synchronously. Verified: with decoding
        // "async" the board never rasterizes; with "sync" it renders.
        decoding="sync"
      />
    </div>
  );
}
