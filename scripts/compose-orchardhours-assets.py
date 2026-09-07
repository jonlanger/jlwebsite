#!/usr/bin/env python3
"""Compose the Orchard Hours case-study assets.

Sources are 2880x1800 (1440x900 @2x) PNGs in public/projects/orchardhours/_src,
written by scripts/capture-orchardhours.mjs. Slides go out as WebP at 1800 wide
for the 900px content column at 2x; the three explainer diagrams are drawn here
and stay PNG so their type holds up.

One further figure is built by cutting the same box out of four captures and
laying them up: the same alley at four times of a 420-second day.

Colours below are Orchard Hours' own — the paper the boot curtain is printed on,
the four apple tones out of core/config.ts — so a legend drawn here is the same
legend the reader saw in the game.
"""

from __future__ import annotations

import textwrap
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "projects" / "orchardhours"
SRC = OUT / "_src"

SLIDE_W = 1800
SLIDE_QUALITY = 84
CARD_W, CARD_H = 1024, 576
CARD_QUALITY = 86
DIAG_W = 1200
FIG_W = 1800
FIG_QUALITY = 86

# index.html and core/config.ts, verbatim. The apple tones are the ones the
# toon materials are built from, which is what lets a bar in a diagram here be
# the same colour as the fruit it counts.
BG = (237, 227, 206)
DEEP = (228, 216, 191)
INK = (58, 40, 26)
MUTED = (122, 90, 60)
LINE = (214, 200, 176)
CARD = (248, 242, 229)
CRISP = (198, 59, 46)     # Honeycrisp
GRANNY = (143, 191, 79)   # Granny Smith
GOLDEN = (226, 196, 82)   # Golden Delicious
RUSSET = (243, 198, 59)   # Amber Russet
LEAF = (111, 162, 74)
BRASS = (217, 164, 65)

# capture name -> published slide name
SLIDES = {
    "00-boot": "product-boot",
    "01-rows": "product-rows",
    "02-pick-hand": "product-pick-hand",
    "03-pick-pole": "product-pick-pole",
    "04-rack": "product-rack",
    "04b-barrow": "product-barrow",
    "05-barrels": "product-barrels",
    "06-desk": "product-desk",
    "07-catalogue": "product-catalogue",
    "07b-catalogue-full": "product-catalogue-full",
    "08-almanac": "product-almanac",
    "09-ledger": "product-ledger",
    "10-howto": "product-howto",
    "11-plan": "product-plan",
    "12d-dusk": "product-dusk",
    "14-extension": "product-extension",
    "m-01-rows": "product-mobile-rows",
    "m-02-catalogue": "product-mobile-catalogue",
    # the barn, room by room
    "b1-loft": "product-loft",
    "b2-drying-rack": "product-drying-rack",
    "b3-press": "product-press",
    "b4-kettle": "product-kettle",
    "b5-chalkboard": "product-chalkboard",
    "b6-barrel-row": "product-barrel-row",
    "b7-barn-wide": "product-barn-wide",
    "b8-silo": "product-silo",
    "b10-roof-deck": "product-roof-deck",
    # close up, and the mark
    "c1-apples": "product-fruit",
    "c3-barrels": "product-barrels-close",
    "g2-menu": "product-menu",
}

# The sit is a pose, and a pose does not survive being published at the size
# the rest of the orchard is published at.
CROPPED = {
    "13-sit": ("product-sit", (700, 620, 2560, 1666)),
    # the portrait is shot on a long lens and then squared up on the bear; the
    # HUD panels live in the corners the crop drops
    "c2-bear": ("product-bear", (620, 250, 2500, 1590)),
    # the finished curtain is one small mark in the middle of a lot of paper
    "g1-boot-final": ("product-wordmark", (760, 300, 2120, 1465)),
}

# The card: the alley at golden hour, cut clear of the HUD panels at both
# corners and left at 16:9 so the grid does not letterbox it.
CARD_SRC = "12c-golden"
CARD_BOX = (0, 320, 2560, 1760)

# The window the four hours are cut from — the same box in every one, because
# the whole point of the figure is that only the light changed.
HOUR_BOX = (70, 330, 2470, 1620)
HOURS = [
    ("12a-early", "Early morning", "0.03"),
    ("12b-midday", "Midday", "0.52"),
    ("12c-golden", "Golden hour", "0.93"),
    ("12d-dusk", "Dusk, lantern lit", "0.99"),
]


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    path = (
        "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"
        if bold
        else "/System/Library/Fonts/Supplemental/Georgia.ttf"
    )
    try:
        return ImageFont.truetype(path, size=size)
    except OSError:
        return ImageFont.load_default()


