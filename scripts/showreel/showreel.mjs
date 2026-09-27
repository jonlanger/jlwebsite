#!/usr/bin/env node
/**
 * Showreel pipeline. Run from the repo root:
 *
 *   npm run showreel                 record new/changed projects, then build
 *   npm run showreel -- record careshift --force
 *   npm run showreel -- build        re-plan + re-encode from existing recordings
 *
 * Recordings are cached in scripts/showreel/.cache/ (git-ignored). A project is
 * re-recorded when its file changes or with --force. Build writes clips to
 * public/showreel/ and the playlist to src/data/showreel.generated.json.
 */
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import config from "./reel.config.mjs";
import { openSession } from "./lib/harness.mjs";
import { planClip } from "./lib/plan.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "../..");
const CACHE = path.join(HERE, ".cache");
const PUBLIC_DIR = path.join(ROOT, "public/showreel");
const DATA_FILE = path.join(ROOT, "src/data/showreel.generated.json");
const RENDER_SRC = path.join(HERE, "lib/render.swift");
const RENDER_BIN = path.join(CACHE, "render");

const args = process.argv.slice(2);
const force = args.includes("--force");
const positional = args.filter((a) => !a.startsWith("--"));
const command = ["record", "build", "all"].includes(positional[0]) ? positional.shift() : "all";
const only = positional;

const projectFile = (slug) => path.join(HERE, "projects", `${slug}.mjs`);
const framesDir = (slug) => path.join(CACHE, "frames", slug);
const hashOf = (...files) => {
  const h = createHash("sha1");
  for (const f of files) h.update(fs.readFileSync(f));
  return h.digest("hex").slice(0, 10);
};

async function loadProject(slug) {
  const file = projectFile(slug);
  if (!fs.existsSync(file)) throw new Error(`No project file for "${slug}" (expected ${path.relative(ROOT, file)})`);
  const mod = await import(`${pathToFileURL(file).href}?v=${Date.now()}`);
  return { ...mod.default, file };
}

function recordingIsCurrent(slug) {
  const log = path.join(framesDir(slug), "frames.json");
  if (!fs.existsSync(log)) return false;
  const { sourceHash } = JSON.parse(fs.readFileSync(log, "utf8"));
  return sourceHash === hashOf(projectFile(slug), path.join(HERE, "lib/harness.mjs"));
}

async function record(slug) {
  const project = await loadProject(slug);
  const capture = { ...config.capture, ...project.capture };
  console.log(`● recording ${slug}`);
  const s = await openSession({
    framesDir: framesDir(slug),
    viewport: capture.viewport,
    dsf: capture.dsf,
    defaultZoom: project.zoom ?? capture.zoom,
    colorScheme: project.colorScheme,
  });
  try {
    await project.setup?.(s);
    await s.start();
    await project.act(s);
    const log = await s.stop({ sourceHash: hashOf(project.file, path.join(HERE, "lib/harness.mjs")) });
    const fps = log.frames.length / Math.max(0.001, log.end);
    console.log(`  ${log.frames.length} frames over ${log.end.toFixed(1)}s (~${fps.toFixed(0)} fps captured)`);
  } catch (err) {
    await s.close();
    throw err;
  }
}

function ensureRenderer() {
  fs.mkdirSync(CACHE, { recursive: true });
  const stale = !fs.existsSync(RENDER_BIN) || fs.statSync(RENDER_BIN).mtimeMs < fs.statSync(RENDER_SRC).mtimeMs;
  if (stale) {
    console.log("● compiling renderer");
    execFileSync("swiftc", ["-O", RENDER_SRC, "-o", RENDER_BIN], { stdio: ["ignore", "ignore", "inherit"] });
  }
}

async function build() {
  ensureRenderer();
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  const clips = [];
  for (const slug of config.order) {
    const logFile = path.join(framesDir(slug), "frames.json");
    if (!fs.existsSync(logFile)) {
      console.warn(`  ! ${slug}: no recording yet — skipped (run: npm run showreel -- record ${slug})`);
      continue;
    }
    const project = await loadProject(slug);
    const log = JSON.parse(fs.readFileSync(logFile, "utf8"));
    const capture = { ...config.capture, ...project.capture };
    const plan = planClip(log, { idleSpeed: capture.idleSpeed, ...project.timing });

    const version = createHash("sha1").update(JSON.stringify(plan.frames)).digest("hex").slice(0, 8);
    const thumbsDir = path.join(CACHE, "review", slug);
    fs.rmSync(thumbsDir, { recursive: true, force: true });
    fs.mkdirSync(thumbsDir, { recursive: true });

    const { desktop, mobile } = config.outputs;
    const job = {
      framesDir: framesDir(slug),
      fps: plan.fps,
      frames: plan.frames,
      outputs: [
        { path: path.join(PUBLIC_DIR, `${slug}-1080.mp4`), ...desktop },
        { path: path.join(PUBLIC_DIR, `${slug}-720.mp4`), ...mobile },
      ],
      poster: { path: path.join(PUBLIC_DIR, `${slug}.jpg`), width: 1280 },
      thumbs: { dir: thumbsDir, width: 640, count: 8 },
    };
    const jobFile = path.join(CACHE, `${slug}.job.json`);
    fs.writeFileSync(jobFile, JSON.stringify(job));
    execFileSync(RENDER_BIN, [jobFile], { stdio: ["ignore", "ignore", "inherit"] });

    const q = `?v=${version}`;
    clips.push({
      slug,
      title: project.title,
      kind: project.kind,
      line: project.line,
      duration: +plan.duration.toFixed(3),
      video: { desktop: `/showreel/${slug}-1080.mp4${q}`, mobile: `/showreel/${slug}-720.mp4${q}` },
      poster: `/showreel/${slug}.jpg${q}`,
    });
    console.log(`  ✓ ${slug}: ${plan.duration.toFixed(1)}s (from ${log.end.toFixed(1)}s recorded)`);
  }

  const total = clips.reduce((sum, c) => sum + c.duration, 0);
  fs.writeFileSync(DATA_FILE, JSON.stringify({ clips }, null, 2) + "\n");

  // Drop encodes for projects no longer in the reel.
  const keep = new Set(clips.flatMap((c) => [`${c.slug}-1080.mp4`, `${c.slug}-720.mp4`, `${c.slug}.jpg`]));
  for (const f of fs.readdirSync(PUBLIC_DIR)) if (!keep.has(f)) fs.rmSync(path.join(PUBLIC_DIR, f));

  console.log(`\nReel: ${clips.length} clips, ${total.toFixed(1)}s total.`);
  console.log(`Review frames: ${path.relative(ROOT, path.join(CACHE, "review"))}/<slug>/`);
}

const targets = only.length ? only : config.order;
if (command === "record" || command === "all") {
  for (const slug of targets) {
    if (!force && recordingIsCurrent(slug) && command === "all") continue;
    if (!force && recordingIsCurrent(slug) && !only.length) continue;
    await record(slug);
  }
}
if (command === "build" || command === "all") await build();
