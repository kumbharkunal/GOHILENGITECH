'use client'

/**
 * Global page loader.
 *
 * Built from the client's own mark rather than a generic spinner: the orange
 * arc draws itself, the G settles in, and a second ring meshes against it like
 * a gear pair. The whole thing is the reduction idea the site is built on,
 * played once.
 *
 * Timing is deliberate. It runs about 1.1s on first load and about 0.5s on a
 * route change, because a loader that outstays the content it is covering is
 * just a delay. It never blocks a second time on the same navigation, and it
 * collapses to a single fade under prefers-reduced-motion.
 */

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap'
import { MARK_PATHS, MARK_VIEWBOX } from '@/data/mark-paths'
import { GROUP_GLYPHS, GROUP_ADVANCE, GROUP_VIEWBOX } from '@/data/wordmark-paths'
import { Z } from '@/lib/constants'

export function PageLoader() {
  const pathname = usePathname()
  const root = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)
  const first = useRef(true)

  // Re-arm on every navigation.
  useEffect(() => {
    if (first.current) return
    setVisible(true)
  }, [pathname])

  useGSAP(
    () => {
      if (!visible) return
      const el = root.current
      if (!el) return

      const reduced = prefersReducedMotion()
      const initial = first.current
      first.current = false

      if (reduced) {
        gsap.to(el, {
          autoAlpha: 0,
          duration: 0.2,
          delay: 0.15,
          onComplete: () => setVisible(false),
        })
        return
      }

      const dur = initial ? 1 : 0.55
      const tl = gsap.timeline({ onComplete: () => setVisible(false) })

      tl.set('[data-loader-arc]', { rotate: -110, transformOrigin: '50% 50%', opacity: 0 })
        .set('[data-loader-g]', { rotate: 40, transformOrigin: '50% 50%', opacity: 0 })
        .set('[data-loader-mesh]', { rotate: 0, transformOrigin: '50% 50%', opacity: 0 })
        .set('[data-loader-glyph]', { opacity: 0, y: 10 })

        // the two halves of the mark swing into mesh
        .to('[data-loader-arc]', { rotate: 0, opacity: 1, duration: dur * 0.62, ease: 'power3.out' }, 0)
        .to('[data-loader-g]', { rotate: 0, opacity: 1, duration: dur * 0.62, ease: 'power3.out' }, 0.04)
        // the meshing ring turns the other way, at a reduction
        .to(
          '[data-loader-mesh]',
          { rotate: 150, opacity: 1, duration: dur * 0.85, ease: 'power2.out' },
          0,
        )
        .to(
          '[data-loader-glyph]',
          { opacity: 1, y: 0, duration: dur * 0.3, ease: 'power2.out', stagger: dur * 0.05 },
          dur * 0.38,
        )
        .to(el, { autoAlpha: 0, duration: 0.32, ease: 'power2.inOut' }, dur * 0.92)
    },
    { scope: root, dependencies: [visible, pathname] },
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
