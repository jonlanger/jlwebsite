import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

/**
 * Photographs each section of SolarSwarm's live /design-system page in dark,
 * plus the header, semantic tokens and components in light for comparison.
 * Compose with scripts/compose-solar-field-installation-assets.mjs.
 *
 *   node scripts/capture-solar-field-installation-design.mjs
 */
const URL = "https://solarswarm.vercel.app/design-system";
const OUT = path.resolve("public/projects/solar-field-installation/_src/design");

const SECTIONS = ["brand", "color", "semantic", "data", "type", "radius", "renders"];

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch({ headless: false, args: ["--window-position=3000,0", "--hide-scrollbars"] });

for (const scheme of ["dark", "light"]) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2, colorScheme: scheme });
  // next-themes defaults to dark and ignores the OS setting until a choice is stored.
  await context.addInitScript((t) => localStorage.setItem("theme", t), scheme);
  const page = await context.newPage();
  page.setDefaultTimeout(30000);
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(3000);
  // The fixed site nav would otherwise sit over each section screenshot.
  await page.evaluate(() => {
    for (const el of document.querySelectorAll("body *")) if (getComputedStyle(el).position === "fixed") el.style.visibility = "hidden";
  });
  const pre = `${scheme}-`;

  // Header card above the first section.
  await page.locator("h1").first().locator("xpath=ancestor::div[contains(@class,'rounded')][1]").screenshot({ path: path.join(OUT, `${pre}intro.png`) });
  console.log("saved", `${pre}intro`);

  for (const id of scheme === "dark" ? SECTIONS : ["semantic"]) {
    const s = page.locator(`section#${id}`);
    await s.scrollIntoViewIfNeeded();
    await page.waitForTimeout(id === "renders" ? 2500 : 600);
    await s.screenshot({ path: path.join(OUT, `${pre}${id}.png`) });
    console.log("saved", `${pre}${id}`);
  }

  // Components: the whole section, cropped into slides at compose time.
  const comps = page.locator("section#components");
  await comps.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await comps.screenshot({ path: path.join(OUT, `${pre}components.png`) });
  console.log("saved", `${pre}components`);
  await context.close();
}
await browser.close();
