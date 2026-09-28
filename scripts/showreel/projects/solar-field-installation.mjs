/** Scroll the homepage's 3D deployment: convoy, portal, formation, then every panel raised and tracking. */
export default {
  title: "SolarSwarm",
  kind: "Robotics platform",
  line: "Scrolling a solar field from truck to tracking array.",
  colorScheme: "dark",

  async setup(s) {
    await s.page.goto("https://solarswarm.vercel.app/", { waitUntil: "networkidle" });
    await s.page.evaluate(() => window.scrollTo(0, document.getElementById("deploy").offsetTop));
    await s.wait(6000); // truck, portal and robot models load
  },

  async act(s) {
    await s.hold(500); // the convoy, parked
    // Scrub the sticky deploy sequence at an even pace, like a steady scroll.
    s.page.evaluate(({ to, ms }) => {
      const el = document.getElementById("deploy");
      const from = window.scrollY;
      const end = el.offsetTop + (el.offsetHeight - window.innerHeight) * to;
      const t0 = performance.now();
      const ease = (p) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / ms);
        window.scrollTo(0, from + (end - from) * ease(p));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { to: 0.72, ms: 7600 });
    await s.hold(7700);
    await s.hold(1000); // the array tracking
  },
};
