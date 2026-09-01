#!/usr/bin/env python3
"""Compose the Botanica case-study assets.

Sources are 2880x1800 (1440x900 @2x) PNGs in public/projects/botanica/_src,
written by scripts/capture-botanica.mjs. Slides go out as WebP at 1800 wide for
the 900px content column at 2x; the two explainer diagrams are drawn here and
stay PNG so their type holds up.

Three further figures are built out of the stills the app bakes for itself —
_src/process (the growth stages and the two A/B pairs) and _src/models (a render
per species). Those are photographic rather than typographic, so they go out as
WebP at 1800 wide like the slides do.
"""

from __future__ import annotations

import textwrap
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "projects" / "botanica"
SRC = OUT / "_src"

SLIDE_W = 1800
SLIDE_QUALITY = 84
CARD_W, CARD_H = 1024, 576
CARD_QUALITY = 86
DIAG_W = 1200
# The photographic figures are drawn at the slides' own width, so their type is
# set at 2x for the 900px column rather than the diagrams' 1.33x.
FIG_W = 1800
FIG_QUALITY = 86

# Botanica's own palette: paper background, deep leaf green, and the two colours
# the sunflower actually renders in — disc gold and root ochre.
BG = (247, 248, 246)
INK = (23, 27, 24)
MUTED = (98, 106, 98)
LINE = (214, 219, 211)
CARD = (255, 255, 255)
ACCENT = (17, 116, 56)
WASH = (233, 241, 234)
GOLD = (196, 150, 22)
OCHRE = (168, 143, 100)

# capture name -> published slide name
SLIDES = {
    "01-home": "product-home",
    "02-home-full": "product-home-full",
    "03-catalog": "product-catalog",
    "04-catalog-filtered": "product-catalog-filtered",
    "05-detail-overview": "product-detail",
    "06-callout-capitulum": "product-callout-capitulum",
    "07-callout-golden-angle": "product-callout-golden-angle",
    "08-callout-ray-florets": "product-callout-ray-florets",
    "09-callout-roots": "product-callout-roots",
    "10-morphology": "product-morphology",
    "11-where-it-grows": "product-where-it-grows",
    "16-colour-credits": "product-colour-credits",
    "12-species-papaver": "product-species-papaver",
    "13-species-digitalis": "product-species-digitalis",
    "14-species-lavandula": "product-species-lavandula",
    "15-species-taraxacum": "product-species-taraxacum",
    "m-01-catalog": "product-mobile-catalog",
    "m-02-detail": "product-mobile-detail",
}

# 16:9 window onto the home hero, framed on the flower head and the stem below
# it, clear of the headline on the left and the page edge on the right.
CARD_SRC = "01-home"
CARD_CROP = (1330, 400, 1330 + 1240, 400 + 698)

