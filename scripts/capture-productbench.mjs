import { chromium } from "/Users/jonlanger/Documents/Projects/productbench/node_modules/playwright/index.mjs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const BASE = "https://productbench.vercel.app";
const OUT = path.resolve("public/projects/productbench/_src");

async function shot(page, name, fullPage = false) {
  const file = path.join(OUT, `${name}.png`);
  await page.screenshot({ path: file, fullPage, type: "png" });
  console.log("saved", name, fullPage ? "(full)" : "");
}

/** ProductBench scrolls inside a nested pane — expand it so fullPage works. */
async function expandAppScroll(page) {
  await page.evaluate(() => {
    const candidates = [...document.querySelectorAll("*")];
    for (const el of candidates) {
      const style = getComputedStyle(el);
      const oy = style.overflowY;
      if (
        (oy === "auto" || oy === "scroll") &&
        el.scrollHeight > el.clientHeight + 80
      ) {
        el.style.setProperty("overflow", "visible", "important");
        el.style.setProperty("height", "auto", "important");
        el.style.setProperty("max-height", "none", "important");
        el.style.setProperty("flex", "none", "important");
      }
    }
    for (const el of candidates) {
      const style = getComputedStyle(el);
      if (style.overflow === "hidden" || style.overflowY === "hidden") {
        const h = style.height;
        if (h.includes("svh") || h.includes("vh") || el.className?.toString?.().includes("h-svh")) {
          el.style.setProperty("height", "auto", "important");
          el.style.setProperty("min-height", "0", "important");
          el.style.setProperty("overflow", "visible", "important");
        }
      }
    }
    document.documentElement.style.overflow = "visible";
    document.body.style.overflow = "visible";
    document.body.style.height = "auto";
  });
  await page.waitForTimeout(400);
}

async function gotoReady(page, url) {
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(1600);
}

