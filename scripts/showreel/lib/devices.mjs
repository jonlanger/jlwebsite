/**
 * Device-render clips: record several screens of a product (desktop, phone…),
 * then map them onto 3D devices floating in a studio scene (stage.html) and
 * render that scene frame by frame.
 *
 * The result is written in the same frames.json format as a plain recording —
 * one real-time hold spanning the whole clip, no camera zooms — so the normal
 * build step encodes it like any other clip.
 *
 * A project opts in by exporting `screens` and `stage` instead of `act`:
 *
 *   screens: [{ id, viewport, dsf, colorScheme, cursor: "touch" | "hidden",
 *               setup(s), act(s), timing }],
 *   stage:   { duration, devices: { laptop: "<screen id>", left: "…", right: "…" },
 *              offsets: { "<screen id>": seconds } }
 */
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

import { openSession } from "./harness.mjs";
import { planClip } from "./plan.mjs";

const FPS = 30;
export const STAGE_FILE = new URL("./stage.html", import.meta.url);

// Runs after the harness cursor script: restyle its arrow as a fingertip, or hide it.
const cursorStyle = (mode) => `(() => {
  const mode = ${JSON.stringify(mode)};
  const apply = () => {
    if (!document.documentElement) return false;
    const c = [...document.documentElement.children].find((e) => e.querySelector?.('path[d^="M4 2.5"]'));
    if (!c || c.dataset.reelStyled) return !!c;
    c.dataset.reelStyled = "1";
    if (mode === "hidden") c.style.display = "none";
    else c.innerHTML = '<div style="width:34px;height:34px;margin:-14px 0 0 -13px;border-radius:50%;background:rgba(255,255,255,.3);border:2px solid rgba(255,255,255,.9);box-shadow:0 2px 10px rgba(0,0,0,.4)"></div>';
    return true;
  };
  if (!apply()) addEventListener("DOMContentLoaded", apply);
})()`;

async function recordScreen(screen, dir, capture) {
  console.log(`  ○ screen ${screen.id}`);
  const s = await openSession({
    framesDir: dir,
    viewport: screen.viewport,
    dsf: screen.dsf ?? 2,
    defaultZoom: 1, // the stage camera does the framing; screens stay full-frame
    colorScheme: screen.colorScheme,
  });
  try {
    if (screen.cursor) await s.page.addInitScript(cursorStyle(screen.cursor));
    await screen.setup?.(s);
    await s.start();
    await screen.act(s);
    const log = await s.stop();
    const plan = planClip(log, { fps: FPS, idleSpeed: capture.idleSpeed, ...screen.timing });
    console.log(`    ${plan.duration.toFixed(1)}s after planning (${log.end.toFixed(1)}s recorded)`);
    return plan.frames.map((p) => pathToFileURL(path.join(dir, p.f)).href);
  } catch (err) {
    await s.close();
    throw err;
  }
}

/**
 * @param {object} o
 * @param {object} o.project loaded project module (with screens + stage)
 * @param {string} o.framesDir where the rendered stage frames + frames.json go
 * @param {string} o.screensDir scratch dir for the per-screen recordings
 * @param {object} o.capture shared capture settings (viewport, dsf, idleSpeed)
 * @param {string} o.sourceHash stored in frames.json for cache invalidation
 */
export async function recordDeviceClip({ project, framesDir, screensDir, capture, sourceHash }) {
  const screens = {};
  for (const screen of project.screens) {
    const frames = await recordScreen(screen, path.join(screensDir, screen.id), capture);
    screens[screen.id] = { frames, width: screen.viewport.width, height: screen.viewport.height };
  }

  console.log("  ○ rendering stage");
  fs.rmSync(framesDir, { recursive: true, force: true });
  fs.mkdirSync(framesDir, { recursive: true });

  const { viewport, dsf } = capture;
  const browser = await chromium.launch({ headless: false, args: ["--window-position=3000,0", "--hide-scrollbars"] });
  try {
    const page = await browser.newPage({ viewport, deviceScaleFactor: dsf });
    await page.goto(STAGE_FILE.href);
    const { duration, devices, offsets = {} } = project.stage;
    await page.evaluate((cfg) => window.stage.init(cfg), { fps: FPS, duration, devices, offsets, screens });

    const frames = [];
    const count = Math.round(duration * FPS);
    for (let i = 0; i < count; i++) {
      const t = i / FPS;
      await page.evaluate((t) => window.stage.render(t), t);
      const f = `${String(i).padStart(5, "0")}.jpg`;
      await page.screenshot({ path: path.join(framesDir, f), type: "jpeg", quality: 90 });
      frames.push({ f, t });
      if (i % FPS === 0) process.stdout.write(`\r    ${i}/${count} frames`);
    }
    process.stdout.write(`\r    ${count}/${count} frames\n`);

    const log = {
      sourceHash,
      end: duration,
      width: Math.round(viewport.width * dsf),
      height: Math.round(viewport.height * dsf),
      frames,
      actions: [],
      holds: [{ from: 0, to: duration }],
    };
    fs.writeFileSync(path.join(framesDir, "frames.json"), JSON.stringify(log));
    return log;
  } finally {
    await browser.close();
  }
}