def sans(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
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


def resized(image: Image.Image, width: int) -> Image.Image:
    width = min(width, image.width)
    height = round(image.height * width / image.width)
    return image.resize((width, height), Image.Resampling.LANCZOS)


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
    face = sans(size, bold=bold)
    for line in textwrap.wrap(text, width=width):
        draw.text((x, y), line, fill=fill, font=face)
        y += leading
    return y


def head(draw: ImageDraw.ImageDraw, title: str, standfirst: str) -> int:
    draw.text((48, 44), title, fill=INK, font=font(30, bold=True))
    return wrapped(draw, (48, 96), standfirst, width=104, size=17, leading=25)


def pill(
    draw: ImageDraw.ImageDraw,
    xy: tuple[int, int],
    label: str,
    *,
    fill: tuple[int, int, int],
    color: tuple[int, int, int] = (255, 255, 255),
) -> float:
    x, y = xy
    face = sans(12, bold=True)
    text = label.upper()
    w = draw.textlength(text, font=face)
    draw.rounded_rectangle((x, y, x + w + 24, y + 26), radius=999, fill=fill)
    draw.text((x + 12, y + 6), text, fill=color, font=face)
    return x + w + 24


def card(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], *, radius: int = 14) -> None:
    draw.rounded_rectangle(box, radius=radius, fill=CARD, outline=LINE, width=2)


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
        print(f"slide   {dest.name:36} {out.width}x{out.height}")

    for src_name, (out_name, box) in CROPPED.items():
        with Image.open(SRC / f"{src_name}.png") as opened:
            image = opened.convert("RGB").crop(box)
        out = resized(image, SLIDE_W)
        dest = OUT / f"{out_name}.webp"
        save_webp(out, dest, SLIDE_QUALITY)
        print(f"slide   {dest.name:36} {out.width}x{out.height}")


def build_card() -> None:
    with Image.open(SRC / f"{CARD_SRC}.png") as opened:
        subject = opened.convert("RGB").crop(CARD_BOX)
    out = subject.resize((CARD_W, CARD_H), Image.Resampling.LANCZOS)
    dest = OUT / "orchardhours_card.webp"
    save_webp(out, dest, CARD_QUALITY)
    print(f"card    {dest.name:36} {CARD_W}x{CARD_H}")


