import { chromium } from "/tmp/node_modules/playwright/index.mjs";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = "https://proposalpal-v2.vercel.app";
const OUT = path.resolve("public/projects/proposalpal/_src");

async function shot(page, name, fullPage = false) {
  const file = path.join(OUT, `${name}.png`);
  await page.screenshot({ path: file, fullPage, type: "png" });
  console.log("saved", file);
}

async function textSnapshot(page) {
  return page.evaluate(() => {
    const links = [...document.querySelectorAll("a[href]")]
      .map((a) => ({ text: a.textContent?.trim().slice(0, 80), href: a.getAttribute("href") }))
      .filter((x) => x.href && !x.href.startsWith("#"));
    const buttons = [...document.querySelectorAll("button")]
      .map((b) => b.textContent?.trim().slice(0, 80))
      .filter(Boolean);
    const headings = [...document.querySelectorAll("h1,h2,h3,h4")]
      .map((h) => `${h.tagName}: ${h.textContent?.trim().slice(0, 120)}`);
    return {
      url: location.href,
      title: document.title,
      headings,
      buttons: [...new Set(buttons)].slice(0, 40),
      links: links.slice(0, 60),
      bodyPreview: document.body?.innerText?.slice(0, 2500) ?? "",
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
  page.setDefaultTimeout(45000);

  const pages = {};

  // Home
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  pages.home = await textSnapshot(page);
  await shot(page, "01-home");
  await shot(page, "01-home-full", true);

  // Help
  await page.goto(BASE + "/help", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  pages.help = await textSnapshot(page);
  await shot(page, "02-help");
  await shot(page, "02-help-full", true);

  // New proposal
  await page.goto(BASE + "/new-proposal", { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);
  pages.newProposal = await textSnapshot(page);
  await shot(page, "03-new-proposal");
  await shot(page, "03-new-proposal-full", true);

  // Try clicking through interactive flows from home
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  // Click "New Proposal" if present
  const newBtn = page.getByRole("button", { name: /new proposal/i }).first();
  const newLink = page.getByRole("link", { name: /new proposal/i }).first();
  if (await newBtn.count()) {
    await newBtn.click();
    await page.waitForTimeout(2500);
    pages.afterNewProposalClick = await textSnapshot(page);
    await shot(page, "04-after-new-proposal-click");
    await shot(page, "04-after-new-proposal-click-full", true);
  } else if (await newLink.count()) {
    await newLink.click();
    await page.waitForTimeout(2500);
    pages.afterNewProposalClick = await textSnapshot(page);
    await shot(page, "04-after-new-proposal-click");
    await shot(page, "04-after-new-proposal-click-full", true);
  }

  // Discover any proposal cards / list items on home
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  const cardLinks = await page.evaluate(() => {
    return [...document.querySelectorAll("a[href]")]
      .map((a) => a.getAttribute("href"))
      .filter((h) => h && /proposal|project|workspace|intake|story|research|content|draft/i.test(h));
  });
  pages.discoveredLinks = cardLinks;

  // Click first clickable card-like element that isn't nav
  const candidates = page.locator("a, button, [role='button'], [role='link']");
  const count = await candidates.count();
  const clicked = [];
  for (let i = 0; i < Math.min(count, 40); i++) {
    const el = candidates.nth(i);
    const info = await el.evaluate((node) => ({
      tag: node.tagName,
      text: node.textContent?.trim().slice(0, 80),
      href: node.getAttribute("href"),
      cls: node.className?.toString?.().slice(0, 120),
    }));
    if (!info.text) continue;
    if (/help|learn more|theme|menu|bcg|logo/i.test(info.text) && !/proposal/i.test(info.text)) continue;
    clicked.push(info);
  }
  pages.clickablePreview = clicked.slice(0, 30);

  // Try opening an existing proposal card if any
  const proposalCard = page.locator("a[href*='proposal'], a[href*='project'], [data-testid], .card, article a").first();
  if (await proposalCard.count()) {
    try {
      await proposalCard.click({ timeout: 3000 });
      await page.waitForTimeout(2500);
      pages.openedCard = await textSnapshot(page);
      await shot(page, "05-opened-card");
      await shot(page, "05-opened-card-full", true);
    } catch (e) {
      pages.openedCardError = String(e);
    }
  }

  // Probe likely deep routes
  const probePaths = [
    "/proposals",
    "/dashboard",
    "/workspace",
    "/intake",
    "/research",
    "/storyline",
    "/content",
    "/draft",
    "/agents",
    "/chat",
  ];
  pages.probes = {};
  for (const p of probePaths) {
    const res = await page.goto(BASE + p, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(800);
    const title = await page.title();
    const h1 = await page.locator("h1,h2").first().textContent().catch(() => null);
    const is404 = /could not be found|404/i.test((await page.content()).slice(0, 5000));
    pages.probes[p] = { status: res?.status(), title, h1, is404, url: page.url() };
    if (!is404 && res?.status() === 200) {
      await shot(page, `probe-${p.replace(/\//g, "") || "root"}`);
    }
  }

  // Interact on new-proposal: fill fields / next steps
  await page.goto(BASE + "/new-proposal", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  // Force light theme
  await page.evaluate(() => {
    localStorage.setItem("theme", "light");
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
  });

  // Capture all form labels / inputs
  pages.newProposalForm = await page.evaluate(() => {
    const inputs = [...document.querySelectorAll("input, textarea, select")].map((el) => ({
      tag: el.tagName,
      type: el.getAttribute("type"),
      name: el.getAttribute("name"),
      placeholder: el.getAttribute("placeholder"),
      aria: el.getAttribute("aria-label"),
      id: el.id,
    }));
    const labels = [...document.querySelectorAll("label")].map((l) => l.textContent?.trim());
    return { inputs, labels, text: document.body.innerText.slice(0, 4000) };
  });
  await shot(page, "06-new-proposal-loaded");

  // Try typing into first text input and advancing
  const textInput = page.locator("input[type='text'], input:not([type]), textarea").first();
  if (await textInput.count()) {
    await textInput.fill("Global retail transformation RFP — digital commerce & supply chain");
    await page.waitForTimeout(500);
    await shot(page, "07-new-proposal-filled");
  }

  // Click Continue / Next / Create / Start if available
  for (const name of [/continue/i, /next/i, /create/i, /start/i, /submit/i, /generate/i]) {
    const btn = page.getByRole("button", { name }).first();
    if (await btn.count()) {
      try {
        await btn.click({ timeout: 2000 });
        await page.waitForTimeout(2500);
        pages.afterAdvance = await textSnapshot(page);
        await shot(page, "08-after-advance");
        await shot(page, "08-after-advance-full", true);
        break;
      } catch {}
    }
  }

  // Collect any subsequent navigation links inside the app shell
  const navHrefs = await page.evaluate(() =>
    [...document.querySelectorAll("nav a, aside a, [role='navigation'] a")]
      .map((a) => ({ text: a.textContent?.trim(), href: a.getAttribute("href") }))
  );
  pages.nav = navHrefs;

  for (const [i, link] of navHrefs.slice(0, 12).entries()) {
    if (!link.href || link.href.startsWith("http")) continue;
    try {
      await page.goto(new URL(link.href, BASE).toString(), { waitUntil: "networkidle" });
      await page.waitForTimeout(1200);
      await shot(page, `09-nav-${String(i).padStart(2, "0")}-${(link.text || "link").replace(/\W+/g, "-").slice(0, 30)}`);
      pages[`nav_${i}`] = await textSnapshot(page);
    } catch (e) {
      pages[`nav_${i}_error`] = String(e);
    }
  }

  console.log(JSON.stringify(pages, null, 2));
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
