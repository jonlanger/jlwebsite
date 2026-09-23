import sharp from "sharp";
import path from "node:path";

/**
 * Turns the proposalpalv3 captures in _src/v3 into case-study images.
 * Run scripts/capture-proposalpal-v3.mjs first.
 */
const SRC = path.resolve("public/projects/proposalpal/_src/v3");
const OUT = path.resolve("public/projects/proposalpal");
const BG = "#27272a"; // app muted, so the black phone screens read against it

// capture name -> published name
const SLIDES = {
  "01-home": "v3-home",
  "02-home-proposals": "v3-proposals",
  "03-new-proposal": "v3-intake",
  "04-details": "v3-details",
  "05-help": "v3-help",
  "06-workspace-sources": "v3-workspace-sources",
  "07-workspace-overview": "v3-workspace",
  "10-client-research": "v3-client-research",
  "11-client-engagement": "v3-client-engagement",
  "12-team-formation": "v3-team-formation",
  "13-topic-research": "v3-topic-research",
  "14-storyline": "v3-storyline",
  "15-commercial": "v3-commercial",
  "16-polish": "v3-polish",
  "17-practice-pitch": "v3-practice-pitch",
  "20-highlight-menu": "v3-highlight",
  "21-bookmarks": "v3-bookmarks",
  "22-bookmarks-storyline": "v3-bookmarks-storyline",
  "23-export": "v3-export",
  "24-generated-files": "v3-generated-files",
  "25-system-tasks": "v3-system-tasks",
  "27-chat": "v3-chat",
  "28-chat-history": "v3-chat-history",
  "30-walmart-storyline": "v3-walmart-storyline",
  "31-walmart-team": "v3-walmart-team",
  "32-pfizer-commercial": "v3-pfizer-commercial",
};

for (const [src, out] of Object.entries(SLIDES)) {
  await sharp(path.join(SRC, `${src}.png`)).resize(1800, 1125).webp({ quality: 88 }).toFile(path.join(OUT, `${out}.webp`));
  console.log(out);
}

// Three phones side by side.
const PHONES = ["m1-home", "m2-workspace", "m3-team"];
const PH = 1100, GAP = 70, PAD = 90;
const phones = await Promise.all(
  PHONES.map(async (n) => {
    const img = sharp(path.join(SRC, `${n}.png`)).resize({ height: PH });
    const { width } = await img.clone().toBuffer({ resolveWithObject: true }).then((r) => r.info);
    const mask = Buffer.from(`<svg width="${width}" height="${PH}"><rect width="${width}" height="${PH}" rx="36" ry="36"/></svg>`);
    return { buf: await img.composite([{ input: mask, blend: "dest-in" }]).png().toBuffer(), width };
  }),
);
const W = phones.reduce((s, p) => s + p.width, 0) + GAP * (phones.length - 1) + PAD * 2;
let left = PAD;
await sharp({ create: { width: W, height: PH + PAD * 2, channels: 3, background: BG } })
  .composite(phones.map((p) => { const o = { input: p.buf, left, top: PAD }; left += p.width + GAP; return o; }))
  .webp({ quality: 88 })
  .toFile(path.join(OUT, "v3-mobile.webp"));
console.log("v3-mobile", W, PH + PAD * 2);

// 16:9 card from the home hero, cropped from the top.
await sharp(path.join(SRC, "01-home.png"))
  .resize(1280, 800)
  .extract({ left: 0, top: 0, width: 1280, height: 720 })
  .webp({ quality: 90 })
  .toFile(path.join(OUT, "proposalpal_card_v3.webp"));
console.log("card");
