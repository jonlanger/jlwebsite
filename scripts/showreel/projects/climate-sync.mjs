/** Pick a climate pattern and see which cities share it. */
export default {
  title: "Climate Sync",
  kind: "Geospatial",
  line: "Finding cities that share a flood-risk climate fingerprint.",
  colorScheme: "dark",

  async setup(s) {
    await s.page.goto("https://climatesync.vercel.app/", { waitUntil: "networkidle" });
    await s.wait(2500);
    await s.page.getByRole("button", { name: "Start exploring" }).click();
    await s.wait(1500);
  },

  async act(s) {
    const { page } = s;
    await s.clickEl(page.getByRole("button", { name: /Compound flood risk/ }), { zoom: 1.6 });
    await s.wait(400);
    await s.hold(1700); // arcs light up across the globe
    await s.clickEl(page.getByRole("button", { name: /Matches/ }).nth(1), { zoom: 1.5 });
    await s.wait(1200);
    await s.hold(1200);
  },
};
