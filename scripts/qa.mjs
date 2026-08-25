/**
 * Phase 9 and 10 QA harness.
 *
 * Runs against the built static export, not the dev server, because dev
 * bundles are unminified and every number would be wrong.
 *
 * Covers the things that were previously asserted rather than verified:
 *   - Lighthouse on a mobile emulation, all four categories
 *   - prefers-reduced-motion actually emulated, not assumed
 *   - 4x CPU throttle with a frame count on the hero
 *   - 200% zoom and landscape
 *
 * The performance score is measured on localhost. It is honest about the
 * bundle and the render, and dishonest about the network, because there is no
 * network. Treat the field number as unknown until it is measured on a real
 * device. Everything else here transfers.
 *
 * Run:  node scripts/qa.mjs
 */

import { launch } from 'chrome-launcher'
import lighthouse from 'lighthouse'
import puppeteer from 'puppeteer-core'

const BASE = process.env.QA_BASE ?? 'http://localhost:4321'
const pad = (s, n) => String(s).padEnd(n)
const results = []
function record(area, check, pass, detail = '') {
  results.push({ area, check, pass, detail })
  console.log(`  ${pass ? 'PASS' : 'FAIL'}  ${pad(check, 46)} ${detail}`)
}

// ---------------------------------------------------------------- lighthouse

async function runLighthouse(chrome) {
  console.log('\nLIGHTHOUSE, mobile emulation, production build (median of 3)')

  // Three runs, median reported, spread shown.
  //
  // A single run on a developer machine is not a measurement. Observed on an
  // identical build: performance 63 to 97, TBT 161ms to 880ms, LCP 1.82s to
  // 4.52s, depending only on what else the machine was doing. Accessibility,
  // best practices and SEO are structural and stable. Performance and LCP are
  // not, and should be re-measured against the deployed site before anyone
  // quotes a number.
  const runs = []
  for (let i = 0; i < 3; i++) {
    const r = await lighthouse(
      `${BASE}/`,
      { port: chrome.port, output: 'json', logLevel: 'error' },
      undefined,
    )
    runs.push(r.lhr)
    await new Promise((res) => setTimeout(res, 600))
  }
  const median = (fn) => {
    const v = runs.map(fn).sort((a, b) => a - b)
    return v[Math.floor(v.length / 2)]
  }
  const lhr = runs[0]
  const cats = lhr.categories
  const targets = { performance: 92, accessibility: 95, 'best-practices': 95, seo: 98 }
  for (const [key, target] of Object.entries(targets)) {
    const score = Math.round(median((l) => (l.categories[key]?.score ?? 0) * 100))
    const spread = runs.map((l) => Math.round((l.categories[key]?.score ?? 0) * 100))
    record(
      'lighthouse',
      `${key} >= ${target}`,
      score >= target,
      `median ${score}  (runs ${spread.join('/')})`,
    )
  }
  const m = lhr.audits
  const lcp = median((l) => l.audits['largest-contentful-paint']?.numericValue ?? 0)
  const cls = median((l) => l.audits['cumulative-layout-shift']?.numericValue ?? 0)
  const tbt = median((l) => l.audits['total-blocking-time']?.numericValue ?? 0)
  record('vitals', 'LCP under 2.0s', lcp < 2000, `${(lcp / 1000).toFixed(2)}s`)
  record('vitals', 'CLS under 0.05', cls < 0.05, cls.toFixed(3))
  record('vitals', 'Total blocking time under 200ms', tbt < 200, `${Math.round(tbt)}ms`)

  // Accessibility audits are deterministic, so the first run is enough.
  const failed = Object.values(m).filter(
    (a) => a.score !== null && a.score < 1 && a.scoreDisplayMode === 'binary',
  )
  const a11yIds = new Set(cats.accessibility.auditRefs.map((r) => r.id))
  const a11yFails = failed.filter((a) => a11yIds.has(a.id))
  record(
    'a11y',
    'zero failing accessibility audits',
    a11yFails.length === 0,
    a11yFails.length ? a11yFails.map((a) => a.id).join(', ') : 'clean',
  )
  return lhr
}

// ----------------------------------------------------------------- puppeteer

