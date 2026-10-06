/**
 * The core workflow: a vehicle stops and asks for help, the operator opens it,
 * nudges autonomy's path and approves it, and the vehicle drives on. Nobody
 * claims the vehicle.
 *
 * The simulator raises help requests at random (each vehicle's first comes 90–300 s
 * after a reset), so setup waits off camera for one that offers Approve path.
 */
const BASE = "https://teleoperate.vercel.app";
// Assist requests autonomy can pass once an operator approves the path (sim/vehicle.ts ASSISTS).
const PASSABLE = /Double-parked truck in lane|Lane closed for construction|Unprotected left, view blocked/;

export default {
  title: "teleop",
  kind: "Remote operations",
  line: "A vehicle stops and asks for help; the operator nudges its path and approves it without taking the wheel.",
  colorScheme: "dark",

  async setup(s) {
    const { page } = s;
    await page.goto(`${BASE}/?reset`, { waitUntil: "domcontentloaded" });
    await page.evaluate(() => localStorage.setItem("teleop.session", JSON.stringify({
      userId: "u_sam", station: "ST-01", theme: "dark", keyboardDrive: true, vehiclesOpen: true, alertsOpen: true,
    })));
    await page.goto(`${BASE}/operate`, { waitUntil: "domcontentloaded" });
    await s.wait(4000);
    // Show every vehicle, not just the ones assigned to Sam.
    await page.locator(".col .spread").getByText("All", { exact: true }).first().click();
    // Wait for a request the operator can approve.
    await tile(page).waitFor({ timeout: 8 * 60_000 });
    await s.wait(2500); // the alert lands in the rail
  },

  async act(s) {
    const { page } = s;
    await s.hold(900); // the console, with a vehicle asking in the list and the rail

    // Open the vehicle that's asking: the camera cuts to what it sees.
    await s.clickEl(tile(page), { zoom: 1.5 });
    await s.hold(1800, { zoom: 1.15, focus: await centre(page.locator(".col-center").first()) }); // the obstacle ahead

    // Guide without claiming: hold Nudge left and autonomy's path bends around it.
    const nudge = page.getByRole("button", { name: "Nudge left" });
    const nb = await nudge.boundingBox();
    const nx = nb.x + nb.width / 2, ny = nb.y + nb.height / 2;
    await s.drag([[nx, ny], [nx + 1, ny]], { zoom: 1.4, ms: 1400 });
    await s.hold(500);

    // Approve the path: autonomy keeps the wheel and drives on.
    await s.clickEl(page.getByRole("button", { name: "Approve path" }).first(), { zoom: 1.5 });
    await s.hold(3200, { zoom: 1.1, focus: await centre(page.locator(".col-center").first()) }); // moving again, still in autonomy
  },
};

/** The fleet-list tile of a vehicle with a passable assist request. */
function tile(page) {
  return page.locator(".tile-wrap > :first-child").filter({ hasText: PASSABLE }).first();
}

async function centre(locator) {
  const b = await locator.boundingBox();
  return { x: b.x + b.width / 2, y: b.y + b.height / 2 };
}
