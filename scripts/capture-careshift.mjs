import { chromium } from "/Users/jonlanger/Documents/Projects/careshift/node_modules/playwright/index.mjs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const BASE = "http://localhost:3100";
const OUT = path.resolve("public/projects/careshift/_src");

async function shot(page, name, fullPage = false) {
  const file = path.join(OUT, `${name}.png`);
  await page.screenshot({ path: file, fullPage, type: "png" });
  console.log("saved", name, fullPage ? "(full)" : "");
}

async function gotoReady(page, url) {
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(900);
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });

  // --- Desktop pass ---
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    colorScheme: "light",
  });
  const page = await context.newPage();
  page.setDefaultTimeout(60000);

  // --- Marketing home ---
  await gotoReady(page, `${BASE}/`);
  await shot(page, "01-home");
  await shot(page, "01-home-full", true);

  // --- Sign-in ---
  await gotoReady(page, `${BASE}/sign-in`);
  await shot(page, "02-sign-in");

  // --- Enter demo session ---
  await page.getByRole("button", { name: /continue as demo/i }).click();
  await page.waitForURL(/\/today/, { timeout: 15000 });
  await page.waitForTimeout(900);

  // --- Today dashboard ---
  await shot(page, "03-today");

  // --- Patients list ---
  await gotoReady(page, `${BASE}/patients`);
  await shot(page, "04-patients");

  // --- Patient detail: Maggie ---
  await gotoReady(page, `${BASE}/patients/maggie`);
  await shot(page, "05-patient-maggie");

  // Log observation dialog
  await page.getByRole("button", { name: /log observation/i }).click();
  await page.waitForTimeout(500);
  await shot(page, "06-log-observation");
  await page.keyboard.press("Escape");
  await page.waitForTimeout(300);

  // --- Schedule ---
  await gotoReady(page, `${BASE}/schedule`);
  await shot(page, "07-schedule");

  // --- Shifts ---
  await gotoReady(page, `${BASE}/shifts`);
  await shot(page, "08-shifts");

  // --- Brief flow: step 1, who you're covering ---
  await gotoReady(page, `${BASE}/brief/maggie`);
  await shot(page, "09-brief-covering");

  // Step 2: what changed (gate visible, unreviewed)
  await page.getByRole("button", { name: /see what changed/i }).click();
  await page.waitForTimeout(600);
  await shot(page, "10-brief-changes-gated");

  // Mark the needs-attention item reviewed, gate lifts
  await page.getByText(/mark reviewed/i).first().click();
  await page.waitForTimeout(500);
  await shot(page, "11-brief-changes-reviewed");

  // Step 3: due now
  await page.getByRole("button", { name: /see what.s due/i }).click();
  await page.waitForTimeout(600);
  await shot(page, "12-brief-due");

  // Step 4: note & done
  await page.getByRole("button", { name: /continue to note/i }).click();
  await page.waitForTimeout(600);
  await shot(page, "13-brief-note");

  // Confirm complete
  await page.getByRole("button", { name: /confirm brief complete/i }).click();
  await page.waitForTimeout(600);
  await shot(page, "14-brief-complete");

  await context.close();

  // --- Mobile pass: the ritual is designed phone-first ---
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    colorScheme: "light",
    isMobile: true,
    hasTouch: true,
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
  });
  const mpage = await mobileContext.newPage();
  mpage.setDefaultTimeout(60000);

  await gotoReady(mpage, `${BASE}/sign-in`);
  await mpage.getByRole("button", { name: /continue as demo/i }).click();
  await mpage.waitForURL(/\/today/, { timeout: 15000 });
  await mpage.waitForTimeout(900);
  await shot(mpage, "m-01-today");

  await gotoReady(mpage, `${BASE}/brief/maggie`);
  await mpage.getByRole("button", { name: /see what changed/i }).click();
  await mpage.waitForTimeout(600);
  await shot(mpage, "m-02-brief-changes");

  await mobileContext.close();

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