async function runBrowserChecks(chrome) {
  const browser = await puppeteer.connect({
    browserURL: `http://localhost:${chrome.port}`,
    defaultViewport: null,
  })

  // --- reduced motion, actually emulated -----------------------------------
  console.log('\nREDUCED MOTION, emulated')
  {
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 800 })
    await page.emulateMediaFeatures([
      { name: 'prefers-reduced-motion', value: 'reduce' },
    ])
    await page.goto(`${BASE}/`, { waitUntil: 'networkidle2' })
    await new Promise((r) => setTimeout(r, 2500))

    const state = await page.evaluate(() => {
      const ring = document.querySelector('[data-hero-ring]')
      const line = document.querySelector('[data-hero-line]')
      const h1 = document.querySelector('h1')
      const sub = document.querySelector('main p')
      return {
        loaderGone: !document.querySelector('.page-loader'),
        h1Visible: h1 ? getComputedStyle(h1).opacity === '1' : false,
        // the hero copy must be readable, not stuck at its animated start
        lineShown: line ? getComputedStyle(line).opacity === '1' : false,
        subShown: sub ? getComputedStyle(sub).opacity === '1' : false,
        ringPresent: !!ring,
        seamParked: (() => {
          const f = document.querySelector('.seam__field')
          return f ? getComputedStyle(f).transform !== 'none' : false
        })(),
        bodyBg: getComputedStyle(document.body).backgroundColor,
      }
    })
    record('reduced-motion', 'loader clears', state.loaderGone)
    record('reduced-motion', 'headline visible, not stuck hidden', state.lineShown)
    record('reduced-motion', 'subline visible, not stuck hidden', state.subShown)
    record('reduced-motion', 'seam still positioned', state.seamParked)
    record('reduced-motion', 'light theme holds', state.bodyBg === 'rgb(234, 235, 237)', state.bodyBg)

    // scroll and confirm reveals do not leave content invisible
    await page.evaluate(() => window.scrollTo(0, 2400))
    await new Promise((r) => setTimeout(r, 1200))
    const hidden = await page.evaluate(() => {
      const els = [...document.querySelectorAll('main h2, main h3, main p')]
      const inView = els.filter((e) => {
        const r = e.getBoundingClientRect()
        return r.top < innerHeight && r.bottom > 0
      })
      return inView.filter((e) => parseFloat(getComputedStyle(e).opacity) < 0.9).length
    })
    record('reduced-motion', 'no content left invisible after scroll', hidden === 0, `${hidden} hidden`)
    await page.close()
  }

  // --- 4x CPU throttle, hero frame rate ------------------------------------
  console.log('\n4x CPU THROTTLE')
  {
    const page = await browser.newPage()
    await page.setViewport({ width: 390, height: 780, isMobile: true, hasTouch: true })
    const cdp = await page.createCDPSession()
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 })
    await page.goto(`${BASE}/`, { waitUntil: 'networkidle2' })
    await new Promise((r) => setTimeout(r, 2000))

    const fps = await page.evaluate(async () => {
      let frames = 0
      const t0 = performance.now()
      const tick = () => {
        frames++
        if (performance.now() - t0 < 2000) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
      // scroll while measuring, which is when the seam is doing work
      const start = performance.now()
      while (performance.now() - start < 2000) {
        window.scrollBy(0, 14)
        await new Promise((r) => requestAnimationFrame(r))
      }
      return Math.round(frames / 2)
    })
    record('perf', 'hero holds 50fps at 4x throttle', fps >= 50, `${fps} fps`)
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 1 })
    await page.close()
  }

  // --- 200% zoom and landscape ---------------------------------------------
  console.log('\nZOOM AND LANDSCAPE')
  {
    const page = await browser.newPage()
    // 200% zoom is a 2x device scale factor at half the CSS width
    await page.setViewport({ width: 640, height: 800, deviceScaleFactor: 2 })
    await page.goto(`${BASE}/`, { waitUntil: 'networkidle2' })
    await new Promise((r) => setTimeout(r, 1800))
    const zoom = await page.evaluate(() => ({
      over: document.documentElement.scrollWidth > innerWidth + 1,
      docW: document.documentElement.scrollWidth,
      innerW: innerWidth,
    }))
    record('zoom', '200% zoom, no horizontal overflow', !zoom.over, `${zoom.docW} in ${zoom.innerW}`)

    await page.setViewport({ width: 780, height: 390, isMobile: true, hasTouch: true })
    await page.reload({ waitUntil: 'networkidle2' })
    await new Promise((r) => setTimeout(r, 1800))
    const land = await page.evaluate(() => ({
      over: document.documentElement.scrollWidth > innerWidth + 1,
      ctaVisible: (() => {
        const a = document.querySelector('main a[href^="https://wa.me"]')
        if (!a) return false
        const r = a.getBoundingClientRect()
        return r.top < innerHeight && r.bottom > 0
      })(),
    }))
    record('landscape', 'landscape 780x390, no horizontal overflow', !land.over)
    record('landscape', 'primary CTA reachable in landscape', land.ctaVisible)
    await page.close()
  }

  // --- keyboard: menu focus trap and escape --------------------------------
  console.log('\nKEYBOARD')
  {
    const page = await browser.newPage()
    await page.setViewport({ width: 390, height: 780, isMobile: false, hasTouch: false })
    await page.goto(`${BASE}/`, { waitUntil: 'networkidle2' })
    await new Promise((r) => setTimeout(r, 2200))
    await page.click('[aria-controls="mobile-menu"]')
    await new Promise((r) => setTimeout(r, 900))
    const opened = await page.evaluate(
      () => document.querySelector('[aria-controls="mobile-menu"]').getAttribute('aria-expanded'),
    )
    record('keyboard', 'menu reports aria-expanded true', opened === 'true')

    await page.keyboard.press('Escape')
    await new Promise((r) => setTimeout(r, 900))
    const closed = await page.evaluate(() => ({
      expanded: document
        .querySelector('[aria-controls="mobile-menu"]')
        .getAttribute('aria-expanded'),
      focusOnTrigger:
        document.activeElement === document.querySelector('[aria-controls="mobile-menu"]'),
    }))
    record('keyboard', 'Escape closes the menu', closed.expanded === 'false')
    record('keyboard', 'focus returns to the trigger', closed.focusOnTrigger)
    await page.close()
  }

  browser.disconnect()
}

// ---------------------------------------------------------------------- main

const chrome = await launch({
  chromeFlags: ['--headless=new', '--disable-gpu', '--no-sandbox'],
})
try {
  await runLighthouse(chrome)
  await runBrowserChecks(chrome)
} finally {
  await chrome.kill()
}

const failed = results.filter((r) => !r.pass)
console.log(`\n${results.length - failed.length} of ${results.length} checks passed`)
if (failed.length) {
  console.log('\nFAILURES')
  for (const f of failed) console.log(`  ${f.area}: ${f.check}  ${f.detail}`)
}
process.exit(failed.length ? 1 : 0)
