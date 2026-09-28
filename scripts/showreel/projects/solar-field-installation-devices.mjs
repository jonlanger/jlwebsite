/**
 * SolarSwarm on devices: the homepage's scroll-driven deployment on a laptop,
 * with the energy dashboard and a unit’s digital twin on phones.
 * Rendered through lib/devices.mjs + lib/stage.html. Not in the reel (see
 * solar-field-installation.mjs); record it on its own with
 * `npm run showreel -- record solar-field-installation-devices`.
 */
const APP = "https://solarswarm.vercel.app";
const PHONE = { width: 390, height: 844 };

export default {
  title: "SolarSwarm",
  kind: "Robotics platform",
  line: "A solar field deploys itself, while the day’s power flows and a unit’s digital twin play out on phones.",

  screens: [
    {
      id: "deploy",
      viewport: { width: 1440, height: 900 },
      colorScheme: "dark",
      cursor: "hidden", // scroll only
      async setup(s) {
        await s.page.goto(APP, { waitUntil: "networkidle" });
        await s.page.evaluate(() => window.scrollTo(0, document.getElementById("deploy").offsetTop));
        await s.wait(6000); // truck, portal and robot models load
      },
      async act(s) {
        await s.hold(400);
        // Scrub the sticky deploy sequence: convoy → wash → formation → panels raise and track.
        s.page.evaluate(({ to, ms }) => {
          const el = document.getElementById("deploy");
          const from = window.scrollY;
          const end = el.offsetTop + (el.offsetHeight - window.innerHeight) * to;
          const t0 = performance.now();
          const ease = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
          const tick = (now) => {
            const p = Math.min(1, (now - t0) / ms);
            window.scrollTo(0, from + (end - from) * ease(p));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }, { to: 0.7, ms: 7200 });
        await s.hold(7400);
        await s.hold(500);
      },
    },
    {
      id: "energy",
      viewport: PHONE,
      colorScheme: "dark",
      cursor: "touch",
      async setup(s) {
        await s.page.goto(`${APP}/app/energy`, { waitUntil: "networkidle" });
        await s.wait(3000);
      },
      async act(s) {
        const { page } = s;
        await s.hold(500);
        // Bring the day's power-flow chart up, then scrub across it.
        page.evaluate(() => window.scrollBy({ top: 430, behavior: "smooth" }));
        await s.hold(1100);
        const chart = await page.locator(".recharts-surface").first().boundingBox();
        const y = chart.y + chart.height * 0.45;
        await s.move(chart.x + chart.width * 0.25, y, { ms: 500 });
        await s.move(chart.x + chart.width * 0.5, y - 10, { ms: 1300 });
        await s.move(chart.x + chart.width * 0.8, y, { ms: 1300 });
        await s.hold(900);
      },
    },
    {
      id: "twin",
      viewport: PHONE,
      colorScheme: "dark",
      cursor: "touch",
      async setup(s) {
        await s.page.goto(`${APP}/app/robots/SS-10238`, { waitUntil: "networkidle" });
        await s.wait(5000);
      },
      async act(s) {
        const box = await s.page.locator("canvas").first().boundingBox();
        const y = box.y + box.height * 0.55;
        await s.hold(400);
        await s.drag([[box.x + box.width * 0.72, y], [box.x + box.width * 0.45, y - 6], [box.x + box.width * 0.2, y]], { ms: 2200 });
        await s.hold(1400);
      },
    },
  ],

  stage: {
    duration: 9,
    devices: { laptop: "deploy", left: "energy", right: "twin" },
    offsets: { energy: 0.9, twin: 3.4 },
  },
};
