"""
Build the "GROUP" wordmark and the full lockup.

The client's lettering is a Eurostile / Square 721 style geometric face. Rather
than trace soft 16px JPEG outlines, each glyph is CONSTRUCTED from the metrics
actually measured off the artwork, which is how a face like this is drawn:

  cap height     16 px          -> 100 units
  glyph width    18 px          -> 112
  stroke         4 px           ->  25
  advance        24.5 px        -> 150
  corner radius  ~2 px          ->  13 outer, 4 inner

Every glyph shape below was read off a printed pixel map of the source, not
guessed. The G's notch and spur, the R's leg angle and the P's shallow bowl are
all measured features.

Note on scope: the web lockup is the mark plus GROUP, with no "Gohil's". That
is not a shortcut, it is how the client themselves use the reduced lockup on
their own Instagram posts. The full "Gohil's" version stays a print asset.

Run:  python scripts/build-lockup.py
"""

import os

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "brand")

CAP = 100.0
W = 112.0
S = 25.0     # stroke
ADV = 150.0  # advance between glyph origins
RO = 13.0    # outer corner radius
GRAPHITE = "#646668"


def f(v: float) -> str:
    return f"{v:.2f}".rstrip("0").rstrip(".")


def rrect(x: float, y: float, w: float, h: float, r: float) -> str:
    """Clockwise rounded rectangle."""
    return (
        f"M{f(x + r)} {f(y)}"
        f"L{f(x + w - r)} {f(y)}Q{f(x + w)} {f(y)} {f(x + w)} {f(y + r)}"
        f"L{f(x + w)} {f(y + h - r)}Q{f(x + w)} {f(y + h)} {f(x + w - r)} {f(y + h)}"
        f"L{f(x + r)} {f(y + h)}Q{f(x)} {f(y + h)} {f(x)} {f(y + h - r)}"
        f"L{f(x)} {f(y + r)}Q{f(x)} {f(y)} {f(x + r)} {f(y)}Z"
    )


def poly(pts) -> str:
    return "M" + "L".join(f"{f(x)} {f(y)}" for x, y in pts) + "Z"


# --- the five glyphs, each on a 112 x 100 grid, baseline at y = 100 ---

def glyph_G() -> str:
    # C shape whose counter opens to the right edge (the notch), plus a spur
    # bar entering at mid height. Measured: notch y 24-44, spur y 44-63.
    outer = rrect(0, 0, W, CAP, RO)
    counter = poly([
        (S, S), (W, S), (W, 44), (50, 44), (50, 63), (88, 63), (88, CAP - S), (S, CAP - S)
    ])
    return outer + counter


def glyph_O() -> str:
    return rrect(0, 0, W, CAP, RO) + rrect(S, S, W - 2 * S, CAP - 2 * S, 4)


def glyph_U() -> str:
    # open at the top, rounded only at the bottom
    outer = (
        f"M0 0L{f(S)} 0L{f(S)} {f(CAP - S - 4)}"
        f"Q{f(S)} {f(CAP - S)} {f(S + 4)} {f(CAP - S)}"
        f"L{f(W - S - 4)} {f(CAP - S)}"
        f"Q{f(W - S)} {f(CAP - S)} {f(W - S)} {f(CAP - S - 4)}"
        f"L{f(W - S)} 0L{f(W)} 0L{f(W)} {f(CAP - RO)}"
        f"Q{f(W)} {f(CAP)} {f(W - RO)} {f(CAP)}"
        f"L{f(RO)} {f(CAP)}Q0 {f(CAP)} 0 {f(CAP - RO)}Z"
    )
    return outer


def glyph_P() -> str:
    # shallow bowl, measured outer bottom at y 62, counter y 19-44
    outer = (
        f"M0 0L{f(W - RO)} 0Q{f(W)} 0 {f(W)} {f(RO)}"
        f"L{f(W)} {f(62 - RO)}Q{f(W)} 62 {f(W - RO)} 62"
        f"L{f(S)} 62L{f(S)} {f(CAP)}L0 {f(CAP)}Z"
    )
    counter = poly([(S, 19), (W - S - 4, 19), (W - S, 23), (W - S, 40), (W - S - 4, 44), (S, 44)])
    return outer + counter


