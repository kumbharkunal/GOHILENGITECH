'use client'

/**
 * Scroll driven capability strip. DESIGN.md 7.2.
 *
 * One marquee per page, maximum. This is it.
 *
 * The list is longer than the viewport, and moving it with scroll is what says
 * so. ease 'none' keeps the mapping 1:1 with scroll position, per the GSAP
 * guidance for containerAnimation style motion.
 *
 * Under reduced motion, and on a narrow phone, it becomes a plain wrapped list
 * rather than a strip that has to be dragged. Nothing is hidden either way.
 *
 * The bullet after each item, rather than between items, is the client's own
 * device from their artwork.
 */

import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap'

export function Marquee({ items }: { items: readonly string[] }) {
  const root = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLUListElement>(null)

  useGSAP(
    () => {
      const el = track.current
      const wrap = root.current
      if (!el || !wrap) return
      if (prefersReducedMotion()) return

      const overflow = el.scrollWidth - wrap.clientWidth
      if (overflow <= 0) return

      gsap.fromTo(
        el,
        { x: 0 },
        {
          x: -overflow,
          ease: 'none',
          scrollTrigger: {
            trigger: wrap,
            start: 'top 85%',
            end: 'bottom 25%',
            scrub: true,
          },
        },
      )
    },
    { scope: root, dependencies: [] },
  )

  return (
    <div ref={root} className="marquee" aria-label="What we handle">
      <ul
        ref={track}
        className="flex w-max gap-x-8 gap-y-3 max-md:w-full max-md:flex-wrap motion-reduce:w-full motion-reduce:flex-wrap"
      >
        {items.map((item) => (
          <li key={item} className="flex shrink-0 items-baseline gap-2 whitespace-nowrap">
            <span className="text-h3 text-fg">{item}</span>
            <span aria-hidden="true" className="marquee__dot" />
          </li>
        ))}
      </ul>
    </div>
  )
}
