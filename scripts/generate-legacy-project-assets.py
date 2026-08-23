#!/usr/bin/env python3
"""Generate card thumbnails and optimized boards for the legacy case-study projects.

The card crop reproduces the CSS the /projects grid used to apply at runtime:

    fill + object-cover + object-position:right top, inside an aspect-video box,
    then transform-origin:100% 0; scale:4; translate:0 TY

Tailwind v4 emits the individual `scale` / `translate` properties, which compose
about the transform origin. For a point (x, y) in a W-wide border box with
origin (W, 0) that gives p' = (4x - 3W, 4y + TY), so the visible region clipped
to the box is the right quarter horizontally and starts at -TY/4 vertically.
Mapping back through object-cover (scale W/1960, offset 0) yields crop constants
that are independent of the source height.

Board output is capped at 1920px wide so next/image's optimizer never hits
libwebp's 16383px dimension limit -- sharp throws there and Next silently falls
back to serving the raw multi-megabyte PNG.
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
PROJECTS = PUBLIC / "projects"

SRC_W = 1960
# Card width in CSS px at the canonical lg 3-column layout:
# max-w-6xl 1152 - lg:px-14 112 -> clamped to max-w-[900px] -> (900 - 2*20)/3
# -> minus Card !p-3 (2*12).
CARD_CSS_W = 262.667
RATIO = SRC_W / CARD_CSS_W

CROP_W = SRC_W // 4                 # 490 - the right quarter
CROP_H = round(CROP_W * 9 / 16)     # 276 - aspect-video
CROP_L = SRC_W - CROP_W             # 1470

CARD_W, CARD_H = 1024, 576
CARD_QUALITY = 80
BOARD_W = 1920
BOARD_QUALITY = 82
WEBP_MAX_DIM = 16383

# slug -> (board filename under public/projects, css translate-y in px)
# The filename is NOT derivable from the slug: several entries point at another
# project's board. Values come straight from `image:` in src/data/past-projects.ts.
BOARDS: dict[str, tuple[str, int]] = {
    "accessible-fastener": ("accessible-fastener.png", 100),
    "ai-camera-nodit": ("voxelplm.png", 160),
    "h2-audio": ("ai-camera-nodit.png", 100),
    "e-syringe": ("e-syringe.png", 100),
    "ecowell-c79b": ("ecowell-c79b.png", 100),
    "ecowell-c8l9": ("ecowell-c8l9.png", 100),
    "footwear-sketches": ("footwear-sketches.png", 100),
    "laser-scalpel": ("laser-scalpel.png", 100),
    "lllt-knee-brace-c1zug": ("lllt-knee-brace-c1zug.png", 100),
    "lllt-knee-osteoarthritis": ("lllt-knee-osteoarthritis.png", 100),
    "medical-recovery-systems": ("medical-recovery-systems.png", 100),
    "medication-adherence": ("medication-adherence.png", 100),
    "micro-windmill": ("micro-windmill.png", 100),
    "moto-id": ("moto-id.png", 100),
    "oasis": ("oasis.png", 100),
    "smart-hydration-platform": ("smart-hydration-platform.png", 100),
    "solar-field-installation": ("solar-field-installation.png", 100),
    "stemcell-spray": ("stemcell-spray.png", 100),
    "stemcell-spray-alt": ("stemcell-spray-alt.png", 100),
    "uav-humanitarian-delivery": ("uav-humanitarian-delivery.png", 100),
    "vaccine-transport": ("vaccine-transport.png", 100),
    "vaccine-transport-c23c1": ("vaccine-transport-c23c1.png", 100),
    "mdx": ("voxelplm-board-1.png", 100),
    "teleoperation-station": ("teleoperation-station.png", 100),
    "voxelplm": ("autonomous-shipping.png", 160),
    "animation-physics": ("animation-physics.png", 100),
}


def crop_top(translate_y: int) -> int:
    """Vertical crop offset in source px for a given CSS translate-y."""
    return round((translate_y / 4) * RATIO)  # 187 for 100, 298 for 160


def make_card(board: Image.Image, dest: Path, translate_y: int) -> None:
    top = crop_top(translate_y)
    box = (CROP_L, top, CROP_L + CROP_W, top + CROP_H)
    if box[3] > board.height:
        raise SystemExit(
            f"{dest.name}: board is only {board.height}px tall, crop needs {box[3]}"
        )
    card = board.crop(box).resize((CARD_W, CARD_H), Image.Resampling.LANCZOS)
    dest.parent.mkdir(parents=True, exist_ok=True)
    card.save(dest, "WEBP", quality=CARD_QUALITY, method=6)


def make_board(board: Image.Image, dest: Path) -> tuple[int, int]:
    height = round(board.height * BOARD_W / board.width)
    if height > WEBP_MAX_DIM:
        raise SystemExit(
            f"{dest.name}: {BOARD_W}x{height} exceeds libwebp's {WEBP_MAX_DIM}px limit"
        )
    out = board.resize((BOARD_W, height), Image.Resampling.LANCZOS)
    dest.parent.mkdir(parents=True, exist_ok=True)
    out.save(dest, "WEBP", quality=BOARD_QUALITY, method=5)
    return BOARD_W, height


def main() -> None:
    for slug, (filename, translate_y) in BOARDS.items():
        src = PROJECTS / filename
        if not src.exists():
            raise SystemExit(f"{slug}: missing source board {src}")
        with Image.open(src) as opened:
            board = opened.convert("RGB")
        if board.width != SRC_W:
            raise SystemExit(
                f"{filename}: expected width {SRC_W}, got {board.width}"
            )

        out_dir = PROJECTS / slug
        make_card(board, out_dir / f"{slug}_card.webp", translate_y)
        width, height = make_board(board, out_dir / f"{slug}_board.webp")
        board.close()

        print(
            f'{slug}\n'
            f'  image: "/projects/{slug}/{slug}_card.webp", '
            f'width: {CARD_W}, height: {CARD_H}\n'
            f'  board: {{ src: "/projects/{slug}/{slug}_board.webp", '
            f'width: {width}, height: {height} }},'
        )

    print(f"\ndone - {len(BOARDS)} projects")


if __name__ == "__main__":
    main()
