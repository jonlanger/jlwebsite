#!/usr/bin/env python3
"""Compose Careshift boards, card art, and case-study diagrams."""

from __future__ import annotations

import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "projects" / "careshift" / "_src"
OUT = ROOT / "public" / "projects" / "careshift"

BOARD_W, BOARD_H = 1800, 1125
CARD_W, CARD_H = 1280, 720
DIAG_W, DIAG_H = 1600, 1000

BG = (247, 248, 246)
INK = (24, 26, 24)
MUTED = (95, 100, 94)
LINE = (212, 216, 208)
CARD = (255, 255, 255)
ACCENT = (26, 58, 47)   # deep green, matches Careshift primary
RUST = (176, 76, 56)    # needs-attention red used in the app
SAGE = (208, 224, 210)  # soft accent fill


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
    oy = max(0, int((rh - height) * 0.08))
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
    title_color: tuple[int, int, int] | None = None,
) -> None:
    x, y = xy
    w, h = wh
    title_font = try_font(19, bold=True)
    body_font = try_font(14)
    outline = ACCENT if accent else LINE
    draw.rounded_rectangle(
        (x, y, x + w, y + h),
        radius=16,
        fill=fill,
        outline=outline,
        width=2 if accent else 1,
    )
    draw.text(
        (x + 20, y + 18),
        title,
        fill=title_color or (ACCENT if accent else INK),
        font=title_font,
    )
    ty = y + 54
    for line in lines:
        draw.text((x + 20, ty), line, fill=MUTED, font=body_font)
        ty += 23


def arrow(draw: ImageDraw.ImageDraw, a: tuple[int, int], b: tuple[int, int]) -> None:
    draw.line([a, b], fill=LINE, width=2)
    bx, by = b
    if abs(b[0] - a[0]) >= abs(b[1] - a[1]):
        draw.polygon([(bx, by), (bx - 10, by - 6), (bx - 10, by + 6)], fill=MUTED)
    else:
        draw.polygon([(bx, by), (bx - 6, by - 10), (bx + 6, by - 10)], fill=MUTED)


