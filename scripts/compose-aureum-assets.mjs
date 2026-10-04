import sharp from "sharp";
import path from "node:path";

/**
 * Turns the Aureum captures in _src into case-study images.
 * Run scripts/capture-aureum.mjs and render-aureum-diagrams.mjs first.
 */
const SRC = path.resolve("public/projects/aureum/_src");
const OUT = path.resolve("public/projects/aureum");
const W = 1800, H = 1125;

const webp = async (from, to, { quality = 88, resize = { width: W, height: H, position: "top" } } = {}) => {
  let img = sharp(path.join(SRC, from));
  if (resize) img = img.resize(resize);
  await img.webp({ quality }).toFile(path.join(OUT, `${to}.webp`));
  console.log(to);
};

// Desktop app, homepage and design-system captures -> 1800×1125.
const DESKTOP = [
  "app-home", "app-plan", "app-plan-match", "app-budget", "app-goals", "app-debt", "app-coach", "app-why", "app-lesson", "app-goal-new", "app-dark",
  "site-hero", "site-moves", "site-features", "site-legible", "site-simulate", "site-security",
  "ds-00-cover", "ds-01-brand", "ds-02-color", "ds-03-data-color", "ds-04-type", "ds-05-type-scale", "ds-06-tokens", "ds-07-motion", "ds-08-icons",
  "ds-09-illustration", "ds-10-people", "ds-11-art-rules", "ds-12-components", "ds-13-components-2", "ds-14-coach",
  "ds-15-dataviz", "ds-16-dataviz-2", "ds-17-dataviz-3", "ds-18-rules", "ds-19-dark",
];
for (const n of DESKTOP) await webp(`${n}.png`, n);

/** Phone screens (390×844 @3x) side by side on a soft brand field, 1800×1125. */
async function phones(files, to, bg = "#e3f7f5") {
  const gap = 56, fitW = (W - 2 * 110 - (files.length - 1) * gap) / files.length;
  const pw = Math.round(Math.min(fitW, (960 * 390) / 844)), ph = Math.round((pw * 844) / 390), r = Math.round(pw / 9.5);
  const total = files.length * pw + (files.length - 1) * gap;
  const x0 = Math.round((W - total) / 2), y0 = Math.round((H - ph) / 2);
  const mask = Buffer.from(`<svg width="${pw}" height="${ph}"><rect width="${pw}" height="${ph}" rx="${r}" fill="#fff"/></svg>`);
  const shadow = Buffer.from(`<svg width="${W}" height="${H}"><defs><filter id="s" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="22"/></filter></defs>${files
    .map((_, i) => `<rect x="${x0 + i * (pw + gap)}" y="${y0 + 18}" width="${pw}" height="${ph}" rx="${r}" fill="#0b3f41" opacity=".22" filter="url(#s)"/>`)
    .join("")}</svg>`);
  const layers = [{ input: shadow, left: 0, top: 0 }];
  for (const [i, f] of files.entries()) {
    const screen = await sharp(path.join(SRC, `${f}.png`)).resize(pw, ph, { position: "top" }).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
    layers.push({ input: screen, left: x0 + i * (pw + gap), top: y0 });
  }
  await sharp({ create: { width: W, height: H, channels: 3, background: bg } }).composite(layers).webp({ quality: 88 }).toFile(path.join(OUT, `${to}.webp`));
  console.log(to);
}

await phones(["ob-01-welcome", "ob-02-name", "ob-03-pay", "ob-04-stability"], "ob-strip-1");
await phones(["ob-05-essentials", "ob-07-debt", "ob-08-match", "ob-09-goal"], "ob-strip-2");
await phones(["ob-10-nudges", "ob-11-building", "ob-12-plan"], "ob-strip-3");
await phones(["phone-home", "phone-plan", "phone-budget"], "phone-strip-1", "#d3eeeb");
await phones(["phone-goals", "phone-debt", "phone-coach"], "phone-strip-2", "#d3eeeb");

// Grid card, 16:9: the marketing hero, "Money, mentored."
await sharp(path.join(SRC, "site-hero.png")).resize(1280, 720, { position: "top" }).webp({ quality: 86 }).toFile(path.join(OUT, "aureum_card.webp"));
console.log("aureum_card");

// Diagrams: PNG -> WebP at the same size.
for (const n of ["diagram-people", "diagram-friction", "diagram-moves", "research-rules", "diagram-ia", "flow-onboarding", "flow-coach", "diagram-money-map", "diagram-system", "diagram-governor", "diagram-health"]) {
  await webp(`${n}.png`, n, { quality: 90, resize: null }).catch((e) => console.warn("skip", n, e.message));
}

// The 2024 brand board, letterboxed to 16:10 so the carousel can show it whole.
for (const [from, to] of [["aureum_logo_and_brand", "v1-brand"], ["aureum_components", "v1-components"], ["aureum_illustration_assets", "v1-illustration"]]) {
  await sharp(path.join(OUT, `${from}.png`))
    .resize(W - 160, H - 160, { fit: "inside" })
    .extend({ top: 80, bottom: 80, left: 80, right: 80, background: "#ffffff" })
    .resize(W, H, { fit: "contain", background: "#ffffff" })
    .webp({ quality: 88 })
    .toFile(path.join(OUT, `${to}.webp`));
  console.log(to);
}
