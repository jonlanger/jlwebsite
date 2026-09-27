/** Open a species and follow its guided tour across the plant. */
export default {
  title: "Botanica",
  kind: "3D / point cloud",
  line: "Following a guided tour pinned to the plant’s own anatomy.",

  async setup(s) {
    await s.page.goto("https://botanica-learn.vercel.app/", { waitUntil: "networkidle" });
    await s.page.getByRole("link", { name: /Explore the catalog/ }).click();
    await s.wait(2500);
  },

  async act(s) {
    const { page } = s;
    await s.clickEl(page.getByRole("link", { name: /^Calendula officinalis/ }), { dy: 0.35, zoom: 1.3 });
    await s.wait(3500); // point cloud loads (fast-forwarded)
    await s.hold(600);
    const next = page.getByRole("button", { name: "Next callout" });
    for (let i = 0; i < 3; i++) {
      await s.clickEl(next, { zoom: 1.2, focus: { x: 560, y: 420 }, ms: i ? 450 : 800 });
      await s.hold(850); // camera flies to the next marker
    }
  },
};
