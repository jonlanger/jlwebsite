#!/usr/bin/env python3
"""Compose ProposalPal product boards from live captures + portfolio source."""

from __future__ import annotations

import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "projects" / "proposalpal" / "_src"
OUT = ROOT / "public" / "projects" / "proposalpal"

BOARD_W, BOARD_H = 1800, 1000
CARD_W, CARD_H = 1280, 720


def sips_resize(src: Path, dest: Path, width: int, height: int | None = None) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    cmd = ["sips", "-z" if height else "-Z", str(height if height else width)]
    if height:
        cmd = ["sips", "-z", str(height), str(width)]
    else:
        cmd = ["sips", "-Z", str(width)]
    cmd += [str(src), "--out", str(dest)]
    subprocess.run(cmd, check=True, capture_output=True)


def sips_crop_center(src: Path, dest: Path, width: int, height: int) -> None:
    """Resize to cover then crop to exact card size via sips pad/crop."""
    # First get source dims
    out = subprocess.check_output(["sips", "-g", "pixelWidth", "-g", "pixelHeight", str(src)], text=True)
    sw = int([l for l in out.splitlines() if "pixelWidth" in l][0].split()[-1])
    sh = int([l for l in out.splitlines() if "pixelHeight" in l][0].split()[-1])
    scale = max(width / sw, height / sh)
    rw, rh = int(sw * scale + 0.5), int(sh * scale + 0.5)
    tmp = dest.with_suffix(".tmp.png")
    subprocess.run(["sips", "-z", str(rh), str(rw), str(src), "--out", str(tmp)], check=True, capture_output=True)
    # cropOffset from top-left
    ox = max(0, (rw - width) // 2)
    oy = max(0, (rh - height) // 2)
    # Prefer slightly upper crop for UI chrome
    oy = max(0, int((rh - height) * 0.15))
    subprocess.run(
        ["sips", "--cropToHeightWidth", str(height), str(width), "--cropOffset", str(oy), str(ox), str(tmp), "--out", str(dest)],
        check=True,
        capture_output=True,
    )
    tmp.unlink(missing_ok=True)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)

    # Map: output name -> source file
    boards = {
        "product-home.png": "29-home-light.png" if (SRC / "29-home-light.png").exists() else "01-home.png",
        "product-intake.png": "14-new-proposal-complete.png" if (SRC / "14-new-proposal-complete.png").exists() else "03-new-proposal.png",
        "product-workspace-overview.png": "30-workspace-overview.png",
        "product-client-research.png": "32-module-00-client-research.png",
        "product-team-formation.png": "portfolio-source.png",
        "product-storyline.png": "32-module-04-storyline-proposal.png",
        "product-commercial.png": "32-module-05-commercial-approach.png",
        "product-polish.png": "33-module-06-polish-proposal-action.png",
        "product-help.png": "02-help.png",
    }

    # Fallbacks if preferred missing
    for out_name, src_name in list(boards.items()):
        if not (SRC / src_name).exists():
            print(f"missing {src_name}")
            del boards[out_name]

    for out_name, src_name in boards.items():
        src = SRC / src_name
        dest = OUT / out_name
        # High-res portfolio source: resize to board width
        if src_name == "portfolio-source.png":
            sips_resize(src, dest, BOARD_W)
        else:
            sips_resize(src, dest, BOARD_W)
        # report dims
        dims = subprocess.check_output(["sips", "-g", "pixelWidth", "-g", "pixelHeight", str(dest)], text=True)
        print(out_name, dims.replace("\n", " "))

    # Card from home (light) — strongest brand signal
    card_src = SRC / ("29-home-light.png" if (SRC / "29-home-light.png").exists() else "01-home.png")
    sips_crop_center(card_src, OUT / "proposalpal_card.png", CARD_W, CARD_H)
    print("card done")

    # Alternate card from team formation if home is weak
    # Keep home as primary.

    print("wrote to", OUT)


if __name__ == "__main__":
    main()