def glyph_R() -> str:
    # same bowl as P, plus a leg measured from (50,62) to (112,100)
    outer = (
        f"M0 0L{f(W - RO)} 0Q{f(W)} 0 {f(W)} {f(RO)}"
        f"L{f(W)} {f(62 - RO)}Q{f(W)} 62 {f(W - RO)} 62"
        f"L{f(78)} 62L{f(W)} {f(CAP)}L{f(W - 30)} {f(CAP)}"
        f"L{f(52)} 62L{f(S)} 62L{f(S)} {f(CAP)}L0 {f(CAP)}Z"
    )
    counter = poly([(S, 19), (W - S - 4, 19), (W - S, 23), (W - S, 40), (W - S - 4, 44), (S, 44)])
    return outer + counter


GLYPHS = [("G", glyph_G), ("R", glyph_R), ("O", glyph_O), ("U", glyph_U), ("P", glyph_P)]


def wordmark_paths(scale: float, x0: float, y0: float) -> str:
    """GROUP, laid out at the given scale with the cap top at y0."""
    out = []
    for i, (name, fn) in enumerate(GLYPHS):
        tx = x0 + i * ADV * scale
        out.append(
            f'  <path d="{fn()}" fill="{GRAPHITE}" fill-rule="evenodd" '
            f'transform="translate({f(tx)} {f(y0)}) scale({scale:.5f})"/>'
        )
    return "\n".join(out)


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)

    # --- GROUP on its own, cap height 100, tight box ---
    total_w = 4 * ADV + W
    body = wordmark_paths(1.0, 0, 0)
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {f(total_w)} {f(CAP)}" '
        f'role="img" aria-label="GROUP">\n{body}\n</svg>\n'
    )
    with open(os.path.join(OUT, "wordmark-group.svg"), "w", encoding="utf-8") as fh:
        fh.write(svg)
    print(f"  wordmark-group.svg    {f(total_w)} x {f(CAP)} units")

    # --- full lockup: the mark, with GROUP centred beneath it ---
    # Positions carried over from the artwork: 1 source px = 90/89.5 mark units.
    U = 90 / 89.5
    cap_units = 16 * U            # GROUP cap height in mark units
    scale = cap_units / CAP
    group_w = total_w * scale
    gx = 100 - group_w / 2        # centred on the mark
    gy = 100 + (267 - 163.55) * U  # cap top, measured below the mark centre
    with open(os.path.join(OUT, "g-mark.svg"), encoding="utf-8") as fh:
        mark = fh.read()
    inner = mark.split(">", 1)[1].rsplit("</svg>", 1)[0].strip()
    lockup = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 {f(gy + cap_units + 4)}" '
        f'role="img" aria-label="Gohil\'s Group">\n'
        f"  {inner}\n{wordmark_paths(scale, gx, gy)}\n</svg>\n"
    )
    with open(os.path.join(OUT, "logo-lockup.svg"), "w", encoding="utf-8") as fh:
        fh.write(lockup)

    # --- path data for the React components, so SVG and TSX never drift ---
    glyph_defs = ",\n".join(
        f"  {{ char: '{name}', d: '{fn()}' }}" for name, fn in GLYPHS
    )
    ts = f"""/**
 * GROUP wordmark path data.
 *
 * GENERATED by scripts/build-lockup.py. Do not edit by hand.
 *
 * Each glyph sits on a {int(W)} x {int(CAP)} grid with the baseline at y = {int(CAP)},
 * constructed from metrics measured off client-assets image 2:
 * cap height 16px, glyph width 18, stroke 4, advance 24.5.
 */

export const GROUP_GLYPH_WIDTH = {W}
export const GROUP_CAP_HEIGHT = {CAP}
export const GROUP_ADVANCE = {ADV}
export const GROUP_VIEWBOX = '0 0 {f(4 * ADV + W)} {f(CAP)}'

export const GROUP_GLYPHS = [
{glyph_defs}
] as const
"""
    ts_dir = os.path.join(os.path.dirname(__file__), "..", "src", "data")
    os.makedirs(ts_dir, exist_ok=True)
    with open(os.path.join(ts_dir, "wordmark-paths.ts"), "w", encoding="utf-8") as fh:
        fh.write(ts)
    print("  src/data/wordmark-paths.ts")
    print(f"  logo-lockup.svg       200 x {f(gy + cap_units + 4)} units")
    print(f"    GROUP cap {f(cap_units)}u, width {f(group_w)}u, at x={f(gx)} y={f(gy)}")
