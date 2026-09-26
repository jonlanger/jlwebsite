import { chromium } from "/Users/jonlanger/Documents/Projects/careshift/node_modules/playwright/index.mjs";
import { mkdir } from "node:fs/promises";
import path from "node:path";

/**
 * Photographs Shortlist (shortlisthome.vercel.app) in its light theme.
 *
 * The ranking deep-links with ?preset=, which loads the demo shortlist
 * (Hoboken, Stamford, Maplewood, Millburn / Short Hills). The map is MapLibre
 * on OpenFreeMap tiles, so every ranking shot waits for tiles to settle.
 *
 *   node scripts/capture-shortlist.mjs          # everything
 *   node scripts/capture-shortlist.mjs d0 m     # only names starting d0 / m
 */
const BASE = "https://shortlisthome.vercel.app";
const OUT = path.resolve("public/projects/shortlist/_src");
const ONLY = process.argv.slice(2);
const wanted = (name) => ONLY.length === 0 || ONLY.some((p) => name.startsWith(p));

async function shot(page, name, { full = false, settle = 700 } = {}) {
  if (!wanted(name)) return;
  await page.evaluate(() => document.activeElement?.blur?.());
  const vp = page.viewportSize();
  await page.mouse.move(vp.width - 1, vp.height - 1);
  await page.waitForTimeout(settle);
  await page.screenshot({ path: path.join(OUT, `${name}.png`), fullPage: full });
  console.log("saved", name);
}

async function open(page, url, wait = 3500) {
  await page.goto(url, { waitUntil: "load" });
  await page.waitForTimeout(wait);
}

async function scrollToText(page, text, offset = 90) {
  await page.getByText(text, { exact: false }).first().evaluate((el, o) => {
    window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - o);
  }, offset);
  await page.waitForTimeout(600);
}

async function addCity(page, query) {
  const box = page.getByRole("combobox");
  await box.fill(query);
  await page.waitForTimeout(700);
  await page.getByRole("option").first().click();
  await page.waitForTimeout(900);
}

async function desktop(browser) {
  const context = await browser.newContext({
    viewport: { width: 1600, height: 1000 },
    deviceScaleFactor: 2,
    colorScheme: "light",
  });
  const page = await context.newPage();
  page.setDefaultTimeout(30000);
  return page;
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();
  const page = await desktop(browser);

  // Landing
  await open(page, BASE);
  await shot(page, "d01-landing");
  await scrollToText(page, "Existing tools answer");
  await shot(page, "d02-landing-why");
  await scrollToText(page, "How it works");
  await shot(page, "d03-landing-how");
  await scrollToText(page, "Same four places");
  await shot(page, "d04-landing-examples");

  // Onboarding: build a shortlist
  await open(page, `${BASE}/compare`);
  await shot(page, "d05-places-empty");
  for (const q of ["Montclair, NJ", "Hoboken", "Maplewood, NJ", "Stamford, CT"]) await addCity(page, q);
  await page.waitForTimeout(2500);
  await shot(page, "d06-places-filled");

  await page.getByRole("button", { name: /^Continue/ }).first().click();
  await page.waitForTimeout(2500);
  await shot(page, "d07-priorities");

  // Ranking (demo shortlist)
  await open(page, `${BASE}/compare?preset=balanced`, 5000);
  await shot(page, "d10-ranking");
  await scrollToText(page, "Your priorities", 60);
  await shot(page, "d10b-ranking-cards");
  await page.getByRole("button", { name: "Schools-first", exact: true }).click();
  await shot(page, "d11-ranking-schools", { settle: 900 });
  await page.waitForTimeout(3000);
  await shot(page, "d12-ranking-schools-settled");

  await open(page, `${BASE}/compare?preset=balanced`, 5000);
  await scrollToText(page, "takes first if", 260);
  await shot(page, "d13-flip-hint");
  await page.getByRole("button", { name: /Try it/ }).first().click();
  await shot(page, "d14-flip-applied", { settle: 1200 });

  await open(page, `${BASE}/compare?preset=budget`, 5000);
  await page.getByRole("button", { name: "Use your own numbers" }).first().click();
  await page.waitForTimeout(800);
  await scrollToText(page, "takes first if", 40);
  await shot(page, "d15-own-numbers");

  await open(page, `${BASE}/compare?preset=transit`, 5000);
  await page.getByRole("button", { name: "Save ranking" }).click();
  await shot(page, "d16-save-dialog", { settle: 900 });
  const name = page.getByLabel("Name this ranking");
  if (await name.count()) {
    await name.fill("Transit-first, NY metro");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(1200);
  }
  await open(page, `${BASE}/saved`);
  await shot(page, "d17-saved");

  await open(page, `${BASE}/design`);
  await shot(page, "d20-design");
  await page.mouse.wheel(0, 1000);
  await shot(page, "d21-design-2");
  await page.mouse.wheel(0, 1000);
  await shot(page, "d22-design-3");
  await page.mouse.wheel(0, 1000);
  await shot(page, "d23-design-4");

  // Mobile
  const phone = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    colorScheme: "light",
  });
  const m = await phone.newPage();
  m.setDefaultTimeout(30000);
  await open(m, BASE);
  await shot(m, "m1-landing");
  await open(m, `${BASE}/compare?preset=schools`, 5000);
  await scrollToText(m, "Your priorities", 20);
  await shot(m, "m2-priorities");
  await scrollToText(m, "takes first if", 20);
  await shot(m, "m3-ranking");
  await m.evaluate(() => window.scrollTo(0, 0));
  await m.getByRole("tab", { name: "Map" }).click();
  await m.waitForTimeout(4000);
  await shot(m, "m4-map");

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
