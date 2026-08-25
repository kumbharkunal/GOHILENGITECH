'use client'

/**
 * Home hero.
 *
 * The product sits inside a ring built from the brand's own geometry: the same
 * 180 degree orange arc and the same gap as the mark, at hero scale. That is
 * why it does not read as a generic circular photo frame. It also crops to the
 * subject, which is the honest way to present photography this size.
 *
 * One load sequence, then it is done. Never repeats. Afterwards the ring keeps
 * a very slow idle rotation and the visual answers the pointer with a shallow
 * parallax. Both are transform only, both are disabled under reduced motion,
 * and the parallax is never armed on a touch device where there is no pointer
 * to follow.
 *
 * Sizing is the other half of this file. The section is one viewport tall
 * measured in svh, not dvh: dvh changes as mobile browser chrome hides, which
 * makes the hero resize mid scroll. svh is the smallest stable height, so
 * committing to it is what stops the visual being cut off on a phone. The ring
 * is then clamped against viewport height as well as width, so it gives way
 * before the stack can overflow.
 *
 * Hero stack stays at four elements: headline, subline, CTAs, visual.
 */

import { useRef } from 'react'
import Image from 'next/image'
import { MessageCircle, Phone } from 'lucide-react'
import { gsap, useGSAP, prefersReducedMotion, isMobileViewport } from '@/lib/gsap'
import { DUR } from '@/lib/constants'
import { HOME } from '@/data/home'
import { ACTIONS } from '@/data/nav'
import { PRIMARY_PERSON } from '@/data/company'
import { whatsappGeneral, telUrl } from '@/lib/whatsapp'

