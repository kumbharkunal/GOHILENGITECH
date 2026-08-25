"""
Cut the product photography out of the client's own artwork.

Source: client-assets/ banner (image 1) and light panel (image 3). The products
are already shot on white, so the background is removed by thresholding,
closing, filling interior holes, then feathering the edge by one pixel.

Nothing is upscaled. These images are small (the largest is 217x146) and
stretching one to hero size is the blurry-hero failure DESIGN.md 8.1 warns
about. Native size is the 2x asset; next/image emits the 1x and the
AVIF / WebP variants at request time.

Run:  python scripts/build-products.py
"""

import os
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

HERE = os.path.dirname(__file__)
SRC = os.path.join(HERE, "..", "client-assets")
OUT = os.path.join(HERE, "..", "public", "products")

BANNER = "WhatsApp Image 2026-08-24 at 8.29.23 PM.jpeg"
PANEL3 = "WhatsApp Image 2026-08-24 at 8.29.28 PM.jpeg"

# (file, x, y, w, h, slug, alt)
# Identified from a labelled contact sheet, not guessed.
ITEMS = [
    # --- helical ---
    (BANNER, 41, 271, 115, 112, "helical-inline-gearbox",
     "Blue inline helical gearbox with keyed output shaft and foot mounting"),
    (BANNER, 174, 272, 119, 104, "helical-gearbox-fan-cooled",
     "Blue fan cooled helical gearbox, foot mounted"),
    (BANNER, 72, 394, 217, 146, "helical-gear-motor",
     "Blue helical gear motor with flange mounted three phase motor"),
    (PANEL3, 197, 1283, 141, 84, "helical-gear-motor-inline",
     "Inline helical gear motor with three phase motor and grey barrel housing"),
    # --- planetary ---
    (BANNER, 378, 275, 115, 250, "planetary-gearbox",
     "Planetary gearbox with splined output shaft and bolted mounting flange"),
    # --- worm ---
    (BANNER, 587, 273, 146, 149, "worm-gearbox-cast-iron",
     "Cast iron worm reduction gearbox with bronze output shaft and motor flange"),
    (BANNER, 771, 269, 88, 97, "worm-gearbox-flange-mounted",
     "Cyan worm gearbox with flange mounting face and solid output shaft"),
    (BANNER, 878, 265, 81, 96, "worm-gearbox-foot-mounted",
     "Cyan foot mounted worm gearbox with solid output shaft"),
    (BANNER, 561, 443, 66, 71, "worm-gearbox-aluminium",
     "Compact aluminium body worm gearbox with hollow output bore"),
    (BANNER, 639, 442, 109, 70, "worm-gear-motor-aluminium",
     "Aluminium body worm gear motor with blue three phase motor"),
    (BANNER, 1130, 428, 111, 104, "worm-gearbox-universal",
     "Blue universal worm gearbox with right angle output shaft"),
    # --- bevel helical and heavy duty ---
    (BANNER, 785, 375, 163, 141, "bevel-helical-gearbox",
     "Teal bevel helical gearbox unit with twin output shafts"),
    (BANNER, 1014, 265, 198, 147, "customized-gearbox-flange",
     "Heavy duty customised gearbox with large bolted output hub"),
    (BANNER, 990, 441, 127, 87, "heavy-duty-gearbox",
     "Teal heavy duty industrial gearbox with bronze output shaft"),
    # --- material handling ---
    (BANNER, 212, 603, 201, 131, "vibro-sifter",
     "Vibro sifter separator with three orange clamped screen decks"),
    (BANNER, 435, 669, 88, 65, "belt-conveyor",
     "Belt conveyor section with troughing idler and support frame"),
    (BANNER, 467, 602, 70, 74, "belt-conveyor-inclined",
     "Inclined cleated belt conveyor with side skirts"),
    (BANNER, 527, 671, 75, 58, "screw-conveyor-auger",
     "Screw conveyor auger flight"),
    # --- blowers and motors ---
    (BANNER, 647, 595, 104, 129, "centrifugal-blower",
     "Blue centrifugal blower with direct coupled motor and rectangular outlet"),
    (BANNER, 778, 596, 189, 141, "axial-flow-fan",
     "Pair of blue axial flow fans in cylindrical housings"),
    (BANNER, 999, 588, 101, 144, "vertical-flange-motor",
     "Blue vertical flange mounted three phase electric motor"),
]

PAD = 4        # transparent margin, px
TOL_HARD = 30  # RGB distance from the sampled backdrop that still counts as backdrop
TOL_SOFT = 62  # beyond this the pixel is fully opaque; between the two it feathers


