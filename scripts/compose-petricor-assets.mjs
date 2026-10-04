import sharp from "sharp";
import path from "node:path";

/**
 * Turns the Petricor captures in _src into case-study images.
 * Run scripts/capture-petricor.mjs and render-petricor-diagrams.mjs first.
 */
const SRC = path.resolve("public/projects/petricor/_src");
const OUT = path.resolve("public/projects/petricor");

const webp = async (from, to, resize, quality = 88) => {
  let img = sharp(path.join(SRC, from));
  if (resize) img = img.resize(resize);
  await img.webp({ quality }).toFile(path.join(OUT, `${to}.webp`));
  console.log(to);
};

// Product shots the site publishes (16:10) -> 1800×1125.
const SHOTS = [
  "device-protocol", "device-samples", "device-printing", "device-scan", "device-load", "device-incubation", "device-dish",
  "cloud-overview", "cloud-run", "cloud-compare", "cloud-review", "cloud-report", "cloud-samples", "cloud-lab",
];
for (const n of SHOTS) await webp(`shots/${n}.jpg`, n, { width: 1800, height: 1125 });

// Live captures (1440×900 @2x) -> 1800×1125.
const CAPTURES = {
  "h01-hero": "site-hero",
  "c01-runs": "cloud-runs",
  "c02-all-six-uv": "cloud-all-six-uv",
  "c03-growth-review": "cloud-growth-review",
  "c06-roles": "cloud-roles",
  "c07-lab-rhizopus": "cloud-lab-rhizopus",
};
for (const [src, out] of Object.entries(CAPTURES)) await webp(`${src}.png`, out, { width: 1800, height: 1125 });

// Hardware renders from the parametric Blender model, at native size.
const RENDERS = [
  "hero_blue", "open_blue", "exploded", "exploded_side", "section", "interior", "plates_top",
  "x_imaging", "x_carousel", "x_climate", "x_console", "x_insulation",
  "d_carousel", "d_culture", "d_culture_b", "d_scanner", "d_console", "d_imaging", "d_rear_io", "rear",
];
for (const n of RENDERS) await webp(`renders/${n}.png`, `hw-${n.replace(/_/g, "-")}`, undefined, 86);

// Grid card, 16:9: the core feature, live colony tracking on a dish (PC-6 touchscreen).
await sharp(path.join(SRC, "shots/device-dish.jpg")).resize(1280, 720).webp({ quality: 86 }).toFile(path.join(OUT, "petricor_card.webp"));
console.log("petricor_card");

// Diagrams: PNG -> WebP at the same size.
for (const n of ["diagram-system", "diagram-people", "diagram-custody", "research-growth", "research-standards", "flow-bench", "flow-review"]) {
  await webp(`${n}.png`, n, undefined, 90);
}
