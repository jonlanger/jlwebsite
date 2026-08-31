#!/usr/bin/env python3
"""Compose the Botanica case-study assets.

Sources are 2880x1800 (1440x900 @2x) PNGs in public/projects/botanica/_src,
written by scripts/capture-botanica.mjs. Slides go out as WebP at 1800 wide for
the 900px content column at 2x; the two explainer diagrams are drawn here and
stay PNG so their type holds up.
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


def main() -> None:
    build_slides()
    build_card()
    draw_pipeline()
    draw_channels()


if __name__ == "__main__":
    main()
