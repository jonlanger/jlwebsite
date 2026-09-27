/** The safety gate: a flagged incident must be reviewed before the brief moves on. */
export default {
  title: "Careshift",
  kind: "Healthcare",
  line: "A flagged incident blocks the handoff until it’s reviewed.",

  async setup(s) {
    await s.page.goto("https://careshift-gold.vercel.app/sign-in", { waitUntil: "networkidle" });
    await s.page.getByRole("button", { name: "Continue as demo" }).click(); // app's built-in demo mode
    await s.page.waitForURL(/today/);
    await s.page.goto("https://careshift-gold.vercel.app/brief/maggie", { waitUntil: "networkidle" });
    await s.wait(800);
    await s.page.getByRole("button", { name: "See what changed" }).click();
    await s.wait(1200);
  },

  async act(s) {
    const { page } = s;
    // Try to move on: the button is locked and says why.
    await s.hoverEl(page.getByRole("button", { name: "See what’s due" }), { zoom: 1.7, linger: 1100 });
    await s.clickEl(page.getByRole("button", { name: "Mark reviewed" }).first(), { zoom: 1.6 });
    await s.hold(500);
    await s.clickEl(page.getByRole("button", { name: "See what’s due" }), { zoom: 1.5 });
    await s.wait(700);
    await s.hold(1000);
  },
};