# The catalog as the registry reports it, grouped by the archetype each spec was
# scaffolded from rather than alphabetically — four archetypes across twenty-six
# species is the whole argument of the Outcome figure. Verbascum is the one
# plant whose archetype does not follow its family: a Scrophulariaceae species
# that grows as a raceme, which is why the scaffold picks on shape and not name.
ARCHETYPES = [
    (
        "asteraceae-radiate",
        "Ray florets around a disc",
        [
            ("bellis-perennis", "Bellis perennis"),
            ("calendula-officinalis", "Calendula officinalis"),
            ("centaurea-cyanus", "Centaurea cyanus"),
            ("cichorium-intybus", "Cichorium intybus"),
            ("echinacea-purpurea", "Echinacea purpurea"),
            ("helianthus-annuus", "Helianthus annuus"),
            ("leucanthemum-vulgare", "Leucanthemum vulgare"),
            ("matricaria-chamomilla", "Matricaria chamomilla"),
            ("rudbeckia-hirta", "Rudbeckia hirta"),
            ("taraxacum-officinale", "Taraxacum officinale"),
        ],
    ),
    (
        "lamiaceae-spike",
        "Whorls up a square stem",
        [
            ("lavandula-angustifolia", "Lavandula angustifolia"),
            ("nepeta-cataria", "Nepeta cataria"),
            ("origanum-vulgare", "Origanum vulgare"),
            ("salvia-officinalis", "Salvia officinalis"),
            ("salvia-rosmarinus", "Salvia rosmarinus"),
            ("thymus-vulgaris", "Thymus vulgaris"),
        ],
    ),
    (
        "plantaginaceae-raceme",
        "Flowers hung off a rachis",
        [
            ("antirrhinum-majus", "Antirrhinum majus"),
            ("digitalis-purpurea", "Digitalis purpurea"),
            ("linaria-vulgaris", "Linaria vulgaris"),
            ("plantago-lanceolata", "Plantago lanceolata"),
            ("verbascum-thapsus", "Verbascum thapsus"),
        ],
    ),
    (
        "papaveraceae-solitary",
        "One flower on one stem",
        [
            ("aquilegia-vulgaris", "Aquilegia vulgaris"),
            ("eschscholzia-californica", "Eschscholzia californica"),
            ("papaver-rhoeas", "Papaver rhoeas"),
            ("papaver-somniferum", "Papaver somniferum"),
            ("ranunculus-acris", "Ranunculus acris"),
        ],
    ),
]


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


def save_webp(image: Image.Image, dest: Path, quality: int) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    image.save(dest, "WEBP", quality=quality, method=6)


def build_slides() -> None:
    for src_name, out_name in SLIDES.items():
        src = SRC / f"{src_name}.png"
        if not src.exists():
            raise SystemExit(f"missing capture {src}")
        with Image.open(src) as opened:
            image = opened.convert("RGB")
        # Phone captures are already narrower than the column; leave them be.
        width = min(SLIDE_W, image.width)
        height = round(image.height * width / image.width)
        resized = image.resize((width, height), Image.Resampling.LANCZOS)
        dest = OUT / f"{out_name}.webp"
        save_webp(resized, dest, SLIDE_QUALITY)
        print(f"slide  {dest.name:38} {width}x{height}")


def build_card() -> None:
    with Image.open(SRC / f"{CARD_SRC}.png") as opened:
        image = opened.convert("RGB")
    left, top, right, bottom = CARD_CROP
    if right > image.width or bottom > image.height:
        raise SystemExit(f"card crop {CARD_CROP} exceeds {image.size}")
    card = image.crop(CARD_CROP).resize((CARD_W, CARD_H), Image.Resampling.LANCZOS)
    dest = OUT / "botanica_card.webp"
    save_webp(card, dest, CARD_QUALITY)
    print(f"card   {dest.name:38} {CARD_W}x{CARD_H}")


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


def arrow(draw: ImageDraw.ImageDraw, a: tuple[int, int], b: tuple[int, int]) -> None:
    draw.line([a, b], fill=LINE, width=2)
    bx, by = b
    if abs(b[0] - a[0]) >= abs(b[1] - a[1]):
        draw.polygon([(bx, by), (bx - 9, by - 6), (bx - 9, by + 6)], fill=MUTED)
    else:
        draw.polygon([(bx, by), (bx - 6, by - 9), (bx + 6, by - 9)], fill=MUTED)




