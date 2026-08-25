'use client'

/**
 * Home hero.
 *
 * The product sits inside a ring built from the brand's own geometry: the same
 * 180 degree orange arc and the same gap as the mark, at hero scale. That is
 * why it does not read as a generic circular photo frame. It also crops to the
 * subject, which is the honest way to present photography this size.
 *
 * One load sequence, then it is done. Never repeats. The ring keeps a very
 * slow idle rotation afterwards, which is the only continuous motion on the
 * site and is disabled outright under reduced motion.
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
      // Starts after the loader has cleared, so the two do not overlap.
      const start = 0.35

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        '[data-hero-line]',
        { yPercent: 108 },
        { yPercent: 0, duration: total * 0.66, stagger: 0.09 },
        start,
      )
        .fromTo(
          '[data-hero-fade]',
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: total * 0.5, stagger: 0.08 },
          start + total * 0.3,
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

      // Idle. Very slow, transform only, and the one continuous motion here.
      gsap.to('[data-hero-ring]', {
        rotate: 360,
        duration: 190,
        ease: 'none',
        repeat: -1,
        delay: total + start,
      })
    },
    { scope: root, dependencies: [] },
  )

  return (
    <section
      ref={root}
      data-seam="0.34"
      className="container-page relative flex min-h-[calc(100dvh-72px)] flex-col justify-center py-10 md:py-16"
    >
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

      <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-14">
        <div>
          <div className="max-w-[min(100%,60ch)]">
            <p
              data-hero-fade
              className="mt-4 max-w-[52ch] text-body text-fg-muted md:mt-6 md:text-body-l"
            >
              {HOME.hero.subline}
            </p>
            <div data-hero-fade className="mt-6 flex flex-wrap gap-3 md:mt-9">
              <a
                href={whatsappGeneral()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm bg-orange px-[22px] py-[14px] font-semibold text-ink transition-colors hover:bg-orange-hover"
              >
                <MessageCircle className="size-5" aria-hidden="true" />
                {ACTIONS.whatsappEnquiry}
              </a>
              <a
                href={telUrl(PRIMARY_PERSON.phone)}
                className="inline-flex items-center gap-2 rounded-sm border px-[22px] py-[14px] font-semibold text-fg transition-colors hover:border-fg"
                style={{ borderColor: 'var(--line-strong)' }}
              >
                <Phone className="size-5" aria-hidden="true" />
                Call {PRIMARY_PERSON.phoneDisplay.replace('+91 ', '')}
              </a>
            </div>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
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
          <div className="hero-visual__dots">
            {Array.from({ length: 36 }).map((_, i) => (
              <span key={i} data-hero-dot />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
