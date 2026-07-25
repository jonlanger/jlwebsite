#!/usr/bin/env python3
"""Compose product boards for Applied AI Marketplace case study.

Source phone photos live under public/projects/applied-ai-marketplace/_src/.
Outputs clean product-*.png files plus card art and an IA diagram.
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "projects" / "applied-ai-marketplace"
# Portfolio source photos live outside the repo (BCG Portfolio/Marketplace).
MARKETPLACE = Path.home() / "Documents/Documents/BCG/BCG Portfolio/Marketplace"
LAUNCHED = MARKETPLACE / "Marketplace Launched Q3"
HIGH_RES = MARKETPLACE / "Marketplace High Res"
RESEARCH = MARKETPLACE / "Marketplace Initial User Research"
Q1 = MARKETPLACE / "Marketplace Q1 2026"
DESKTOP_SHOT = next(MARKETPLACE.glob("Screenshot*.png"), None)

BOARD_W, BOARD_H = 1800, 1013
CARD_W, CARD_H = 1280, 720
IA_W, IA_H = 1440, 810
BG = (245, 245, 247)
INK = (28, 28, 30)
MUTED = (90, 90, 95)
LINE = (200, 200, 205)
ACCENT = (0, 120, 90)
CARD_BG = (255, 255, 255)


def load(path: Path) -> Image.Image:
    return Image.open(path).convert("RGB")


def content_bbox(img: Image.Image, bright_threshold: int = 40) -> tuple[int, int, int, int]:
    """Find the bright UI region inside phone Photos chrome / dark letterbox."""
    gray = img.convert("L")
    w, h = gray.size
    px = gray.load()
    assert px is not None

    def row_bright(y: int) -> bool:
        step = max(1, w // 80)
        vals = [px[x, y] for x in range(0, w, step)]
        return sum(1 for v in vals if v > bright_threshold) / len(vals) > 0.35

    def col_bright(x: int) -> bool:
        step = max(1, h // 80)
        vals = [px[x, y] for y in range(0, h, step)]
        return sum(1 for v in vals if v > bright_threshold) / len(vals) > 0.35

    top = 0
    while top < h - 1 and not row_bright(top):
        top += 1
    bottom = h - 1
    while bottom > top and not row_bright(bottom):
        bottom -= 1
    left = 0
    while left < w - 1 and not col_bright(left):
        left += 1
    right = w - 1
    while right > left and not col_bright(right):
        right -= 1

    # Trim residual Photos chrome if content still spans nearly full frame
    if top < h * 0.08:
        top = int(h * 0.06)
    if bottom > h * 0.92:
        bottom = int(h * 0.94)
    if left < w * 0.02:
        left = int(w * 0.015)
    if right > w * 0.98:
        right = int(w * 0.985)

    return left, top, right + 1, bottom + 1


def crop_ui(path: Path) -> Image.Image:
    img = load(path)
    box = content_bbox(img)
    return img.crop(box)


def fit_contain(img: Image.Image, tw: int, th: int, bg: tuple[int, int, int] = BG) -> Image.Image:
    ratio = min(tw / img.width, th / img.height)
    nw, nh = max(1, int(img.width * ratio)), max(1, int(img.height * ratio))
    resized = img.resize((nw, nh), Image.Resampling.LANCZOS)
    canvas = Image.new("RGB", (tw, th), bg)
    canvas.paste(resized, ((tw - nw) // 2, (th - nh) // 2))
    return canvas


def fit_cover(
    img: Image.Image, tw: int, th: int, top_bias: float = 0.0
) -> Image.Image:
    ratio = max(tw / img.width, th / img.height)
    nw, nh = max(1, int(img.width * ratio)), max(1, int(img.height * ratio))
    resized = img.resize((nw, nh), Image.Resampling.LANCZOS)
    left = (nw - tw) // 2
    max_top = nh - th
    top = int(max_top * (0.5 + top_bias))
    top = max(0, min(max_top, top))
    return resized.crop((left, top, left + tw, top + th))


def save_board(img: Image.Image, name: str) -> Path:
    out = OUT / name
    fit_contain(img, BOARD_W, BOARD_H).save(out, "PNG", optimize=True)
    print(f"wrote {out.relative_to(ROOT)} ({BOARD_W}x{BOARD_H})")
    return out


def save_cover_board(
    img: Image.Image, name: str, top_bias: float = 0.0
) -> Path:
    out = OUT / name
    fit_cover(img, BOARD_W, BOARD_H, top_bias=top_bias).save(
        out, "PNG", optimize=True
    )
    print(f"wrote {out.relative_to(ROOT)} ({BOARD_W}x{BOARD_H}) cover")
    return out


def save_card(img: Image.Image, name: str = "applied-ai-marketplace_card.png") -> Path:
    out = OUT / name
    fit_cover(img, CARD_W, CARD_H).save(out, "PNG", optimize=True)
    print(f"wrote {out.relative_to(ROOT)} ({CARD_W}x{CARD_H})")
    return out


def compose_homepage_sections(home: Image.Image) -> None:
    """Close-ups from the tall homepage scroll + landscape browse framing.

    Uses contain (not cover) so section titles aren't side-cropped.
    """
    w, h = home.size
    save_board(
        home.crop((0, int(h * 0.00), w, int(h * 0.30))),
        "product-homepage-hero.png",
    )
    save_board(
        home.crop((0, int(h * 0.22), w, int(h * 0.48))),
        "product-homepage-assets.png",
    )
    save_board(
        home.crop((0, int(h * 0.42), w, int(h * 0.66))),
        "product-homepage-collections.png",
    )
    browse = LAUNCHED / "IMG_0492.PNG"
    if browse.exists():
        save_board(crop_ui(browse), "product-homepage-browse.png")


def try_font(size: int, bold: bool = False) -> ImageFont.ImageFont:
    candidates = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
        "/Library/Fonts/Arial.ttf",
    ]
    for path in candidates:
        try:
            return ImageFont.truetype(path, size=size)
        except OSError:
            continue
    return ImageFont.load_default()


def draw_ia() -> Path:
    """Two entry paths (Search/Chat, Browse) converging into PDP → CTA."""
    img = Image.new("RGB", (IA_W, IA_H), BG)
    draw = ImageDraw.Draw(img)
    title_font = try_font(28, bold=True)
    label_font = try_font(18, bold=True)
    body_font = try_font(15)
    small_font = try_font(13)

    draw.text((48, 36), "Marketplace information architecture", fill=INK, font=title_font)
    draw.text(
        (48, 78),
        "Search/chat and curated browse converge on one product detail template.",
        fill=MUTED,
        font=body_font,
    )

    def card(xy: tuple[int, int], wh: tuple[int, int], title: str, lines: list[str], accent: bool = False) -> None:
        x, y = xy
        w, h = wh
        draw.rounded_rectangle((x, y, x + w, y + h), radius=14, fill=CARD_BG, outline=ACCENT if accent else LINE, width=2 if accent else 1)
        draw.text((x + 18, y + 16), title, fill=ACCENT if accent else INK, font=label_font)
        ty = y + 48
        for line in lines:
            draw.text((x + 18, ty), line, fill=MUTED, font=small_font)
            ty += 22

    def arrow(a: tuple[int, int], b: tuple[int, int]) -> None:
        draw.line([a, b], fill=LINE, width=2)
        # simple chevron
        bx, by = b
        draw.polygon([(bx, by), (bx - 10, by - 6), (bx - 10, by + 6)], fill=MUTED)

    # Entry cards
    card((48, 160), (360, 150), "Search / Chat", [
        "Natural-language ask",
        "Multi-theme results",
        "Graceful zero-result handling",
    ])
    card((48, 360), (360, 180), "Browse", [
        "Trending & curated collections",
        "Use Case / Case Stage",
        "Industry / Function / Asset Type",
        "Faceted filter + grid/list",
    ])

    # Catalog hub
    card((520, 250), (360, 160), "Unified catalog", [
        "750+ assets · 9 types",
        "10+ repos → one source of truth",
        "Security-vetted inventory",
    ], accent=True)

    # PDP + CTA
    card((990, 180), (400, 150), "Product Detail Page", [
        "One template for every asset",
        "Metadata: type, IPA, FPA, use case",
        "Access & pricing in the same shell",
    ])
    card((990, 380), (400, 170), "CTA by access model", [
        "Free → Launch Asset",
        "Licensed / gated → Request Access",
        "Paid → Purchase",
        "One-time · usage · per-seat recurring",
    ], accent=True)

    arrow((408, 235), (520, 310))
    arrow((408, 450), (520, 350))
    arrow((880, 330), (990, 255))
    arrow((1190, 330), (1190, 380))

    out = OUT / "product-ia.png"
    img.save(out, "PNG", optimize=True)
    print(f"wrote {out.relative_to(ROOT)} ({IA_W}x{IA_H})")
    return out


def crop_research_poc(path: Path, box: tuple[float, float, float, float]) -> Image.Image:
    """Crop a normalized box (fractions of width/height) from a FigJam board."""
    img = load(path)
    w, h = img.size
    l, t, r, b = box
    return img.crop((int(w * l), int(h * t), int(w * r), int(h * b)))


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)

    # --- Product story boards (launched Q3 phone photos) ---
    product_map = {
        "product-homepage-search.png": LAUNCHED / "IMG_0504.PNG",
        "product-browse-filters.png": LAUNCHED / "IMG_0491.PNG",
        "product-browse-usecase.png": LAUNCHED / "IMG_0492.PNG",
        "product-browse-case-stage.png": LAUNCHED / "IMG_0493.PNG",
        "product-browse-industry.png": LAUNCHED / "IMG_0494.PNG",
        "product-browse-asset-type.png": LAUNCHED / "IMG_0495.PNG",
        "product-chat-slide-writing.png": LAUNCHED / "IMG_0497.PNG",
        "product-chat-multitheme.png": LAUNCHED / "IMG_0498.PNG",
        "product-chat-collections.png": LAUNCHED / "IMG_0499.PNG",
        "product-chat-zero.png": LAUNCHED / "IMG_0500.PNG",
        "product-chat-related.png": LAUNCHED / "IMG_0501.PNG",
        "product-chat-custom-gpts.png": LAUNCHED / "IMG_0502.PNG",
        "product-chat-survey-tools.png": LAUNCHED / "IMG_0503.PNG",
        "product-pdp-purchase-claude.png": LAUNCHED / "IMG_0506.PNG",
        "product-pdp-request-access.png": LAUNCHED / "IMG_0507.PNG",
        "product-pdp-launch.png": LAUNCHED / "IMG_0508.PNG",
        "product-pdp-usage-based.png": LAUNCHED / "IMG_0509.PNG",
        "product-pdp-recurring.png": LAUNCHED / "IMG_0510.PNG",
        "product-pdp-one-time.png": LAUNCHED / "IMG_0512.PNG",
    }

    for name, src in product_map.items():
        if not src.exists():
            print(f"skip missing {src.name}")
            continue
        save_board(crop_ui(src), name)

    # Prefer filled-in High Res capture, then Home_Default exports, then _src, then phone crop
    homepage_desktop = next(
        (
            p
            for p in (
                HIGH_RES / "image 1.png",
                HIGH_RES / "Home_Default.png",
                LAUNCHED / "Home_Default.png",
            )
            if p.exists()
        ),
        None,
    )
    homepage_full = OUT / "_src" / "homepage-full.png"
    homepage_src = LAUNCHED / "IMG_0490.PNG"
    if homepage_desktop is not None:
        home_ui = load(homepage_desktop)
        home_ui.save(OUT / "product-homepage-full-v5.png", "PNG", optimize=True)
        homepage_full.parent.mkdir(parents=True, exist_ok=True)
        home_ui.save(homepage_full, "PNG", optimize=True)
        save_board(home_ui, "product-homepage.png")
        w, h = home_ui.size
        save_card(home_ui.crop((0, int(h * 0.02), w, int(h * 0.20))))
        compose_homepage_sections(home_ui)
    elif homepage_full.exists():
        home_ui = load(homepage_full)
        save_board(home_ui, "product-homepage.png")
        w, h = home_ui.size
        save_card(home_ui.crop((0, 0, w, int(h * 0.42))))
        compose_homepage_sections(home_ui)
    elif homepage_src.exists():
        home_ui = crop_ui(homepage_src)
        save_board(home_ui, "product-homepage.png")
        save_card(home_ui)
        compose_homepage_sections(home_ui)

    # Cleaner desktop capture for optional catalog list board
    if DESKTOP_SHOT and DESKTOP_SHOT.exists():
        desk = load(DESKTOP_SHOT)
        save_board(desk, "product-catalog-list.png")

    # Mobile PDP (Q1 phone capture of responsive detail)
    mobile = Q1 / "IMG_0003.PNG"
    if mobile.exists():
        save_board(crop_ui(mobile), "product-mobile-pdp.png")
    mobile_home = Q1 / "IMG_0004.PNG"
    if mobile_home.exists():
        save_board(crop_ui(mobile_home), "product-mobile-home.png")

    # Research: POC FigJam crops (before) — sticky notes kept for context
    poc_catalog = RESEARCH / "IMG_8256.PNG"
    poc_chat = RESEARCH / "IMG_8257.PNG"
    if poc_catalog.exists():
        before = crop_research_poc(poc_catalog, (0.22, 0.18, 0.78, 0.78))
        save_board(before, "research-poc-catalog.png")
    if poc_chat.exists():
        before_chat = crop_research_poc(poc_chat, (0.18, 0.16, 0.82, 0.82))
        save_board(before_chat, "research-poc-chat-themes.png")

    draw_ia()
    print("done")


if __name__ == "__main__":
    main()
