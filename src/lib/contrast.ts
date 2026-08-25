/**
 * WCAG 2.1 contrast maths.
 *
 * Used by the token sheet at /tokens and by the Phase 9 accessibility audit.
 * DESIGN.md 2.3 requires every ratio to be computed, never estimated by eye.
 */

function channelToLinear(value: number): number {
  const c = value / 255
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}

export function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  const full =
    h.length === 3
      ? h
          .split('')
          .map((c) => c + c)
          .join('')
      : h
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ]
}

export function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex)
  return (
    0.2126 * channelToLinear(r) +
    0.7152 * channelToLinear(g) +
    0.0722 * channelToLinear(b)
  )
}

export function contrastRatio(a: string, b: string): number {
  const la = relativeLuminance(a)
  const lb = relativeLuminance(b)
  const [hi, lo] = la > lb ? [la, lb] : [lb, la]
  return (hi + 0.05) / (lo + 0.05)
}

export type ContrastVerdict = 'AAA' | 'AA body' | 'AA large' | 'FAIL'

/**
 * `large` means 24px regular or 18.66px bold and above, per WCAG 2.1.
 */
export function verdict(ratio: number): ContrastVerdict {
  if (ratio >= 7) return 'AAA'
  if (ratio >= 4.5) return 'AA body'
  if (ratio >= 3) return 'AA large'
  return 'FAIL'
}

export function formatRatio(ratio: number): string {
  return `${ratio.toFixed(2)}:1`
}