def draw_pipeline() -> None:
    """The five steps between a species name and a grown plant.

    Laid out as rows rather than columns: the page renders a figure at 900 CSS
    px, so a five-across layout puts the body copy under 8px on screen.
    """
    height = 1250
    img = Image.new("RGB", (DIAG_W, height), BG)
    draw = ImageDraw.Draw(img)

    draw.text(
        (48, 44),
        "From a species name to a grown plant",
        fill=INK,
        font=font(30, bold=True),
    )
    wrapped(
        draw,
        (48, 90),
        "Three of the five steps are a command. Only the middle two need judgement, and the last "
        "one is a gate that can refuse the result.",
        width=104,
        size=17,
        leading=25,
    )

    steps = [
        (
            "1",
            "Research",
            "automated",
            "npm run research",
            "Taxonomy from GBIF, a morphological description from Wikipedia, openly licensed "
            "photographs from iNaturalist. No photo count — the run stops on a disk and time "
            "budget, and every photo clears research grade, two agreeing IDs, a usable licence, "
            "and a cap per observer.",
        ),
        (
            "2",
            "Scaffold",
            "automated",
            "npm run scaffold",
            "Picks a morphological archetype from the GBIF family, reads what dimensions it can "
            "out of the article's own Description, and writes a spec that typechecks and grows "
            "immediately — with a marker left wherever a number still needs a person.",
        ),
        (
            "3",
            "Refine the spec",
            "by hand",
            "src/species/specs/*.ts",
            "Stem, leaves and inflorescence in metres at real botanical scale, every figure "
            "carrying its source in a comment. Where a bad extraction gets caught: one article's "
            "“spikes 10–30 cm long” grew a ten-centimetre lavender.",
        ),
        (
            "4",
            "Aim and bake crops",
            "by hand",
            "npm run crop / swatches",
            "The spec names a rectangle per organ, keyed by iNaturalist photo id. The crop tool "
            "scores a rect before it is committed — how much of it carries colour at all, and "
            "whether it is one hue rather than the foliage behind the organ.",
        ),
        (
            "5",
            "Pass the gate",
            "automated",
            "npm run qc",
            "Voxelises the grown cloud and runs connected components over it, measures the real "
            "point spacing against what each organ declared, and checks that every organ growing "
            "points has a baked crop that is mostly tissue.",
        ),
    ]

    y = 176
    row_h = 150
    for num, title, mode, cmd, body in steps:
        automated = mode == "automated"
        draw.rounded_rectangle(
            (48, y, 1152, y + row_h - 14),
            radius=16,
            fill=CARD,
            outline=ACCENT if not automated else LINE,
            width=2 if not automated else 1,
        )
        draw.ellipse((72, y + 24, 108, y + 60), fill=ACCENT)
        draw.text((84, y + 32), num, fill=(255, 255, 255), font=font(18, bold=True))
        draw.text((124, y + 26), title, fill=INK, font=font(20, bold=True))
        draw.text((124, y + 58), cmd, fill=MUTED, font=font(14, bold=True))
        pill(
            draw,
            (124, y + 82),
            mode,
            fill=WASH if automated else (240, 233, 214),
            color=ACCENT if automated else (140, 106, 34),
        )
        wrapped(draw, (400, y + 26), body, width=68, size=16, leading=24)
        y += row_h

    # What the gate actually caught, on a catalog that already looked finished.
    strip_y = y + 12
    draw.rounded_rectangle((48, strip_y, 1152, strip_y + 232), radius=16, fill=CARD, outline=LINE)
    draw.text(
        (76, strip_y + 26),
        "What the gate found on a catalog that already looked finished",
        fill=INK,
        font=font(20, bold=True),
    )
    findings = [
        (
            "24%",
            "connected",
            "Lavender measured 78% connected at 400k points and 24% at 2M — sprite size falls "
            "as 1/√N, so a fixed gap opens as the budget rises.",
        ),
        (
            "65×",
            "over its declared spacing",
            "A poppy's ovary was drawing points sixty-five times further apart than it claimed — a "
            "painted surface, not a point cloud.",
        ),
        (
            "5 of 6",
            "shipping in flat fill",
            "A missing swatch fell back to a solid organ colour and said nothing in the console.",
        ),
    ]
    col_w = (1152 - 76 - 48) // 3
    for i, (stat, label, body) in enumerate(findings):
        x = 76 + i * (col_w + 24)
        draw.text((x, strip_y + 68), stat, fill=ACCENT, font=font(32, bold=True))
        draw.text((x, strip_y + 110), label, fill=INK, font=font(15, bold=True))
        wrapped(draw, (x, strip_y + 138), body, width=42, size=14, leading=21)

    draw.text(
        (48, strip_y + 268),
        "Sources: GBIF (taxonomy) · Wikipedia (morphological description) · iNaturalist "
        "(CC0/CC-BY research-grade observations, credited per crop).",
        fill=MUTED,
        font=font(15),
    )

    dest = OUT / "diagram-pipeline.png"
    img.save(dest, "PNG", optimize=True)
    print(f"diagram {dest.name:37} {DIAG_W}x{height}")


