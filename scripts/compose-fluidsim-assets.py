#!/usr/bin/env python3
"""Compose the fluidsim case-study assets from the raw Playwright captures.

Sources are 2880x1800 (1440x900 @2x) PNGs in public/projects/fluidsim/_src,
written by scripts/capture-fluidsim.mjs. Outputs WebP: slides at 1800 wide for
the 900px content column at 2x, plus a 16:9 card cropped to the particle swarm.
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "projects" / "fluidsim"
SRC = OUT / "_src"

SLIDE_W = 1800
SLIDE_QUALITY = 82
CARD_W, CARD_H = 1024, 576
CARD_QUALITY = 82

# capture name -> published slide name
SLIDES = {
    "01-full": "product-full-interface",
    "02-simulation-panel": "product-simulation-panel",
    "03-clean": "product-swarm",
    "04-recorded-clip": "product-recorded-clip",
    "05-main-flow": "product-main-flow",
    "06-export": "product-export",
}

# 16:9 window onto 03-clean, framed on the swarm and clear of the title text
# above and the record bar below.
CARD_SRC = "03-clean"
CARD_CROP = (382, 423, 382 + 1900, 423 + 1069)


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
        height = round(image.height * SLIDE_W / image.width)
        resized = image.resize((SLIDE_W, height), Image.Resampling.LANCZOS)
        dest = OUT / f"{out_name}.webp"
        save_webp(resized, dest, SLIDE_QUALITY)
        print(f"slide  {dest.name:34} {SLIDE_W}x{height}")


def build_card() -> None:
    src = SRC / f"{CARD_SRC}.png"
    with Image.open(src) as opened:
        image = opened.convert("RGB")
    left, top, right, bottom = CARD_CROP
    if right > image.width or bottom > image.height:
        raise SystemExit(f"card crop {CARD_CROP} exceeds {image.size}")
    card = image.crop(CARD_CROP).resize(
        (CARD_W, CARD_H), Image.Resampling.LANCZOS
    )
    dest = OUT / "fluidsim_card.webp"
    save_webp(card, dest, CARD_QUALITY)
    print(f"card   {dest.name:34} {CARD_W}x{CARD_H}")


# Rendered STL stills from scripts/render-fluidsim-stls.mjs (1600x1200).
STL_SRC = SRC / "stl"
STL_W = 1400
STL_QUALITY = 84

STL_RENDERS = {
    "stl-wholesim": "export-unfiltered",
    "stl-mainflow": "export-main-flow",
    "stl-density2": "export-density-tight",
    "stl-density4": "export-density-loose",
    "stl-tubelean": "export-tube-sweep",
    "stl-lowthick": "export-tube-thin",
    "stl-fluid": "export-fluid",
    "stl-fluid-random": "export-fluid-random",
    "stl-largest-mass": "export-largest-mass",
}


def build_stl_renders() -> None:
    for src_name, out_name in STL_RENDERS.items():
        src = STL_SRC / f"{src_name}.png"
        if not src.exists():
            raise SystemExit(f"missing render {src}")
        with Image.open(src) as opened:
            image = opened.convert("RGB")
        height = round(image.height * STL_W / image.width)
        resized = image.resize((STL_W, height), Image.Resampling.LANCZOS)
        dest = OUT / f"{out_name}.webp"
        save_webp(resized, dest, STL_QUALITY)
        print(f"render {dest.name:34} {STL_W}x{height}")


def main() -> None:
    build_slides()
    build_stl_renders()
    build_card()


if __name__ == "__main__":
    main()
