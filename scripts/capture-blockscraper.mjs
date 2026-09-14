import { chromium } from "/Users/jonlanger/Documents/Projects/careshift/node_modules/playwright/index.mjs";
import { mkdir } from "node:fs/promises";
import path from "node:path";

/**
 * Photographs Blockscraper from the live deployment.
 *
 * The game keeps its world in module scope, so main.js is intercepted on the
 * way in and a small `window.BS` handle appended to it. Time is stopped
 * (speed 0) so every frame is the same instant, and each shot waits for the
 * chunked city renderer to finish before it is taken.
 *
 *   node scripts/capture-blockscraper.mjs            # everything
 *   node scripts/capture-blockscraper.mjs s c        # only names starting s / c
 */
const LIVE = "https://blockscraper.vercel.app";
const OUT = path.resolve("public/projects/blockscraper/_src");
const ONLY = process.argv.slice(2);
const wanted = (name) => ONLY.length === 0 || ONLY.some((p) => name.startsWith(p));

const HANDLE = `
;window.BS = {
  THREE, camera, controls, game, world, quality, ui, CELL,
  get city() { return city; }, get cityR() { return cityR; },
  afterEdit, setActive, frame, neighborhood, setUnderground, setCut, newCity, applyQuality,
  setCam(p, t) { tween = null; camera.position.set(...p); controls.target.set(...t); controls.update(); },
};`;

const HIDE_UI = `#topbar,#palette,#info,#viewbar,#toasts,#tooltip,#loading{display:none!important}`;

async function settle(page, ms = 1200) {
  await page.waitForFunction(() => window.BS && window.BS.cityR.pending === 0, null, { timeout: 120000 });
  await page.waitForTimeout(ms);
  await page.waitForFunction(() => window.BS.cityR.pending === 0, null, { timeout: 120000 });
  await page.waitForTimeout(400);
}

async function shot(page, name) {
  if (!wanted(name)) return;
  await settle(page);
  await page.screenshot({ path: path.join(OUT, `${name}.png`) });
  console.log("saved", name);
}

async function ui(page, on) {
  await page.evaluate(([on, css]) => {
    let el = document.getElementById("cap-hide");
    if (!el) { el = document.createElement("style"); el.id = "cap-hide"; document.head.appendChild(el); }
    el.textContent = on ? "" : css;
  }, [on, HIDE_UI]);
}

/**
 * Aim at every block of one style (buildings that touch merge, so names are
 * not stable). az is the angle round it (0 = from -z), el the height ratio.
 */
