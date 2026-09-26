import { chromium } from "/Users/jonlanger/Documents/Projects/careshift/node_modules/playwright/index.mjs";
import { mkdir } from "node:fs/promises";
import path from "node:path";

/**
 * Photographs each section of Shortlist's live design system (/design) on its
 * own. The page renders the real components on seed data, so these are the
 * shipped components rather than mockups.
 *
 *   node scripts/capture-shortlist-design.mjs
 */
const URL = "https://shortlisthome.vercel.app/design";
const OUT = path.resolve("public/projects/shortlist/_src/design");

const SECTIONS = {
  "Primitives": "ds-01-primitives",
  "Criterion hues": "ds-02-criterion-hues",
  "State by form": "ds-03-state",
  "Type": "ds-04-type",
  "Shape & motion": "ds-05-motion",
  "Map": "ds-06-map",
  "Buttons": "ds-07-buttons",
  "Forms & steppers": "ds-08-forms",
  "Shortlist components": "ds-09-components",
};

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2, colorScheme: "light" });
page.setDefaultTimeout(30000);
await page.goto(URL, { waitUntil: "load" });
await page.waitForTimeout(4000);

// Page intro: everything above the first section.
const intro = await page.evaluate(() => {
  const s = document.querySelector("main section");
  return s.getBoundingClientRect().top + window.scrollY;
});
await page.screenshot({ path: path.join(OUT, "ds-00-intro.png"), clip: { x: 0, y: 0, width: 1440, height: Math.min(intro, 1000) } });
console.log("saved ds-00-intro");

for (const [title, name] of Object.entries(SECTIONS)) {
  const section = page.locator("main section").filter({ has: page.getByRole("heading", { level: 2, name: title, exact: true }) }).first();
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(title === "Map" ? 3500 : 600);
  await section.screenshot({ path: path.join(OUT, `${name}.png`) });
  const box = await section.boundingBox();
  console.log("saved", name, Math.round(box.width), Math.round(box.height));
}
await browser.close();
