#!/usr/bin/env python3
"""Compose the AtomicAtlas case-study assets.

Sources are 2880x1800 (1440x900 @2x) PNGs in public/projects/atomicatlas/_src,
written by scripts/capture-atomicatlas.mjs. Slides go out as WebP at 1800 wide
for the 900px content column at 2x; the two explainer diagrams are drawn here
and stay PNG so their type holds up.

Two further figures are built by cutting the viewport out of the captures and
laying the pieces up: a grid of eight folds from one builder, and the QA overlay
on the one structure in the collection that does not come back clean.

Colours below are AtomicAtlas's own tokens from lib/palette.ts, including the
three secondary-structure tones, so the diagrams and the screens agree.
"""

from __future__ import annotations

import textwrap
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "projects" / "atomicatlas"
SRC = OUT / "_src"

SLIDE_W = 1800
SLIDE_QUALITY = 84
CARD_W, CARD_H = 1024, 576
CARD_QUALITY = 86
DIAG_W = 1200
FIG_W = 1800
FIG_QUALITY = 86

# lib/palette.ts, verbatim. The helix/sheet/coil tones are the ones the WebGL
# materials use, which is what makes a legend in a diagram here the same legend
# the reader saw on the page.
BG = (246, 243, 236)
DEEP = (239, 234, 224)
INK = (23, 21, 15)
MUTED = (107, 101, 89)
LINE = (221, 214, 200)
CARD = (253, 252, 249)
HELIX = (180, 84, 31)
SHEET = (74, 104, 137)
COIL = (139, 131, 114)

# capture name -> published slide name
SLIDES = {
    "01-home": "product-home",
    "02-home-full": "product-home-full",
    "03-molecules": "product-molecules",
    "04-molecules-toxins": "product-molecules-toxins",
    "05-search": "product-search",
    "06-detail-restrictocin": "product-detail",
    "07-measurements": "product-measurements",
    "08-how-drawn": "product-how-drawn",
    "09-elements": "product-elements",
    "10-inspector": "product-inspector",
    "11-haemoglobin": "product-haemoglobin",
    "12-gfp": "product-gfp",
    "13-tim-barrel": "product-tim-barrel",
    "14-ubiquitin": "product-ubiquitin",
    "15-calcium-pump": "product-calcium-pump",
    "16-potassium-channel": "product-potassium-channel",
    "17-quadruplex": "product-quadruplex",
    "18-collagen": "product-collagen",
    "20-uncurated": "product-uncurated",
    "21-about": "product-about",
    "22-about-full": "product-about-full",
    "23-guide": "product-guide",
    "24-qa-overlay": "product-qa-overlay",
    "25-qa-overlay-warned": "product-qa-overlay-warned",
    "m-01-molecules": "product-mobile-molecules",
    "m-02-detail": "product-mobile-detail",
}

# The honest failure page is one short column on an otherwise empty screen, so
# it is published as the top half rather than as a screenful of paper.
CROPPED = {
    "19-too-large": ("product-too-large", (0, 0, 2880, 1560)),
}

# Green fluorescent protein: eleven strands wrapped around the helix that
# carries the chromophore, which is the one picture that says "built from
# coordinates" without a caption.
#
# Composed rather than cropped. The camera fits a fold to a squarish viewport,
# so no 16:9 window onto the capture holds the whole barrel — the card sets the
# drawing on the app's own paper instead of cutting the top and bottom off it.
CARD_SRC = "12-gfp"
CARD_SUBJECT = (1250, 414, 2684, 1479)
CARD_INSET = 44

# The viewport, as a box in the capture. The page is a two-column grid at this
# width and the rule between the columns sits here.
VIEWPORT = (1024, 100, 2880, 1800)


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    path = (
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
        if bold
        else "/System/Library/Fonts/Supplemental/Arial.ttf"
    )
    try:
        return ImageFont.truetype(path, size=size)
    except OSError:
        return ImageFont.load_default()


def mono(size: int) -> ImageFont.FreeTypeFont:
    try:
        return ImageFont.truetype("/System/Library/Fonts/Menlo.ttc", size=size)
    except OSError:
        return font(size)


def save_webp(image: Image.Image, dest: Path, quality: int) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    image.save(dest, "WEBP", quality=quality, method=6)


def resized(image: Image.Image, width: int) -> Image.Image:
    width = min(width, image.width)
    height = round(image.height * width / image.width)
    return image.resize((width, height), Image.Resampling.LANCZOS)


