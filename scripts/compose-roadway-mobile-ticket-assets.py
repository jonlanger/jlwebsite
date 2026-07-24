#!/usr/bin/env python3
"""Compose landscape product boards for Roadway Mobile Ticket Experience.

Mirrors scripts/compose-pool-robot-assets.py: 2–3 phone screens per slide
on an 1800×1013 board. Card is a 1280×720 crop of one interesting screenshot.
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "projects" / "roadway-mobile-ticket"
PHONES = OUT / "_phones"

BOARD_W, BOARD_H = 1800, 1013
CARD_W, CARD_H = 1280, 720
BG = (245, 245, 247)


def load(path: Path) -> Image.Image:
    return Image.open(path).convert("RGBA")


def fit_height(img: Image.Image, target_h: int) -> Image.Image:
    ratio = target_h / img.height
    return img.resize((max(1, int(img.width * ratio)), target_h), Image.Resampling.LANCZOS)


def rounded(img: Image.Image, radius: int = 28) -> Image.Image:
    img = img.convert("RGBA")
    mask = Image.new("L", img.size, 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle((0, 0, img.width, img.height), radius=radius, fill=255)
    out = Image.new("RGBA", img.size, (0, 0, 0, 0))
    out.paste(img, (0, 0), mask)
    return out


def soft_shadow(size: tuple[int, int], radius: int = 28, blur: int = 18) -> Image.Image:
    w, h = size
    shadow = Image.new("RGBA", (w + blur * 4, h + blur * 4), (0, 0, 0, 0))
    draw = ImageDraw.Draw(shadow)
    for i in range(blur, 0, -1):
        alpha = int(18 * (1 - i / blur))
        inset = blur - i
        draw.rounded_rectangle(
            (inset + blur, inset + blur + 4, w + blur * 3 - inset, h + blur * 3 - inset + 4),
            radius=radius + i // 2,
            fill=(0, 0, 0, alpha),
        )
    return shadow


def compose_phones(paths: list[Path], out_name: str) -> Path:
    """Lay out 2–3 app screens at native aspect ratio (never stretched)."""
    if not 2 <= len(paths) <= 3:
        raise ValueError(f"{out_name}: expected 2–3 screens, got {len(paths)}")

    margin, gap = 56, 36
    images = [load(p) for p in paths]
    n = len(images)
    max_phone_h = BOARD_H - 2 * margin
    max_total_w = BOARD_W - 2 * margin

    scaled = [fit_height(p, max_phone_h) for p in images]
    content_w = sum(p.width for p in scaled) + gap * (n - 1)
    if content_w > max_total_w:
        shrink = max_total_w / content_w
        scaled = [
            p.resize(
                (max(1, int(p.width * shrink)), max(1, int(p.height * shrink))),
                Image.Resampling.LANCZOS,
            )
            for p in scaled
        ]

    scaled = [rounded(p, radius=max(20, p.width // 26)) for p in scaled]

    board = Image.new("RGB", (BOARD_W, BOARD_H), BG)
    total_w = sum(p.width for p in scaled) + gap * (n - 1)
    x = (BOARD_W - total_w) // 2
    for phone in scaled:
        y = (BOARD_H - phone.height) // 2
        shadow = soft_shadow(phone.size, radius=max(20, phone.width // 26))
        board.paste(shadow, (x - 18, y - 14), shadow)
        board.paste(phone, (x, y), phone)
        x += phone.width + gap

    out = OUT / out_name
    board.save(out, "PNG", optimize=True)
    print(f"wrote {out.relative_to(ROOT)} ({n} phones)")
    return out


def compose_card_crop(src: Path, out_name: str = "roadway-mobile-ticket_card.png") -> Path:
    """1280×720 cover-crop of the interesting map/station region of one screenshot."""
    img = load(src).convert("RGB")
    # Focus on search + chainage map (skip bottom tab chrome)
    top = int(img.height * 0.08)
    bottom = int(img.height * 0.62)
    region = img.crop((0, top, img.width, bottom))

    # Cover-fit into 16:9 card
    scale = max(CARD_W / region.width, CARD_H / region.height)
    resized = region.resize(
        (max(1, int(region.width * scale)), max(1, int(region.height * scale))),
        Image.Resampling.LANCZOS,
    )
    x = (resized.width - CARD_W) // 2
    y = (resized.height - CARD_H) // 2
    card = resized.crop((x, y, x + CARD_W, y + CARD_H))

    out = OUT / out_name
    card.save(out, "PNG", optimize=True)
    print(f"wrote {out.relative_to(ROOT)} (crop from {src.name})")
    return out


def p(name: str) -> Path:
    path = PHONES / name
    if not path.exists():
        raise FileNotFoundError(path)
    return path


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)

    # --- Main product story (≤3 phones per slide) ---
    compose_phones(
        [p("01-map-chainage.png"), p("02-map-city.png"), p("03-search-manhattan.png")],
        "product-map-explore.png",
    )
    compose_phones(
        [p("04-drawer-station.png"), p("05-drawer-media.png"), p("06-drawer-compact.png")],
        "product-project-drawer.png",
    )
    compose_phones(
        [p("08-set-sample-location.png"), p("12-associate-project.png"), p("18-drawer-variant.png")],
        "product-ticket-entry.png",
    )
    compose_phones(
        [p("09-sample-form.png"), p("10-sample-confirmed.png"), p("11-item-form.png")],
        "product-ticket-forms.png",
    )
    compose_phones(
        [p("07-completed-forms.png"), p("20-completed-forms-2.png"), p("05-drawer-media.png")],
        "product-multimedia.png",
    )

    # --- Accordion: ticket creation ---
    compose_phones(
        [p("08-set-sample-location.png"), p("09-sample-form.png"), p("10-sample-confirmed.png")],
        "product-sample-flow.png",
    )
    compose_phones(
        [p("11-item-form.png"), p("14-traffic-control-form.png"), p("15-traffic-checklist.png")],
        "product-item-traffic.png",
    )
    compose_phones(
        [p("16-meeting-form.png"), p("17-workzone-form.png"), p("12-associate-project.png")],
        "product-other-forms.png",
    )

    # --- Accordion: search & field docs ---
    compose_phones(
        [p("03-search-manhattan.png"), p("19-search-location-2.png"), p("13-search-results.png")],
        "product-search.png",
    )
    compose_phones(
        [p("04-drawer-station.png"), p("07-completed-forms.png"), p("05-drawer-media.png")],
        "product-docs-on-map.png",
    )
    compose_phones(
        [p("01-map-chainage.png"), p("18-drawer-variant.png"), p("06-drawer-compact.png")],
        "product-station-context.png",
    )

    # Card: crop of chainage map screenshot
    compose_card_crop(p("01-map-chainage.png"))

    # Remove leftover single-phone product files from the first pass
    for stale in [
        "product-map-view.png",
        "product-drawer-media.png",
        "product-set-sample-location.png",
        "product-sample-form.png",
        "product-item-form.png",
        "product-search-location.png",
        "product-completed-forms.png",
        "product-traffic-control.png",
    ]:
        path = OUT / stale
        if path.exists():
            path.unlink()
            print(f"removed stale {stale}")

    print("done")


if __name__ == "__main__":
    main()