def cut(path: str, x: int, y: int, w: int, h: int) -> Image.Image:
    """
    Matte by flood filling inward from the crop border rather than by a global
    luminance threshold. Several of these photographs sit on a light grey studio
    gradient, not on pure white, and a fixed threshold keeps that grey as a
    rectangular halo. Seeding from the border removes it whatever its tone,
    while grey parts of the machine itself survive because they are not
    connected to the edge.
    """
    im = Image.open(path).convert("RGB")
    box = (max(0, x - PAD), max(0, y - PAD), x + w + PAD, y + h + PAD)
    crop = im.crop(box)
    a = np.asarray(crop).astype(float)

    # backdrop colour, sampled from the outermost ring of the crop
    ring = np.concatenate([a[:2].reshape(-1, 3), a[-2:].reshape(-1, 3),
                           a[:, :2].reshape(-1, 3), a[:, -2:].reshape(-1, 3)])
    backdrop = np.median(ring, axis=0)
    dist = np.linalg.norm(a - backdrop, axis=2)

    # everything backdrop-like that is reachable from the edge
    candidate = dist < TOL_HARD
    lab, n = ndimage.label(candidate)
    edge = np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]])
    touching = set(int(v) for v in np.unique(edge) if v)
    bg = np.isin(lab, list(touching)) if touching else np.zeros_like(candidate)

    fg = ndimage.binary_fill_holes(~bg)
    lab2, n2 = ndimage.label(fg)
    if n2 > 1:
        sizes = ndimage.sum(fg, lab2, range(1, n2 + 1))
        fg = lab2 == (int(np.argmax(sizes)) + 1)

    # feather: inside the object use the distance ramp so edges stay anti-aliased
    ramp = np.clip((dist - TOL_HARD) / (TOL_SOFT - TOL_HARD), 0, 1)
    alpha = np.where(fg, np.maximum(ramp, 0.15), 0.0)
    alpha = np.where(ndimage.binary_erosion(fg, np.ones((5, 5))), 1.0, alpha)

    a_img = Image.fromarray((alpha * 255).astype(np.uint8), "L")
    a_img = a_img.filter(ImageFilter.GaussianBlur(0.5))

    out = crop.convert("RGBA")
    out.putalpha(a_img)
    return enhance(out.crop(out.getbbox()))


def enhance(img: Image.Image) -> Image.Image:
    """
    Bring the cut-outs up to a size that renders crisply.

    Be clear about what this does and does not do. There is no extra detail in
    the source: these are small regions of a compressed JPEG, and no amount of
    resampling invents information that was never captured. What it does fix is
    the two things that actually read as "blurry" on screen:

      1. displaying a 120px image in a 400px slot, where the browser's own
         bilinear upscale is soft and mushy
      2. JPEG blocking in the flat machined surfaces, which resampling smears
         into visible mush

    So: denoise the flat areas first, then upscale in two smaller Lanczos steps
    rather than one big jump (which preserves edges better), sharpening between
    them. The result is clean and crisp at display size.

    Genuinely higher resolution product photography has to come from the client
    or from licensed manufacturer imagery. CONTENT.md 10.
    """
    rgb = img.convert("RGB")
    a = img.getchannel("A")

    # 1. knock back JPEG blocking without eating the edges
    rgb = rgb.filter(ImageFilter.MedianFilter(3))

    # 2. two step upscale, sharpening between, total 3x
    w, h = rgb.size
    rgb = rgb.resize((int(w * 1.7), int(h * 1.7)), Image.LANCZOS)
    rgb = rgb.filter(ImageFilter.UnsharpMask(radius=2, percent=90, threshold=3))
    rgb = rgb.resize((w * 3, h * 3), Image.LANCZOS)
    rgb = rgb.filter(ImageFilter.UnsharpMask(radius=3, percent=70, threshold=4))

    # 3. the alpha only needs a clean smooth edge at the new size
    a = a.resize((w * 3, h * 3), Image.LANCZOS)

    out = rgb.convert("RGBA")
    out.putalpha(a)
    return out


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    manifest = []
    total = 0
    for fn, x, y, w, h, slug, alt in ITEMS:
        img = cut(os.path.join(SRC, fn), x, y, w, h)
        # Static export means next/image cannot optimise on demand, so the
        # asset that ships has to already be the right format. WebP carries
        # alpha and is a fraction of the PNG size.
        p = os.path.join(OUT, f"{slug}.webp")
        img.save(p, "WEBP", quality=88, method=6)
        size = os.path.getsize(p)
        total += size
        manifest.append((slug, img.width, img.height, size, alt))
        print(f"  {slug:32s} {img.width:3d}x{img.height:<3d}  {size / 1024:6.1f} KB")

    print(f"\n{len(manifest)} products, {total / 1024:.1f} KB total")
    biggest = max(manifest, key=lambda m: m[1] * m[2])
    print(f"largest: {biggest[0]} at {biggest[1]}x{biggest[2]}")