async function aim(page, style, { az = 0.6, el = 0.45, dist = 1, lift = 0.45, top = false, above = -99 } = {}) {
  await page.evaluate(({ style, az, el, dist, lift, top, above }) => {
    const BS = window.BS, city = BS.city, L = city.layout, C = BS.CELL;
    const cells = [...city.cells.values()].filter((c) => c.s === style && c.y >= above && !(city.buildings.get(c.b) || {}).park);
    if (!cells.length) throw new Error("no style " + style);
    const r0 = (k) => Math.min(...cells.map((c) => c[k])), r1 = (k) => Math.max(...cells.map((c) => c[k]));
    const x0 = r0("x"), x1 = r1("x"), z0 = r0("z"), z1 = r1("z"), y1 = r1("y");
    BS.setActive(cells[0].b);
    const w = (x1 - x0 + 1) * C, d = (z1 - z0 + 1) * C, h = (y1 + 1) * C;
    const cx = L.wx((x0 + x1 + 1) / 2), cz = L.wz((z0 + z1 + 1) / 2);
    const ty = top ? h * 0.85 : h * lift;
    const r = (30 + Math.max(w, d) * 1.1 + h * 0.9) * dist;
    BS.setCam([cx + Math.sin(az) * r, ty + r * el, cz - Math.cos(az) * r], [cx, ty, cz]);
  }, { style, az, el, dist, lift, top, above });
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({ args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  page.on("pageerror", (e) => console.log("pageerror:", e.message));

  await page.route("**/src/main.js", async (route) => {
    const res = await route.fetch();
    route.fulfill({ response: res, body: (await res.text()) + HANDLE, headers: { ...res.headers(), "content-type": "text/javascript" } });
  });
  await page.goto(LIVE, { waitUntil: "networkidle" });
  await page.waitForFunction(() => window.BS, null, { timeout: 60000 });
  await page.evaluate(() => { const g = window.BS.game; g.speed = 0; g.time = 0.4; window.BS.quality.autoChecked = true; });
  await settle(page, 3000);

  // ---- the product, as a player first sees it
  await shot(page, "u1-ui");

  // ---- the classic neighborhood
  await ui(page, false);
  await page.evaluate(() => {
    const L = window.BS.city.layout, s = Math.max(L.width, L.depth);
    window.BS.game.hood = true;
    window.BS.setCam([s * 0.6, s * 0.52, s * 0.8], [-s * 0.08, 50, 0]);
  });
  await shot(page, "c1-hero");
  await page.evaluate(() => { window.BS.game.time = 0.9; });
  await shot(page, "c2-night");
  await page.evaluate(() => { window.BS.game.time = 0.4; window.BS.game.hood = false; });

  await aim(page, "gothic", { az: 2.4, el: 0.12, dist: 0.55, top: true });
  await shot(page, "c3-gothic");
  // underground, seen from outside the map edge
  await page.evaluate(() => { window.BS.setUnderground(true); window.BS.game.cutaway = true; });
  await aim(page, "brutalist", { az: 3.14, el: -0.08, dist: 1.5, lift: -0.35 });
  await shot(page, "c7-underground");
  await page.evaluate(() => { window.BS.setUnderground(false); window.BS.game.cutaway = false; });

  // parks
  await page.evaluate(() => {
    const BS = window.BS, city = BS.city, L = city.layout;
    let x0 = 1e9, x1 = -1e9, z0 = 1e9, z1 = -1e9;
    for (const B of city.buildings.values()) if (B.park) {
      x0 = Math.min(x0, B.bbox.x0); x1 = Math.max(x1, B.bbox.x1); z0 = Math.min(z0, B.bbox.z0); z1 = Math.max(z1, B.bbox.z1);
    }
    const cx = L.wx((x0 + x1 + 1) / 2), cz = L.wz((z0 + z1 + 1) / 2), w = (x1 - x0) * BS.CELL;
    BS.game.hood = true;
    BS.setCam([cx + w * 0.1, w * 0.62, cz + w * 0.5], [cx, 0, cz]);
  });
  await shot(page, "p1-parks");
  for (const [name, id] of [["p2-basin", "bassin"], ["p3-parterre", "parterre"], ["p4-chahar", "chahar"], ["p5-cascade", "cascade"]]) {
    await page.evaluate((id) => {
      const BS = window.BS, city = BS.city, L = city.layout;
      const cells = [...city.cells.values()].filter((c) => c.m === id);
      const xs = cells.map((c) => c.x), zs = cells.map((c) => c.z);
      const x0 = Math.min(...xs), x1 = Math.max(...xs), z0 = Math.min(...zs), z1 = Math.max(...zs);
      const cx = L.wx((x0 + x1 + 1) / 2), cz = L.wz((z0 + z1 + 1) / 2), w = Math.max(x1 - x0 + 1, z1 - z0 + 1) * BS.CELL;
      BS.setCam([cx + w * 0.25, w * 0.95, cz + w * 0.85], [cx, 0, cz]);
    }, id);
    await shot(page, name);
  }

  // ---- studies on a blank city: one building, many styles, then ornament
  await page.evaluate(() => {
    const BS = window.BS;
    BS.newCity({ template: "blank", map: "medium", lots: 4, plot: "6x5" });
    const city = BS.city, L = city.layout;
    const lot = L.lots.find((l) => l.row === 0 && l.block[0] === 0 && l.block[1] === 0 && l.k === 1);
    const set = (x, y, z, m, s = "beaux") => city.set(lot.gx + x, y, lot.gz + z, m, s, 0);
    for (let x = 0; x < 6; x++) for (let z = 1; z < 5; z++) {
      set(x, -1, z, "foundation");
      set(x, 0, z, "shop");
      for (let y = 1; y <= 8; y++) set(x, y, z, y > 5 ? "condo" : "office");
      set(x, 9, z, "mansard");
    }
    set(2, 0, 1, "lobby"); set(3, 0, 1, "lobby");
    for (let y = 0; y <= 8; y++) set(2, y, 3, "core");
    set(2, 9, 3, "dome");
    set(2, 0, 0, "portico"); set(3, 0, 0, "portico");
    set(0, 0, 0, "forecourt"); set(5, 0, 0, "forecourt");
    BS.afterEdit([lot.gx + 2, 0, lot.gz + 2]);
    BS.game.isolate = false;
    window.__lot = lot;
  });

  const studyCam = async () => page.evaluate(() => {
    const BS = window.BS, L = BS.city.layout, lot = window.__lot;
    const cx = L.wx(lot.gx + 3), cz = L.wz(lot.gz + 2.5);
    BS.setCam([cx - 30, 30, cz - 62], [cx, 17, cz]);
  });
  const restyle = (s) => page.evaluate((s) => {
    const BS = window.BS, city = BS.city;
    for (const c of [...city.cells.values()]) city.set(c.x, c.y, c.z, c.m, s, 0);
    BS.afterEdit();
  }, s);
  const ornament = (plan) => page.evaluate((plan) => {
    const BS = window.BS, city = BS.city;
    for (const c of [...city.cells.values()]) for (let d = 0; d < 4; d++) city.setDecor(c.x, c.y, c.z, d, null);
    for (const c of [...city.cells.values()]) {
      for (const [id, y0, y1, faces] of plan) if (c.y >= y0 && c.y <= y1) for (const d of faces) {
        try { city.setDecor(c.x, c.y, c.z, d, id); } catch {}
      }
    }
    BS.afterEdit();
  }, plan);

  await studyCam();
  for (const s of ["beaux", "gothic", "castiron", "deco", "midcentury", "glass", "brutalist", "solarpunk"]) {
    await restyle(s);
    await shot(page, `s-style-${s}`);
  }

  // cutaway on the study building
  await restyle("beaux");
  await page.evaluate(() => {
    const BS = window.BS, L = BS.city.layout, lot = window.__lot;
    const cx = L.wx(lot.gx + 3), cz = L.wz(lot.gz + 2.5);
    BS.game.cutaway = true;
    BS.game.hood = false; // newCity leaves the city view on, which hides interiors
    BS.setCam([cx - 20, 34, cz - 34], [cx, 14, cz]);
  });
  await shot(page, "c6-cutaway");
  await page.evaluate(() => { window.BS.game.cutaway = false; });
  await studyCam();

  // ornament: same massing, classical then modern
  const ALL = [0, 1, 2, 3];
  await restyle("beaux");
  await shot(page, "o1-bare");
  await ornament([["lanterns", 0, 0, ALL], ["columns", 1, 4, ALL], ["frieze", 5, 5, ALL], ["balcony", 6, 7, ALL], ["cornice", 8, 8, ALL]]);
  await shot(page, "o2-classical");
  await page.evaluate(() => {
    const BS = window.BS, L = BS.city.layout, lot = window.__lot;
    const cx = L.wx(lot.gx + 3), cz = L.wz(lot.gz + 2.5);
    BS.setCam([cx - 16, 22, cz - 26], [cx - 2, 20, cz - 8]);
  });
  await shot(page, "o2b-classical-close");
  await studyCam();
  await restyle("gothic");
  await ornament([["niche", 0, 1, ALL], ["buttress", 2, 7, ALL], ["gargoyle", 8, 8, ALL]]);
  await shot(page, "o3-gothic");
  await restyle("futurist");
  await ornament([["neon", 0, 0, ALL], ["fins", 1, 7, ALL], ["overhang", 8, 8, ALL]]);
  await shot(page, "o4-parametric");
  await restyle("solarpunk");
  await ornament([["forecourt", 0, 0, []], ["ivy", 0, 3, ALL], ["balcony", 4, 7, ALL], ["overhang", 8, 8, ALL]]);
  await shot(page, "o5-solarpunk");

  // ---- a random city
  await page.evaluate(() => { window.BS.newCity({ template: "random", map: "medium", lots: 4, plot: "6x5" }); });
  await page.evaluate(() => {
    const L = window.BS.city.layout, s = Math.max(L.width, L.depth);
    window.BS.game.hood = true;
    window.BS.setCam([s * 0.5, s * 0.4, s * 0.62], [0, 15, 0]);
  });
  await shot(page, "r1-random");

  await browser.close();
}

main().catch((e) => { console.error(e); process.exit(1); });
