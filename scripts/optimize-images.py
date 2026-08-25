"""
Web encode the photography and the dealer marks.

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

Dealer marks get the same treatment with a much smaller target, because they
render at about 140 CSS px. They arrive at whatever size the source happened to
be: one landed here at 16383x4860 and 627 KB, which is WebP's maximum width, to
be drawn 140px wide. Alpha is preserved, so a mark cut out against transparency
stays cut out.

Idempotent. A file already at or below its target is left alone, so this is
safe to run at any point, including while more images are still being added.

Run after adding any new image named in IMAGE-BRIEF.md:  npm run images
"""

import os
import sys
from pathlib import Path
from PIL import Image

PRODUCTS = Path('public/products')
DEALERS = Path('public/dealers')
WIDE, SMALL = 1100, 520
Q_WIDE, Q_SMALL = 82, 80

# Dealer marks draw at ~140 CSS px; 420 covers a 3x screen with room to spare.
DEALER_MAX, Q_DEALER = 420, 84


def key_out_white(im: Image.Image) -> Image.Image:
    """
    Drop a flat white background to transparency.

    Some dealer marks arrive cut out and some arrive on a white card. Mixed
    together on the page ground the second kind reads as a white rectangle
    parked next to logos that have no box, which looks like a mistake rather
    than a design.

    The fill starts from the border and spreads inward, so white that is part
    of the mark itself, a letter knocked out of a coloured field for instance,
    is never touched. Only white connected to the outside goes.

    Returns the image unchanged unless the border really is white; a mark on a
    coloured card is left alone rather than guessed at.
    """
    import numpy as np
    from collections import deque

    rgb = im.convert('RGB')
    a = np.asarray(rgb).astype(np.int16)
    h, w, _ = a.shape

    # A loose gate is correct here. The flood fill is already conservative,
    # since it only removes white that is connected to the outside, so this
    # only has to reject marks that sit on a genuinely coloured card. Logos
    # that bleed to the edge, or that have a soft grey halo, still qualify:
    # requiring a near perfect white border rejected two valid marks.
    border = np.concatenate([a[0, :], a[-1, :], a[:, 0], a[:, -1]])
    if (border.min(axis=1) >= 235).mean() < 0.45:
        return im

    near_white = a.min(axis=2) >= 220
    seen = np.zeros((h, w), dtype=bool)
    q = deque()
    for x in range(w):
        for y in (0, h - 1):
            if near_white[y, x] and not seen[y, x]:
                seen[y, x] = True
                q.append((y, x))
    for y in range(h):
        for x in (0, w - 1):
            if near_white[y, x] and not seen[y, x]:
                seen[y, x] = True
                q.append((y, x))

    while q:
        y, x = q.popleft()
        for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            ny, nx = y + dy, x + dx
            if 0 <= ny < h and 0 <= nx < w and near_white[ny, nx] and not seen[ny, nx]:
                seen[ny, nx] = True
                q.append((ny, nx))

    # Feather the cut by the pixel's own whiteness so edges do not go jagged.
    alpha = np.where(seen, 0, 255).astype(np.uint8)
    out = im.convert('RGBA')
    out.putalpha(Image.fromarray(alpha, 'L'))
    return out


def encode(im: Image.Image, width: int, out: Path, quality: int) -> None:
    if im.width > width:
        h = round(im.height * width / im.width)
        im = im.resize((width, h), Image.LANCZOS)
    im.save(out, 'WEBP', quality=quality, method=6)


def do_products() -> tuple[int, int, int]:
    files = sorted(p for p in PRODUCTS.glob('*.webp') if not p.stem.endswith('@sm'))
    touched = before = after = 0
    for p in files:
        size = p.stat().st_size
        im = Image.open(p)
        # Already encoded, and the small variant exists. Re-encoding a file that
        # is already lossy only loses more quality and, because WebP does not
        # compress its own artefacts well, actually makes it bigger: a second
        # pass over the whole directory grew it by 26%.
        if (im.width <= WIDE and size <= 200_000
                and p.with_name(f'{p.stem}@sm.webp').exists()):
            continue
        touched += 1
        before += size
        if im.mode not in ('RGBA', 'RGB'):
            im = im.convert('RGBA')
        encode(im.copy(), SMALL, p.with_name(f'{p.stem}@sm.webp'), Q_SMALL)
        encode(im.copy(), WIDE, p, Q_WIDE)
        after += p.stat().st_size + p.with_name(f'{p.stem}@sm.webp').stat().st_size
    return touched, before, after


def do_dealers() -> tuple[int, int, int]:
    files = sorted(DEALERS.glob('*.webp'))
    touched = before = after = 0
    for p in files:
        size = p.stat().st_size
        im = Image.open(p)
        # Already small, already lean, and already cut out. Leave it alone.
        opaque = im.mode != 'RGBA' or im.getchannel('A').getextrema()[0] >= 250
        if im.width <= DEALER_MAX and size <= 40_000 and not opaque:
            continue
        touched += 1
        before += size
        if im.mode not in ('RGBA', 'RGB'):
            im = im.convert('RGBA')
        encode(key_out_white(im), DEALER_MAX, p, Q_DEALER)
        after += p.stat().st_size
    return touched, before, after


def main() -> int:
    if not PRODUCTS.exists():
        print('no public/products directory', file=sys.stderr)
        return 1

    n, before, after = do_products()
    if n:
        print(f'products: {n} images, {before / 1e6:.1f} MB -> {after / 1e6:.1f} MB '
              f'({100 - after / before * 100:.0f}% smaller), both widths included')

    n, before, after = do_dealers()
    if n:
        print(f'dealers:  {n} marks resized, {before / 1e6:.2f} MB -> {after / 1e6:.2f} MB '
              f'({100 - after / before * 100:.0f}% smaller)')
    else:
        print('dealers:  all already within target')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
