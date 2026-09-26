import sharp from "sharp";
import path from "node:path";

/**
 * Turns the RelationshipViz captures in _src into case-study images.
 * Run scripts/capture-relationshipviz.mjs and capture-relationshipviz-design.mjs first.
 */
const SRC = path.resolve("public/projects/relationshipviz/_src");
const OUT = path.resolve("public/projects/relationshipviz");
const BG = "#16171a"; // a step above the app canvas, so the dark screens keep an edge

// capture name -> published name
const SLIDES = {
  "d01-landing": "landing",
  "d02-landing-why": "landing-why",
  "d03-landing-stickiest": "landing-stickiest",
  "d04-landing-compare": "landing-compare",
  "d05-landing-stress": "landing-stress",
  "d10-explore": "explore",
  "d11-explore-community": "explore-community",
  "d12-explore-risk": "explore-risk",
  "d13-explore-drawer": "explore-drawer",
  "d20-insights": "insights",
  "d21-insights-sankey": "insights-sankey",
  "d30-lenses": "lenses",
  "d31-lenses-tune": "lenses-tune",
  "d32-lenses-deps": "lenses-deps",
  "d33-stress": "stress",
  "d40-portfolio-empty": "portfolio-empty",
  "d41-portfolio": "portfolio",
  "d42-portfolio-lookthrough": "portfolio-lookthrough",
  "d50-ideas-question": "ideas-question",
  "d51-ideas-results": "ideas-results",
  "d60-company": "company",
  "d61-company-supply": "company-supply",
  "d62-company-relationships": "company-relationships",
  "d70-data": "data",
};

for (const [src, out] of Object.entries(SLIDES)) {
  await sharp(path.join(SRC, `${src}.png`)).resize(1800, 1125).webp({ quality: 88 }).toFile(path.join(OUT, `${out}.webp`));
  console.log(out);
}

// Grid card: Explore with the Nvidia drawer open, 16:9.
await sharp(path.join(SRC, "d13-explore-drawer.png")).resize(1280, 720, { position: "top" }).webp({ quality: 86 }).toFile(path.join(OUT, "relationshipviz_card.webp"));
console.log("relationshipviz_card");

// Three phones side by side.
const PHONES = ["m1-landing", "m2-lenses", "m3-company"];
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

// Design system boards: Storybook captures laid out in columns (each column a
// vertical stack), scaled to fit a 16:10 frame on the app canvas.
const DS = path.join(SRC, "design");
const FRAME = { w: 1800, h: 1125, pad: 80, gap: 48 };
const BOARDS = {
  "ds-themes": [["ds-01-surfaces"], ["ds-01-surfaces-light"]],
  "ds-dataviz": [["ds-02-dataviz"]],
  "ds-type": [["ds-03-type"]],
  "ds-atoms": [["ds-10-buttons", "ds-20-scoremeter", "ds-22-evidence"], ["ds-21-factors"]],
  "ds-scorecard": [["ds-30-scorecard"], ["ds-30-scorecard-light"]],
  "ds-organisms": [["ds-32-drawer"], ["ds-31-relationship"], ["ds-34-stepper"]],
  "ds-scenario": [["ds-33-scenario"]],
  "ds-quadrant": [["ds-35-quadrant"]],
};
for (const [out, columns] of Object.entries(BOARDS)) {
  const cols = await Promise.all(
    columns.map((names) => Promise.all(names.map(async (n) => ({ file: path.join(DS, `${n}.png`), ...(await sharp(path.join(DS, `${n}.png`)).metadata()) }))))
  );
  const colW = cols.map((c) => Math.max(...c.map((i) => i.width)));
  const colH = cols.map((c) => c.reduce((a, i) => a + i.height, 0) + FRAME.gap * 2 * (c.length - 1));
  const rawW = colW.reduce((a, b) => a + b, 0) + FRAME.gap * 2 * (cols.length - 1);
  const rawH = Math.max(...colH);
  const s = Math.min((FRAME.w - FRAME.pad * 2) / rawW, (FRAME.h - FRAME.pad * 2) / rawH);
  const gap = Math.round(FRAME.gap * 2 * s);
  const totalW = Math.round(rawW * s);
  let left = Math.round((FRAME.w - totalW) / 2);
  const comps = [];
  for (let ci = 0; ci < cols.length; ci++) {
    let top = Math.round((FRAME.h - colH[ci] * s) / 2);
    for (const img of cols[ci]) {
      const w = Math.round(img.width * s), h = Math.round(img.height * s);
      comps.push({ input: await sharp(img.file).resize(w, h).toBuffer(), left: left + Math.round((colW[ci] * s - w) / 2), top });
      top += h + gap;
    }
    left += Math.round(colW[ci] * s) + gap;
  }
  await sharp({ create: { width: FRAME.w, height: FRAME.h, channels: 3, background: BG } })
    .composite(comps)
    .webp({ quality: 90 })
    .toFile(path.join(OUT, `${out}.webp`));
  console.log(out);
}
