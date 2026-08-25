'use client'

/**
 * Single registration point for GSAP. DESIGN.md 7.1.
 *
 * Import gsap and ScrollTrigger from here, never from 'gsap' directly, so the
 * plugins are registered exactly once and never during server render.
 */

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger)
  // Lenis drives the ticker. Lag smoothing would fight it.
  gsap.ticker.lagSmoothing(0)
}

export { gsap, ScrollTrigger, useGSAP }

/** True when the visitor has asked for reduced motion. Safe during SSR. */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** True below the md breakpoint. Safe during SSR. DESIGN.md 9.1. */
export function isMobileViewport(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(max-width: 767px)').matches
}
