import sharp from "sharp";
import path from "node:path";

/**
 * Turns the dark-mode captures in _src/dark into case-study images.
 * Run scripts/capture-proposalpal-dark.mjs first.
 */
const SRC = path.resolve("public/projects/proposalpal/_src/dark");
const OUT = path.resolve("public/projects/proposalpal");

// output name -> capture name
const BOARDS = {
  "dark-home": "01-home",
  "dark-help": "02-help",
  "dark-intake": "03-new-proposal",
  "dark-details": "04-details",
  "dark-workspace-sources": "05-workspace-sources",
  "dark-workspace": "06-workspace-overview",
  "dark-project-context": "07-project-context",
  "dark-chat-history": "08-chat-history",
  "dark-operations": "09-operations",
  "dark-client-research": "10-module-client-research",
  "dark-value-science": "10-module-client-research-value-science-portal",
  "dark-client-engagement": "11-module-client-engagement",
  "dark-topic-research": "12-module-topic-research",
  "dark-topic-sections": "12-module-topic-research-sections",
  "dark-storyline": "13-module-storyline-proposal",
  "dark-commercial": "14-module-commercial-approach",
  "dark-polish": "15-module-polish-proposal",
  "dark-practice-pitch": "16-module-practice-pitch",
  "dark-chat": "20-chat",
};

for (const [out, src] of Object.entries(BOARDS)) {
  await sharp(path.join(SRC, `${src}.png`))
    .resize(1800, 1125)
    .webp({ quality: 88 })
    .toFile(path.join(OUT, `${out}.webp`));
  console.log(out);
}

// 16:9 card from the home hero, cropped from the top.
await sharp(path.join(SRC, "01-home.png"))
  .resize(1280, 800)
  .extract({ left: 0, top: 0, width: 1280, height: 720 })
  .webp({ quality: 90 })
  .toFile(path.join(OUT, "proposalpal_card_dark.webp"));
console.log("card");
