import {
  COCO_FEATURE_RANKING_DATA,
  type FeatureRankingBlock,
} from "@/data/coco-feature-ranking";
import { cn } from "@/lib/utils";

export type { FeatureRankingBlock };

type FeatureRankingChartsProps = {
  className?: string;
  data?: readonly FeatureRankingBlock[];
};

export function FeatureRankingCharts({
  className,
  data = COCO_FEATURE_RANKING_DATA,
}: FeatureRankingChartsProps) {
  return (
    <div
      className={cn(
        "grid w-full grid-cols-1 gap-12 md:grid-cols-2 md:gap-12",
        className
      )}
    >
      {data.map((block) => {
        const maxRank = Math.max(...block.features.map((f) => f.rank));
        return (
          <div key={block.persona} className="w-full min-w-0">
            <p className="mb-4 text-xs uppercase tracking-[0.08em] text-stone-400">
              {block.persona}
            </p>
            <div className="flex flex-col gap-[10px]">
              {block.features.map((feature) => {
                const widthPct = (feature.rank / maxRank) * 100;
                const isTop = feature.rank === maxRank;
                return (
                  <div
                    key={feature.name}
                    className="flex min-w-0 items-center gap-3"
                  >
                    <span className="min-w-0 flex-[1.05] text-[13px] leading-snug text-stone-600">
                      {feature.name}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="h-1.5 w-full overflow-hidden rounded-[3px]">
                        <div
                          className={cn(
                            "h-full rounded-[3px]",
                            isTop ? "bg-stone-500" : "bg-stone-200"
                          )}
                          style={{ width: `${widthPct}%` }}
                        />
                      </div>
                    </div>
                    <span className="min-w-[20px] shrink-0 text-right text-xs text-stone-400 tabular-nums">
                      {feature.rank}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
