"""
Web encode the product photography.

Why this exists: the generated source images arrive around 1.1 MB each at
1536px. Eight of them appear on the home page, which put 6.6 MB of images in
front of a first visit and pushed LCP to 3.5s against an FCP of 0.8s. The whole
gap was image bytes. On the mid range Android this site is actually for, that
is the difference between a phone call and a closed tab.

Two widths, because the two places a product appears want very different
things and a static export cannot resize on demand:

  name.webp      1100px, for the detail page, which shows it at 460 CSS px and
                 so needs about 920 for a 2x screen
  name@sm.webp    520px, for the chips in a grid, which show it at 260 CSS px

Alpha is preserved: these are cut outs, and flattening them onto white would
show as a hard rectangle the moment a chip sits on anything but the page
ground.

Run after adding any new image named in IMAGE-BRIEF.md:  npm run images
"""

import os
import sys
from pathlib import Path
from PIL import Image

SRC = Path('public/products')
WIDE, SMALL = 1100, 520
Q_WIDE, Q_SMALL = 82, 80


def encode(im: Image.Image, width: int, out: Path, quality: int) -> None:
    if im.width > width:
        h = round(im.height * width / im.width)
        im = im.resize((width, h), Image.LANCZOS)
    im.save(out, 'WEBP', quality=quality, method=6)


def main() -> int:
    files = sorted(p for p in SRC.glob('*.webp') if not p.stem.endswith('@sm'))
    if not files:
        print('no product images found', file=sys.stderr)
        return 1

    before = after = 0
    for p in files:
        before += p.stat().st_size
        im = Image.open(p)
        if im.mode not in ('RGBA', 'RGB'):
            im = im.convert('RGBA')
        encode(im.copy(), SMALL, p.with_name(f'{p.stem}@sm.webp'), Q_SMALL)
        encode(im.copy(), WIDE, p, Q_WIDE)
        after += p.stat().st_size + p.with_name(f'{p.stem}@sm.webp').stat().st_size

    print(f'{len(files)} images: {before / 1e6:.1f} MB -> {after / 1e6:.1f} MB '
          f'({100 - after / before * 100:.0f}% smaller), both widths included')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
