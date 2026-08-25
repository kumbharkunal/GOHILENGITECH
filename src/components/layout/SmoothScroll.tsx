'use client'

/**
 * Lenis smooth scroll, driven from gsap.ticker so GSAP and Lenis share one
 * loop rather than running two RAFs. DESIGN.md 7.3.
 *
 * Also owns scroll-to-top on navigation, which the client asked for
 * specifically. Five cases are covered and each is noted below.
 *
 * Under prefers-reduced-motion Lenis is not created at all and the page falls
 * back to native scroll. DESIGN.md 10.4.
 */

import { createContext, useContext, useEffect, useLayoutEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap'

interface ScrollApi {
  /** Pause scrolling without losing position. Used by the mobile menu. */
  lock: () => void
  unlock: () => void
  scrollTo: (target: number | string, opts?: { immediate?: boolean }) => void
}

const ScrollContext = createContext<ScrollApi>({
  lock: () => {},
  unlock: () => {},
  scrollTo: () => {},
})

export const useSmoothScroll = () => useContext(ScrollContext)

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const pathname = usePathname()
  const firstRun = useRef(true)
  /** Last path we reset for, so a menu-close popstate does not move the page. */
  const lastPath = useRef<string>('')

  useEffect(() => {
    /**
     * Cases 2 and 3: browser back and forward, and a hard reload part way down
     * the page.
     *
     * Assigning history.scrollRestoration = 'manual' is not enough on its own.
     * Something writes it back to 'auto' during hydration, after this effect
     * has run, and once it is 'auto' the browser restores the old offset on a
     * later frame and overwrites whatever we set. Measured: the flag reads
     * 'auto' immediately after load even though this effect assigned 'manual'.
     *
     * So pin it. Set it once through the real setter, then shadow the property
     * to swallow later writes of 'auto'. Reads still go through to the real
     * getter, so nothing is lied to about the current value.
     */
    const desc = Object.getOwnPropertyDescriptor(History.prototype, 'scrollRestoration')
    if (desc?.get && desc?.set) {
      const { get, set } = desc
      set.call(history, 'manual')
      Object.defineProperty(history, 'scrollRestoration', {
        configurable: true,
        get: () => get.call(history),
        set: (v: ScrollRestoration) => {
          if (v === 'manual') set.call(history, v)
        },
      })
    }

    if (prefersReducedMotion()) return

    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.1,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)

    // Trigger positions shift once the display face swaps in.
    document.fonts?.ready.then(() => ScrollTrigger.refresh())

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  /**
   * Case 2: browser back and forward.
   *
   * The router resets history.scrollRestoration to 'auto' after we set it, so
   * on a popstate the browser restores the old offset on a later frame and
   * overwrites the reset. Setting the flag is therefore not enough on its own.
   * Forcing the position across a few frames beats the restore whenever it
   * lands.
   *
   * Guarded on an actual path change, because the mobile menu also pushes a
   * history entry: closing it with the back button must not move the page.
   */
  useEffect(() => {
    const onPop = () => {
      // The mobile menu also pushes a history entry so the back button closes
      // it. That pop must not move the page. Checking the overlay directly is
      // reliable; comparing paths is not, because the router's own effect can
      // update the path before this listener runs.
      const menu = document.getElementById('mobile-menu')
      if (menu && menu.style.visibility === 'visible') return
      if (window.location.hash) return
      lastPath.current = window.location.pathname
      let frame = 0
      const tick = () => {
        if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true })
        else window.scrollTo(0, 0)
        if (++frame < 5) requestAnimationFrame(tick)
        else ScrollTrigger.refresh()
      }
      requestAnimationFrame(tick)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  // Cases 1 and 5: nav link click and a tap on a link inside the mobile
  // overlay both land here as a pathname change.
  // Case 4: a hash link keeps its target instead of being yanked to the top.
  useLayoutEffect(() => {
    // Re-assert on every navigation, not just on mount. The router resets this
    // to 'auto', and if it is 'auto' at the moment of a popstate the browser
    // restores the old offset asynchronously and overwrites whatever we do
    // here. That was case 2 failing.
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

    const hash = typeof window !== 'undefined' ? window.location.hash : ''

    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        if (lenisRef.current) lenisRef.current.scrollTo(el as HTMLElement, { immediate: true })
        else (el as HTMLElement).scrollIntoView()
        ScrollTrigger.refresh()
        firstRun.current = false
        lastPath.current = pathname
        return
      }
    }

    // On first mount there is nothing to reset, but a reload still needs it.
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)

    // Layout above the fold has changed, so trigger start and end values have too.
    ScrollTrigger.refresh()
    firstRun.current = false
    lastPath.current = pathname
  }, [pathname])

  const api: ScrollApi = {
    lock: () => {
      if (lenisRef.current) lenisRef.current.stop()
      // Native fallback when Lenis is off. Position is held by the overlay's
      // own fixed positioning, so there is no iOS jump.
      else document.documentElement.style.overflow = 'hidden'
    },
    unlock: () => {
      if (lenisRef.current) lenisRef.current.start()
      else document.documentElement.style.overflow = ''
    },
    scrollTo: (target, opts) => {
      if (lenisRef.current) lenisRef.current.scrollTo(target, opts)
      else if (typeof target === 'number') window.scrollTo(0, target)
      else document.querySelector(target)?.scrollIntoView()
    },
  }

  return <ScrollContext.Provider value={api}>{children}</ScrollContext.Provider>
}