def draw_channels() -> None:
    """What a single point knows, and what the guided tour adds on top of it."""
    height = 956
    img = Image.new("RGB", (DIAG_W, height), BG)
    draw = ImageDraw.Draw(img)

    draw.text(
        (48, 44),
        "Geometry from the measurements, colour from the photographs",
        fill=INK,
        font=font(30, bold=True),
    )
    wrapped(
        draw,
        (48, 90),
        "Not photogrammetry, and it cannot be — reconstruction needs calibrated shots of one "
        "physical specimen, while web photos of a species are different plants at different "
        "scales. The record is treated as measurement instead, and the channels stay separate all "
        "the way to the GPU.",
        width=104,
        size=17,
        leading=25,
    )

    bands = [
        (
            ACCENT,
            "Measurement → position",
            "the spec, in metres",
            [
                ("Stem", "A curve, not a line — the head's weight bends the top and every leaf inherits the bend."),
                ("Capitulum", "Disc florets at r = c√n, θ = n × 137.5°. Nobody draws the spirals; they fall out of the angle."),
                ("Spacing", "Each organ declares how far apart its own points sit. The measured range on a real plant runs 116:1 to 351:1."),
            ],
        ),
        (
            GOLD,
            "Photograph → colour",
            "a 128px crop, in organ space",
            [
                ("Crop", "A rectangle per organ, keyed by a stable iNaturalist photo id, with the photographer and licence recorded."),
                ("Lookup", "Every point carries an organ-space (u, v) and reads its colour there — the disc is dark at the centre because the photograph is."),
                ("Colour space", "sRGB bytes linearised on the GPU. Skipping that ran every colour through the transfer function twice."),
            ],
        ),
        (
            OCHRE,
            "Anchor → callout",
            "a fact, plus the framing",
            [
                ("Anchor", "{ on: \"disc\", r: 0.62 } resolves against the finished geometry, so a marker follows the stem's bend."),
                ("Framing", "Camera azimuth and elevation are offsets from the organ's own facing, so (0, 0) means “look straight at it”."),
                ("Tour", "Fifteen callouts per species, pinned to the plant — the pseudanthium, the golden angle, the taproot."),
            ],
        ),
    ]

    y = 200
    band_h = 196
    for tint, title, subtitle, rows in bands:
        draw.rounded_rectangle((48, y, 1152, y + band_h - 16), radius=16, fill=CARD, outline=LINE)
        draw.rounded_rectangle((48, y, 54, y + band_h - 16), radius=3, fill=tint)
        draw.text((80, y + 26), title, fill=INK, font=font(21, bold=True))
        wrapped(draw, (80, y + 58), subtitle, width=30, size=15, bold=True, fill=tint, leading=21)
        ry = y + 24
        for label, body in rows:
            draw.text((400, ry), label, fill=INK, font=font(15, bold=True))
            wrapped(draw, (530, ry), body, width=68, size=15, leading=22)
            ry += 52
        y += band_h

    draw.rounded_rectangle((48, y + 8, 1152, y + 138), radius=16, fill=WASH)
    draw.text((80, y + 32), "One point, sixteen bytes", fill=ACCENT, font=font(19, bold=True))
    wrapped(
        draw,
        (400, y + 30),
        "Position, an sRGB colour carried as bytes rather than floats, and a log-quantised spacing "
        "byte in what used to be an organ id. Ten million of them in a single draw call — about "
        "170 MB, holding 100 fps zoomed into one floret.",
        width=68,
        size=15,
        leading=22,
        fill=INK,
    )

    dest = OUT / "diagram-channels.png"
    img.save(dest, "PNG", optimize=True)
    print(f"diagram {dest.name:37} {DIAG_W}x{height}")


