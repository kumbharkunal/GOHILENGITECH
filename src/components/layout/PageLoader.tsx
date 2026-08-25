'use client'

/**
 * Global page loader.
 *
 * Built from the client's own mark rather than a generic spinner: the orange
 * arc and the G swing into mesh while a dashed ring turns against them at a
 * reduction. The idea the whole site is built on, played once.
 *
 * The hide is driven by a timer, NOT by the animation's onComplete.
 *
 * That is deliberate and it is the important detail here. An earlier version
 * hung the unmount off the GSAP timeline finishing, and when the timeline did
 * not start for any reason the loader sat there at full opacity covering the
 * entire site. A loader that can stick is worse than no loader at all, because
 * it takes the whole page with it. So the timer is the authority and the
 * animation is decoration: if GSAP never runs, the loader still leaves on
 * schedule and the visitor sees the site.
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap'
import { MARK_PATHS, MARK_VIEWBOX } from '@/data/mark-paths'
import { GROUP_GLYPHS, GROUP_ADVANCE, GROUP_VIEWBOX } from '@/data/wordmark-paths'
import { Z } from '@/lib/constants'
import { useSmoothScroll } from './SmoothScroll'

/**
 * First load gets the full sequence, a route change a brief cover.
 *
 * FIRST_MS is an LCP cost, not just a stylistic choice. The hero cannot paint
 * its largest element until the loader clears, so every millisecond here lands
 * directly on Largest Contentful Paint. Measured: at 1250ms LCP was 2.80s
 * against an FCP of 0.76s. 850 keeps it a real brand moment and buys back most
 * of the gap. Do not raise it without re-running scripts/qa.mjs.
 */
const FIRST_MS = 850
const ROUTE_MS = 560
const REDUCED_MS = 320

export function PageLoader() {
  const pathname = usePathname()
  const root = useRef<HTMLDivElement>(null)
  const first = useRef(true)
  const [visible, setVisible] = useState(true)
  const [run, setRun] = useState(0)
  const { scrollTo } = useSmoothScroll()

  const settle = useCallback(() => {
    setVisible(false)
    // The loader is the last thing to finish on a navigation, so resetting
    // here removes the race with Lenis settling back behind the cover.
    if (!window.location.hash) scrollTo(0, { immediate: true })
  }, [scrollTo])

  // Re-arm on navigation. `run` forces the effects to re-fire even if the
  // pathname somehow repeats.
  useEffect(() => {
    if (first.current) return
    setVisible(true)
    setRun((n) => n + 1)
  }, [pathname])

  // The authority. Nothing about this depends on GSAP.
  useEffect(() => {
    if (!visible) return
    const ms = prefersReducedMotion() ? REDUCED_MS : first.current ? FIRST_MS : ROUTE_MS
    const t = window.setTimeout(settle, ms)
    return () => window.clearTimeout(t)
  }, [visible, run, settle])

  useGSAP(
    () => {
      if (!visible || !root.current) return
      const initial = first.current
      first.current = false
      if (prefersReducedMotion()) return

      const dur = (initial ? FIRST_MS : ROUTE_MS) / 1000

      gsap
        .timeline()
        .set('[data-loader-arc]', { rotate: -110, transformOrigin: '50% 50%', opacity: 0 })
        .set('[data-loader-g]', { rotate: 40, transformOrigin: '50% 50%', opacity: 0 })
        .set('[data-loader-mesh]', { rotate: 0, transformOrigin: '50% 50%', opacity: 0 })
        .set('[data-loader-glyph]', { opacity: 0, y: 10 })
        .to('[data-loader-arc]', { rotate: 0, opacity: 1, duration: dur * 0.5, ease: 'power3.out' }, 0)
        .to('[data-loader-g]', { rotate: 0, opacity: 1, duration: dur * 0.5, ease: 'power3.out' }, 0.04)
        .to('[data-loader-mesh]', { rotate: 150, opacity: 1, duration: dur * 0.7, ease: 'power2.out' }, 0)
        .to(
          '[data-loader-glyph]',
          { opacity: 1, y: 0, duration: dur * 0.26, ease: 'power2.out', stagger: dur * 0.04 },
          dur * 0.3,
        )
        .to(root.current, { autoAlpha: 0, duration: dur * 0.22, ease: 'power2.inOut' }, dur * 0.74)
    },
    { scope: root, dependencies: [visible, run] },
  )

  if (!visible) return null

  return (
    <div
      ref={root}
      className="page-loader"
      style={{ zIndex: Z.modal + 10 }}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="page-loader__stage">
        <svg viewBox={MARK_VIEWBOX} className="page-loader__mark" aria-hidden="true">
          {/* the meshing ring: a dashed circle turning against the mark */}
          <circle
            data-loader-mesh
            cx="100"
            cy="100"
            r="79"
            fill="none"
            stroke="var(--color-steel)"
            strokeWidth="3"
            strokeDasharray="7 13"
            strokeLinecap="round"
            opacity="0.55"
          />
          <path data-loader-g className="mark__g" d={MARK_PATHS.g} />
          <path data-loader-arc className="mark__arc" d={MARK_PATHS.arc} />
        </svg>

        <svg viewBox={GROUP_VIEWBOX} className="page-loader__word" aria-hidden="true">
          {GROUP_GLYPHS.map((g, i) => (
            <path
              key={g.char + i}
              data-loader-glyph
              d={g.d}
              fill="var(--color-graphite)"
              fillRule="evenodd"
              transform={`translate(${i * GROUP_ADVANCE} 0)`}
            />
          ))}
        </svg>
      </div>
    </div>
  )
}
