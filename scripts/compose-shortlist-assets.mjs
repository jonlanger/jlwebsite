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

// Design system: each /design section (scripts/capture-shortlist-design.mjs),
// cropped where a section is tall and set on the page's own paper at 16:10.
const DS = path.join(SRC, "design");
const FRAME = { w: 1800, h: 1125, pad: 70 };
// published name -> [capture, top, height] in CSS px (captures are @2x); no crop when omitted
const DS_SLIDES = {
  "ds-intro": ["ds-00-intro"],
  "ds-primitives": ["ds-01-primitives"],
  "ds-criterion-hues": ["ds-02-criterion-hues"],
  "ds-state": ["ds-03-state"],
  "ds-type": ["ds-04-type"],
  "ds-motion": ["ds-05-motion"],
  "ds-map": ["ds-06-map"],
  "ds-buttons": ["ds-07-buttons"],
  "ds-forms": ["ds-08-forms", 0, 790],
  "ds-forms-rules": ["ds-08-forms", 780, 946],
  "ds-allocator": ["ds-09-components", 0, 810],
  "ds-place-card": ["ds-09-components", 800, 590],
  "ds-missing-tie": ["ds-09-components", 1380, 614],
};
for (const [out, [src, top, height]] of Object.entries(DS_SLIDES)) {
  let img = sharp(path.join(DS, `${src}.png`));
  const meta = await img.metadata();
  if (top !== undefined) img = img.extract({ left: 0, top: top * 2, width: meta.width, height: Math.min(height * 2, meta.height - top * 2) });
  const buf = await img.png().toBuffer();
  const { data } = await sharp(buf).extract({ left: 2, top: 2, width: 1, height: 1 }).raw().toBuffer({ resolveWithObject: true });
  const bg = { r: data[0], g: data[1], b: data[2] };
  const fitted = await sharp(buf).resize(FRAME.w - FRAME.pad * 2, FRAME.h - FRAME.pad * 2, { fit: "inside", background: bg }).toBuffer();
  await sharp({ create: { width: FRAME.w, height: FRAME.h, channels: 3, background: bg } })
    .composite([{ input: fitted, gravity: "center" }])
    .webp({ quality: 90 })
    .toFile(path.join(OUT, `${out}.webp`));
  console.log(out);
}
