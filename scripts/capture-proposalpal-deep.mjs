import { chromium } from "/tmp/node_modules/playwright/index.mjs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const BASE = "https://proposalpal-v2.vercel.app";
const OUT = path.resolve("public/projects/proposalpal/_src");

async function shot(page, name, fullPage = false) {
  const file = path.join(OUT, `${name}.png`);
  await page.screenshot({ path: file, fullPage, type: "png" });
  console.log("saved", name);
}

async function snap(page) {
  return page.evaluate(() => {
    const links = [...document.querySelectorAll("a[href]")]
      .map((a) => ({ text: a.textContent?.trim().slice(0, 100), href: a.getAttribute("href") }))
      .filter((x) => x.href);
    const buttons = [...document.querySelectorAll("button")]
      .map((b) => b.textContent?.trim().slice(0, 100))
      .filter(Boolean);
    const headings = [...document.querySelectorAll("h1,h2,h3,h4,nav,aside")]
      .slice(0, 40)
      .map((h) => `${h.tagName}: ${h.textContent?.trim().slice(0, 150)}`);
    const tabs = [...document.querySelectorAll("[role='tab'], [data-state], .tab, nav a, aside a")]
      .map((t) => ({
        text: t.textContent?.trim().slice(0, 80),
        href: t.getAttribute("href"),
        role: t.getAttribute("role"),
        state: t.getAttribute("data-state"),
      }))
      .filter((t) => t.text);
    return {
      url: location.href,
      headings,
      buttons: [...new Set(buttons)].slice(0, 50),
      links: links.filter((l) => l.href.includes("proposal") || l.href.startsWith("/")).slice(0, 80),
      tabs: tabs.slice(0, 60),
      bodyPreview: document.body?.innerText?.slice(0, 3500) ?? "",
    };
  });
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

  await page.addInitScript(() => {
    localStorage.setItem("theme", "light");
  });

  const report = {};

  // Known demo entry
  await page.goto(`${BASE}/proposal/demo-proposal-1/setup`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);
  report.setup = await snap(page);
  await shot(page, "10-demo-setup");
  await shot(page, "10-demo-setup-full", true);

  // Collect all in-app proposal links from setup
  const proposalLinks = await page.evaluate(() =>
    [...document.querySelectorAll("a[href*='/proposal/']")]
      .map((a) => a.getAttribute("href"))
      .filter(Boolean)
  );
  report.proposalLinksFromSetup = [...new Set(proposalLinks)];

  // Also try common stage suffixes
  const stages = [
    "setup",
    "intake",
    "research",
    "storyline",
    "story",
    "content",
    "draft",
    "workspace",
    "overview",
    "team",
    "commercial",
    "teaming",
    "strategy",
    "outline",
    "sections",
    "documents",
    "files",
    "chat",
    "agents",
    "review",
    "export",
    "insights",
    "client",
    "intelligence",
    "rfp",
    "analysis",
    "approach",
    "value",
    "pricing",
    "orals",
    "win-themes",
    "win-theme",
    "winthemes",
    "guardrails",
    "context",
  ];

  report.stageProbes = {};
  for (const stage of stages) {
    const url = `${BASE}/proposal/demo-proposal-1/${stage}`;
    const res = await page.goto(url, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1200);
    const content = await page.content();
    const is404 = /could not be found|404/i.test(content.slice(0, 8000));
    const status = res?.status();
    report.stageProbes[stage] = { status, is404, url: page.url() };
    if (!is404 && status && status < 400) {
      await page.waitForTimeout(800);
      const safe = stage.replace(/\W+/g, "-");
      await shot(page, `11-stage-${safe}`);
      await shot(page, `11-stage-${safe}-full`, true);
      report[`stage_${stage}`] = await snap(page);
    }
  }

  // From setup, click every visible nav/sidebar link
  await page.goto(`${BASE}/proposal/demo-proposal-1/setup`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  const navItems = await page.evaluate(() => {
    const sels = [
      "aside a",
      "nav a",
      "[role='navigation'] a",
      "[role='tab']",
      ".sidebar a",
      "[data-sidebar] a",
      "header a",
    ];
    const nodes = sels.flatMap((s) => [...document.querySelectorAll(s)]);
    return [...new Map(nodes.map((n) => [n.getAttribute("href") || n.textContent?.trim(), {
      text: n.textContent?.trim().slice(0, 80),
      href: n.getAttribute("href"),
      role: n.getAttribute("role"),
    }])).values()];
  });
  report.navItems = navItems;

  let idx = 0;
  for (const item of navItems) {
    if (!item.href || !item.href.includes("/proposal/")) continue;
    try {
      await page.goto(new URL(item.href, BASE).toString(), { waitUntil: "networkidle" });
      await page.waitForTimeout(1500);
      const name = `12-nav-${String(idx).padStart(2, "0")}-${(item.text || "item").replace(/\W+/g, "-").slice(0, 40)}`;
      await shot(page, name);
      await shot(page, `${name}-full`, true);
      report[`navShot_${idx}`] = await snap(page);
      idx++;
    } catch (e) {
      report[`navShot_${idx}_err`] = String(e);
    }
  }

  // Click tabs/buttons that look like stages if hrefless
  await page.goto(`${BASE}/proposal/demo-proposal-1/setup`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  const stageButtons = page.locator("button, [role='tab']");
  const btnCount = await stageButtons.count();
  report.buttonTexts = [];
  for (let i = 0; i < Math.min(btnCount, 30); i++) {
    const t = (await stageButtons.nth(i).textContent())?.trim();
    if (t) report.buttonTexts.push(t.slice(0, 80));
  }

  // Expand FAQ accordion items on help for richer content screenshots
  await page.goto(`${BASE}/help`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  const faqButtons = page.getByRole("button");
  const faqCount = await faqButtons.count();
  for (let i = 0; i < Math.min(faqCount, 8); i++) {
    try {
      await faqButtons.nth(i).click({ timeout: 1000 });
      await page.waitForTimeout(300);
    } catch {}
  }
  await shot(page, "13-help-expanded-full", true);
  report.helpExpanded = await snap(page);

  // Fill new proposal more completely and go to workspace if possible
  await page.goto(`${BASE}/new-proposal`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await page.fill("#opportunityId-3col", "405020-70");
  await page.fill("#clientName-3col", "7-Eleven USA");
  await page.fill("#proposalName-3col", "ERP Digital Transformation");
  await page.fill("#context-3col", "Comprehensive client intelligence and ERP digital transformation proposal.");
  await shot(page, "14-new-proposal-complete");
  await shot(page, "14-new-proposal-complete-full", true);

  const goBtn = page.getByRole("button", { name: /go to proposal workspace/i });
  if (await goBtn.count()) {
    try {
      await goBtn.click();
      await page.waitForTimeout(3000);
      report.afterWorkspace = await snap(page);
      await shot(page, "15-workspace-entry");
      await shot(page, "15-workspace-entry-full", true);
    } catch (e) {
      report.afterWorkspaceErr = String(e);
    }
  }

  // Try Edit buttons on proposal details
  await page.goto(`${BASE}/new-proposal`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  const editBtns = page.getByRole("button", { name: /^edit$/i });
  const editCount = await editBtns.count();
  for (let i = 0; i < editCount; i++) {
    try {
      await editBtns.nth(i).click();
      await page.waitForTimeout(800);
      await shot(page, `16-edit-panel-${i}`);
    } catch {}
  }

  await writeFile(path.join(OUT, "explore-report.json"), JSON.stringify(report, null, 2));
  console.log("report written");
  console.log(JSON.stringify({
    proposalLinks: report.proposalLinksFromSetup,
    stageHits: Object.fromEntries(Object.entries(report.stageProbes).filter(([, v]) => !v.is404)),
    navItems: report.navItems,
    setupHeadings: report.setup?.headings,
    setupButtons: report.setup?.buttons,
  }, null, 2));

  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
