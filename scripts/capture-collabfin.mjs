import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

/**
 * Photographs Collabfin (collabfinance.vercel.app) in its dark theme.
 *
 * The live deploy has no accounts configured, so it runs its browser-only
 * store: a fresh context lands on /boards with the Household budget template
 * already seeded, and everything after that happens in localStorage.
 *
 *   node scripts/capture-collabfin.mjs          # everything
 *   node scripts/capture-collabfin.mjs b1 m     # only names starting b1 / m
 */
const BASE = "https://collabfinance.vercel.app";
const OUT = path.resolve("public/projects/collabfin/_src");
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

async function scrollToText(page, text, offset = 170) {
  const target = page.getByRole("heading", { name: text }).first();
  await target.evaluate((el, o) => window.scrollBy(0, el.getBoundingClientRect().top - o), offset);
  await page.waitForTimeout(700);
}

async function openBoard(page) {
  await page.goto(`${BASE}/boards`, { waitUntil: "networkidle" });
  await page.getByText("Household budget", { exact: true }).click();
  await page.waitForURL(/\/boards\/.+/);
  await page.waitForTimeout(2000);
}

const panel = (page, name) => page.getByRole("button", { name, exact: true }).first().click();

async function setAmount(page, label, value) {
  const input = page.getByRole("textbox", { name: label }).first();
  await input.click();
  await input.fill(String(value));
  await input.press("Enter");
  await page.waitForTimeout(500);
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 2, colorScheme: "dark" });
  const page = await context.newPage();
  page.setDefaultTimeout(30000);

  // Landing
  await page.goto(BASE, { waitUntil: "networkidle" });
  await shot(page, "d01-landing", { settle: 1500 });
  await scrollToText(page, "Three steps");
  await shot(page, "d02-landing-steps");
  await scrollToText(page, "Know your real take-home pay");
  await shot(page, "d03-landing-tax");
  await scrollToText(page, "Catch mistakes");
  await shot(page, "d04-landing-checks");
  await scrollToText(page, "Ask “what if?”");
  await shot(page, "d05-landing-plans");
  await scrollToText(page, "Plan with the people");
  await shot(page, "d06-landing-live");
  await scrollToText(page, "Comfortable to use");
  await shot(page, "d07-landing-a11y");

  // Board
  await openBoard(page);
  await shot(page, "b10-board", { settle: 1200 });
  await page.getByRole("button", { name: /^Checks,/ }).click();
  await shot(page, "b11-checks");
  await panel(page, "Templates");
  await shot(page, "b12-templates");
  await panel(page, "Import a bank statement");
  await page.getByRole("button", { name: "Try a sample statement" }).click();
  await page.waitForTimeout(600);
  await shot(page, "b13-import-columns");
  const analyze = page.locator(".cta").filter({ hasText: /find|analy|look/i }).first();
  if (await analyze.count()) {
    await analyze.click();
    await page.waitForTimeout(800);
  }
  await shot(page, "b14-import-results");
  await panel(page, "Settings");
  await shot(page, "b15-settings");
  await page.getByText("Accessibility, just for you").evaluate((el) => el.scrollIntoView({ block: "start" }));
  await shot(page, "b16-settings-a11y");
  await page.keyboard.press("Escape");

  // A what-if plan: copy the board, raise the rent, compare.
  await page.getByRole("button", { name: /Current plan/ }).click();
  await page.getByRole("menu").getByText(/^New plan from/).click();
  await page.locator("#plan-name").fill("What if we move?");
  await page.getByRole("button", { name: "Create plan" }).click();
  await page.waitForTimeout(1500);
  await setAmount(page, "Rent amount", 2575);
  await shot(page, "b17-whatif-board", { settle: 1000 });
  await page.keyboard.press("Escape");
  await page.waitForTimeout(5000); // let the check toast clear
  await page.getByRole("button", { name: /What if we move/ }).click();
  await page.getByRole("menu").getByText("Compare plans").click();
  await page.waitForTimeout(600);
  const load = page.getByRole("button", { name: /Compare|Refresh|Load/ }).last();
  if (await load.isVisible().catch(() => false)) {
    await load.click().catch(() => {});
    await page.waitForTimeout(1200);
  }
  await shot(page, "b18-compare", { settle: 1200 });
  await panel(page, "History");
  await shot(page, "b19-history");
  await page.keyboard.press("Escape");

  // Light theme, same board.
  await page.evaluate(() => {
    const k = "collabfin-prefs-v2";
    const p = JSON.parse(localStorage.getItem(k) || "{}");
    localStorage.setItem(k, JSON.stringify({ ...p, theme: "light" }));
  });
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  await shot(page, "b20-light", { settle: 1200 });

  // Mobile
  const phone = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    colorScheme: "dark",
  });
  const m = await phone.newPage();
  m.setDefaultTimeout(30000);
  await m.goto(BASE, { waitUntil: "networkidle" });
  await shot(m, "m1-landing", { settle: 1500 });
  await openBoard(m);
  await shot(m, "m2-board", { settle: 1200 });
  await m.getByRole("button", { name: /^Checks,/ }).click();
  await shot(m, "m3-checks");

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
