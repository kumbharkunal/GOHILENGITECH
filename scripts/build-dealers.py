"""
Crop the authorised dealer logo strip from the client's own banner.

Third party trademark handling, per the plan and DESIGN.md 4.8:
  - cropped from client-assets image 1 ONLY. We never download a higher
    resolution mark from a brand's own site.
  - rendered permanently greyscale in the UI, so the principals stay
    visually subordinate to Gohil's own mark. Greyscale is applied in CSS,
    not baked in, so a single decision can reverse it.
  - no category label is ever printed under a logo.
  - the section is labelled "Authorised Dealer", the client's own wording.

The client must confirm every dealership listed here is current before launch.
See CONTENT.md section 4.7.

Run:  python scripts/build-dealers.py
"""

import os
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

HERE = os.path.dirname(__file__)
SRC = os.path.join(HERE, "..", "client-assets",
                   "WhatsApp Image 2026-08-24 at 8.29.23 PM.jpeg")
OUT = os.path.join(HERE, "..", "public", "dealers")

STRIP_TOP, STRIP_BOT = 748, 812

# (slug, x0, x1, y0, y1, brand name for alt text)
# Cell edges taken from the gaps between the strip's own divider rules.
CELLS = [
    ("tgpl", 238, 360, STRIP_TOP, STRIP_BOT, "TGPL Transtech Gears"),
    ("havells", 364, 444, STRIP_TOP, STRIP_BOT, "Havells"),
    # Elecon and Shanthi Gears share one cell, stacked. Split horizontally.
    ("elecon", 458, 594, 750, 784, "Elecon"),
    ("shanthi-gears", 458, 594, 786, 812, "Shanthi Gears"),
    ("radicon-pbl-siemens", 598, 720, STRIP_TOP, STRIP_BOT, "Radicon PBL Siemens"),
    ("bonfiglioli", 726, 848, STRIP_TOP, STRIP_BOT, "Bonfiglioli"),
    ("abb", 856, 975, STRIP_TOP, STRIP_BOT, "ABB"),
    ("sew-eurodrive", 980, 1078, STRIP_TOP, STRIP_BOT, "SEW-Eurodrive"),
    ("rotomotive", 1084, 1153, STRIP_TOP, STRIP_BOT, "Rotomotive"),
    ("crompton-greaves", 1157, 1228, STRIP_TOP, STRIP_BOT, "Crompton Greaves"),
]

TOL = 34


def cut(im: Image.Image, x0: int, x1: int, y0: int, y1: int) -> Image.Image:
    crop = im.crop((x0, y0, x1, y1))
    a = np.asarray(crop).astype(float)
    ring = np.concatenate([a[:2].reshape(-1, 3), a[-2:].reshape(-1, 3),
                           a[:, :2].reshape(-1, 3), a[:, -2:].reshape(-1, 3)])
    backdrop = np.median(ring, axis=0)
    dist = np.linalg.norm(a - backdrop, axis=2)

    candidate = dist < TOL
    lab, n = ndimage.label(candidate)
    edge = np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]])
    touching = [int(v) for v in np.unique(edge) if v]
    bg = np.isin(lab, touching) if touching else np.zeros_like(candidate)

    # A wordmark is many disconnected glyphs, so keep every non background
    # region rather than only the largest one.
    alpha = np.clip((dist - TOL * 0.55) / (TOL * 0.9), 0, 1)
    alpha = np.where(bg, np.minimum(alpha, 0.0), alpha)

    a_img = Image.fromarray((alpha * 255).astype(np.uint8), "L")
    a_img = a_img.filter(ImageFilter.GaussianBlur(0.4))
    out = crop.convert("RGBA")
    out.putalpha(a_img)
    bbox = out.getbbox()
    return out.crop(bbox) if bbox else out


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    im = Image.open(SRC).convert("RGB")
    total = 0
    for slug, x0, x1, y0, y1, name in CELLS:
        img = cut(im, x0, x1, y0, y1)
        p = os.path.join(OUT, f"{slug}.webp")
        img.save(p, "WEBP", quality=90, method=6)
        size = os.path.getsize(p)
        total += size
        print(f"  {slug:24s} {img.width:3d}x{img.height:<3d} {size / 1024:5.1f} KB   {name}")
    print(f"\n{len(CELLS)} dealer marks, {total / 1024:.1f} KB total")