export function Hero() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const mobile = isMobileViewport()
      const total = mobile ? DUR.loadMobile : DUR.load
      // Overlaps the tail of the loader rather than waiting for it. The
      // headline is clipped until it rises, so it is not LCP eligible while it
      // waits, and every millisecond of delay here lands on LCP.
      const start = 0.12

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        '[data-hero-line]',
        { yPercent: 108 },
        { yPercent: 0, duration: total * 0.5, stagger: 0.07 },
        start,
      )
        .fromTo(
          '[data-hero-fade]',
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: total * 0.5, stagger: 0.08 },
          start + total * 0.3,
        )
        .fromTo(
          '[data-hero-glow]',
          { scale: 0.6, opacity: 0 },
          { scale: 1, opacity: 1, duration: total * 1.1, ease: 'power2.out' },
          start,
        )
        .fromTo(
          '[data-hero-ring]',
          { scale: 0.82, opacity: 0, rotate: -55 },
          { scale: 1, opacity: 1, rotate: 0, duration: total * 0.95, ease: 'power3.out' },
          start + 0.05,
        )
        .fromTo(
          '[data-hero-product]',
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: total * 0.7, ease: 'power2.out' },
          start + total * 0.35,
        )
        .fromTo(
          '[data-hero-dot]',
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 0.4, stagger: 0.014, ease: 'back.out(2)' },
          start + total * 0.5,
        )
        .fromTo(
          '[data-hero-cue]',
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          start + total * 0.9,
        )

      // Idle. Very slow, transform only, and the one continuous motion here.
      gsap.to('[data-hero-ring]', {
        rotate: 360,
        duration: 190,
        ease: 'none',
        repeat: -1,
        delay: total + start,
      })

      // The glow breathes against the ring's rotation so the two never lock
      // into a single readable rhythm.
      gsap.to('[data-hero-glow]', {
        scale: 1.08,
        opacity: 0.72,
        duration: 7,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: total + start,
      })

      // The scroll cue's travel is what reads as "there is more below"; a
      // static chevron does not.
      gsap.to('[data-hero-cue-dot]', {
        y: 12,
        opacity: 0,
        duration: 1.4,
        ease: 'power2.in',
        repeat: -1,
        repeatDelay: 0.35,
      })

      /**
       * Pointer parallax. Pointer, not mouse: a stylus should drive it and a
       * finger should not, and `(hover: hover)` is the only reliable way to ask
       * that question. Depths differ per layer so the ring, the product and the
       * dot grid separate rather than sliding as one flat plate.
       */
      if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

      const layers: [string, number][] = [
        ['[data-hero-glow]', 10],
        ['[data-hero-ring]', 16],
        ['[data-hero-product]', 30],
        ['[data-hero-dots]', 22],
      ]
      const movers = layers.map(([sel, depth]) => ({
        depth,
        x: gsap.quickTo(sel, 'x', { duration: 0.7, ease: 'power3.out' }),
        y: gsap.quickTo(sel, 'y', { duration: 0.7, ease: 'power3.out' }),
      }))

      const onMove = (e: PointerEvent) => {
        const el = root.current
        if (!el) return
        const r = el.getBoundingClientRect()
        // -0.5 to 0.5 from the centre of the section.
        const nx = (e.clientX - r.left) / r.width - 0.5
        const ny = (e.clientY - r.top) / r.height - 0.5
        for (const m of movers) {
          m.x(nx * m.depth)
          m.y(ny * m.depth)
        }
      }
      const onLeave = () => {
        for (const m of movers) {
          m.x(0)
          m.y(0)
        }
      }

      const el = root.current
      el?.addEventListener('pointermove', onMove)
      el?.addEventListener('pointerleave', onLeave)
      return () => {
        el?.removeEventListener('pointermove', onMove)
        el?.removeEventListener('pointerleave', onLeave)
      }
    },
    { scope: root, dependencies: [] },
  )

  return (
    <section ref={root} data-seam="0.34" className="hero container-page">
      {/* The headline takes the full measure. Sharing the row with the visual
          forces it to four lines at this width. DESIGN.md 5.1 */}
      <h1 className="text-h1">
        {HOME.hero.headline.map((line) => (
          <span key={line} className="block overflow-hidden pb-[0.06em]">
            <span data-hero-line className="block">
              {line}
            </span>
          </span>
        ))}
      </h1>

      <div className="hero__body">
        <div>
          {/* The ground is declared, not inherited from behind the fixed seam
              layer. Two reasons. It enforces DESIGN.md 5.1 structurally rather
              than by tuning the seam offset per breakpoint, which I have now
              got wrong twice. And it gives contrast tooling a real background
              to measure: the seam field is a 300vmax rotated square, so its
              box covers the viewport even when the visible orange is a corner,
              and axe reads that box rather than the pixels. Verified by
              sampling: the rendered ground behind this text is mist. */}
          <div className="max-w-[min(100%,60ch)]">
            <p data-hero-fade className="max-w-[52ch] text-body text-fg-muted md:text-body-l">
              {HOME.hero.subline}
            </p>
            <div data-hero-fade className="hero__ctas">
              <a
                href={whatsappGeneral()}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta bg-orange text-ink hover:bg-orange-hover"
              >
                <MessageCircle className="size-5 shrink-0" aria-hidden="true" />
                <span className="hidden sm:inline">{ACTIONS.whatsappEnquiry}</span>
                <span className="sm:hidden">WhatsApp</span>
              </a>
              <a
                href={telUrl(PRIMARY_PERSON.phone)}
                className="hero-cta hero-cta--ghost text-fg"
              >
                <Phone className="size-5 shrink-0" aria-hidden="true" />
                <span className="hidden sm:inline">Call </span>
                {PRIMARY_PERSON.phoneDisplay.replace('+91 ', '')}
              </a>
            </div>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          {/* Sits behind everything and gives the ring something to lift off.
              A flat cut-out on a flat ground was the reason this read cheap. */}
          <div data-hero-glow className="hero-visual__glow" />

          {/* The ring: the mark's own 180 degree arc and gap, at hero scale. */}
          <svg data-hero-ring viewBox="0 0 200 200" className="hero-visual__ring">
            <circle cx="100" cy="100" r="93" fill="none" stroke="var(--color-steel)" strokeWidth="0.8" opacity="0.5" />
            <path
              d="M163.64 36.36A90 90 0 0 0 36.36 163.64L51.563 148.437A68.5 68.5 0 0 1 148.437 51.563Z"
              fill="var(--color-orange)"
            />
            <path
              d="M36.36 163.64A90 90 0 0 0 100 190L100 168.5A68.5 68.5 0 0 1 51.563 148.437Z"
              fill="var(--color-steel)"
              opacity="0.45"
            />
          </svg>

          <div className="hero-visual__disc" />

          <div data-hero-product className="hero-visual__product">
            <Image
              src="/products/helical-gear-motor.webp"
              alt="Blue helical gear motor with flange mounted three phase motor"
              width={663}
              height={450}
              sizes="(max-width: 1024px) 70vw, 460px"
              priority
              className="h-full w-full object-contain"
            />
          </div>

          {/* Dot grid, the one decorative element. Drawn, not an image. */}
          <div data-hero-dots className="hero-visual__dots">
            {Array.from({ length: 36 }).map((_, i) => (
              <span key={i} data-hero-dot />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue. Hidden from assistive tech: it repeats what the scrollbar
          already says, and there is nothing here to activate. */}
      <div data-hero-cue className="hero__cue" aria-hidden="true">
        <span className="hero__cue-rail">
          <span data-hero-cue-dot className="hero__cue-dot" />
        </span>
      </div>
    </section>
  )
}
