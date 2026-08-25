'use client'

/**
 * Section entry. DESIGN.md 7.2.
 *
 * y 24 to 0, opacity 0 to 1, 0.6s power3.out, 0.06s stagger, once.
 * Identical everywhere on purpose: consistency reads as craft, variety reads
 * as chaos. Under reduced motion the children are simply present, with no
 * offset and no layout shift.
 *
 * Animates direct children so a section can wrap a heading and a grid and get
 * the stagger for free.
 */

import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion, isMobileViewport } from '@/lib/gsap'
import { DUR, STAGGER } from '@/lib/constants'

export function Reveal({
  children,
  className,
  as: Tag = 'div',
  /** Delay the whole group, for a second block in the same viewport. */
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'ul' | 'section'
  delay?: number
}) {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = root.current
      if (!el) return
      const items = Array.from(el.children) as HTMLElement[]
      if (items.length === 0) return

      if (prefersReducedMotion()) {
        gsap.set(items, { clearProps: 'all' })
        return
      }

      const mobile = isMobileViewport()
      gsap.fromTo(
        items,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: mobile ? DUR.revealMobile : DUR.reveal,
          ease: 'power3.out',
          stagger: mobile ? STAGGER.revealMobile : STAGGER.reveal,
          delay,
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
        },
      )
    },
    { scope: root, dependencies: [] },
  )

  return (
    // @ts-expect-error the tag union is narrower than the ref type
    <Tag ref={root} className={className}>
      {children}
    </Tag>
  )
}
