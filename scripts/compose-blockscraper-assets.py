#!/usr/bin/env python3
"""Compose the Blockscraper case-study assets.

Sources are 2880x1800 (1440x900 @2x) PNGs in public/projects/blockscraper/_src,
written by scripts/capture-blockscraper.mjs. Slides go out as WebP at 1800
wide; the diagrams are drawn here and stay PNG so their type holds up.

The style data below is copied from Blockscraper's src/catalog.js (names,
blurbs, colorways) and src/presets.js (The Aurora), so a swatch drawn here is
the paint the game uses.

Run with the system Python (it has Pillow): /usr/bin/python3 scripts/compose-blockscraper-assets.py
"""

from __future__ import annotations

import textwrap
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "projects" / "blockscraper"
SRC = OUT / "_src"

SLIDE_W = 1800
SLIDE_QUALITY = 84
CARD_W, CARD_H = 1024, 576
FIG_W = 1800
FIG_QUALITY = 86
DIAG_W = 1200

BG = (244, 241, 234)
INK = (34, 33, 38)
MUTED = (112, 106, 98)
LINE = (220, 213, 200)
CARD = (252, 250, 245)
GOLD = (201, 161, 74)

SLIDES = {
    "u1-ui": "product-ui",
    "c1-hero": "product-hero",
    "c2-night": "product-night",
    "c3-gothic": "product-gothic",
    "c6-cutaway": "product-cutaway",
    "o2b-classical-close": "product-ornament-close",
    "o3-gothic": "product-ornament-gothic",
    "o4-parametric": "product-ornament-parametric",
    "o5-solarpunk": "product-ornament-solarpunk",
    "p1-parks": "product-parks",
    "p2-basin": "product-basin",
    "p3-parterre": "product-parterre",
    "p4-chahar": "product-chahar",
    "p5-cascade": "product-cascade",
    "r1-random": "product-random",
}

# Cut clear of the empty sky under the map.
CROPPED = {
    "c7-underground": ("product-underground", (480, 120, 2880, 1080)),
}

CARD_SRC, CARD_BOX = "c1-hero", (0, 60, 2880, 1680)

# The study building sits in the same place in every study frame.
STUDY_BOX = (820, 30, 2140, 1560)


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    name = "Georgia Bold.ttf" if bold else "Georgia.ttf"
    return ImageFont.truetype(f"/System/Library/Fonts/Supplemental/{name}", size=size)


