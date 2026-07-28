import { chromium } from "/Users/jonlanger/Documents/Projects/productbench/node_modules/playwright/index.mjs";
import path from "node:path";
import { mkdir } from "node:fs/promises";

const BASE = "https://productbench.vercel.app";
const OUT = path.resolve("public/projects/productbench/_src");
await mkdir(OUT, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
  colorScheme: "light",
});
const page = await context.newPage();
page.setDefaultTimeout(60000);

async function shot(name, full = false) {
  await page.screenshot({
    path: path.join(OUT, `${name}.png`),
    fullPage: full,
    type: "png",
  });
  console.log("saved", name);
}

await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
const featured = page.getByRole("heading", { name: /featured in the catalog/i });
await featured.scrollIntoViewIfNeeded();
await page.waitForTimeout(900);
await shot("02-home-featured");

await page.goto(`${BASE}/catalog`, { waitUntil: "networkidle" });
await page.waitForTimeout(1800);
const close = page.getByRole("button", { name: /close filters/i });
if (await close.count()) {
  await close.click();
  await page.waitForTimeout(600);
}
await shot("03b-catalog-clean");

await page.goto(`${BASE}/products/stripe-dashboard`, { waitUntil: "networkidle" });
await page.waitForTimeout(2200);
await page.evaluate(() => window.scrollTo(0, 700));
await page.waitForTimeout(700);
await shot("11b-product-stripe-surfaces");

await browser.close();
console.log("done extras");
