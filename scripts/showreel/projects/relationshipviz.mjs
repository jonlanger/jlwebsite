/** Switch on the risk lens, then open a company’s scorecard. */
export default {
  title: "RelationshipViz",
  kind: "Data visualization",
  line: "Switching on the risk lens, then opening Nvidia’s scorecard.",
  colorScheme: "dark",

  async setup(s) {
    await s.page.goto("https://relationshipviz.vercel.app/", { waitUntil: "networkidle" });
    await s.page.getByRole("link", { name: "Explore", exact: true }).click();
    await s.wait(4000);
  },

  async act(s) {
    const { page } = s;
    await s.clickEl(page.locator("button", { hasText: /^\s*Risk\s*$/ }).first(), { zoom: 1.7 });
    await s.hold(1200); // nodes recolour by risk
    await s.click(1022, 504, { zoom: 1.4 }); // Nvidia
    await s.wait(600);
    await s.hold(1600); // scorecard drawer
  },
};
