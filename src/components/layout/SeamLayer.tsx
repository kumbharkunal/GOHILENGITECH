'use client'

/**
 * THE SEAM. DESIGN.md 1.3 and 5.2.
 *
 * One continuous diagonal at 38.1deg, the angle measured off the client's own
 * artwork. On one side orange, what Gohil builds. On the other the page ground,
 * what Gohil supplies. As you scroll the seam travels: sections about custom
 * machinery push the orange forward, sections about dealer stock pull it back.
 *
 * How it is built, and why this way:
 *
 *   .seam          fixed, clips
 *     .seam__pivot rotated ONCE to the seam angle, zero size, at the centre
 *       .seam__field an oversized square whose TOP EDGE is the seam
 *
 * Because the field sits inside an already rotated pivot, translating it on Y
 * moves it perpendicular to the seam. The only animated property is
 * transform, so it stays on the compositor. Animating clip-path instead would
 * repaint every frame, and animating width or height would trigger layout.
 *
 * Zero pinned ScrollTriggers. Pinning is the mobile hostile part and the
 * effect does not need it.
 *
 * A section opts in with data-seam="0..1", where 0 is fully supply side and
 * 1 is fully build side. Sections without the attribute inherit the last value.
 */

import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion, isMobileViewport } from '@/lib/gsap'
import { Z } from '@/lib/constants'

/** Where the seam rests before any section has claimed it. */
const DEFAULT_SEAM = 0.45

/**
 * Perpendicular distance from the viewport centre to the furthest corner,
 * measured along the seam normal. Beyond this the field has fully cleared.
 */
function spanFor(angleDeg: number): number {
  if (typeof window === 'undefined') return 1200
  const th = (angleDeg * Math.PI) / 180
  const { innerWidth: w, innerHeight: h } = window
  return (w * Math.abs(Math.sin(th)) + h * Math.abs(Math.cos(th))) / 2 + 40
}

export function SeamLayer() {
  const root = useRef<HTMLDivElement>(null)
  const field = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = field.current
      if (!el) return

      const angle = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--seam-angle'),
      ) || 38.1

      const mobile = isMobileViewport()
      const span = spanFor(angle)

      /**
       * Map a 0..1 seam value to a translation along the seam normal.
       *
       *   0  the seam sits just off the edge, no orange visible
       *   1  the seam passes through the viewport centre, orange owns half
       *
       * The range deliberately stops at half. Content always sits on the page
       * ground and never on the orange, so the orange grows and shrinks on the
       * opposite side rather than sweeping across the text. Anything past 1
       * would put type on a 3.15:1 ground.
       *
       * On mobile the ceiling drops again to a corner wedge. DESIGN.md 9.2.
       */
      const toY = (v: number) => {
        const ceiling = mobile ? span * 0.62 : 0
        return gsap.utils.mapRange(0, 1, span, ceiling, gsap.utils.clamp(0, 1, v))
      }

      gsap.set(el, { y: toY(DEFAULT_SEAM) })

      if (prefersReducedMotion()) return

      const sections = gsap.utils.toArray<HTMLElement>('[data-seam]')
      if (sections.length === 0) return

      // One trigger per declaring section, created top to bottom so refresh
      // order matches page order. DESIGN.md 7.1.
      sections.forEach((section, i) => {
        const value = parseFloat(section.dataset.seam ?? String(DEFAULT_SEAM))
        ScrollTrigger.create({
          trigger: section,
          start: 'top bottom',
          end: 'top center',
          scrub: 0.5,
          refreshPriority: i,
          animation: gsap.to(el, { y: toY(value), ease: 'none' }),
        })
      })
    },
    { scope: root, dependencies: [] },
  )

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="seam pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: Z.seam }}
    >
      <div className="seam__pivot">
        <div ref={field} className="seam__field" />
      </div>
    </div>
  )
}
