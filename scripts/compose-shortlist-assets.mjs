import sharp from "sharp";
import path from "node:path";

/**
 * Turns the Shortlist captures in _src into case-study images.
 * Run scripts/capture-shortlist.mjs first.
 */
const SRC = path.resolve("public/projects/shortlist/_src");
const OUT = path.resolve("public/projects/shortlist");
const BG = "#e9eeeb"; // app sunken, so the pale phone screens read against it

// capture name -> published name
const SLIDES = {
  "d01-landing": "landing",
  "d02-landing-why": "landing-why",
  "d03-landing-how": "landing-how",
  "d04-landing-examples": "landing-examples",
  "d05-places-empty": "places-empty",
  "d06-places-filled": "places",
  "d07-priorities": "priorities",
  "d10-ranking": "ranking",
  "d10b-ranking-cards": "ranking-cards",
  "d11-ranking-schools": "ranking-schools",
  "d13-flip-hint": "flip-hint",
  "d14-flip-applied": "flip-applied",
  "d15-own-numbers": "own-numbers",
  "d16-save-dialog": "save",
  "d17-saved": "saved",
  "d20-design": "design",
  "d21-design-2": "design-state",
  "d22-design-3": "design-motion",
  "d23-design-4": "design-forms",
};

for (const [src, out] of Object.entries(SLIDES)) {
  await sharp(path.join(SRC, `${src}.png`)).resize(1800, 1125).webp({ quality: 88 }).toFile(path.join(OUT, `${out}.webp`));
  console.log(out);
}

// Grid card: the ranking with the map, 16:9.
await sharp(path.join(SRC, "d10b-ranking-cards.png")).resize(1280, 720, { position: "top" }).webp({ quality: 86 }).toFile(path.join(OUT, "shortlist_card.webp"));
console.log("shortlist_card");

// Three phones side by side.
const PHONES = ["m2-priorities", "m3-ranking", "m4-map"];
const PH = 1100, GAP = 70, PAD = 90;
const phones = await Promise.all(
  PHONES.map(async (name) => {
    const img = sharp(path.join(SRC, `${name}.png`)).resize({ height: PH });
    const { width } = await img.clone().metadata().then(() => img.clone().toBuffer({ resolveWithObject: true })).then((r) => r.info);
    const r = 36;
    const mask = Buffer.from(`<svg width="${width}" height="${PH}"><rect width="${width}" height="${PH}" rx="${r}" ry="${r}"/></svg>`);
    const buf = await img.composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
    return { buf, width };
  })
);
const W = PAD * 2 + phones.reduce((a, p) => a + p.width, 0) + GAP * (phones.length - 1);
const H = PH + PAD * 2;
let x = PAD;
const layers = phones.map((p) => {
  const l = { input: p.buf, left: x, top: PAD };
  x += p.width + GAP;
  return l;
});
await sharp({ create: { width: W, height: H, channels: 3, background: BG } }).composite(layers).webp({ quality: 88 }).toFile(path.join(OUT, "mobile.webp"));
console.log("mobile", W, H);
