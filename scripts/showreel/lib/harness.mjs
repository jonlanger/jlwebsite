/**
 * Recording harness for showreel clips.
 *
 * Drives a headed Chromium (so WebGL/WebGPU render on the GPU), draws a visible
 * cursor with click ripples, captures every compositor frame via CDP
 * screencast, and logs each action with timestamps. The planner uses that log
 * to keep interactions at real-time speed, fast-forward idle time, and zoom
 * the camera toward whatever is being clicked.
 *
 * Coordinates passed to actions are CSS pixels in the page viewport.
 */
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const CURSOR_SCRIPT = `
(() => {
  if (window.__reelCursor) return; window.__reelCursor = true;
  const install = () => {
    const c = document.createElement('div');
    c.innerHTML = '<svg width="26" height="26" viewBox="0 0 24 24"><path d="M4 2.5 L4 19.5 L8.6 15.2 L11.6 21.8 L14.4 20.6 L11.4 14.1 L17.8 14.1 Z" fill="#111" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>';
    Object.assign(c.style,{position:'fixed',left:'0',top:'0',width:'26px',height:'26px',zIndex:2147483647,pointerEvents:'none',transform:'translate(-200px,-200px)',transition:'scale .12s',transformOrigin:'4px 3px',filter:'drop-shadow(0 2px 3px rgba(0,0,0,.35))'});
    document.documentElement.appendChild(c);
    addEventListener('mousemove',e=>{c.style.transform='translate('+(e.clientX-4)+'px,'+(e.clientY-3)+'px)';},true);
    addEventListener('mousedown',e=>{c.style.scale='0.86';
      const r=document.createElement('div');
      Object.assign(r.style,{position:'fixed',left:(e.clientX-22)+'px',top:(e.clientY-22)+'px',width:'44px',height:'44px',borderRadius:'50%',border:'2px solid rgba(255,255,255,.95)',boxShadow:'0 0 0 2px rgba(0,0,0,.25)',background:'rgba(255,255,255,.18)',zIndex:2147483646,pointerEvents:'none',transform:'scale(.3)',opacity:'1',transition:'transform .45s cubic-bezier(.16,1,.3,1), opacity .45s'});
      document.documentElement.appendChild(r); requestAnimationFrame(()=>{r.style.transform='scale(1)';r.style.opacity='0'}); setTimeout(()=>r.remove(),600);},true);
    addEventListener('mouseup',()=>{c.style.scale='1'},true);
  };
  if (document.documentElement) install(); else addEventListener('DOMContentLoaded', install);
})();`;

// Keeps the compositor emitting frames while the page is visually static.
const HEARTBEAT_SCRIPT = `(() => {
  const s = document.createElement('style');
  s.textContent = '@keyframes __reelk{to{transform:translateX(-1px)}}';
  document.head.appendChild(s);
  const k = document.createElement('div');
  k.style.cssText = 'position:fixed;right:0;bottom:0;width:1px;height:1px;opacity:.01;pointer-events:none;z-index:2147483645;animation:__reelk 1s linear infinite';
  document.documentElement.appendChild(k);
})()`;

const easeInOutCubic = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
const easeInOutQuad = (p) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);

/**
 * @param {object} o
 * @param {string} o.framesDir where frames + log are written (wiped first)
 * @param {{width:number,height:number}} o.viewport CSS pixels
 * @param {number} o.dsf device scale factor (capture resolution = viewport × dsf)
 * @param {number} o.defaultZoom camera zoom used for clicks unless overridden
 */