def build_hours() -> None:
    """The same alley, the same camera, four times of one 420-second day."""
    gap = 26
    pad = 26
    tile_w = (FIG_W - pad * 2 - gap) // 2
    x0, y0, x1, y1 = HOUR_BOX
    tile_h = round(tile_w * (y1 - y0) / (x1 - x0))
    caption = 46
    height = pad * 2 + tile_h * 2 + gap + caption * 2

    fig = Image.new("RGB", (FIG_W, height), BG)
    draw = ImageDraw.Draw(fig)

    for i, (name, label, t) in enumerate(HOURS):
        with Image.open(SRC / f"{name}.png") as opened:
            tile = opened.convert("RGB").crop(HOUR_BOX)
        tile = tile.resize((tile_w, tile_h), Image.Resampling.LANCZOS)
        x = pad + (i % 2) * (tile_w + gap)
        y = pad + (i // 2) * (tile_h + gap + caption)
        fig.paste(tile, (x, y))
        draw.rectangle((x, y, x + tile_w - 1, y + tile_h - 1), outline=LINE, width=2)
        draw.text((x + 2, y + tile_h + 12), label, fill=INK, font=font(19, bold=True))
        w = draw.textlength(label, font=font(19, bold=True))
        draw.text((x + w + 14, y + tile_h + 16), f"day at {t}", fill=MUTED, font=sans(14))

    dest = OUT / "figure-hours.webp"
    save_webp(fig, dest, FIG_QUALITY)
    print(f"figure  {dest.name:36} {fig.width}x{fig.height}")


def draw_day() -> None:
    """Where the fruit goes, and what comes back in the morning.

    Rows rather than columns: the page renders a figure at 900 CSS px, and a
    five-across flow puts the body copy under 9px on screen.
    """
    img = Image.new("RGB", (DIAG_W, 1600), BG)
    draw = ImageDraw.Draw(img)

    y = head(
        draw,
        "A day in the rows, and the night after it",
        "Fruit comes in one way and leaves one way, and money only ever comes from selling — so "
        "everything on the merchant's page is ultimately paid for in picking. Nothing is locked "
        "behind a level; things are just too small until you buy bigger ones.",
    )

    steps = [
        (
            "1",
            "The rows",
            "20 trees · about 470 apples",
            CRISP,
            "Four rows of five, nine metres apart along a row. Every apple ripens once and only "
            "once, and the wait is spread so wide against a 420-second day that only about a tenth "
            "of a tree is worth picking at any moment.",
        ),
        (
            "2",
            "The basket",
            "24 · the barrow adds 72",
            GRANNY,
            "What the bear is carrying. Anything above 2.5 metres from its feet needs the pole, "
            "and above 6.7 the ladder. A full basket means a walk back to the barn, unless the "
            "barrow is parked nearby — and a loaded barrow costs a third of your speed.",
        ),
        (
            "3",
            "The barrels",
            "60 a variety · 240 after the extension",
            GOLDEN,
            "In the barn, one barrel to a variety. Fruit is sold from the barrels and never from "
            "the basket, so tipping it in is a real step rather than a formality — and a full barn "
            "is what makes the 640-shilling extension worth buying.",
        ),
        (
            "4",
            "The desk",
            "sell, or load a machine",
            RUSSET,
            "Four, three, three and twelve shillings an apple. Or eight apples into the kettle for "
            "a 40sh jar of jelly, twelve into the press for an 84sh jug of cider, twenty onto the "
            "rack for a 120sh sack of rings. Each takes the cheapest fruit first, and none will "
            "touch an Amber Russet.",
        ),
        (
            "5",
            "Overnight",
            "the post, the batches, the set",
            LEAF,
            "Orders arrive with the post, loaded machines finish, and the compost goes out on the "
            "rows. Then each picked apple gets a chance to set again — 30% on an ordinary tree, 75% "
            "on one opened up with the shears, plus whatever the compost bought, up to 96%.",
        ),
    ]

    y += 26
    for num, title, meta, tone, body in steps:
        # sized to its own copy: a fixed height leaves the shorter steps
        # sitting in a pool of slack
        lines = len(textwrap.wrap(body, width=112))
        h = 62 + lines * 21 + 24
        card(draw, (48, y, DIAG_W - 48, y + h))
        draw.rounded_rectangle((48, y, 54, y + h), radius=3, fill=tone)
        draw.ellipse((76, y + 26, 116, y + 66), fill=tone)
        nw = draw.textlength(num, font=sans(18, bold=True))
        draw.text((96 - nw / 2, y + 36), num, fill=(255, 255, 255), font=sans(18, bold=True))
        draw.text((140, y + 24), title, fill=INK, font=font(22, bold=True))
        tw = draw.textlength(title, font=font(22, bold=True))
        draw.text((140 + tw + 16, y + 32), meta, fill=MUTED, font=sans(14))
        wrapped(draw, (140, y + 62), body, width=112, size=14, leading=21)
        y += h + 14

    # the windfall loop, which is the only thing on the farm that runs sideways
    tail = ("Anything off the ground is bruised: the merchant will not take it and it will not keep. "
            "It goes into the sack, which holds 40, and then into the compost barrel. Spread back on "
            "the rows, each windfall adds a percentage point to every tree's chance of setting again "
            "by morning, up to 34 points.")
    tail_h = 72 + len(textwrap.wrap(tail, width=112)) * 21 + 22
    draw.rounded_rectangle((48, y + 8, DIAG_W - 48, y + 8 + tail_h),
                           radius=14, fill=DEEP, outline=LINE, width=2)
    draw.text((80, y + 34), "And the ones that hit the grass", fill=INK, font=font(22, bold=True))
    wrapped(draw, (80, y + 72), tail, width=112, size=14, leading=21)

    img = img.crop((0, 0, DIAG_W, y + 8 + tail_h + 44))
    dest = OUT / "diagram-day.png"
    img.save(dest, "PNG", optimize=True)
    print(f"diagram {dest.name:36} {img.width}x{img.height}")


def draw_reach() -> None:
    """How high a bear gets, how an apple comes off, and what it costs."""
    height = 1082
    img = Image.new("RGB", (DIAG_W, height), BG)
    draw = ImageDraw.Draw(img)

    y = head(
        draw,
        "The reach, and what it costs",
        "Apples are not pulled down: a yank tears out the spur that fruits next year. The fruit is "
        "cupped, rolled upwards until the stalk end points at the sky, and given a small twist. "
        "Both animations below are that same motion — one in a paw, one on a hoop.",
    )
    y += 26

    # ---- the height scale ------------------------------------------------
    card(draw, (48, y, 430, y + 470))
    draw.text((76, y + 24), "How high it gets", fill=INK, font=font(21, bold=True))

    bands = [
        (0.0, 2.5, "By paw", "2.5 m from the bear's feet", GRANNY),
        (2.5, 6.7, "On the pole", "the pole adds another 4.2 m", GOLDEN),
        (6.7, 8.4, "Ladder work", "higher than the pole will go", MUTED),
    ]
    top, bottom = y + 70, y + 430
    scale = (bottom - top) / 8.4
    for lo, hi, label, meta, tone in bands:
        y1 = bottom - lo * scale
        y0 = bottom - hi * scale
        draw.rectangle((84, y0, 132, y1), fill=tone)
        draw.text((150, y0 + 8), label, fill=INK, font=font(17, bold=True))
        draw.text((150, y0 + 32), meta, fill=MUTED, font=sans(13))
    draw.line((84, bottom, 400, bottom), fill=LINE, width=2)
    draw.text((84, bottom + 10), "the bear's feet, wherever it will be standing", fill=MUTED, font=sans(12))

    # ---- the two sequences ----------------------------------------------
    seq_x = 462
    card(draw, (seq_x, y, DIAG_W - 48, y + 470))
    draw.text((seq_x + 28, y + 24), "How it comes off", fill=INK, font=font(21, bold=True))

    sequences = [
        ("In the paw", "1.58 s · 0.016 vigour", GRANNY,
         [("reach", 0.52), ("cup", 0.38), ("twist", 0.20), ("carry", 0.48)]),
        ("On the pole", "2.11 s · 0.026 vigour", GOLDEN,
         [("aim", 0.55), ("hook", 0.44), ("bag", 0.26), ("lower", 0.52), ("tip", 0.34)]),
    ]
    sy = y + 74
    bar_x0, bar_x1 = seq_x + 28, DIAG_W - 76
    span = bar_x1 - bar_x0
    longest = 2.11
    for label, meta, tone, phases in sequences:
        draw.text((bar_x0, sy), label, fill=INK, font=font(17, bold=True))
        lw = draw.textlength(label, font=font(17, bold=True))
        draw.text((bar_x0 + lw + 14, sy + 4), meta, fill=MUTED, font=sans(13))
        bx = bar_x0
        for i, (phase, secs) in enumerate(phases):
            w = span * secs / longest
            shade = tuple(int(c + (BG[j] - c) * (0.10 + i * 0.13)) for j, c in enumerate(tone))
            draw.rounded_rectangle((bx, sy + 30, bx + w - 4, sy + 76), radius=6, fill=shade)
            pw = draw.textlength(phase, font=sans(13, bold=True))
            if pw < w - 18:
                draw.text((bx + (w - pw) / 2 - 2, sy + 38), phase, fill=(255, 255, 255),
                          font=sans(13, bold=True))
            sw = draw.textlength(f"{secs:.2f}", font=sans(11))
            if sw < w - 18:
                draw.text((bx + (w - sw) / 2 - 2, sy + 56), f"{secs:.2f}", fill=(255, 255, 255),
                          font=sans(11))
            bx += w
        sy += 118

    wrapped(
        draw,
        (bar_x0, sy + 4),
        "The fruit is not simply slid to the paw: the branch is drawn down towards the bear, up to "
        "1.35 m of it, and the apple rolls about the line across the reach — the way a wrist would "
        "turn it. A worn-out bear plays the whole sequence at 0.72 speed, and stoops through it.",
        width=74,
        size=14,
        leading=21,
    )

    # ---- the vigour ledger ----------------------------------------------
    y2 = y + 500
    card(draw, (48, y2, DIAG_W - 48, y2 + 330))
    draw.text((80, y2 + 26), "What the day takes out of the bear, and what puts it back",
              fill=INK, font=font(21, bold=True))
    wrapped(
        draw,
        (80, y2 + 62),
        "Vigour runs from 1 down to 0, and a full day of steady picking spends most of it. It is "
        "the only thing limiting how much fruit a day can hold.",
        width=112, size=14, leading=21,
    )

    costs = [
        ("An apple picked by paw", "−0.016", CRISP),
        ("The same one on the pole", "−0.026", CRISP),
        ("Running, a second", "−0.0160", CRISP),
        ("Walking, a second", "−0.0040", CRISP),
        ("Sitting in the grass, a second", "+0.042", LEAF),
        ("Eating one out of the basket", "+0.30", LEAF),
    ]
    cy = y2 + 130
    for i, (label, value, tone) in enumerate(costs):
        cx = 80 + (i % 3) * 356
        row = cy + (i // 3) * 62
        draw.rounded_rectangle((cx, row, cx + 330, row + 48), radius=8, fill=DEEP)
        draw.text((cx + 14, row + 15), label, fill=INK, font=sans(14))
        vw = draw.textlength(value, font=sans(15, bold=True))
        draw.text((cx + 316 - vw, row + 14), value, fill=tone, font=sans(15, bold=True))

    draw.text(
        (80, y2 + 268),
        "Below 0.36 the bear stoops and starts losing pace, down to about two thirds of it at empty. "
        "Below 0.13 it will not run at all, and every reach plays at 0.72 speed.",
        fill=MUTED, font=sans(14),
    )

    dest = OUT / "diagram-reach.png"
    img.save(dest, "PNG", optimize=True)
    print(f"diagram {dest.name:36} {img.width}x{img.height}")


def draw_ripening() -> None:
    """One apple, one cycle — and why only a tenth of a tree is ever worth it."""
    img = Image.new("RGB", (DIAG_W, 900), BG)
    draw = ImageDraw.Draw(img)

    y = head(
        draw,
        "One apple, one cycle",
        "Every apple runs a single schedule: it colours up, is at its best for a few minutes, hangs "
        "on a little past that, and then falls into the grass. Nothing repeats during the day — a "
        "tree that has been picked over stays picked over until morning.",
    )
    y += 34

    phases = [
        ("Set", "", DEEP, 0.06),
        ("Coming on", "45–1500 s", (206, 190, 160), 0.44),
        ("At its best", "140–205 s", CRISP, 0.26),
        ("Past it", "25–65 s", (176, 130, 92), 0.14),
        ("Windfall", "", (139, 118, 88), 0.10),
    ]
    x0, x1 = 64, DIAG_W - 64
    span = x1 - x0
    bx = x0
    for label, meta, tone, share in phases:
        w = span * share
        draw.rounded_rectangle((bx, y, bx + w - 5, y + 74), radius=8, fill=tone)
        light = sum(tone) / 3 < 170
        fill = (255, 255, 255) if light else INK
        lw = draw.textlength(label, font=sans(14, bold=True))
        if lw < w - 16:
            draw.text((bx + (w - lw) / 2 - 2, y + 20), label, fill=fill, font=sans(14, bold=True))
        if meta:
            mw = draw.textlength(meta, font=sans(12))
            if mw < w - 16:
                draw.text((bx + (w - mw) / 2 - 2, y + 44), meta, fill=fill, font=sans(12))
        bx += w
    draw.text((x0, y + 88),
              "the orchard's own clock — the bar is schematic, not to scale: the wait alone can be "
              "ten times the window at the end of it",
              fill=MUTED, font=sans(12))

    y += 132
    notes = [
        (
            "Why the wait is spread so wide",
            "A day is 420 seconds; a ripening wait is anywhere from 45 to 1500 of them. Against a "
            "best-of window only two or three minutes long, that leaves about a tenth of a tree "
            "worth picking at once. It is why ripe apples are marked, and why the orchard plan "
            "shows where the fruit is rather than where the trees are.",
        ),
        (
            "Why a fresh schedule each morning",
            "An apple that sets again overnight gets a fresh random schedule rather than the one it "
            "had. Reusing it would pull the rows into step within a couple of days — the whole "
            "orchard ripe on one morning and bare the next.",
        ),
    ]
    for title, body in notes:
        h = 58 + len(textwrap.wrap(body, width=110)) * 21 + 22
        card(draw, (64, y, DIAG_W - 64, y + h))
        draw.text((96, y + 22), title, fill=INK, font=font(20, bold=True))
        wrapped(draw, (96, y + 58), body, width=110, size=14, leading=21)
        y += h + 16

    img = img.crop((0, 0, DIAG_W, y + 28))
    dest = OUT / "diagram-ripening.png"
    img.save(dest, "PNG", optimize=True)
    print(f"diagram {dest.name:36} {img.width}x{img.height}")


def main() -> None:
    build_slides()
    build_card()
    build_hours()
    draw_day()
    draw_reach()
    draw_ripening()


if __name__ == "__main__":
    main()