async function clickTab(page, label) {
  const tab = page
    .locator('[role="tab"]')
    .filter({ hasText: new RegExp(`^${label}$`, "i") })
    .first();
  if (await tab.count()) {
    await tab.click({ timeout: 5000 });
    await page.waitForTimeout(1000);
    return true;
  }
  return false;
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

  // --- Home: viewport hero + full expanded page + section crops via scroll ---
  await gotoReady(page, `${BASE}/`);
  await shot(page, "01-home");
  await expandAppScroll(page);
  await shot(page, "01-home-full", true);

  // Re-nav for section viewport shots (fresh layout with scroll)
  await gotoReady(page, `${BASE}/`);
  const featured = page.getByRole("heading", { name: /featured in the catalog/i });
  await featured.scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  // nudge so heading isn't flush to sticky header
  await page.evaluate(() => {
    const scroller = [...document.querySelectorAll("*")].find((el) => {
      const s = getComputedStyle(el);
      return (
        (s.overflowY === "auto" || s.overflowY === "scroll") &&
        el.scrollHeight > el.clientHeight + 80
      );
    });
    if (scroller) scroller.scrollBy(0, -24);
  });
  await page.waitForTimeout(400);
  await shot(page, "02-home-featured");

  const why = page.getByRole("heading", { name: /why teams use it|from inspiration|help grow/i }).first();
  if (await why.count()) {
    await why.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await shot(page, "02b-home-value");
  }

  // --- Catalog clean ---
  await gotoReady(page, `${BASE}/catalog`);
  const close = page.getByRole("button", { name: /close filters/i });
  if (await close.count()) {
    await close.click();
    await page.waitForTimeout(500);
  }
  await shot(page, "03b-catalog-clean");

  // Search applied without typeahead overlay: type, click product suggestion, back to filtered? 
  // Better: type, press Escape to close suggestions, keep query filter if sticky — or Enter
  await gotoReady(page, `${BASE}/catalog`);
  if (await close.count()) {
    await close.click().catch(() => {});
    await page.waitForTimeout(300);
  }
  const search = page.getByPlaceholder(/search products/i).first();
  await search.click();
  await search.fill("figma");
  await page.waitForTimeout(900);
  // Click the Product result if present, else Escape to dismiss dropdown
  const productHit = page.getByRole("option", { name: /figma/i }).first()
    .or(page.locator('[cmdk-item], [data-slot="command-item"]').filter({ hasText: /figma/i }).first());
  if (await productHit.count()) {
    // Prefer staying on catalog: Escape closes overlay while keeping filter text
    await page.keyboard.press("Escape");
    await page.waitForTimeout(500);
  } else {
    await page.keyboard.press("Escape");
    await page.waitForTimeout(400);
  }
  await shot(page, "04-catalog-search");

  // --- Product: Figma (cleaner surfaces than Linear quote crops) ---
  await gotoReady(page, `${BASE}/products/figma`);
  await shot(page, "06-product-figma");
  await expandAppScroll(page);
  await shot(page, "06-product-figma-full", true);

  await gotoReady(page, `${BASE}/products/figma`);
  await page.evaluate(() => {
    const scroller = [...document.querySelectorAll("*")].find((el) => {
      const s = getComputedStyle(el);
      return (
        (s.overflowY === "auto" || s.overflowY === "scroll") &&
        el.scrollHeight > el.clientHeight + 80
      );
    });
    if (scroller) scroller.scrollTo(0, 720);
  });
  await page.waitForTimeout(700);
  await shot(page, "07-product-figma-surfaces");

  await clickTab(page, "Screens");
  await page.waitForTimeout(800);
  await shot(page, "08-product-figma-screens");

  await clickTab(page, "Workflows");
  await page.waitForTimeout(800);
  await shot(page, "09-product-figma-workflows");

  await clickTab(page, "UX analysis");
  await page.waitForTimeout(800);
  await shot(page, "10-product-figma-analysis");

  // Linear brief top (clean narrative, no carousel quotes)
  await gotoReady(page, `${BASE}/products/linear`);
  await shot(page, "06b-product-linear");

  // Stripe surfaces mid
  await gotoReady(page, `${BASE}/products/stripe-dashboard`);
  await page.evaluate(() => {
    const scroller = [...document.querySelectorAll("*")].find((el) => {
      const s = getComputedStyle(el);
      return (
        (s.overflowY === "auto" || s.overflowY === "scroll") &&
        el.scrollHeight > el.clientHeight + 80
      );
    });
    if (scroller) scroller.scrollTo(0, 680);
  });
  await page.waitForTimeout(800);
  await shot(page, "11b-product-stripe-surfaces");

  // --- About full ---
  await gotoReady(page, `${BASE}/about`);
  await shot(page, "13-about");
  await expandAppScroll(page);
  await shot(page, "13-about-full", true);

  await gotoReady(page, `${BASE}/about`);
  const journey = page.getByRole("heading", { name: /where it fits|discovery|what we document/i }).first();
  if (await journey.count()) {
    await journey.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await shot(page, "13b-about-journey");
  }

  // --- Process full ---
  await gotoReady(page, `${BASE}/process`);
  await shot(page, "15-process");
  await expandAppScroll(page);
  await shot(page, "15-process-full", true);

  await gotoReady(page, `${BASE}/process`);
  const taxonomy = page.getByRole("heading", { name: /taxonomy|what we capture|limits|surfaces|components/i }).first();
  if (await taxonomy.count()) {
    await taxonomy.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await shot(page, "15b-process-taxonomy");
  }

  // Contribute
  await gotoReady(page, `${BASE}/contribute`);
  await shot(page, "14-contribute");
  await expandAppScroll(page);
  await shot(page, "14-contribute-full", true);

  await writeFile(
    path.join(OUT, "capture-report.json"),
    JSON.stringify({ capturedAt: new Date().toISOString(), base: BASE }, null, 2)
  );
  await browser.close();
  console.log("done");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
