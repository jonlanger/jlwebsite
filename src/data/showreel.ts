/**
 * Home page showreel playlist. Generated — do not edit by hand.
 *
 * Captions, order and recordings live in scripts/showreel/ (one file per
 * project in scripts/showreel/projects/, order in reel.config.mjs). Run
 * `npm run showreel` to re-record changed projects and regenerate
 * showreel.generated.json plus the clips in public/showreel/.
 */
import generated from "@/data/showreel.generated.json";

export type ShowreelClip = {
  slug: string;
  title: string;
  /** Short discipline tag. */
  kind: string;
  /** What the viewer is watching happen. */
  line: string;
  /** Seconds. */
  duration: number;
  video: { desktop: string; mobile: string };
  poster: string;
};

export const SHOWREEL_CLIPS: readonly ShowreelClip[] = generated.clips;
