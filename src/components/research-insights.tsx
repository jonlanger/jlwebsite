import type { ResearchInsightsData } from "@/data/headlines-research-insights";
import { cn } from "@/lib/utils";

type ResearchInsightsProps = {
  data: ResearchInsightsData;
  className?: string;
};

export function ResearchInsights({ data, className }: ResearchInsightsProps) {
  const maxSeconds = Math.max(
    ...data.attentionTimeline.points.map((p) => p.seconds)
  );

  return (
    <div
      className={cn(
        "mt-10 space-y-10 md:mt-12",
        className
      )}
      aria-label={data.title}
    >
      <p className="text-xs uppercase tracking-[0.08em] text-stone-400">
        {data.title}
      </p>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-10">
        {data.metrics.map((metric) => (
          <div key={metric.label} className="min-w-0">
            <p className="font-heading text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              {metric.value}
            </p>
            <p className="mt-2 text-sm font-medium text-foreground md:text-base">
              {metric.label}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {metric.detail}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium text-foreground">
          {data.readingDepth.title}
        </p>
        <div
          className="flex h-3 w-full overflow-hidden rounded-sm"
          role="img"
          aria-label={data.readingDepth.segments
            .map((s) => `${s.label}: ${s.percent}%`)
            .join(", ")}
        >
          {data.readingDepth.segments.map((segment) => (
            <div
              key={segment.label}
              className={cn("h-full", segment.fillClass)}
              style={{ width: `${segment.percent}%` }}
              title={`${segment.label}: ${segment.percent}%`}
            />
          ))}
        </div>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
          {data.readingDepth.segments.map((segment) => (
            <li key={segment.label} className="flex items-center gap-2">
              <span
                className={cn("size-2.5 shrink-0 rounded-sm", segment.fillClass)}
                aria-hidden
              />
              <span>
                {segment.label}{" "}
                <span className="tabular-nums text-foreground">
                  {segment.percent}%
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-4">
        <p className="text-sm font-medium text-foreground">
          {data.attentionTimeline.title}
        </p>
        <div className="flex flex-col gap-3">
          {data.attentionTimeline.points.map((point) => {
            const widthPct = (point.seconds / maxSeconds) * 100;
            return (
              <div
                key={point.year}
                className="flex min-w-0 items-center gap-3 md:gap-4"
              >
                <span className="w-12 shrink-0 text-sm tabular-nums text-muted-foreground">
                  {point.year}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="h-2 w-full overflow-hidden rounded-sm bg-stone-100">
                    <div
                      className="h-full rounded-sm bg-stone-500"
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                </div>
                <span className="w-12 shrink-0 text-right text-sm tabular-nums text-foreground">
                  {point.seconds}s
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-xs leading-relaxed text-stone-400">{data.sources}</p>
    </div>
  );
}
