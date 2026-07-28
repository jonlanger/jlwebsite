import { chromium } from "/Users/jonlanger/Documents/Projects/productbench/node_modules/playwright/index.mjs";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = "https://productbench.vercel.app";
const OUT = path.resolve("public/projects/productbench/_src");

async function shot(page, name) {
  const file = path.join(OUT, `${name}.png`);
  await page.screenshot({ path: file, type: "png" });
  console.log("saved", name);
}

async function gotoReady(page, url) {
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(1600);
}

async function scrollMain(page, y) {
  await page.evaluate((yy) => {
    const scroller = [...document.querySelectorAll("*")].find((el) => {
      const s = getComputedStyle(el);
      return (
        (s.overflowY === "auto" || s.overflowY === "scroll") &&
        el.scrollHeight > el.clientHeight + 80
      );
    });
    if (scroller) scroller.scrollTo(0, yy);
    else window.scrollTo(0, yy);
  }, y);
  await page.waitForTimeout(700);
}

async function clickTab(page, label) {
  const tab = page
    .locator('[role="tab"]')
    .filter({ hasText: new RegExp(`^${label}$`, "i") })
    .first();
  if (!(await tab.count())) return false;
  await tab.click({ timeout: 5000 });
  await page.waitForTimeout(1000);
  return true;
}

async function advanceGallery(page, times = 3) {
  const next = page.getByRole("button", { name: /next screenshot/i }).first();
  for (let i = 0; i < times; i++) {
    if (!(await next.count())) break;
    try {
      await next.click({ timeout: 2500 });
      await page.waitForTimeout(700);
    } catch {
      break;
    }
  }
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    colorScheme: "light",
  });
  const page = await context.newPage();
  page.setDefaultTimeout(60000);

  // Linear — clean brief
  await gotoReady(page, `${BASE}/products/linear`);
  await shot(page, "06b-product-linear");

  // Scroll to surfaces, advance past marketing/quote crops to product UI
  await scrollMain(page, 780);
  await advanceGallery(page, 4);
  await shot(page, "07-product-linear-surfaces");

  await clickTab(page, "Screens");
  await page.waitForTimeout(600);
  await shot(page, "08-product-linear-screens");

  await clickTab(page, "Workflows");
  await shot(page, "09-product-linear-workflows");

  await clickTab(page, "UX analysis");
  // Scroll tabs into upper half so analysis cards dominate (avoid truncated carousel titles)
  await scrollMain(page, 1100);
  await shot(page, "10-product-linear-analysis");

  // Stripe — surfaces / detail
  await gotoReady(page, `${BASE}/products/stripe-dashboard`);
  await shot(page, "11-product-stripe");
  await scrollMain(page, 720);
  await advanceGallery(page, 2);
  await shot(page, "11b-product-stripe-surfaces");

  await clickTab(page, "Workflows");
  await scrollMain(page, 1000);
  await shot(page, "11c-product-stripe-workflows");

  // Notion — alternate clean brief
  await gotoReady(page, `${BASE}/products/notion`);
  await shot(page, "12-product-notion");
  await scrollMain(page, 750);
  await advanceGallery(page, 2);
  await shot(page, "12b-product-notion-surfaces");

  await browser.close();
  console.log("done product fixes");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
