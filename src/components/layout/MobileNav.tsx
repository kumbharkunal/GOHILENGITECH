'use client'

/**
 * Full screen mobile navigation.
 *
 * The wipe reuses the brand's own diagonal. It is built the same way as the
 * seam, an oversized panel rotated once and translated on one axis, rather
 * than by animating clip-path. Same visual, but only transform changes, so it
 * stays on the compositor. DESIGN.md 7.1.
 *
 * A phone user's most likely action is calling, so both numbers, WhatsApp,
 * the email and the address all live inside the panel rather than three taps
 * away. Brief section 10.1.
 *
 * Closes on: link tap, Escape, backdrop tap, the hardware back button, and
 * route change. Traps focus while open and restores it to the trigger.
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Boxes,
  Factory,
  Wrench,
  BadgeCheck,
  Building2,
  Info,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
} from 'lucide-react'
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap'
import { Z, DUR, STAGGER } from '@/lib/constants'
import { NAV, ACTIONS } from '@/data/nav'
import { COMPANY, PEOPLE } from '@/data/company'
import { whatsappGeneral, telUrl } from '@/lib/whatsapp'
import { useSmoothScroll } from './SmoothScroll'

const ICONS = [Boxes, Factory, Wrench, BadgeCheck, Building2, Info, Phone] as const

export function MobileNav({
  open,
  onClose,
  triggerRef,
}: {
  open: boolean
  onClose: () => void
  triggerRef: React.RefObject<HTMLButtonElement | null>
}) {
  const root = useRef<HTMLDivElement>(null)
  const wipe = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const { lock, unlock } = useSmoothScroll()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // Close on route change, which covers a tap on any link inside the panel.
  useEffect(() => {
    if (open) onClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Escape, focus trap, scroll lock, and the hardware back button.
  useEffect(() => {
    if (!open) {
      unlock()
      return
    }
    lock()

    // Give the back button something to pop instead of leaving the page.
    history.pushState({ menu: true }, '')
    const onPop = () => onClose()
    window.addEventListener('popstate', onPop)

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const focusables = root.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (!focusables || focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)

    // Move focus in once the panel is up.
    const t = window.setTimeout(() => {
      root.current?.querySelector<HTMLElement>('a[href], button')?.focus()
    }, 60)

    return () => {
      window.removeEventListener('popstate', onPop)
      document.removeEventListener('keydown', onKey)
      window.clearTimeout(t)
      unlock()
      // Only restore focus if it is still inside the panel.
      if (root.current?.contains(document.activeElement)) triggerRef.current?.focus()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  useGSAP(
    () => {
      if (!wipe.current) return
      const reduced = prefersReducedMotion()
      const items = gsap.utils.toArray<HTMLElement>('[data-menu-item]')

      if (reduced) {
        gsap.set(wipe.current, { yPercent: open ? 0 : -100 })
        gsap.set(items, { opacity: open ? 1 : 0, y: 0 })
        return
      }

      const tl = gsap.timeline()
      if (open) {
        tl.fromTo(
          wipe.current,
          { yPercent: -100 },
          { yPercent: 0, duration: DUR.menu, ease: 'power4.inOut' },
        ).fromTo(
          items,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', stagger: STAGGER.menuItem },
          '-=0.22',
        )
      } else {
        tl.to(items, { opacity: 0, duration: 0.12, ease: 'none' }).to(
          wipe.current,
          { yPercent: -100, duration: 0.38, ease: 'power4.inOut' },
          '-=0.04',
        )
      }
    },
    { scope: root, dependencies: [open] },
  )

  const stop = useCallback((e: React.MouseEvent) => e.stopPropagation(), [])
  if (!mounted) return null

  return (
    <div
      ref={root}
      id="mobile-menu"
      className="fixed inset-0 md:hidden"
      style={{
        zIndex: Z.menu,
        visibility: open ? 'visible' : 'hidden',
        pointerEvents: open ? 'auto' : 'none',
      }}
      inert={!open}
      onClick={onClose}
    >
      {/* The wipe. The pivot is rotated once; the panel inside it translates on
          a single axis, so the movement is perpendicular to the diagonal and
          only transform ever changes. Same construction as the seam. */}
      <div className="menu__clip" aria-hidden="true">
        <div className="menu__pivot">
          <div ref={wipe} className="menu__wipe" />
        </div>
      </div>

      {/*
        data-lenis-prevent is required, not cosmetic. Lenis calls preventDefault
        on touch and wheel at the document, so without it this panel cannot be
        scrolled at all on a phone: everything below the fold was unreachable.
        overscroll-contain stops the page behind from taking over at the ends.
      */}
      <nav
        aria-label="Main"
        onClick={stop}
        data-lenis-prevent
        className="relative flex h-full flex-col justify-between overflow-y-auto overscroll-contain px-6"
        style={{
          WebkitOverflowScrolling: 'touch',
          paddingTop: 'calc(env(safe-area-inset-top) + 88px)',
          paddingBottom: 'calc(env(safe-area-inset-bottom) + 24px)',
        }}
      >
        <ul className="flex flex-col gap-1">
          {NAV.map((item, i) => {
            const Icon = ICONS[i] ?? Boxes
            const active = pathname === item.href
            return (
              <li key={item.href} data-menu-item>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 py-1.5"
                  aria-current={active ? 'page' : undefined}
                >
                  <Icon
                    className="size-5 shrink-0"
                    style={{ color: active ? 'var(--fg-accent)' : 'var(--fg-secondary)' }}
                    aria-hidden="true"
                  />
                  <span className="flex min-w-0 flex-col">
                    <span
                      className="font-display text-[1.5rem] leading-none"
                      style={{
                        color: active ? 'var(--fg-accent)' : 'var(--fg-primary)',
                        fontVariationSettings: '"wdth" 125',
                        fontWeight: 700,
                      }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="mt-1 font-mono text-micro"
                      style={{ color: 'var(--fg-secondary)' }}
                    >
                      {item.hint}
                    </span>
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="mt-8 flex flex-col gap-3 pb-2" data-menu-item>
          <a
            href={whatsappGeneral()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-sm px-5 py-3.5 font-semibold"
            style={{ backgroundColor: 'var(--color-whatsapp)', color: '#ffffff' }}
          >
            <MessageCircle className="size-5" aria-hidden="true" />
            {ACTIONS.whatsappEnquiry}
          </a>

          {PEOPLE.map((p) => (
            <a
              key={p.phone}
              href={telUrl(p.phone)}
              className="flex items-center justify-between gap-3 rounded-sm border px-4 py-3"
              style={{ borderColor: 'var(--line-strong)', color: 'var(--fg-primary)' }}
            >
              {/* The name gives way, never the number. See /contact. */}
              <span className="flex min-w-0 items-center gap-2 text-body">
                <Phone className="size-4 shrink-0" style={{ color: 'var(--fg-secondary)' }} aria-hidden="true" />
                {p.name}
              </span>
              <span className="shrink-0 whitespace-nowrap font-mono text-data">
                {p.phoneDisplay}
              </span>
            </a>
          ))}

          <a
            href={`mailto:${COMPANY.email}`}
            className="flex items-center gap-2 pt-1 text-caption"
            style={{ color: 'var(--fg-secondary)' }}
          >
            <Mail className="size-4" aria-hidden="true" />
            {COMPANY.email}
          </a>
          <address className="flex items-start gap-2 not-italic text-caption" style={{ color: 'var(--fg-secondary)' }}>
            <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <span>{COMPANY.address.short}</span>
          </address>
        </div>
      </nav>
    </div>
  )
}
