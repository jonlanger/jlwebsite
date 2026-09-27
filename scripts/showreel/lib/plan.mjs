/**
 * Turns a recording log (frames + actions + holds) into a render plan: for
 * every output frame, which captured frame to show and which crop of it.
 *
 * - Time: actions and holds play at 1×; everything between them (loading,
 *   waiting) is fast-forwarded at `idleSpeed`, with eased speed ramps.
 * - Camera: a click/hover/type with zoom > 1 pulls the camera in toward its
 *   focus point shortly before it happens and lingers after; drags and holds
 *   stay wide unless given a zoom. A critically damped spring smooths it all.
 */

const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);

export function planClip(log, opts) {
  const {
    fps = 30,
    idleSpeed = 4,
    preRoll = 0.15, // real-time before an action starts
    postRoll = 0.45, // real-time after an action ends
    lead = 0.25, // camera starts moving this long before an action
    linger = 0.8, // camera stays on an action this long after it
    spring = 7, // camera spring stiffness (higher = snappier)
    trimStart = 0,
    trimEnd = 0,
  } = opts;
  const W = log.width, H = log.height;
  const end = log.end - trimEnd;

  // Real-time spans.
  const spans = [
    ...log.actions.map((a) => [a.from - preRoll, a.to + postRoll]),
    ...log.holds.map((h) => [h.from, h.to]),
  ].sort((a, b) => a[0] - b[0]);
  const active = (t) => spans.some(([a, b]) => t >= a && t <= b);

  // Camera targets, in source time. Later entries win when they overlap.
  const shots = [
    ...log.actions.filter((a) => a.zoom > 1).map((a) => ({ from: a.from - lead, to: a.to + linger, z: a.zoom, x: a.x, y: a.y })),
    ...log.holds.filter((h) => h.zoom > 1).map((h) => ({ from: h.from, to: h.to, z: h.zoom, x: h.x, y: h.y })),
  ].sort((a, b) => a.from - b.from);
  const target = (t) => {
    let shot = null;
    for (const s of shots) if (t >= s.from && t <= s.to) shot = s;
    return shot ? { z: shot.z, x: shot.x, y: shot.y } : { z: 1, x: W / 2, y: H / 2 };
  };

  const frames = log.frames;
  const out = [];
  let src = trimStart;
  let speed = active(src) ? 1 : idleSpeed;
  let fi = 0;
  const cam = { z: 1, x: W / 2, y: H / 2, vz: 0, vx: 0, vy: 0 };
  const dt = 1 / fps;

  // Critically damped spring step toward the target.
  const step = (key, vkey, goal) => {
    const a = spring * spring * (goal - cam[key]) - 2 * spring * cam[vkey];
    cam[vkey] += a * dt;
    cam[key] += cam[vkey] * dt;
  };

  // Start the camera on its first target so clips don't open mid-zoom.
  Object.assign(cam, target(src));

  while (src <= end) {
    while (fi + 1 < frames.length && frames[fi + 1].t <= src) fi++;
    const goal = target(src);
    step("z", "vz", goal.z);
    step("x", "vx", goal.x);
    step("y", "vy", goal.y);

    const z = Math.max(1, cam.z);
    const w = W / z, h = H / z;
    const x = clamp(cam.x - w / 2, 0, W - w);
    const y = clamp(cam.y - h / 2, 0, H - h);
    out.push({ f: frames[fi].f, x: Math.round(x), y: Math.round(y), w: Math.round(w), h: Math.round(h) });

    const want = active(src) ? 1 : idleSpeed;
    speed += (want - speed) * Math.min(1, dt * 10); // ~0.1s ramp
    src += speed * dt;
  }

  return { width: W, height: H, fps, frames: out, duration: out.length / fps };
}