def draw_sbar_map() -> Path:
    """Careshift's 4-step ritual mapped onto the SBAR clinical handoff framework."""
    img = Image.new("RGB", (DIAG_W, DIAG_H), BG)
    draw = ImageDraw.Draw(img)
    title = try_font(28, bold=True)
    body = try_font(15)

    draw.text((48, 36), "The brief ritual maps onto SBAR handoff structure", fill=INK, font=title)
    draw.text(
        (48, 78),
        "SBAR (Situation, Background, Assessment, Recommendation) is the standard clinical handoff framework — validated against Careshift's existing 4-step brief rather than invented from scratch.",
        fill=MUTED,
        font=body,
    )

    steps = [
        ("1", "Covering", "Situation", "Who you're covering, setting, and when the last handoff happened."),
        ("2", "Changes", "Background + Assessment", "What changed since the last handoff — safety items reviewed first."),
        ("3", "Due now", "Assessment", "Meds and tasks in the next window, so nothing gets missed."),
        ("4", "Note", "Recommendation", "One short note for the next caregiver, then confirm done."),
    ]
    card_w, card_h, gap = 350, 300, 30
    x0 = 48
    for i, (num, step, sbar, desc) in enumerate(steps):
        x = x0 + i * (card_w + gap)
        y = 150
        draw.rounded_rectangle((x, y, x + card_w, y + card_h), radius=18, fill=CARD, outline=LINE)
        draw.ellipse((x + 20, y + 20, x + 56, y + 56), fill=ACCENT)
        draw.text((x + 32, y + 28), num, fill=(255, 255, 255), font=try_font(18, bold=True))
        draw.text((x + 72, y + 24), step, fill=INK, font=try_font(22, bold=True))
        draw.rounded_rectangle((x + 20, y + 76, x + card_w - 20, y + 112), radius=999, fill=SAGE)
        sbar_font = try_font(13, bold=True)
        draw.text((x + 34, y + 86), sbar.upper(), fill=ACCENT, font=sbar_font)
        # wrap description manually at ~28 chars
        words = desc.split(" ")
        lines: list[str] = []
        cur = ""
        for w in words:
            trial = f"{cur} {w}".strip()
            if len(trial) > 34:
                lines.append(cur)
                cur = w
            else:
                cur = trial
        if cur:
            lines.append(cur)
        ty = y + 140
        for line in lines:
            draw.text((x + 22, ty), line, fill=MUTED, font=body)
            ty += 24
        if i < len(steps) - 1:
            arrow(draw, (x + card_w + 4, y + card_h // 2), (x + card_w + gap - 4, y + card_h // 2))

    # Evidence strip
    draw.rounded_rectangle((48, 500, 1552, 760), radius=18, fill=CARD, outline=LINE)
    draw.text((72, 532), "Grounded in handoff-failure research, not just judgment calls", fill=INK, font=try_font(20, bold=True))
    findings = [
        ("~10%", "of protocol failures omit a care task — motivates the Due-now step surfacing meds and tasks explicitly."),
        ("~31%", "of failures miss contingency / next-step guidance — the gap the Recommendation field on Delta closes."),
        ("Both ends", "Documentation is expected at handoff-in and handoff-out — Careshift only had the incoming half until the Log Observation flow shipped."),
    ]
    fw = (1552 - 72 - 48) // 3
    stat_font = try_font(30, bold=True)
    label_font = try_font(14)
    for i, (stat, desc) in enumerate(findings):
        x = 72 + i * (fw + 24)
        draw.text((x, 580), stat, fill=ACCENT, font=stat_font)
        words = desc.split(" ")
        lines = []
        cur = ""
        for w in words:
            trial = f"{cur} {w}".strip()
            if len(trial) > 40:
                lines.append(cur)
                cur = w
            else:
                cur = trial
        if cur:
            lines.append(cur)
        ty = 626
        for line in lines:
            draw.text((x, ty), line, fill=MUTED, font=label_font)
            ty += 21

    draw.text(
        (48, 820),
        "Evidence: SBAR handoff research (Walden University), AHRQ TeamSTEPPS, and home-care coordination studies —",
        fill=MUTED,
        font=try_font(14),
    )
    draw.text(
        (48, 846),
        "cited in the project's running design-decision log alongside every entry it informed.",
        fill=MUTED,
        font=try_font(14),
    )

    out = OUT / "diagram-sbar.png"
    img.save(out, "PNG", optimize=True)
    print("diagram", out.name)
    return out


def draw_closed_loop() -> Path:
    """Before/after: display-only deltas vs. a closed-loop, safety-gated handoff."""
    img = Image.new("RGB", (DIAG_W, DIAG_H), BG)
    draw = ImageDraw.Draw(img)
    title = try_font(28, bold=True)
    body = try_font(15)

    draw.text((48, 36), "From one-way display to a closed handoff loop", fill=INK, font=title)
    draw.text(
        (48, 78),
        "Careshift could only ever show changes at first — a caregiver noticing something new had no way to record it, and nothing stopped a brief from being rushed past a flagged incident.",
        fill=MUTED,
        font=body,
    )

    rounded_card(
        draw,
        (48, 160),
        (460, 300),
        "Before",
        [
            "Deltas only ever arrived from",
            "seed data or schedule edits —",
            "no way to log a new observation.",
            "",
            "Review counter showed \"0 of 4\"",
            "but never blocked advancing —",
            "a flagged incident could be",
            "skipped entirely.",
        ],
    )
    rounded_card(
        draw,
        (600, 130),
        (400, 360),
        "Delta record",
        [
            "Category + severity",
            "Narrative + optional detail",
            "Recommended action (SBAR-R)",
            "Author + timestamp, automatic",
        ],
        accent=True,
        fill=(236, 242, 238),
    )
    rounded_card(
        draw,
        (1092, 160),
        (460, 300),
        "After",
        [
            "“Log observation” closes the",
            "authoring gap — any caregiver",
            "can record a new change.",
            "",
            "Brief flow disables Continue",
            "while a NEEDS ATTENTION item",
            "is unreviewed. Watch/Note stay",
            "skippable so routine shifts",
            "aren't slowed down.",
        ],
    )

    arrow(draw, (508, 310), (600, 310))
    arrow(draw, (1000, 310), (1092, 310))

    draw.rounded_rectangle((48, 520, 1552, 640), radius=18, fill=CARD, outline=LINE)
    draw.text((72, 550), "Design judgment: gate on severity, not on completeness", fill=INK, font=try_font(19, bold=True))
    draw.text(
        (72, 588),
        "Requiring every delta reviewed would slow every brief in proportion to how much gets logged — cutting against wanting caregivers to log more.",
        fill=MUTED,
        font=body,
    )

    draw.rounded_rectangle((48, 680, 1552, 900), radius=18, fill=CARD, outline=LINE)
    draw.text((72, 712), "Same fix, two symptoms", fill=INK, font=try_font(19, bold=True))
    draw.text(
        (72, 750),
        "The demo caregiver's name (\"Alex Rivera\") and a demo-only CTA both leaked into real accounts because the",
        fill=MUTED,
        font=body,
    )
    draw.text(
        (72, 776),
        "session model never distinguished “guided demo” from “real account.” Splitting the session cookie into",
        fill=MUTED,
        font=body,
    )
    draw.text(
        (72, 802),
        "demo / account modes fixed the name, the CTA, and any future case the same way — once, not per symptom.",
        fill=MUTED,
        font=body,
    )

    out = OUT / "diagram-closed-loop.png"
    img.save(out, "PNG", optimize=True)
    print("diagram", out.name)
    return out


def compose_boards() -> None:
    boards = {
        "product-home.png": "01-home.png",
        "product-home-full.png": "01-home-full.png",
        "product-sign-in.png": "02-sign-in.png",
        "product-today.png": "03-today.png",
        "product-patients.png": "04-patients.png",
        "product-patient-detail.png": "05-patient-maggie.png",
        "product-log-observation.png": "06-log-observation.png",
        "product-schedule.png": "07-schedule.png",
        "product-shifts.png": "08-shifts.png",
        "product-brief-covering.png": "09-brief-covering.png",
        "product-brief-changes-gated.png": "10-brief-changes-gated.png",
        "product-brief-changes-reviewed.png": "11-brief-changes-reviewed.png",
        "product-brief-due.png": "12-brief-due.png",
        "product-brief-note.png": "13-brief-note.png",
        "product-brief-complete.png": "14-brief-complete.png",
    }

    for out_name, src_name in list(boards.items()):
        if not (SRC / src_name).exists():
            print(f"missing {src_name}")
            del boards[out_name]

    for out_name, src_name in boards.items():
        src = SRC / src_name
        dest = OUT / out_name
        if "full" in out_name:
            subprocess.run(
                ["sips", "--resampleWidth", str(BOARD_W), str(src), "--out", str(dest)],
                check=True,
                capture_output=True,
            )
        else:
            sips_resize(src, dest, BOARD_W)
        print("board", dest.name)

    # Mobile shots: keep native aspect, fixed width for a mobile-frame slide.
    mobile = {
        "product-mobile-today.png": "m-01-today.png",
        "product-mobile-brief-changes.png": "m-02-brief-changes.png",
    }
    for out_name, src_name in mobile.items():
        src = SRC / src_name
        if not src.exists():
            print(f"missing {src_name}")
            continue
        dest = OUT / out_name
        subprocess.run(
            ["sips", "--resampleWidth", "900", str(src), "--out", str(dest)],
            check=True,
            capture_output=True,
        )
        print("mobile", dest.name)

    card_src = SRC / "03-today.png"
    if card_src.exists():
        sips_crop_center(card_src, OUT / "careshift_card.png", CARD_W, CARD_H)
        print("card careshift_card.png")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    draw_sbar_map()
    draw_closed_loop()
    compose_boards()


if __name__ == "__main__":
    main()
