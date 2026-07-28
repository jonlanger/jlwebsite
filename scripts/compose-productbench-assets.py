#!/usr/bin/env python3
"""Compose ProductBench boards, card art, and early case-study diagrams."""

from __future__ import annotations

import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "projects" / "productbench" / "_src"
OUT = ROOT / "public" / "projects" / "productbench"

BOARD_W, BOARD_H = 1800, 1125
CARD_W, CARD_H = 1280, 720
DIAG_W, DIAG_H = 1600, 1000

BG = (246, 247, 249)
INK = (22, 24, 28)
MUTED = (90, 96, 105)
LINE = (210, 214, 220)
CARD = (255, 255, 255)
ACCENT = (28, 45, 72)
TEAL = (52, 120, 130)
MINT = (120, 160, 140)


def try_font(size: int, bold: bool = False) -> ImageFont.ImageFont:
    candidates = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
        if bold
        else "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
        "/Library/Fonts/Arial.ttf",
    ]
    for path in candidates:
        try:
            return ImageFont.truetype(path, size=size)
        except OSError:
            continue
    return ImageFont.load_default()


def sips_resize(src: Path, dest: Path, width: int, height: int | None = None) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    if height:
        cmd = ["sips", "-z", str(height), str(width), str(src), "--out", str(dest)]
    else:
        cmd = ["sips", "-Z", str(width), str(src), "--out", str(dest)]
    subprocess.run(cmd, check=True, capture_output=True)