export async function openSession({ framesDir, viewport, dsf, defaultZoom, colorScheme = "light" }) {
  const browser = await chromium.launch({
    headless: false,
    args: ["--enable-unsafe-webgpu", "--window-position=3000,0", "--hide-scrollbars"],
  });
  const context = await browser.newContext({ viewport, deviceScaleFactor: dsf, colorScheme, reducedMotion: "no-preference" });
  await context.addInitScript(CURSOR_SCRIPT);
  const page = await context.newPage();
  page.setDefaultTimeout(45000);

  fs.rmSync(framesDir, { recursive: true, force: true });
  fs.mkdirSync(framesDir, { recursive: true });

  const cdp = await context.newCDPSession(page);
  const frames = [];
  const actions = [];
  const holds = [];
  let n = 0;
  let wallStart = null; // epoch seconds; shared clock for frames and actions
  let pending = Promise.resolve();

  cdp.on("Page.screencastFrame", ({ data, metadata, sessionId }) => {
    cdp.send("Page.screencastFrameAck", { sessionId }).catch(() => {});
    if (wallStart === null) return;
    const f = `${String(n++).padStart(5, "0")}.jpg`;
    const t = +(metadata.timestamp - wallStart).toFixed(4);
    pending = pending.then(() => fs.promises.writeFile(path.join(framesDir, f), Buffer.from(data, "base64")));
    frames.push({ f, t });
  });

  const now = () => (wallStart === null ? 0 : Date.now() / 1000 - wallStart);
  let mx = viewport.width * 0.62;
  let my = viewport.height * 0.58;
  const zoomOf = (opts, fallback) => (opts && opts.zoom !== undefined ? opts.zoom : fallback);

  async function glide(x, y, ms, ease = easeInOutCubic) {
    // Time-based, not step-based: on heavy GPU pages each mouse event can take
    // a frame or more, which would otherwise stretch the glide.
    const sx = mx, sy = my;
    const t0 = Date.now();
    for (;;) {
      const p = Math.min(1, (Date.now() - t0) / ms);
      const e = ease(p);
      await page.mouse.move(sx + (x - sx) * e, sy + (y - sy) * e);
      if (p >= 1) break;
      await page.waitForTimeout(12);
    }
    mx = x; my = y;
  }

  function log(kind, from, opts, x, y, fallbackZoom) {
    const focus = opts?.focus ?? { x, y };
    actions.push({ kind, from, to: now(), zoom: zoomOf(opts, fallbackZoom), x: focus.x * dsf, y: focus.y * dsf });
  }

  const s = {
    page,
    viewport,
    dsf,

    /** Begin capturing. Everything before this (setup) is not in the clip. */
    async start() {
      await page.mouse.move(mx, my);
      await page.evaluate(HEARTBEAT_SCRIPT);
      await cdp.send("Page.startScreencast", {
        format: "jpeg",
        quality: 88,
        maxWidth: Math.round(viewport.width * dsf),
        maxHeight: Math.round(viewport.height * dsf),
        everyNthFrame: 1,
      });
      wallStart = Date.now() / 1000;
      await page.waitForTimeout(250);
    },

    /** Stop capturing and write frames.json. */
    async stop(meta = {}) {
      const end = now();
      await cdp.send("Page.stopScreencast");
      await page.waitForTimeout(150);
      await pending;
      const log = {
        ...meta,
        end,
        width: Math.round(viewport.width * dsf),
        height: Math.round(viewport.height * dsf),
        frames,
        actions,
        holds,
      };
      fs.writeFileSync(path.join(framesDir, "frames.json"), JSON.stringify(log));
      await browser.close();
      return log;
    },

    async close() {
      await browser.close().catch(() => {});
    },

    /** Move the cursor. Not zoomed unless `zoom` is given. */
    async move(x, y, opts = {}) {
      const from = now();
      await glide(x, y, opts.ms ?? 650);
      log("move", from, opts, x, y, 1);
    },

    /** Glide to (x, y), pause so the viewer sees the target, then click. */
    async click(x, y, opts = {}) {
      const from = now();
      await glide(x, y, opts.ms ?? 650);
      await page.waitForTimeout(opts.pause ?? 300);
      await page.mouse.down();
      await page.waitForTimeout(90);
      await page.mouse.up();
      log("click", from, opts, x, y, defaultZoom);
    },

    /** Click the centre (or dx/dy fraction) of a Playwright locator. */
    async clickEl(locator, opts = {}) {
      await locator.scrollIntoViewIfNeeded().catch(() => {});
      const b = await locator.boundingBox();
      if (!b) throw new Error("clickEl: element has no bounding box");
      await s.click(b.x + b.width * (opts.dx ?? 0.5), b.y + b.height * (opts.dy ?? 0.5), opts);
    },

    /** Hover a locator's centre and linger (e.g. on a disabled control). */
    async hoverEl(locator, opts = {}) {
      const b = await locator.boundingBox();
      if (!b) throw new Error("hoverEl: element has no bounding box");
      const from = now();
      const x = b.x + b.width * (opts.dx ?? 0.5), y = b.y + b.height * (opts.dy ?? 0.5);
      await glide(x, y, opts.ms ?? 650);
      await page.waitForTimeout(opts.linger ?? 700);
      log("hover", from, opts, x, y, defaultZoom);
    },

    /** Press at the first point, drag through the rest, release. Wide shot unless `zoom`. */
    async drag(points, opts = {}) {
      const from = now();
      await glide(points[0][0], points[0][1], opts.approachMs ?? 650);
      await page.waitForTimeout(200);
      await page.mouse.down();
      const seg = (opts.ms ?? 1400) / (points.length - 1);
      for (let i = 1; i < points.length; i++) {
        await glide(points[i][0], points[i][1], seg, easeInOutQuad);
      }
      await page.waitForTimeout(80);
      await page.mouse.up();
      const [cx, cy] = points[Math.floor(points.length / 2)];
      log("drag", from, opts, cx, cy, 1);
    },

    /** Type into the focused field. */
    async type(text, opts = {}) {
      const from = now();
      await page.keyboard.type(text, { delay: opts.delay ?? 70 });
      log("type", from, opts, mx, my, defaultZoom);
    },

    /** Idle time: kept in the clip but fast-forwarded (loading, transitions). */
    wait: (ms) => page.waitForTimeout(ms),

    /** Real-time time: something worth watching is happening (animation, result). */
    async hold(ms, opts = {}) {
      const from = now();
      await page.waitForTimeout(ms);
      holds.push({ from, to: now(), zoom: opts.zoom, x: opts.focus ? opts.focus.x * dsf : undefined, y: opts.focus ? opts.focus.y * dsf : undefined });
    },
  };
  return s;
}
