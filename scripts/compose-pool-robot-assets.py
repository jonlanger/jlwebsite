#!/usr/bin/env python3
"""Compose landscape product boards for Connected Pool Robot & App."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageChops, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "projects" / "connect-pool-robot"
SCREENS = Path("/Users/jonlanger/Documents/Projects/Pentair Pool Cleaner/Pentair App Screens")
PROVIDER = SCREENS / "Pool Services"
ASSETS = Path(
    "/Users/jonlanger/.cursor/projects/Users-jonlanger-Documents-Projects-jlwebsite/assets"
)

# Match peer showcase boards
BOARD_W, BOARD_H = 1800, 1013
BG = (245, 245, 247)
CARD_W, CARD_H = 1280, 720


def load(path: Path) -> Image.Image:
    return Image.open(path).convert("RGBA")


def fit_height(img: Image.Image, target_h: int) -> Image.Image:
    ratio = target_h / img.height
    return img.resize((max(1, int(img.width * ratio)), target_h), Image.Resampling.LANCZOS)


def fit_contain(img: Image.Image, max_w: int, max_h: int) -> Image.Image:
    ratio = min(max_w / img.width, max_h / img.height)
    return img.resize(
        (max(1, int(img.width * ratio)), max(1, int(img.height * ratio))),
        Image.Resampling.LANCZOS,
    )


def rounded(img: Image.Image, radius: int = 28) -> Image.Image:
    """Apply rounded corners (phone-like)."""
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


PHONE_W, PHONE_H = 860, 1864  # native phone screenshot size for this project


def split_tall_screen(
    path: Path,
    *,
    phone_w: int = PHONE_W,
    phone_h: int = PHONE_H,
) -> tuple[Image.Image, Image.Image]:
    """
    Split a tall scrolling screenshot into top and bottom phone-sized crops
    at the same width as standard screenshots (no horizontal squeeze).
    """
    img = load(path)
    if img.width != phone_w:
        # Normalize width first, keep aspect
        ratio = phone_w / img.width
        img = img.resize(
            (phone_w, max(1, int(img.height * ratio))),
            Image.Resampling.LANCZOS,
        )
    if img.height <= phone_h:
        # Already phone-height — duplicate as top/bottom
        return img, img

    top = img.crop((0, 0, phone_w, phone_h))
    bottom = img.crop((0, img.height - phone_h, phone_w, img.height))
    return top, bottom


def save_temp_phone(img: Image.Image, name: str) -> Path:
    out = OUT / name
    img.convert("RGBA").save(out, "PNG")
    return out


def compose_phones_from_images(
    images: list[Image.Image],
    out_name: str,
    *,
    board_w: int = BOARD_W,
    board_h: int = BOARD_H,
    margin: int = 56,
    gap: int = 36,
) -> Path:
    """Same as compose_phones but accepts in-memory images (already phone-sized)."""
    if not 2 <= len(images) <= 3:
        raise ValueError(f"{out_name}: expected 2–3 screens, got {len(images)}")

    n = len(images)
    max_phone_h = board_h - 2 * margin
    max_total_w = board_w - 2 * margin

    scaled = [fit_height(p.convert("RGBA"), max_phone_h) for p in images]
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

    board = Image.new("RGB", (board_w, board_h), BG)
    total_w = sum(p.width for p in scaled) + gap * (n - 1)
    x = (board_w - total_w) // 2
    for phone in scaled:
        y = (board_h - phone.height) // 2
        shadow = soft_shadow(phone.size, radius=max(20, phone.width // 26))
        board.paste(shadow, (x - 18, y - 14), shadow)
        board.paste(phone, (x, y), phone)
        x += phone.width + gap

    out = OUT / out_name
    board.save(out, "PNG", optimize=True)
    print(f"wrote {out.relative_to(ROOT)} ({n} phones, {board_w}x{board_h})")
    return out


def compose_phones(
    paths: list[Path],
    out_name: str,
    *,
    board_w: int = BOARD_W,
    board_h: int = BOARD_H,
    margin: int = 56,
    gap: int = 36,
) -> Path:
    """Lay out 2–3 app screens at native aspect ratio (never stretched)."""
    return compose_phones_from_images(
        [load(p) for p in paths],
        out_name,
        board_w=board_w,
        board_h=board_h,
        margin=margin,
        gap=gap,
    )


def trim_background(img: Image.Image, pad: int = 24) -> Image.Image:
    """Crop near-uniform background margins so the subject fills the frame."""
    rgb = img.convert("RGB")
    bg = Image.new("RGB", rgb.size, rgb.getpixel((0, 0)))
    diff = ImageChops.difference(rgb, bg)
    # Amplify small differences so soft shadows still count as content
    diff = ImageChops.add(diff, diff)
    bbox = diff.getbbox()
    if not bbox:
        return img
    x0, y0, x1, y1 = bbox
    x0 = max(0, x0 - pad)
    y0 = max(0, y0 - pad)
    x1 = min(img.width, x1 + pad)
    y1 = min(img.height, y1 + pad)
    return img.crop((x0, y0, x1, y1))


def compose_robot_hero(path: Path, out_name: str, *, zoom: float = 1.0) -> Path:
    """Place a robot render on the board. zoom>1 crops in (e.g. 1.5 = 50% closer)."""
    img = trim_background(load(path))
    # Fit to board first, then scale up and center-crop for zoom
    base = fit_contain(img, BOARD_W - 80, BOARD_H - 60)
    if zoom != 1.0:
        scaled = base.resize(
            (max(1, int(base.width * zoom)), max(1, int(base.height * zoom))),
            Image.Resampling.LANCZOS,
        )
    else:
        scaled = base

    board = Image.new("RGB", (BOARD_W, BOARD_H), BG)
    x = (BOARD_W - scaled.width) // 2
    y = (BOARD_H - scaled.height) // 2
    board.paste(scaled, (x, y), scaled if scaled.mode == "RGBA" else None)
    out = OUT / out_name
    board.save(out, "PNG", optimize=True)
    print(f"wrote {out.relative_to(ROOT)} (zoom={zoom})")
    return out


def compose_callouts_board(zoom: float = 1.5) -> None:
    """Resize labeled ID slide onto the standard board, optionally zoomed in."""
    src = OUT / "ui-118.png"
    if not src.exists():
        return
    img = load(src)
    base = fit_contain(img, BOARD_W, BOARD_H)
    if zoom != 1.0:
        scaled = base.resize(
            (max(1, int(base.width * zoom)), max(1, int(base.height * zoom))),
            Image.Resampling.LANCZOS,
        )
    else:
        scaled = base
    board = Image.new("RGB", (BOARD_W, BOARD_H), BG)
    board.paste(
        scaled,
        ((BOARD_W - scaled.width) // 2, (BOARD_H - scaled.height) // 2),
        scaled if scaled.mode == "RGBA" else None,
    )
    out = OUT / "product-robot-callouts.png"
    board.save(out, "PNG", optimize=True)
    print(f"wrote {out.relative_to(ROOT)} (zoom={zoom})")


def compose_card(
    robot_path: Path,
    phone_paths: list[Path],
    out_name: str = "connect-pool-robot_card.png",
) -> Path:
    """Robot left + two status phones right."""
    board = Image.new("RGB", (CARD_W, CARD_H), BG)
    robot = fit_contain(load(robot_path), 620, 600)
    phones = [rounded(fit_height(load(p), 580), radius=22) for p in phone_paths]

    rx = 48
    ry = (CARD_H - robot.height) // 2
    board.paste(robot, (rx, ry), robot if robot.mode == "RGBA" else None)

    gap = 20
    total_pw = sum(p.width for p in phones) + gap * (len(phones) - 1)
    px = CARD_W - 48 - total_pw
    for phone in phones:
        py = (CARD_H - phone.height) // 2
        shadow = soft_shadow(phone.size, radius=22, blur=12)
        board.paste(shadow, (px - 12, py - 8), shadow)
        board.paste(phone, (px, py), phone)
        px += phone.width + gap

    out = OUT / out_name
    board.save(out, "PNG", optimize=True)
    print(f"wrote {out.relative_to(ROOT)}")
    return out


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)

    robot_34 = ASSETS / "Pentair_3_4_View-9f2cc121-f954-4810-9d75-85d408784cb0.png"
    robot_34_hi = ASSETS / "Pentair_3_4_View_2_Hight_REs-15b8f247-bdff-4135-bc2e-96ba438b50a1.png"
    robot_front = ASSETS / "Pentair_Front_View-3a565547-4e84-414a-a8aa-72ea453f17d4.png"
    robot_qr = ASSETS / "Pentair_3_4_QR_Code_Back_for_App__WB-c9afcfb3-b72b-4094-8768-13afc53ce779.png"
    robot_back = ASSETS / "Pentair_3_4_Back_for_App__WB-d1bfafd2-0f3b-427f-907d-bd084ecec245.png"
    robot_wb = ASSETS / "Pentair_3_4_for_App__WB-1773fef9-0c1e-4c5a-9802-1c7c3190af70.png"

    hero_src = robot_34_hi if robot_34_hi.exists() else robot_34

    # --- Robot detail (one render per slide, zoomed in 50%) ---
    ROBOT_ZOOM = 1.5
    compose_robot_hero(hero_src, "product-robot.png", zoom=ROBOT_ZOOM)
    compose_robot_hero(robot_front, "product-robot-front.png", zoom=ROBOT_ZOOM)
    compose_robot_hero(robot_wb, "product-robot-three-quarter.png", zoom=ROBOT_ZOOM)
    compose_robot_hero(robot_back, "product-robot-back.png", zoom=ROBOT_ZOOM)
    compose_robot_hero(robot_qr, "product-robot-qr.png", zoom=ROBOT_ZOOM)
    compose_callouts_board(zoom=ROBOT_ZOOM)

    # --- Owner: Status (2–3 phones per slide) ---
    compose_phones(
        [
            SCREENS / "Pool Status - Upcoming.png",
            SCREENS / "Pool Status - Action Required.png",
            SCREENS / "Pool Status - Heat Warning.png",
        ],
        "product-status.png",
    )
    compose_phones(
        [
            SCREENS / "Pool Status - Cleaning In Progress.png",
            SCREENS / "Pool Status - Upcoming - Scroll Down.png",
        ],
        "product-status-cleaning.png",
    )

    # --- Owner: Onboarding ---
    # Slide 1: first-run only (no tall pool form)
    compose_phones(
        [
            SCREENS / "On Boarding - Login.png",
            SCREENS / "On Boarding - Default Home.png",
            SCREENS / "On Boarding - Loading.png",
        ],
        "product-onboarding-v2.png",
    )
    # Slide 2: add-pool entry + tall form split into top/bottom phone crops
    form_top, form_bottom = split_tall_screen(SCREENS / "On Boarding - Pool Info Form.png")
    compose_phones_from_images(
        [
            load(SCREENS / "On Boarding -  Add Pool Info.png"),
            form_top,
            form_bottom,
        ],
        "product-onboarding-pool-v2.png",
    )

    # --- Owner: Connect device ---
    compose_phones(
        [
            SCREENS / "Connect Device.png",
            SCREENS / "Connect Device - Robot.png",
            SCREENS / "Connect Device - Scan Device Code.png",
        ],
        "product-connect.png",
    )
    compose_phones(
        [
            SCREENS / "Connect Device - QR Code Detail.png",
            SCREENS / "Connect Device - Connecting.png",
            SCREENS / "Connect Device - Success.png",
        ],
        "product-connect-pair.png",
    )

    # --- Owner: Supplies ---
    compose_phones(
        [
            SCREENS / "Order Supplies - Home.png",
            SCREENS / "Order Supplies - Example 1.png",
            SCREENS / "Order Supplies - Example 2.png",
        ],
        "product-supplies.png",
    )
    compose_phones(
        [
            SCREENS / "Order Supplies - Home.png",
            SCREENS / "Order Supplies - Order Success.png",
        ],
        "product-supplies-success.png",
    )

    # --- Owner: Scheduling ---
    compose_phones(
        [
            SCREENS / "Manage Services and Appointments - Pool Services.png",
            SCREENS / "Manage Services and Appointments - Booking.png",
            SCREENS / "Manage Services and Appointments - Manage Booking.png",
        ],
        "product-scheduling.png",
    )
    compose_phones(
        [
            SCREENS / "Manage Services and Appointments - Booking.png",
            SCREENS / "Manage Services and Appointments - Booking. Success.png",
        ],
        "product-scheduling-success.png",
    )

    # --- Provider ---
    compose_phones(
        [
            PROVIDER / "Pool Services - On Boarding - Default Home.png",
            PROVIDER / "Pool Services - Manage Customers.png",
            PROVIDER / "Pool Services - Manage Devices.png",
        ],
        "product-provider.png",
    )
    compose_phones(
        [
            PROVIDER / "Pool Services - Manage Inventory.png",
            PROVIDER / "Pool Services - On Boarding -  Add Pool Info.png",
        ],
        "product-provider-ops.png",
    )

    # --- Fleet / ops ---
    compose_phones(
        [
            PROVIDER / "Pool Service Status - In Progress Cleaning List.png",
            PROVIDER / "Pool Service Status - In Progress Cleaning Grid.png",
            PROVIDER / "Manage Services and Appointments - Pool Services.png",
        ],
        "product-fleet.png",
    )

    # --- Card ---
    compose_card(
        hero_src,
        [
            SCREENS / "Pool Status - Cleaning In Progress.png",
            SCREENS / "Pool Status - Action Required.png",
        ],
    )

    print("done")


if __name__ == "__main__":
    main()