def sips_crop_center(src: Path, dest: Path, width: int, height: int) -> None:
    out = subprocess.check_output(
        ["sips", "-g", "pixelWidth", "-g", "pixelHeight", str(src)], text=True
    )
    sw = int([l for l in out.splitlines() if "pixelWidth" in l][0].split()[-1])
    sh = int([l for l in out.splitlines() if "pixelHeight" in l][0].split()[-1])
    scale = max(width / sw, height / sh)
    rw, rh = int(sw * scale + 0.5), int(sh * scale + 0.5)
    tmp = dest.with_suffix(".tmp.png")
    subprocess.run(
        ["sips", "-z", str(rh), str(rw), str(src), "--out", str(tmp)],
        check=True,
        capture_output=True,
    )
    ox = max(0, (rw - width) // 2)
    oy = max(0, int((rh - height) * 0.12))
    subprocess.run(
        [
            "sips",
            "--cropToHeightWidth",
            str(height),
            str(width),
            "--cropOffset",
            str(oy),
            str(ox),
            str(tmp),
            "--out",
            str(dest),
        ],
        check=True,
        capture_output=True,
    )
    tmp.unlink(missing_ok=True)


def rounded_card(
    draw: ImageDraw.ImageDraw,
    xy: tuple[int, int],
    wh: tuple[int, int],
    title: str,
    lines: list[str],
    *,
    accent: bool = False,
    fill: tuple[int, int, int] = CARD,
) -> None:
    x, y = xy
    w, h = wh
    title_font = try_font(18, bold=True)
    body_font = try_font(14)
    outline = ACCENT if accent else LINE
    draw.rounded_rectangle(
        (x, y, x + w, y + h),
        radius=16,
        fill=fill,
        outline=outline,
        width=2 if accent else 1,
    )
    draw.text((x + 20, y + 18), title, fill=ACCENT if accent else INK, font=title_font)
    ty = y + 52
    for line in lines:
        draw.text((x + 20, ty), line, fill=MUTED, font=body_font)
        ty += 22


def arrow(
    draw: ImageDraw.ImageDraw, a: tuple[int, int], b: tuple[int, int]
) -> None:
    draw.line([a, b], fill=LINE, width=2)
    bx, by = b
    if abs(b[0] - a[0]) >= abs(b[1] - a[1]):
        # horizontal
        draw.polygon([(bx, by), (bx - 10, by - 6), (bx - 10, by + 6)], fill=MUTED)
    else:
        draw.polygon([(bx, by), (bx - 6, by - 10), (bx + 6, by - 10)], fill=MUTED)


def draw_system_model() -> Path:
    """Problem → structured library → team use moments."""
    img = Image.new("RGB", (DIAG_W, DIAG_H), BG)
    draw = ImageDraw.Draw(img)
    title = try_font(28, bold=True)
    body = try_font(15)

    draw.text((48, 36), "From scattered inspiration to a research library", fill=INK, font=title)
    draw.text(
        (48, 78),
        "ProductBench turns bookmarks and one-off audits into comparable product records teams can filter and cite.",
        fill=MUTED,
        font=body,
    )

    rounded_card(
        draw,
        (48, 150),
        (420, 220),
        "Before",
        [
            "Screenshot folders & Notion dumps",
            "Looks without workflow structure",
            "Audits that go stale per project",
            "Hard to compare across products",
        ],
    )
    rounded_card(
        draw,
        (560, 150),
        (480, 220),
        "ProductBench record",
        [
            "Comparable product briefs",
            "Surfaces · workflows · features",
            "UX patterns · IA depth · roles",
            "Searchable catalog + contribution",
        ],
        accent=True,
        fill=(236, 242, 244),
    )
    rounded_card(
        draw,
        (1130, 150),
        (420, 220),
        "After",
        [
            "Discovery & competitive scans",
            "Design critiques with shared refs",
            "Handoff with concrete peers",
            "Revisit as products evolve",
        ],
    )

    arrow(draw, (468, 260), (560, 260))
    arrow(draw, (1040, 260), (1130, 260))

    # Bottom use moments
    moments = [
        ("Discover", "Filter by category,\nindustry, pattern"),
        ("Inspect", "Open briefs, screens,\nand workflows"),
        ("Compare", "IA depth, density,\nplatform coverage"),
        ("Carry forward", "Briefs, critiques,\nroadmap talks"),
    ]
    label_f = try_font(16, bold=True)
    small = try_font(13)
    x0 = 48
    for i, (t, d) in enumerate(moments):
        x = x0 + i * 390
        draw.rounded_rectangle(
            (x, 460, x + 350, 620), radius=14, fill=CARD, outline=LINE, width=1
        )
        draw.ellipse((x + 20, 486, x + 44, 510), fill=TEAL if i % 2 == 0 else MINT)
        draw.text((x + 56, 484), f"{i + 1}. {t}", fill=INK, font=label_f)
        for j, line in enumerate(d.split("\n")):
            draw.text((x + 56, 520 + j * 22), line, fill=MUTED, font=small)
        if i < len(moments) - 1:
            arrow(draw, (x + 350, 540), (x + 390, 540))

    draw.text(
        (48, 700),
        "One structured layer across discovery → critique → handoff — instead of rebuilding research each time.",
        fill=MUTED,
        font=body,
    )

    # Legend strip
    draw.rounded_rectangle((48, 780, 1552, 920), radius=16, fill=CARD, outline=LINE)
    draw.text((72, 810), "What each product record holds", fill=INK, font=try_font(18, bold=True))
    chips = [
        "UX analysis",
        "Screens",
        "Workflows",
        "Features",
        "Architecture",
        "Stack notes",
        "Competitive set",
    ]
    chip_f = try_font(14, bold=True)
    cx = 72
    for chip in chips:
        tw = int(draw.textlength(chip, font=chip_f)) + 28
        draw.rounded_rectangle(
            (cx, 860, cx + tw, 896), radius=999, fill=(236, 242, 244), outline=LINE
        )
        draw.text((cx + 14, 868), chip, fill=ACCENT, font=chip_f)
        cx += tw + 12

    out = OUT / "diagram-system.png"
    img.save(out, "PNG", optimize=True)
    print("diagram", out.name)
    return out


def draw_ia() -> Path:
    """Catalog → product brief → analysis lenses."""
    img = Image.new("RGB", (DIAG_W, DIAG_H), BG)
    draw = ImageDraw.Draw(img)
    title = try_font(28, bold=True)
    body = try_font(15)

    draw.text((48, 36), "ProductBench information architecture", fill=INK, font=title)
    draw.text(
        (48, 78),
        "Two ways in — browse/filter and semantic search — converge on the same product brief and depth lenses.",
        fill=MUTED,
        font=body,
    )

    rounded_card(
        draw,
        (48, 160),
        (380, 200),
        "Browse & filter",
        [
            "Category · segment · platform",
            "Sort + facet controls",
            "Bento catalog of products",
        ],
    )
    rounded_card(
        draw,
        (48, 400),
        (380, 200),
        "Semantic search",
        [
            "Products · companies · features",
            "Related concepts & peers",
            "Jump straight to a brief",
        ],
    )
    rounded_card(
        draw,
        (540, 260),
        (420, 220),
        "Product brief",
        [
            "Craft narrative + metrics",
            "Roles · IA depth · page counts",
            "Surface preview gallery",
            "Visit site · contribute detail",
        ],
        accent=True,
        fill=(236, 242, 244),
    )

    lenses = [
        ("UX analysis", "Patterns, density, navigation"),
        ("Screens", "Categorized captures"),
        ("Workflows", "Steps by role"),
        ("Features", "Capability inventory"),
        ("Architecture", "Structure & peers"),
    ]
    label_f = try_font(15, bold=True)
    small = try_font(12)
    for i, (t, d) in enumerate(lenses):
        y = 150 + i * 120
        draw.rounded_rectangle(
            (1080, y, 1552, y + 100), radius=14, fill=CARD, outline=LINE
        )
        draw.text((1104, y + 22), t, fill=INK, font=label_f)
        draw.text((1104, y + 54), d, fill=MUTED, font=small)

    arrow(draw, (428, 260), (540, 340))
    arrow(draw, (428, 500), (540, 400))
    arrow(draw, (960, 370), (1080, 370))

    draw.text(
        (48, 680),
        "Guests get a useful preview; members unlock the full captured gallery so public depth stays lean.",
        fill=MUTED,
        font=body,
    )

    # Journey strip
    stages = ["Home", "Catalog", "Product brief", "Depth lenses", "Contribute"]
    chip_f = try_font(14, bold=True)
    x = 48
    for i, stage in enumerate(stages):
        tw = int(draw.textlength(stage, font=chip_f)) + 36
        draw.rounded_rectangle(
            (x, 760, x + tw, 808),
            radius=999,
            fill=ACCENT if i == 2 else CARD,
            outline=LINE if i != 2 else ACCENT,
        )
        draw.text(
            (x + 18, 774),
            stage,
            fill=(255, 255, 255) if i == 2 else INK,
            font=chip_f,
        )
        if i < len(stages) - 1:
            arrow(draw, (x + tw + 4, 784), (x + tw + 48, 784))
            x += tw + 56
        else:
            x += tw + 16

    out = OUT / "diagram-ia.png"
    img.save(out, "PNG", optimize=True)
    print("diagram", out.name)
    return out


def draw_research_model() -> Path:
    """What gets documented per product — visual taxonomy without capture-tool detail."""
    img = Image.new("RGB", (DIAG_W, DIAG_H), BG)
    draw = ImageDraw.Draw(img)
    title = try_font(28, bold=True)
    body = try_font(15)
    label = try_font(16, bold=True)
    small = try_font(13)

    draw.text((48, 36), "What a product record documents", fill=INK, font=title)
    draw.text(
        (48, 78),
        "Enough structure to inform decisions — not just a moodboard of hero images.",
        fill=MUTED,
        font=body,
    )

    columns = [
        (
            "Interface",
            TEAL,
            [
                "Key screens & IA shell",
                "Reusable components",
                "Empty / loading / error states",
                "Density & navigation model",
            ],
        ),
        (
            "Work",
            ACCENT,
            [
                "End-to-end workflows",
                "Steps mapped to roles",
                "Feature inventory",
                "Integrations & platforms",
            ],
        ),
        (
            "Structure",
            MINT,
            [
                "Page / screen counts",
                "Estimated IA depth",
                "Competitive set",
                "Architecture signals",
            ],
        ),
    ]

    for i, (name, color, items) in enumerate(columns):
        x = 48 + i * 520
        draw.rounded_rectangle(
            (x, 150, x + 480, 560), radius=18, fill=CARD, outline=LINE
        )
        draw.rounded_rectangle((x + 24, 178, x + 72, 226), radius=12, fill=color)
        draw.text((x + 88, 188), name, fill=INK, font=try_font(22, bold=True))
        ty = 260
        for item in items:
            draw.ellipse((x + 36, ty + 6, x + 48, ty + 18), fill=color)
            draw.text((x + 64, ty), item, fill=MUTED, font=label)
            ty += 48

    draw.rounded_rectangle((48, 620, 1552, 900), radius=18, fill=CARD, outline=LINE)
    draw.text((72, 656), "Where it fits in the product journey", fill=INK, font=try_font(20, bold=True))
    journey = [
        ("Discovery", "Map peers by category\nand pattern"),
        ("Framing", "Reference roles &\nconstraints in briefs"),
        ("Exploration", "Study nav, density,\ninteraction models"),
        ("Critique", "Ground reviews in\nshared examples"),
        ("Handoff", "Keep architecture\ntrade-offs visible"),
        ("Iteration", "Revisit as the\nproduct matures"),
    ]
    for i, (t, d) in enumerate(journey):
        x = 72 + i * 250
        draw.text((x, 720), t, fill=ACCENT, font=label)
        for j, line in enumerate(d.split("\n")):
            draw.text((x, 752 + j * 22), line, fill=MUTED, font=small)

    out = OUT / "diagram-research.png"
    img.save(out, "PNG", optimize=True)
    print("diagram", out.name)
    return out


def compose_boards() -> None:
    boards = {
        "product-home.png": "01-home.png",
        "product-home-full.png": "01-home-full.png",
        "product-home-featured.png": "02-home-featured.png",
        "product-home-value.png": "02b-home-value.png",
        "product-home-journey.png": "02c-home-journey.png",
        "product-catalog.png": "03b-catalog-clean.png",
        "product-search.png": "04-catalog-search.png",
        "product-detail.png": "06b-product-linear.png",
        "product-surfaces.png": "07-product-linear-surfaces.png",
        "product-screens.png": "08-product-linear-screens.png",
        "product-workflows.png": "09-product-linear-workflows.png",
        "product-analysis.png": "10-product-linear-analysis.png",
        "product-stripe.png": "11-product-stripe.png",
        "product-stripe-surfaces.png": "11b-product-stripe-surfaces.png",
        "product-notion.png": "12-product-notion.png",
        "product-about.png": "13-about.png",
        "product-about-full.png": "13-about-full.png",
        "product-about-journey.png": "13b-about-journey.png",
        "product-process.png": "15-process.png",
        "product-process-full.png": "15-process-full.png",
        "product-process-taxonomy.png": "15b-process-taxonomy.png",
        "product-contribute.png": "14-contribute.png",
    }

    for out_name, src_name in list(boards.items()):
        if not (SRC / src_name).exists():
            print(f"missing {src_name}")
            del boards[out_name]

    for out_name, src_name in boards.items():
        src = SRC / src_name
        dest = OUT / out_name
        if "full" in out_name:
            # Tall full-page captures: fix width, keep aspect (do not use -Z)
            subprocess.run(
                [
                    "sips",
                    "--resampleWidth",
                    str(BOARD_W),
                    str(src),
                    "--out",
                    str(dest),
                ],
                check=True,
                capture_output=True,
            )
        else:
            sips_resize(src, dest, BOARD_W)
        print("board", dest.name)

    card_src = SRC / "01-home.png"
    if card_src.exists():
        sips_crop_center(card_src, OUT / "productbench_card.png", CARD_W, CARD_H)
        print("card productbench_card.png")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    draw_system_model()
    draw_ia()
    draw_research_model()
    compose_boards()


if __name__ == "__main__":
    main()
