/** Review a finished run: play the colony timelapse, compare all six dishes, reach sign-off. */
const BASE = "https://petricorcloud.vercel.app";

/** The demo's server intermittently answers 500; retry until it doesn't. */
async function go(page, route) {
  for (let i = 0; i < 8; i++) {
    const res = await page.goto(`${BASE}${route}`, { waitUntil: "load" });
    if (res && res.status() < 500) return;
    await page.waitForTimeout(2000);
  }
  throw new Error(`could not load ${route}`);
}

/** Smooth-scroll the window and keep it in the clip at real time. */
async function scrollTo(s, y, ms = 900) {
  await s.page.evaluate((top) => window.scrollTo({ top, behavior: "smooth" }), y);
  await s.hold(ms);
}

export default {
  title: "Petricor",
  kind: "Lab platform",
  line: "Playing five days of mold growth, comparing all six dishes, then taking the run to sign-off.",

  async setup(s) {
    const { page } = s;
    // Persona sign-in, as the demo's login page does. Review is read-only:
    // the clip never approves, so the shared demo state is left as it was.
    await go(page, "/login");
    for (let i = 0; ; i++) {
      const res = await page.request.post(`${BASE}/api/session`, { data: { userId: "u_alex" } });
      if (res.ok()) break;
      if (i > 15) throw new Error("sign-in failed");
      await page.waitForTimeout(2000);
    }
    // Wait until the run's captures have loaded (the scrubber gets its range).
    for (let i = 0; ; i++) {
      await go(page, "/app/runs/run_ym_0922");
      const ok = await page
        .waitForFunction(() => +document.querySelector("input[type=range][aria-label=Capture]")?.max > 0, null, { timeout: 15000 })
        .then(() => true, () => false);
      if (ok) break;
      if (i > 4) throw new Error("run captures never loaded");
    }
    await s.wait(1500);
  },

  async act(s) {
    const { page } = s;
    const scrubber = page.locator("input[type=range][aria-label=Capture]");
    await s.hold(500); // the run, complete and pending review

    // Single dish, scrolled so the dish and its scrubber share the frame.
    await scrollTo(s, 250, 700);
    const r = await scrubber.boundingBox();
    const y = r.y + r.height / 2;
    const at = (f) => r.x + 8 + (r.width - 16) * f;
    // Back to hour 0, then play five days: colonies appear and spread. The
    // playback is fast-forwarded in the clip, so it reads as a timelapse.
    await s.click(at(0), y, { zoom: 1 });
    await s.clickEl(page.getByRole("button", { name: "▶" }), { zoom: 1, ms: 400 });
    await page.waitForFunction(() => /^61\/61/.test(document.body.innerText.match(/\d+\/61 · [\d.]+ h/)?.[0] ?? ""), null, { timeout: 30000 });
    await s.hold(400);

    // All six dishes at the same hour.
    await scrollTo(s, 0, 700);
    await s.clickEl(page.getByRole("button", { name: "All six" }), { zoom: 1.4 });
    await s.hold(1300);

    // Down to sign-off, where a microbiologist approves or requests changes.
    await scrollTo(s, 100000, 900);
    await s.hoverEl(page.getByRole("button", { name: "Approve results" }), { zoom: 1.5, linger: 1100 });
    await s.hold(300);
  },
};
