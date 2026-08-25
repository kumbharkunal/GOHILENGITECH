"""
Static Open Graph card, 1200x630.

Static export means there is no runtime to generate an OG image, so it is
built here from the same brand assets as everything else: the mark, the
measured seam angle, and the real palette.

Run:  python scripts/build-og.py
"""
import math, os
from PIL import Image, ImageDraw, ImageFont

HERE = os.path.dirname(__file__)
OUT = os.path.join(HERE, "..", "public", "og.png")
W, H = 1200, 630
MIST, ORANGE, INK, GRAPHITE, STEEL = "#EAEBED", "#E8500C", "#0E1012", "#646668", "#97989A"
SEAM = 38.1

img = Image.new("RGB", (W, H), MIST)
d = ImageDraw.Draw(img)

# The seam, at the measured angle, entering the bottom right.
slope = math.tan(math.radians(SEAM))
x0 = W * 0.62
d.polygon([(x0, H), (W, H), (W, H - (W - x0) * slope)], fill=ORANGE)

# The mark: one ring, orange arc 45-225, pale 225-270, the G closing the right.
CX, CY, RO, RI = 150, 150, 78, 59
box_o = [CX - RO, CY - RO, CX + RO, CY + RO]
box_i = [CX - RI, CY - RI, CX + RI, CY + RI]
d.pieslice(box_o, -225, -45, fill=ORANGE)
d.pieslice(box_o, -270, -225, fill="#D3D5D7")
d.pieslice(box_o, -360, -270, fill=GRAPHITE)
d.rectangle([CX, CY - 10, CX + RO, CY + 10], fill=GRAPHITE)
d.ellipse(box_i, fill=MIST)
d.rectangle([CX, CY - 10, CX + RI, CY + 10], fill=GRAPHITE)
d.pieslice(box_i, -360, -270, fill=MIST)
d.rectangle([CX, CY + 1, CX + RI, CY + 10], fill=GRAPHITE)


def font(size, bold=True):
    for name in (("arialbd.ttf", "segoeuib.ttf") if bold else ("arial.ttf", "segoeui.ttf")):
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            continue
    return ImageFont.load_default(size)


d.text((72, 268), "We stock the drives.", font=font(66), fill=INK)
d.text((72, 344), "We build the machines.", font=font(66), fill=INK)
d.text((72, 452), "Gohil's Group  .  Rajkot, Gujarat  .  Since 1994", font=font(28, False), fill=GRAPHITE)
d.text((72, 500), "Gearboxes, conveyors and custom machinery", font=font(28, False), fill=STEEL)

os.makedirs(os.path.dirname(OUT), exist_ok=True)
img.save(OUT, "PNG", optimize=True)
print(f"wrote {os.path.normpath(OUT)}  {W}x{H}  {os.path.getsize(OUT)/1024:.0f} KB")