def sans(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    name = "Arial Bold.ttf" if bold else "Arial.ttf"
    return ImageFont.truetype(f"/System/Library/Fonts/Supplemental/{name}", size=size)


def hexrgb(v: int) -> tuple[int, int, int]:
    return ((v >> 16) & 255, (v >> 8) & 255, v & 255)


def save_webp(image: Image.Image, dest: Path, quality: int) -> None:
    image.save(dest, "WEBP", quality=quality, method=6)


def resized(image: Image.Image, width: int) -> Image.Image:
    width = min(width, image.width)
    return image.resize((width, round(image.height * width / image.width)), Image.Resampling.LANCZOS)


def load(name: str) -> Image.Image:
    with Image.open(SRC / f"{name}.png") as opened:
        return opened.convert("RGB")


def build_slides() -> None:
    for src, out in SLIDES.items():
        img = resized(load(src), SLIDE_W)
        save_webp(img, OUT / f"{out}.webp", SLIDE_QUALITY)
        print(f"slide   {out:32} {img.width}x{img.height}")
    for src, (out, box) in CROPPED.items():
        img = resized(load(src).crop(box), SLIDE_W)
        save_webp(img, OUT / f"{out}.webp", SLIDE_QUALITY)
        print(f"slide   {out:32} {img.width}x{img.height}")


def build_card() -> None:
    img = load(CARD_SRC).crop(CARD_BOX).resize((CARD_W, CARD_H), Image.Resampling.LANCZOS)
    save_webp(img, OUT / "blockscraper_card.webp", 86)
    print(f"card    blockscraper_card            {CARD_W}x{CARD_H}")


def tile_row(tiles: list[tuple[str, str, str]], dest: str, cols: int, arrow: tuple[str, str] | None) -> None:
    """A grid of study frames, each labelled, optionally under a left-to-right arrow."""
    pad, gap, cap = 36, 20, 74
    tw = (FIG_W - pad * 2 - gap * (cols - 1)) // cols
    bx0, by0, bx1, by1 = STUDY_BOX
    th = round(tw * (by1 - by0) / (bx1 - bx0))
    rows = (len(tiles) + cols - 1) // cols
    top = 84 if arrow else pad
    h = top + rows * (th + cap) + (rows - 1) * gap + pad
    fig = Image.new("RGB", (FIG_W, h), BG)
    d = ImageDraw.Draw(fig)
    if arrow:
        y = 44
        d.text((pad, y - 14), arrow[0], fill=INK, font=sans(20, bold=True))
        rw = d.textlength(arrow[1], font=sans(20, bold=True))
        d.text((FIG_W - pad - rw, y - 14), arrow[1], fill=INK, font=sans(20, bold=True))
        lx0 = pad + d.textlength(arrow[0], font=sans(20, bold=True)) + 24
        lx1 = FIG_W - pad - rw - 24
        d.line((lx0, y, lx1, y), fill=GOLD, width=4)
        d.polygon([(lx1 + 4, y), (lx1 - 14, y - 9), (lx1 - 14, y + 9)], fill=GOLD)
    for i, (src, label, meta) in enumerate(tiles):
        x = pad + (i % cols) * (tw + gap)
        y = top + (i // cols) * (th + cap + gap)
        t = load(src).crop(STUDY_BOX).resize((tw, th), Image.Resampling.LANCZOS)
        fig.paste(t, (x, y))
        d.rectangle((x, y, x + tw - 1, y + th - 1), outline=LINE, width=2)
        d.text((x + 2, y + th + 12), label, fill=INK, font=font(23, bold=True))
        d.text((x + 2, y + th + 44), meta, fill=MUTED, font=sans(16))
    save_webp(fig, OUT / f"{dest}.webp", FIG_QUALITY)
    print(f"figure  {dest:32} {fig.width}x{fig.height}")


def build_figures() -> None:
    tile_row(
        [
            ("s-style-beaux", "Beaux-Arts", "rusticated base, cornice"),
            ("s-style-gothic", "Neo-Gothic", "lancet windows"),
            ("s-style-castiron", "Cast-Iron", "fluted columns, arched bays"),
            ("s-style-deco", "Art Deco", "setbacks and piers"),
            ("s-style-midcentury", "Mid-Century", "colour panels, fins"),
            ("s-style-brutalist", "Brutalist", "board-formed concrete"),
            ("s-style-glass", "Modern Glass", "curtain wall"),
            ("s-style-solarpunk", "Solarpunk", "timber and planting"),
        ],
        "figure-styles",
        cols=4,
        arrow=("Classical", "Modern"),
    )
    tile_row(
        [
            ("o1-bare", "Bare", "style only"),
            ("o2-classical", "Classical", "columns, balconies, cornice"),
            ("o3-gothic", "Gothic", "statues, buttresses, gargoyles"),
            ("o4-parametric", "Parametric", "fins, overhang, neon"),
            ("o5-solarpunk", "Solarpunk", "ivy, balconies, deep eave"),
        ],
        "figure-ornament",
        cols=5,
        arrow=None,
    )


def head(d: ImageDraw.ImageDraw, title: str, sub: str) -> int:
    d.text((48, 40), title, fill=INK, font=font(32, bold=True))
    y = 92
    for line in textwrap.wrap(sub, width=100):
        d.text((48, y), line, fill=MUTED, font=sans(18))
        y += 27
    return y + 18


def draw_layers() -> None:
    """The four choices that give a building its character."""
    img = Image.new("RGB", (DIAG_W, 900), BG)
    d = ImageDraw.Draw(img)
    y = head(d, "Four choices make a building",
             "Every block takes a style and a colourway, so the same massing can be classical, modern or both.")
    steps = [
        ("1", "Style + colourway", "14 styles × 5 colourways", "Beaux-Arts to Solarpunk. The style sets windows, piers and trim."),
        ("2", "Blocks", "109 blocks · 9 groups", "Lobbies, floors, sky bars, subway platforms. Touching blocks join into one building."),
        ("3", "Ornament", "16 facade pieces", "Columns, gargoyles, fins, ivy. Each redraws itself in the wall's style."),
        ("4", "Crown + setting", "30 roofs · 22 parks", "Spires, domes, helipads, and gardens after Versailles and the Alhambra."),
    ]
    cw = (DIAG_W - 96 - 3 * 18) // 4
    for i, (n, title, meta, body) in enumerate(steps):
        x = 48 + i * (cw + 18)
        d.rounded_rectangle((x, y, x + cw, y + 300), radius=14, fill=CARD, outline=LINE, width=2)
        d.rounded_rectangle((x, y, x + cw, y + 6), radius=3, fill=GOLD)
        d.ellipse((x + 22, y + 28, x + 62, y + 68), fill=INK)
        nw = d.textlength(n, font=sans(20, bold=True))
        d.text((x + 42 - nw / 2, y + 37), n, fill=BG, font=sans(20, bold=True))
        d.text((x + 22, y + 88), title, fill=INK, font=font(22, bold=True))
        d.text((x + 22, y + 122), meta, fill=GOLD, font=sans(15, bold=True))
        ty = y + 156
        for line in textwrap.wrap(body, width=24):
            d.text((x + 22, ty), line, fill=MUTED, font=sans(16))
            ty += 24
        if i < 3:
            ax = x + cw + 9
            d.polygon([(ax + 7, y + 150), (ax - 5, y + 141), (ax - 5, y + 159)], fill=GOLD)
    img = img.crop((0, 0, DIAG_W, y + 300 + 48))
    img.save(OUT / "diagram-layers.png", "PNG", optimize=True)
    print(f"diagram diagram-layers               {img.width}x{img.height}")


# catalog.js STYLES, ordered here from classical to modern. Each colorway: wall, trim, accent.
STYLES = [
    ("Beaux-Arts", "Classical", [(0xefe6d2, 0xd6c8aa, 0x9a8b6e), (0x7a4e3a, 0x9a6a52, 0x5a3a2a), (0xd8a8a0, 0xc49088, 0x8a6a60), (0xa8aeb4, 0x8a9096, 0x5a6066), (0xf0dca0, 0xe2c888, 0x9a8050)]),
    ("Cast-Iron Victorian", "Classical", [(0xe6dcc4, 0x3b4a3f, 0xb08d57), (0x6e2a2a, 0x1f1f1f, 0xc9a14a), (0x2f5d50, 0x1f1f1f, 0xc9a14a), (0x8a8d90, 0x3a3d40, 0xd8d0c0), (0x9cc0d8, 0x2a3a4a, 0xe8e2d4)]),
    ("Neo-Gothic", "Gothic", [(0xc4beaf, 0x8f8a7d, 0x6d6a60), (0xd9b48f, 0xb08560, 0x7a5a3a), (0x8a96a2, 0x6a7682, 0x4a525a), (0x4a4846, 0x3a3836, 0x8a7a5a), (0xc89484, 0xa87464, 0x7a5040)]),
    ("Chicago School", "Classical", [(0xd4b48c, 0xa87f55, 0x6e5238), (0xf3f0e8, 0xcfc8b8, 0x8a8a80), (0x9cb89c, 0x7a9a7a, 0x4a5a4a), (0xd8c098, 0xb8a078, 0x6e5238), (0x4a4644, 0x3a3634, 0xb08d57)]),
    ("Industrial Brick", "Classical", [(0x9c4a36, 0x2f3133, 0xd8d0c0), (0xc8b48a, 0x1f3a2f, 0xece6d6), (0x3a3232, 0x1f1f1f, 0xc0b8a8), (0xd8b87a, 0x5a4a3a, 0xf0e8d8), (0xe8e2d4, 0x2f5d50, 0x2f5d50)]),
    ("Mediterranean", "Classical", [(0xf1e3c8, 0xb5543a, 0x3f6b3a), (0xf7f7f2, 0x2a66b0, 0x2a66b0), (0xe0b070, 0xa8502e, 0x3f6b3a), (0xf2c2b0, 0xb5543a, 0x2a66b0), (0xd8cce8, 0xa8543a, 0x5a6a3a)]),
    ("Art Nouveau", "Organic", [(0xe8d7b8, 0xcdb897, 0x3f7d68), (0xd9a5a0, 0xc08a84, 0x2b2b2b), (0xf1dfa0, 0xd0b870, 0x5a2e4a), (0xc9d3b8, 0xa8b690, 0xb86b3a), (0xcfe0ea, 0xaec4d2, 0xb89040)]),
    ("Art Deco", "Deco", [(0xdccfae, 0x6b5536, 0xc9a14a), (0x2e2d31, 0x1a1a1c, 0xd4af37), (0xd89a6a, 0x7a3f24, 0xe0b050), (0xcfe3d4, 0x3f6f5e, 0xb8a060), (0xecebe6, 0x6d7278, 0xc8ccd0)]),
    ("Streamline Moderne", "Deco", [(0xf2ede4, 0x7fc8c2, 0xe89aa8), (0xe8ebee, 0xc0392b, 0xb8c0c8), (0xf6c1c6, 0xffffff, 0x2ec4b6), (0xf6ecb0, 0x5a8fbf, 0xe07a5f), (0xf2ece0, 0x1f3a5f, 0xc0392b)]),
    ("Mid-Century", "Deco", [(0xe9e4d8, 0x3a3a3a, 0x2a9d8f), (0xd8d2c4, 0x2b2b2b, 0xe76f51), (0xe6e2cc, 0x3a3a3a, 0x8a9a3a), (0xe9e4d8, 0x2b2b2b, 0xe0a82e), (0xdfe4e8, 0x2b2b2b, 0x3a6ea5)]),
    ("Modern Glass", "Modern", [(0x9fb4c3, 0xc9d1d6, 0x4f86b0), (0x6b5a48, 0x3b342d, 0x6e5a3f), (0x7fa89a, 0xcfd8d4, 0x2f7a64), (0xd0d6dc, 0xe8ecef, 0x8a9aa8), (0x2a3040, 0x5a6070, 0x1e2a44)]),
    ("Brutalist", "Modern", [(0xa3a19b, 0x77756f, 0x5b5a56), (0xb39a72, 0x8a7555, 0x6a5a45), (0x5a5a5c, 0x444446, 0x303032), (0xd2c4a8, 0xb8aa8e, 0x8a7c62), (0xe8e6e0, 0xcfcdc6, 0xb0aea8)]),
    ("Parametric", "Modern", [(0xf4f6f8, 0xdfe5ea, 0x66d9ff), (0xa7adb3, 0x7c848c, 0xff8a3d), (0xf0d8d0, 0xd8b8a8, 0xff9ad5), (0x2a2c30, 0x3a3c40, 0x39ff88), (0xe8f0f4, 0xc8dce8, 0x9b5de5)]),
    ("Solarpunk", "Organic", [(0xc9a57a, 0x6e8a4a, 0x4caf50), (0xd8c49a, 0xb0714a, 0x7cb342), (0x4a3a30, 0x6e8a4a, 0x9ccc65), (0xe0d4b8, 0x5a7a3a, 0x8bc34a), (0xb07a50, 0x4a8aa8, 0x4caf50)]),
]

# ornaments.js family(): the motif an ornament borrows from its wall
FAMILY_TONE = {"Classical": (150, 132, 100), "Gothic": (96, 98, 110), "Deco": GOLD, "Organic": (98, 140, 80), "Modern": (70, 120, 170)}


def draw_palette() -> None:
    """14 styles, 5 paints each, and the ornament family each one belongs to."""
    row_h = 58
    img = Image.new("RGB", (DIAG_W, 400 + len(STYLES) * row_h), BG)
    d = ImageDraw.Draw(img)
    y = head(d, "From classical to modern",
             "Each style comes with five colourways. Ornament reads the style's family, so a frieze becomes triglyphs, chevrons or vines.")
    x_name, x_fam, x_sw = 48, 390, 560
    d.text((x_name, y), "STYLE", fill=MUTED, font=sans(13, bold=True))
    d.text((x_fam, y), "ORNAMENT FAMILY", fill=MUTED, font=sans(13, bold=True))
    d.text((x_sw, y), "FIVE COLOURWAYS  ·  wall / trim / accent", fill=MUTED, font=sans(13, bold=True))
    y += 30
    sw_w, sw_gap = 108, 12
    for i, (name, fam, ways) in enumerate(STYLES):
        if i % 2 == 0:
            d.rectangle((36, y, DIAG_W - 36, y + row_h), fill=CARD)
        d.text((x_name + 12, y + 17), name, fill=INK, font=font(21, bold=True))
        tone = FAMILY_TONE[fam]
        fw = d.textlength(fam.upper(), font=sans(12, bold=True))
        d.rounded_rectangle((x_fam, y + 16, x_fam + fw + 24, y + 42), radius=13, fill=tone)
        d.text((x_fam + 12, y + 22), fam.upper(), fill=(255, 255, 255), font=sans(12, bold=True))
        for k, (wall, trim, accent) in enumerate(ways):
            sx = x_sw + k * (sw_w + sw_gap)
            box = (sx, y + 12, sx + sw_w, y + row_h - 12)
            d.rectangle((box[0], box[1], box[0] + 62, box[3]), fill=hexrgb(wall))
            d.rectangle((box[0] + 62, box[1], box[0] + 88, box[3]), fill=hexrgb(trim))
            d.rectangle((box[0] + 88, box[1], box[2], box[3]), fill=hexrgb(accent))
            d.rectangle(box, outline=LINE, width=1)
        y += row_h
    img = img.crop((0, 0, DIAG_W, y + 40))
    img.save(OUT / "diagram-palette.png", "PNG", optimize=True)
    print(f"diagram diagram-palette              {img.width}x{img.height}")


def draw_aurora() -> None:
    """The Aurora from presets.js, drawn in section: setbacks and all 42 levels."""
    lv = 20  # px per level
    levels = list(range(-5, 37))
    top_pad = 0
    img = Image.new("RGB", (DIAG_W, 1400), BG)
    d = ImageDraw.Draw(img)
    y0 = head(d, "Stacking a tower: The Aurora",
              "The classic city's Art Deco tower, as it is built in the game. Floors need a lobby and an elevator core; piles let it rise.") + 100
    ground = y0 + top_pad + 37 * lv  # y of the street line (top of level 0 is ground - lv)
    cx = 300
    unit = 34  # px per block of width

    def ly(level: int) -> tuple[int, int]:
        top = ground - (level + 1) * lv
        return top, top + lv

    # (level range, width in blocks, fill, label)
    bands = [
        ((-5, -3), 6, (140, 128, 112), "B5–B3", "Foundation piles", "each lets the tower rise 3 floors"),
        ((-2, -2), 6, (150, 150, 155), "B2", "Parking, mall, subway platform", ""),
        ((-1, -1), 6, (170, 170, 175), "B1", "Parking and shops", ""),
        ((0, 0), 6, (222, 206, 170), "Street", "Grand lobby, café, shops", "required before upper floors"),
        ((1, 11), 6, (220, 207, 174), "F1–F11", "Offices", "plant room on F6"),
        ((12, 23), 4, (205, 180, 150), "F12–F23", "Hotel suites", "first setback, roof gardens on F12"),
        ((24, 33), 2, (220, 207, 174), "F24–F33", "Offices", "second setback"),
        ((34, 34), 2, (70, 56, 80), "F34", "Sky bar", ""),
        ((35, 35), 2, (60, 70, 90), "F35", "Observation deck", "needed for a 5-star rating"),
    ]
    # earth
    d.rectangle((60, ground, 560, ly(-5)[1] + 10), fill=(214, 200, 176))
    for (a, b), w, fill, tag, name, note in bands:
        top, _ = ly(b)
        _, bot = ly(a)
        x0 = cx - w * unit // 2
        d.rectangle((x0, top, x0 + w * unit, bot), fill=fill, outline=BG, width=1)
        for l in range(a, b + 1):
            t, _ = ly(l)
            d.line((x0, t, x0 + w * unit, t), fill=(255, 255, 255) if fill[0] < 120 else (190, 176, 150), width=1)
    # spire on F36
    t36, b36 = ly(36)
    d.polygon([(cx - 26, b36), (cx + 26, b36), (cx + 10, t36 - 10), (cx, t36 - 70), (cx - 10, t36 - 10)], fill=GOLD)
    # elevator core B3–F35
    ct, _ = ly(35)
    _, cb = ly(-3)
    d.rectangle((cx - 3 * unit // 2 + 6, ct, cx - 3 * unit // 2 + 18, cb), fill=(68, 72, 79))
    # street line
    d.line((60, ground, 560, ground), fill=INK, width=3)
    d.text((66, ground + 6), "street", fill=MUTED, font=sans(13, bold=True))

    # labels
    lx = 620
    items = [((a, b), tag, name, note) for (a, b), _, _, tag, name, note in bands]
    items.append(((36, 36), "F36", "Deco spire", "a crown block"))
    items.append(((10, 10), "Core", "Elevator core, B3–F35", "one column serves every floor"))
    placed: list[int] = []
    for (a, b), tag, name, note in sorted(items, key=lambda it: -it[0][1]):
        top, _ = ly(b)
        _, bot = ly(a)
        mid = (top + bot) // 2
        ty = max(mid - 12, (placed[-1] + 50) if placed else 0)
        placed.append(ty)
        edge = cx + 6 * unit // 2 + 10 if tag != "Core" else cx - 3 * unit // 2 + 18
        d.line((edge, mid, lx - 12, ty + 12), fill=LINE, width=2)
        d.ellipse((edge - 4, mid - 4, edge + 4, mid + 4), fill=GOLD)
        d.text((lx, ty), tag, fill=GOLD, font=sans(15, bold=True))
        tw = d.textlength(tag, font=sans(15, bold=True))
        d.text((lx + max(tw, 70) + 14, ty - 2), name, fill=INK, font=font(19, bold=True))
        if note:
            d.text((lx + max(tw, 70) + 14, ty + 22), note, fill=MUTED, font=sans(14))
    bottom = max(ly(-5)[1] + 40, placed[-1] + 60)
    img = img.crop((0, 0, DIAG_W, bottom))
    img.save(OUT / "diagram-aurora.png", "PNG", optimize=True)
    print(f"diagram diagram-aurora               {img.width}x{img.height}")


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    build_slides()
    build_card()
    build_figures()
    draw_layers()
    draw_palette()
    draw_aurora()