def build_slides() -> None:
    for src_name, out_name in SLIDES.items():
        src = SRC / f"{src_name}.png"
        if not src.exists():
            raise SystemExit(f"missing capture {src}")
        with Image.open(src) as opened:
            image = opened.convert("RGB")
        out = resized(image, SLIDE_W)
        dest = OUT / f"{out_name}.webp"
        save_webp(out, dest, SLIDE_QUALITY)
        print(f"slide   {dest.name:38} {out.width}x{out.height}")

    for src_name, (out_name, box) in CROPPED.items():
        with Image.open(SRC / f"{src_name}.png") as opened:
            image = opened.convert("RGB").crop(box)
        out = resized(image, SLIDE_W)
        dest = OUT / f"{out_name}.webp"
        save_webp(out, dest, SLIDE_QUALITY)
        print(f"slide   {dest.name:38} {out.width}x{out.height}")


def build_card() -> None:
    with Image.open(SRC / f"{CARD_SRC}.png") as opened:
        subject = opened.convert("RGB").crop(CARD_SUBJECT)

    height = CARD_H - CARD_INSET * 2
    width = round(subject.width * height / subject.height)
    card = Image.new("RGB", (CARD_W, CARD_H), BG)
    card.paste(
        subject.resize((width, height), Image.Resampling.LANCZOS),
        ((CARD_W - width) // 2, CARD_INSET),
    )

    dest = OUT / "atomicatlas_card.webp"
    save_webp(card, dest, CARD_QUALITY)
    print(f"card    {dest.name:38} {CARD_W}x{CARD_H}")


def wrapped(
    draw: ImageDraw.ImageDraw,
    xy: tuple[int, int],
    text: str,
    *,
    width: int,
    fill: tuple[int, int, int] = MUTED,
    size: int = 14,
    bold: bool = False,
    leading: int = 21,
) -> int:
    """Draws wrapped body copy and returns the y below the last line."""
    x, y = xy
    face = font(size, bold=bold)
    for line in textwrap.wrap(text, width=width):
        draw.text((x, y), line, fill=fill, font=face)
        y += leading
    return y


def pill(
    draw: ImageDraw.ImageDraw,
    xy: tuple[int, int],
    label: str,
    *,
    fill: tuple[int, int, int],
    color: tuple[int, int, int],
) -> None:
    x, y = xy
    face = font(12, bold=True)
    text = label.upper()
    w = draw.textlength(text, font=face)
    draw.rounded_rectangle((x, y, x + w + 24, y + 26), radius=999, fill=fill)
    draw.text((x + 12, y + 6), text, fill=color, font=face)


def draw_pipeline() -> None:
    """The six steps between four characters of identifier and a drawing.

    Rows rather than columns: the page renders a figure at 900 CSS px, and a
    six-across layout puts the body copy under 8px on screen.
    """
    height = 1420
    img = Image.new("RGB", (DIAG_W, height), BG)
    draw = ImageDraw.Draw(img)

    draw.text(
        (48, 44),
        "From four characters to a drawing",
        fill=INK,
        font=font(30, bold=True),
    )
    wrapped(
        draw,
        (48, 90),
        "No pre-rendered images and no third-party molecular viewer. A page asks how big the entry "
        "is before it asks for it, parses the file itself, and refuses to show anything a gate has "
        "not passed.",
        width=104,
        size=17,
        leading=25,
    )

    steps = [
        (
            "1",
            "Ask how big it is",
            "data.rcsb.org",
            "The archive stops publishing the legacy PDB format past roughly 100,000 atoms or 62 "
            "chains, and this viewer reads that format only. The human 80S ribosome is 237,685 "
            "atoms across 89 chains, so its page explains itself rather than showing an empty frame.",
        ),
        (
            "2",
            "Fetch the coordinates",
            "/api/structure/[id]",
            "The browser could hit files.rcsb.org directly. Going through a route buys one cache "
            "shared by every visitor, a single place to turn “RCSB says 404” into an answer the UI "
            "can render, and an identifier check so the route cannot be aimed anywhere else.",
        ),
        (
            "3",
            "Parse by column",
            "lib/pdb.ts",
            "PDB is a fixed-column format — fields butt up against each other and can be blank — so "
            "every field is read by character offset, never by splitting on whitespace. Backbone "
            "only: alpha carbon and carbonyl oxygen, one model, one conformer, one chain.",
        ),
        (
            "4",
            "Assign, if nobody did",
            "lib/ss-assign.ts",
            "Most deposits carry HELIX and SHEET records and this never runs. NMR ensembles and "
            "older entries do not, and all-coil is not a neutral default — it asserts the protein "
            "has no secondary structure. P-SEA recovers it from alpha carbons alone.",
        ),
        (
            "5",
            "Build the cartoon",
            "lib/ribbon.ts",
            "Orientation from the Carson–Bugg construction, taking which way “flat” points from the "
            "backbone carbonyl rather than from a spline's curvature, which barber-poles strands. "
            "Each run of one assignment becomes a named, pickable element.",
        ),
        (
            "6",
            "Gate it",
            "lib/viz-qa.ts",
            "Twenty-three rules, each with a threshold and a citation. Fourteen read parsed "
            "coordinates and built geometry, so they run in Node over the whole shelf in CI; nine "
            "need a live camera and a live DOM, so they run in the browser against the view itself.",
        ),
    ]

    y = 176
    row_h = 150
    for num, title, source, body in steps:
        draw.rounded_rectangle((48, y, 1152, y + row_h - 14), radius=16, fill=CARD, outline=LINE)
        draw.ellipse((72, y + 24, 108, y + 60), fill=SHEET)
        draw.text((84, y + 32), num, fill=(255, 255, 255), font=font(18, bold=True))
        draw.text((124, y + 26), title, fill=INK, font=font(20, bold=True))
        draw.text((124, y + 60), source, fill=MUTED, font=mono(13))
        wrapped(draw, (420, y + 26), body, width=66, size=16, leading=24)
        y += row_h

    # What the page then says, all of it read out of the file rather than
    # looked up — which is what makes an uncurated entry work at all.
    strip_y = y + 12
    draw.rounded_rectangle((48, strip_y, 1152, strip_y + 232), radius=16, fill=DEEP)
    draw.text(
        (76, strip_y + 26),
        "What the page reports, and where each figure comes from",
        fill=INK,
        font=font(20, bold=True),
    )
    figures = [
        (
            "149 → 142",
            "sequence, then resolved",
            "SEQRES against the ATOM records. Seven residues of restrictocin never appear, and the "
            "ribbon stops at 10 and resumes at 18.",
        ),
        (
            "16.9 kDa",
            "mass",
            "Summed over the deposited sequence, not fetched — which is why a structure nobody has "
            "written copy for still gets a full page.",
        ),
        (
            "19 elements",
            "helices, strands, loops",
            "Every run the builder emitted, listed beside the view as buttons because clicking a "
            "shape inside a canvas is a gesture not everybody can make.",
        ),
    ]
    col_w = (1152 - 76 - 48) // 3
    for i, (stat, label, body) in enumerate(figures):
        x = 76 + i * (col_w + 24)
        draw.text((x, strip_y + 68), stat, fill=HELIX, font=font(30, bold=True))
        draw.text((x, strip_y + 110), label, fill=INK, font=font(15, bold=True))
        wrapped(draw, (x, strip_y + 138), body, width=42, size=14, leading=21)

    draw.text(
        (48, strip_y + 268),
        "Sources: RCSB Protein Data Bank — files.rcsb.org (coordinates) · data.rcsb.org (entry "
        "size) · search.rcsb.org (text search).",
        fill=MUTED,
        font=font(15),
    )

    dest = OUT / "diagram-pipeline.png"
    img.save(dest, "PNG", optimize=True)
    print(f"diagram {dest.name:38} {DIAG_W}x{height}")


def draw_gates() -> None:
    """The three ways a molecular picture lies, and where each rule runs."""
    height = 1220
    img = Image.new("RGB", (DIAG_W, height), BG)
    draw = ImageDraw.Draw(img)

    draw.text(
        (48, 44),
        "A rendering can be wrong in ways that still look fine",
        fill=INK,
        font=font(30, bold=True),
    )
    wrapped(
        draw,
        (48, 90),
        "None of these throw. A ribbon drawn through seven residues of missing density is a smooth, "
        "handsome lie; a palette that separates for most people can collapse for someone with "
        "deuteranopia; a camera that fits the fold head-on can clip it a quarter turn later. So "
        "each way of being wrong is written down as a rule with a threshold and a source.",
        width=104,
        size=17,
        leading=25,
    )

    failures = [
        (
            HELIX,
            "It draws what is not there",
            "chain-break-honesty",
            "No ribbon spans a gap in the backbone; missing residues stay missing, and the page "
            "says how much of the sequence never resolved.",
            "Warn below 70% coverage",
            "Rougier et al., Ten Simple Rules for Better Figures, rule 7",
        ),
        (
            SHEET,
            "It separates for you and not for me",
            "palette-cvd-safe",
            "Helix, sheet and coil are simulated under protanopia, deuteranopia and tritanopia, and "
            "measured against each other and against the paper.",
            "ΔE2000 ≥ 11 under CVD · 3:1 on paper",
            "Okabe & Ito; Wong, Nature Methods 8:441 · WCAG 2.2 SC 1.4.11",
        ),
        (
            COIL,
            "It only holds from one angle",
            "no-clipping",
            "The bounding sphere is checked against the frustum through a full orbit, so the fold "
            "cannot be cut by the near plane a quarter turn from the shot it was framed in.",
            "Whole radius inside, at ≤ 35° field of view",
            "Conventional practice in structural figures",
        ),
    ]

    y = 226
    row_h = 200
    for tint, title, gate, body, threshold, source in failures:
        draw.rounded_rectangle((48, y, 1152, y + row_h - 16), radius=16, fill=CARD, outline=LINE)
        draw.rounded_rectangle((48, y, 55, y + row_h - 16), radius=3, fill=tint)
        draw.text((80, y + 26), title, fill=INK, font=font(21, bold=True))
        draw.text((80, y + 62), gate, fill=tint, font=mono(14))
        wrapped(draw, (80, y + 96), threshold, width=44, size=14, bold=True, fill=INK, leading=20)
        wrapped(draw, (520, y + 26), body, width=58, size=16, leading=24)
        wrapped(draw, (520, y + 118), source, width=70, size=13, leading=19)
        y += row_h

    # Where the twenty-three actually run, and over what.
    band_y = y + 12
    draw.rounded_rectangle((48, band_y, 1152, band_y + 300), radius=16, fill=DEEP)
    draw.text(
        (76, band_y + 26),
        "Twenty-three gates, in two places",
        fill=INK,
        font=font(20, bold=True),
    )

    columns = [
        (
            "14 static",
            "in CI, over all 100 structures",
            [
                ("Data honesty", "coverage · chain-break-honesty · ss-assignment-present · single-model · single-altloc"),
                ("Geometry", "finite-geometry · unit-normals · no-frame-flips · triangle-budget · representation-fit"),
                ("Colour", "palette-cvd-safe · figure-ground-contrast · palette-consistency · legend-matches-render"),
            ],
        ),
        (
            "9 runtime",
            "in the browser, against this view",
            [
                ("Camera and light", "no-clipping · modest-perspective · depth-cue-present · no-optical-effects"),
                ("Interaction", "reduced-motion-honoured · canvas-described · keyboard-orbit · render-pauses · features-pickable"),
            ],
        ),
    ]

    for i, (count, where, groups) in enumerate(columns):
        x = 76 + i * 540
        draw.text((x, band_y + 74), count, fill=SHEET if i == 0 else HELIX, font=font(26, bold=True))
        draw.text((x, band_y + 108), where, fill=INK, font=font(14, bold=True))
        gy = band_y + 138
        for label, ids in groups:
            draw.text((x, gy), label, fill=INK, font=font(13, bold=True))
            gy = wrapped(draw, (x, gy + 18), ids, width=60, size=12, leading=16) + 6

    draw.text(
        (48, band_y + 332),
        "279 tests across the suite. The one structure on the shelf that does not come back clean "
        "says so on its own page.",
        fill=MUTED,
        font=font(15),
    )

    dest = OUT / "diagram-gates.png"
    img.save(dest, "PNG", optimize=True)
    print(f"diagram {dest.name:38} {DIAG_W}x{height}")


def viewport(name: str, box: tuple[int, int, int, int] | None = None) -> Image.Image:
    """Cuts the drawing out of a capture, leaving the reading column behind."""
    with Image.open(SRC / f"{name}.png") as opened:
        return opened.convert("RGB").crop(box or VIEWPORT)


def fitted(image: Image.Image, box: tuple[int, int]) -> Image.Image:
    """Centre-crops to `box`'s aspect, then resizes to it."""
    target = box[0] / box[1]
    width, height = image.size
    if width / height > target:
        new_w = round(height * target)
        left = (width - new_w) // 2
        image = image.crop((left, 0, left + new_w, height))
    else:
        new_h = round(width / target)
        top = (height - new_h) // 2
        image = image.crop((0, top, width, top + new_h))
    return image.resize(box, Image.Resampling.LANCZOS)


def build_folds() -> None:
    """Eight folds off one builder, cropped to the drawing and labelled.

    Ordered by what each asks of the builder rather than by fame: an all-helix
    globin, two barrels, a small alpha/beta fold, a 994-residue chain that
    forces the tessellation taper, a channel, a nucleic acid with no assignment
    to make, and a fragment the gates decline to vouch for.
    """
    tiles = [
        ("11-haemoglobin", "Haemoglobin · 4HHB", "146 residues · 11 elements · helix and coil only"),
        ("12-gfp", "GFP · 1GFL", "230 residues · 34 elements · eleven strands round one helix"),
        ("13-tim-barrel", "Triosephosphate isomerase · 1TIM", "247 residues · 33 elements · eight strands, eight helices"),
        ("14-ubiquitin", "Ubiquitin · 1UBQ", "76 residues · 14 elements · 214.6 triangles/residue"),
        ("15-calcium-pump", "Calcium pump · 1SU4", "994 residues · 124 elements · taper to 65.7/residue"),
        ("16-potassium-channel", "Potassium channel · 1BL8", "97 residues · 7 elements · one subunit of four"),
        ("17-quadruplex", "Telomeric G-quadruplex · 1KF1", "22 residues · no assignment to make · one segment"),
        ("18-collagen", "Collagen peptide · 1CGD", "20 of 30 resolved · 11 segments · two gates warn"),
    ]

    cols, rows = 4, 2
    cell_w = FIG_W // cols
    art_h = 300
    label_h = 74
    cell_h = art_h + label_h

    img = Image.new("RGB", (FIG_W, cell_h * rows), BG)
    draw = ImageDraw.Draw(img)

    for i, (name, title, detail) in enumerate(tiles):
        x = (i % cols) * cell_w
        y = (i // cols) * cell_h
        art = fitted(viewport(name, (1150, 180, 2820, 1620)), (cell_w - 2, art_h))
        img.paste(art, (x + 1, y))
        draw.text((x + 24, y + art_h + 8), title, fill=INK, font=font(16, bold=True))
        wrapped(draw, (x + 24, y + art_h + 32), detail, width=40, size=13, leading=18)

    for c in range(1, cols):
        draw.line([(c * cell_w, 0), (c * cell_w, cell_h * rows)], fill=LINE, width=1)
    draw.line([(0, cell_h), (FIG_W, cell_h)], fill=LINE, width=1)

    dest = OUT / "figure-folds.webp"
    save_webp(img, dest, FIG_QUALITY)
    print(f"figure  {dest.name:38} {img.width}x{img.height}")


def build_gate_report() -> None:
    """The runtime gates, on a structure that passes and one that does not."""
    pairs = [
        (
            "24-qa-overlay",
            "Restrictocin · 1AQZ",
            "23 of 23. 142 of 149 residues resolved, 2 continuous segments with no bridged gaps, "
            "31,934 triangles at 224.9 per residue, worst colour pair ΔE2000 18 under deuteranopia.",
        ),
        (
            "25-qa-overlay-warned",
            "Collagen peptide · 1CGD",
            "21 of 23. Coverage warns at 66.7% and representation-fit warns that 20 residues is "
            "under the 25 a cartoon needs. The answer was a sentence on the page, not a nicer render.",
        ),
    ]

    art_w = FIG_W // 2
    art_h = 620
    label_h = 108
    img = Image.new("RGB", (FIG_W, art_h + label_h), BG)
    draw = ImageDraw.Draw(img)

    for i, (name, title, detail) in enumerate(pairs):
        x = i * art_w
        art = fitted(viewport(name, (1024, 560, 2880, 1800)), (art_w - 1, art_h))
        img.paste(art, (x + (1 if i else 0), 0))
        draw.text((x + 28, art_h + 16), title, fill=INK, font=font(18, bold=True))
        wrapped(draw, (x + 28, art_h + 44), detail, width=72, size=14, leading=20)

    draw.line([(art_w, 0), (art_w, art_h + label_h)], fill=LINE, width=1)

    dest = OUT / "figure-gate-report.webp"
    save_webp(img, dest, FIG_QUALITY)
    print(f"figure  {dest.name:38} {img.width}x{img.height}")


def main() -> None:
    build_slides()
    build_card()
    draw_pipeline()
    draw_gates()
    build_folds()
    build_gate_report()


if __name__ == "__main__":
    main()