def still(name: str, box: tuple[int, int]) -> Image.Image:
    """Loads a baked still, fits it to `box`, and rounds its corners."""
    with Image.open(SRC / f"{name}.webp") as opened:
        image = opened.convert("RGB")
    width, height = box
    fitted = image.resize((width, height), Image.Resampling.LANCZOS)
    mask = Image.new("L", box, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, width - 1, height - 1), radius=12, fill=255)
    plate = Image.new("RGB", box, BG)
    plate.paste(fitted, (0, 0), mask)
    return plate


def heading(
    draw: ImageDraw.ImageDraw, title: str, lead: str, *, width: int = 84
) -> None:
    """The title block every figure opens with, at the figures' 2x type scale."""
    draw.text((48, 44), title, fill=INK, font=font(42, bold=True))
    wrapped(draw, (48, 108), lead, width=width, size=26, leading=38)


def build_growth() -> None:
    """The four stages the builder emits in, as the app bakes them."""
    stages = [
        ("grow-stem", "1 · Stem", "A curve, not a line — the head's weight bends the top."),
        ("grow-shoot", "2 · Leaves", "Sampled inside a blade outline, placed at 137.5°."),
        ("grow-flower", "3 · Head", "21 ray florets around 720 disc florets."),
        ("grow-full", "4 · Roots", "A 1.60 m taproot under a 1.85 m specimen."),
    ]

    gap = 20
    panel_w = (FIG_W - 96 - gap * (len(stages) - 1)) // len(stages)
    panel_h = round(panel_w * 1320 / 840)
    top = 208
    height = top + panel_h + 158

    img = Image.new("RGB", (FIG_W, height), BG)
    draw = ImageDraw.Draw(img)
    heading(
        draw,
        "Grown organ by organ, in the order it happens",
        "Four stages of the same cloud. Nothing here is sculpted — each organ is emitted straight "
        "from the figures in the spec, at its own declared point spacing.",
    )

    for i, (name, label, body) in enumerate(stages):
        x = 48 + i * (panel_w + gap)
        img.paste(still(f"process/{name}", (panel_w, panel_h)), (x, top))
        draw.rounded_rectangle(
            (x, top, x + panel_w - 1, top + panel_h - 1), radius=12, outline=LINE, width=2
        )
        draw.text((x, top + panel_h + 22), label, fill=ACCENT, font=font(26, bold=True))
        wrapped(draw, (x, top + panel_h + 58), body, width=34, size=23, leading=32)

    dest = OUT / "figure-growth.webp"
    save_webp(img, dest, FIG_QUALITY)
    print(f"figure {dest.name:38} {FIG_W}x{height}")


