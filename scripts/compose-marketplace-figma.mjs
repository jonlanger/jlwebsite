import sharp from "sharp";
import path from "node:path";

/**
 * Frames Figma exports from _src/figma onto 1800×1013 boards that match the
 * other Marketplace product slides. Tall frames are cropped from the top so the
 * breadcrumb and page header always stay in view; `top`/`height` pick a band
 * instead (used to cut the homepage into its sections).
 *
 *   node scripts/compose-marketplace-figma.mjs
 */
const SRC = path.resolve("public/projects/applied-ai-marketplace/_src/figma");
const OUT = path.resolve("public/projects/applied-ai-marketplace");
const W = 1800, H = 1013, PAD = 56, R = 14;
const BG = "#f5f5f7";
const MAX_CROP = 1100;

// [Figma export, published name, crop band?]
const SHOTS = [
  // Homepage (Home_Default, 1440×2222) cut into its zones
  ["home-default", "home-hero", { top: 0, height: 436 }],
  ["home-default", "home-assets", { left: 49, top: 436, height: 612 }],
  ["home-default", "home-collections", { left: 49, top: 1048, height: 566 }],
  ["home-default", "home-browse", { left: 49, top: 1614, height: 392 }],
  // Main carousel
  ["chat-main", "search-ai-chat"],
  ["browse-main", "browse-filters"],
  // Keyword search
  ["kw-01", "search-keyword-autocomplete"],
  ["kw-05-search", "search-keyword-page"],
  ["kw-06-search", "search-keyword-results"],
  // Purchase / request checkout
  ["pur-02-step1", "checkout-project-code"],
  ["pur-03-step2", "checkout-confirm-details"],
  ["pur-04-step3", "checkout-review"],
  ["pur-05-success", "checkout-success"],
  ["pur-07-row5", "checkout-request-access"],
  // Submit asset + AI image generation
  ["img-01-submit", "submit-core-details"],
  ["img-02-generating", "submit-ai-generating"],
  ["img-03-generated", "submit-ai-options"],
  ["img-05-success", "submit-ai-set"],
  ["img-07-samples", "submit-ai-samples"],
  // Approvals
  ["req-01-my-approvals", "approvals-queue"],
  ["req-02-remove-from-request", "approvals-remove-users"],
  ["req-04-new-users-added", "approvals-add-users"],
  ["req-05-revoke-modal", "approvals-revoke"],
  // Asset Admin workspace
  ["an-01-my-assets", "asset-my-assets"],
  ["an-02-overview", "asset-purchases-requests"],
  ["an-03-hover", "asset-chart-tooltip"],
  ["an-06-tall", "asset-core-details"],
  // Invoicing & notifications
  ["inv-01-default", "invoices-list"],
  ["inv-04-details-approved", "invoices-request-approved"],
  ["inv-05-email-requested", "invoices-email-requested"],
  ["inv-06-email-approved", "invoices-email-approved"],
  // System Admin
  ["rep-01-system-admin", "reports-system-admin"],
  ["rep-03-modal", "reports-generate"],
  ["rep-04-history", "reports-history"],
  ["ann-02-audience", "announce-audience"],
  ["ann-03-tall", "announce-system-alert"],
  ["ann-04-dashboard", "announce-dashboard"],
];

const rounded = async (buf, w, h, r = R) =>
  sharp(buf)
    .composite([{ input: Buffer.from(`<svg width="${w}" height="${h}"><rect width="${w}" height="${h}" rx="${r}" ry="${r}"/></svg>`), blend: "dest-in" }])
    .png()
    .toBuffer();

const shadowFor = (boxes, cw, ch) =>
  Buffer.from(
    `<svg width="${cw}" height="${ch}"><defs><filter id="s" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="14"/></filter></defs>
     ${boxes.map(([l, t, w, h, r]) => `<rect x="${l}" y="${t + 8}" width="${w}" height="${h}" rx="${r}" fill="rgba(0,0,0,0.12)" filter="url(#s)"/>
     <rect x="${l - 0.5}" y="${t - 0.5}" width="${w + 1}" height="${h + 1}" rx="${r}" fill="none" stroke="#d8d8dc"/>`).join("")}</svg>`,
  );

for (const [name, out, band] of SHOTS) {
  const src = path.join(SRC, `${name}.png`);
  const { width, height } = await sharp(src).metadata();
  const top = band?.top ?? 0, x0 = band?.left ?? 0, cw = width - x0;
  const crop = band?.height ?? Math.min(height, MAX_CROP);
  const scale = Math.min((W - PAD * 2) / cw, (H - PAD * 2) / crop);
  const w = Math.round(cw * scale), h = Math.round(crop * scale);
  const shot = await rounded(await sharp(src).extract({ left: x0, top, width: cw, height: crop }).resize(w, h).png().toBuffer(), w, h);
  const left = Math.round((W - w) / 2), y = Math.round((H - h) / 2);
  await sharp({ create: { width: W, height: H, channels: 3, background: BG } })
    .composite([{ input: shadowFor([[left, y, w, h, R]], W, H) }, { input: shot, left, top: y }])
    .webp({ quality: 88 })
    .toFile(path.join(OUT, `flow-${out}.webp`));
  console.log(out);
}

// Full-length pages, kept tall for the main carousel.
for (const [name, out] of [["home-default", "home-full"], ["pdp-main", "pdp-full"]]) {
  const FP = 80, src = path.join(SRC, `${name}.png`);
  const { width: fw, height: fh } = await sharp(src).metadata();
  const shot = await rounded(await sharp(src).png().toBuffer(), fw, fh);
  await sharp({ create: { width: fw + FP * 2, height: fh + FP * 2, channels: 3, background: BG } })
    .composite([{ input: shadowFor([[FP, FP, fw, fh, R]], fw + FP * 2, fh + FP * 2) }, { input: shot, left: FP, top: FP }])
    .webp({ quality: 88 })
    .toFile(path.join(OUT, `flow-${out}.webp`));
  console.log(out, fw + FP * 2, fh + FP * 2);
}

// Tablet + phone side by side.
{
  const DH = H - PAD * 2, GAP = 64;
  const devices = await Promise.all(
    ["resp-tablet", "resp-mobile"].map(async (n) => {
      const img = sharp(path.join(SRC, `${n}.png`)).resize({ height: DH });
      const { info, data } = await img.png().toBuffer({ resolveWithObject: true });
      return { buf: await rounded(data, info.width, DH, 28), w: info.width };
    }),
  );
  let left = Math.round((W - devices.reduce((s, d) => s + d.w, 0) - GAP) / 2);
  const boxes = [], comp = [];
  for (const d of devices) {
    boxes.push([left, PAD, d.w, DH, 28]);
    comp.push({ input: d.buf, left, top: PAD });
    left += d.w + GAP;
  }
  await sharp({ create: { width: W, height: H, channels: 3, background: BG } })
    .composite([{ input: shadowFor(boxes, W, H) }, ...comp])
    .webp({ quality: 88 })
    .toFile(path.join(OUT, "flow-responsive.webp"));
  console.log("responsive");
}
