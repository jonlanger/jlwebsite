import sharp from "sharp";
import os from "node:os";
import path from "node:path";

/**
 * Turns the teleop captures, diagrams and hardware renders into case-study
 * images. Run scripts/capture-teleop.mjs and render-teleop-diagrams.mjs first.
 * Hardware renders come from the teleop repo (hardware/out_v6, hardware/context/out
 * and the homepage's detail close-ups); the original station's renders are cut
 * from the old case-study board.
 */
const SRC = path.resolve("public/projects/teleoperation-station/_src");
const OUT = path.resolve("public/projects/teleoperation-station");
const TELEOP = path.join(os.homedir(), "Documents/Projects/teleop");
const BOARD = path.join(SRC, "teleoperation-station_board.webp");
const W = 1800, H = 1125;

const save = (img, to, quality = 88) => img.webp({ quality }).toFile(path.join(OUT, `${to}.webp`)).then(() => console.log(to));

// App and homepage captures (16:10 already) -> 1800×1125.
for (const n of [
  "op-console", "op-detections", "op-claimed", "op-light",
  "fleet-overview", "fleet-shifts", "fleet-vehicles", "fleet-light",
  "eng-telemetry", "eng-maintenance", "eng-stations",
  "sup-queue", "sup-ticket", "sup-insights",
  "site-hero", "site-why", "site-who", "site-value", "site-product", "site-tech", "site-hardware",
]) {
  await save(sharp(path.join(SRC, `${n}.png`)).resize(W, H, { position: "top" }), n);
}

// Hardware renders, filled to 16:10.
for (const [from, to, position = "centre"] of [
  ["hardware/out_v6/hero.png", "hw-hero"],
  ["hardware/out_v6/exploded.png", "hw-exploded"],
  ["hardware/out_v6/hub.png", "hw-hub"],
  ["hardware/out_v6/side.png", "hw-side"],
  ["hardware/out_v6/rear.png", "hw-rear"],
  ["hardware/context/out/station.png", "ctx-station"],
  ["hardware/context/out/row.png", "ctx-row"],
  ["hardware/context/out/room.png", "ctx-room"],
]) {
  await save(sharp(path.join(TELEOP, from)).resize(W, H, { fit: "cover", position }), to);
}

// "Details, matched": six close-ups of the Wheel in a 3×2 grid on carbon.
{
  const files = ["estop", "halo", "keys", "dpad", "stick", "paddles"];
  const gap = 24, pad = 60, cw = Math.floor((W - 2 * pad - 2 * gap) / 3), ch = Math.floor((H - 2 * pad - gap) / 2);
  const tiles = await Promise.all(files.map((f) => sharp(path.join(TELEOP, `software/src/assets/detail/${f}.jpg`)).resize(cw, ch, { fit: "cover" })
    .composite([{ input: Buffer.from(`<svg width="${cw}" height="${ch}"><rect width="${cw}" height="${ch}" rx="14" fill="#fff"/></svg>`), blend: "dest-in" }]).png().toBuffer()));
  await save(sharp({ create: { width: W, height: H, channels: 3, background: "#24272B" } })
    .composite(tiles.map((input, i) => ({ input, left: pad + (i % 3) * (cw + gap), top: pad + Math.floor(i / 3) * (ch + gap) }))), "hw-details");
}

// The original station, cut from the old board (1920 wide) and letterboxed on white.
for (const [box, to] of [
  [{ left: 1060, top: 40, width: 860, height: 880 }, "v1-station"],
  [{ left: 0, top: 4280, width: 1920, height: 1720 }, "v1-cluster"],
  [{ left: 380, top: 6480, width: 1160, height: 1100 }, "v1-plan"],
  [{ left: 0, top: 8000, width: 1920, height: 1000 }, "v1-row"],
  [{ left: 0, top: 10900, width: 1920, height: 900 }, "v1-room"],
]) {
  const img = await sharp(BOARD).extract(box).resize(W - 160, H - 160, { fit: "inside" }).toBuffer();
  await save(sharp(img).resize(W, H, { fit: "contain", background: "#ffffff" }), to);
}

// Grid card, 16:9: one station, the Wheel under the windshield-size display.
await sharp(path.join(TELEOP, "hardware/context/out/station.png")).resize(1280, 720, { fit: "cover", position: "centre" }).webp({ quality: 86 }).toFile(path.join(OUT, "teleoperation-station_card.webp"));
console.log("teleoperation-station_card");

// Diagrams: PNG -> WebP at the same size.
for (const n of ["diagram-why", "diagram-people", "diagram-direction", "diagram-latency", "diagram-ia", "flow-request", "diagram-states", "diagram-commands", "diagram-blueprint", "diagram-system", "diagram-wheel"]) {
  await save(sharp(path.join(SRC, `${n}.png`)), n, 90);
}
