import sharp from "sharp";
import path from "node:path";

/**
 * Turns the Collabfin captures in _src into case-study images.
 * Run scripts/capture-collabfin.mjs and render-collabfin-diagrams.mjs first.
 */
const SRC = path.resolve("public/projects/collabfin/_src");
const OUT = path.resolve("public/projects/collabfin");
const BG = "#0e1428"; // a step above the app canvas, so the dark screens keep an edge

// capture name -> published name
const SLIDES = {
  "d01-landing": "landing",
  "d02-landing-steps": "landing-steps",
  "d03-landing-tax": "landing-tax",
  "d04-landing-checks": "landing-checks",
  "d05-landing-plans": "landing-plans",
  "d06-landing-live": "landing-live",
  "d07-landing-a11y": "landing-a11y",
  "b10-board": "board",
  "b11-checks": "checks",
  "b12-templates": "templates",
  "b13-import-columns": "import-columns",
  "b14-import-results": "import-results",
  "b15-settings": "settings",
  "b16-settings-a11y": "settings-a11y",
  "b17-whatif-board": "whatif",
  "b18-compare": "compare",
  "b19-history": "history",
  "b20-light": "light",
};

for (const [src, out] of Object.entries(SLIDES)) {
  await sharp(path.join(SRC, `${src}.png`)).resize(1800, 1125).webp({ quality: 88 }).toFile(path.join(OUT, `${out}.webp`));
  console.log(out);
}

// Grid card: the Household board, 16:9.
await sharp(path.join(SRC, "b10-board.png")).resize(1280, 720, { position: "top" }).webp({ quality: 86 }).toFile(path.join(OUT, "collabfin_card.webp"));
console.log("collabfin_card");

// Diagrams: PNG -> WebP at the same size.
for (const name of ["diagram-personas", "diagram-journey", "diagram-flow", "diagram-architecture"]) {
  await sharp(path.join(SRC, `${name}.png`)).webp({ quality: 90 }).toFile(path.join(OUT, `${name}.webp`));
  console.log(name);
}

// Three phones side by side.
const PHONES = ["m1-landing", "m2-board", "m3-checks"];
const PH = 1100, GAP = 70, PAD = 90;
const phones = await Promise.all(
  PHONES.map(async (name) => {
    const { data, info } = await sharp(path.join(SRC, `${name}.png`)).resize({ height: PH }).png().toBuffer({ resolveWithObject: true });
    const mask = Buffer.from(`<svg width="${info.width}" height="${PH}"><rect width="${info.width}" height="${PH}" rx="36" ry="36"/></svg>`);
    const buf = await sharp(data).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
    return { buf, width: info.width };
  })
);
const W = PAD * 2 + phones.reduce((a, p) => a + p.width, 0) + GAP * (phones.length - 1);
let x = PAD;
const layers = phones.map((p) => {
  const l = { input: p.buf, left: x, top: PAD };
  x += p.width + GAP;
  return l;
});
await sharp({ create: { width: W, height: PH + PAD * 2, channels: 3, background: BG } }).composite(layers).webp({ quality: 88 }).toFile(path.join(OUT, "mobile.webp"));
console.log("mobile", W, PH + PAD * 2);
