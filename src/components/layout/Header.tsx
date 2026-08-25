'use client'

/**
 * Site header. DESIGN.md 4.9.
 *
 * Transparent over the hero, then solid with a 12px backdrop blur past 80px.
 * Hides on scroll down and returns on scroll up, but is always visible at the
 * very top. One line at desktop, 72px tall.
 *
 * The trigger is three bars that morph into an X on a GSAP timeline, not an
 * icon swap. Brief section 10.1.
 */

import { useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '@/lib/gsap'
import { Z, DUR, HEADER_SOLID_AT } from '@/lib/constants'
import { NAV, ACTIONS } from '@/data/nav'
import { Lockup } from '@/components/ui/Logo'
import { MobileNav } from './MobileNav'

export function Header() {
  const root = useRef<HTMLElement>(null)
  const bar = useRef<HTMLDivElement>(null)
  const b1 = useRef<HTMLSpanElement>(null)
  const b2 = useRef<HTMLSpanElement>(null)
  const b3 = useRef<HTMLSpanElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useGSAP(
    () => {
      if (!bar.current) return
      if (prefersReducedMotion()) {
        gsap.set(bar.current, { y: 0 })
        return
      }
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        refreshPriority: -1,
        onUpdate: (self) => {
          const y = self.scroll()
          const solid = y > HEADER_SOLID_AT
          root.current?.setAttribute('data-solid', solid ? 'true' : 'false')
          // Always visible at the very top, and never hidden while the menu is up.
          const hide = solid && self.direction === 1 && y > HEADER_SOLID_AT * 2
          gsap.to(bar.current, {
            yPercent: hide ? -100 : 0,
            duration: DUR.header,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        },
      })
    },
    { scope: root, dependencies: [] },
  )

  // Bars into an X.
  useGSAP(
    () => {
      const reduced = prefersReducedMotion()
      const d = reduced ? 0 : DUR.burger
      const tl = gsap.timeline({ defaults: { duration: d, ease: 'power2.inOut' } })
      if (open) {
        tl.to(b2.current, { scaleX: 0, opacity: 0, duration: d * 0.4 }, 0)
          .to(b1.current, { y: 7, rotate: 45 }, 0)
          .to(b3.current, { y: -7, rotate: -45 }, 0)
      } else {
        tl.to(b1.current, { y: 0, rotate: 0 }, 0)
          .to(b3.current, { y: 0, rotate: 0 }, 0)
          .to(b2.current, { scaleX: 1, opacity: 1, duration: d * 0.4 }, d * 0.3)
      }
    },
    { scope: root, dependencies: [open] },
  )

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-sm focus:bg-orange focus:px-4 focus:py-2 focus:font-semibold focus:text-ink"
        style={{ zIndex: Z.modal }}
      >
        {ACTIONS.skipToContent}
      </a>

      <header
        ref={root}
        data-solid="false"
        className="header fixed inset-x-0 top-0"
        // The header creates its own stacking context, so a z-index on the
        // trigger alone cannot lift it above the overlay. Raise the whole bar
        // instead: the logo stays in place and the bars morph into the X.
        style={{ zIndex: open ? Z.menu + 1 : Z.header }}
      >
        <div ref={bar} className="header__bar" data-over-menu={open ? 'true' : undefined}>
          <div className="container-page flex h-[72px] items-center justify-between gap-6">
            <Link href="/" aria-label="Gohil's Group, home" className="shrink-0">
              <Lockup markClass="h-9 w-9" className="text-[15px]" />
            </Link>

            <nav aria-label="Main" className="hidden md:block">
              <ul className="flex items-center gap-7">
                {NAV.map((item) => {
                  const active = pathname === item.href
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? 'page' : undefined}
                        className="text-caption transition-colors"
                        style={{ color: active ? 'var(--fg-accent)' : 'var(--fg-secondary)' }}
                      >
                        {item.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>

            <button
              ref={trigger}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? ACTIONS.menuClose : ACTIONS.menuOpen}
              className="relative -mr-2 grid size-11 shrink-0 place-items-center md:hidden"
            >
              <span className="relative block h-[16px] w-[24px]">
                {[b1, b2, b3].map((r, i) => (
                  <span
                    key={i}
                    ref={r}
                    className="absolute left-0 block h-[2px] w-full rounded-sm"
                    style={{
                      top: i * 7,
                      backgroundColor: 'var(--fg-primary)',
                      transformOrigin: '50% 50%',
                    }}
                  />
                ))}
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileNav open={open} onClose={() => setOpen(false)} triggerRef={trigger} />
    </>
  )
}