def build_gate_pairs() -> None:
    """The two failures the gate exists to catch, each next to what passing looks like."""
    rows = [
        (
            "The colour check",
            "A missing swatch falls back to a flat organ colour and says nothing in the console. "
            "Five of six species shipped that way.",
            ("colour-flat", "Fallback — one colour per organ"),
            ("colour-photo", "Sampled — a colour per point, off the photograph"),
        ),
        (
            "The spacing check",
            "Every organ declares how far apart its own points sit; the gate measures the finished "
            "cloud against that. A poppy was drawing its ovary at sixty-five times its declaration.",
            ("density-low", "600k points — the sprites read as discs"),
            ("density-high", "10M points — the same view, resolved"),
        ),
    ]

    gap = 24
    panel_w = (FIG_W - 96 - gap) // 2
    panel_h = round(panel_w * 1120 / 1440)
    top = 208
    row_h = 96 + panel_h + 96
    height = top + row_h * len(rows) + 24

    img = Image.new("RGB", (FIG_W, height), BG)
    draw = ImageDraw.Draw(img)
    heading(
        draw,
        "What a plant looks like when it is quietly wrong",
        "Neither of these failures raises anything. The plant renders, the page loads, and the "
        "only thing that catches them is a gate measuring the finished cloud.",
    )

    y = top
    for title, body, left, right in rows:
        draw.text((48, y), title, fill=INK, font=font(28, bold=True))
        below = wrapped(draw, (48 + 300, y + 4), body, width=92, size=23, leading=32)
        y = max(y + 76, below + 16)
        for i, (name, caption) in enumerate((left, right)):
            x = 48 + i * (panel_w + gap)
            img.paste(still(f"process/{name}", (panel_w, panel_h)), (x, y))
            draw.rounded_rectangle(
                (x, y, x + panel_w - 1, y + panel_h - 1), radius=12, outline=LINE, width=2
            )
            draw.text(
                (x, y + panel_h + 20),
                caption,
                fill=ACCENT if i else MUTED,
                font=font(24, bold=True),
            )
        y += panel_h + 96

    # Four dense point clouds at full width; the noise is what the figure is
    # about, and it is also what WebP cannot compress. Dropped a few points off
    # FIG_QUALITY so this one lands nearer the rest of the folder.
    dest = OUT / "figure-gate.webp"
    save_webp(img, dest, 76)
    print(f"figure {dest.name:38} {FIG_W}x{height}")


def build_catalog() -> None:
    """Every species in the catalog, banded by the archetype it was scaffolded from."""
    cols = 6
    gap = 16
    cell_w = (FIG_W - 96 - gap * (cols - 1)) // cols
    cell_img_h = round(cell_w * 3 / 4)
    cell_h = cell_img_h + 44
    band_head_h = 62

    total = sum(len(species) for _, _, species in ARCHETYPES)
    grid_h = sum(
        band_head_h + ((len(species) + cols - 1) // cols) * (cell_h + gap)
        for _, _, species in ARCHETYPES
    )
    top = 218
    height = top + grid_h + 84

    img = Image.new("RGB", (FIG_W, height), BG)
    draw = ImageDraw.Draw(img)
    heading(
        draw,
        f"{total} species, one builder",
        "Nothing in the builder is about sunflowers. Each of these is the same five steps run "
        "against a different spec, grouped here by the archetype the scaffold picked for it.",
    )

    y = top
    for archetype, gloss, species in ARCHETYPES:
        draw.line([(48, y), (FIG_W - 48, y)], fill=LINE, width=2)
        draw.text((48, y + 16), archetype, fill=ACCENT, font=font(26, bold=True))
        label = f"{gloss}  ·  {len(species)} species"
        draw.text(
            (FIG_W - 48 - draw.textlength(label, font=font(24)), y + 18),
            label,
            fill=MUTED,
            font=font(24),
        )
        y += band_head_h

        for i, (slug, binomial) in enumerate(species):
            x = 48 + (i % cols) * (cell_w + gap)
            cy = y + (i // cols) * (cell_h + gap)
            img.paste(still(f"models/{slug}", (cell_w, cell_img_h)), (x, cy))
            draw.rounded_rectangle(
                (x, cy, x + cell_w - 1, cy + cell_img_h - 1), radius=12, outline=LINE, width=2
            )
            draw.text((x + 2, cy + cell_img_h + 14), binomial, fill=INK, font=font(21))
        y += ((len(species) + cols - 1) // cols) * (cell_h + gap)

    draw.text(
        (48, height - 60),
        "Six families · four archetypes · fifteen anchored callouts each · every colour traceable "
        "to a named photographer and licence.",
        fill=MUTED,
        font=font(24),
    )

    dest = OUT / "figure-catalog.webp"
    save_webp(img, dest, FIG_QUALITY)
    print(f"figure {dest.name:38} {FIG_W}x{height}")


def main() -> None:
    build_slides()
    build_card()
    draw_pipeline()
    draw_channels()
    build_growth()
    build_gate_pairs()
    build_catalog()


if __name__ == "__main__":
    main()
