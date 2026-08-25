/**
 * Contrast and control-name sweep across every distinct page shape.
 *
 * qa.mjs runs Lighthouse against the home page only, which is how a sitewide
 * contrast failure hid for as long as it did: the seam, the footer and the
 * product detail pages each broke in a way the home page could not show. This
 * walks one URL per template instead.
 *
 * Run against a built site:  npm run build && npx serve out -l 4321
 *                            node scripts/contrast.mjs
 */

import lighthouse from 'lighthouse'
import * as chromeLauncher from 'chrome-launcher'

const BASE = process.env.BASE ?? 'http://localhost:4321'

/** One per template, not one per route. 59 routes, 12 shapes. */
const ROUTES = [
  '/',
  '/about/',
  '/industrial/',
  '/engitech/',
  '/products/',
  '/products/worm/',
  '/products/worm/worm-gearbox-cast-iron/',
  '/products/conveyors/stacker-conveyor/',
  '/brands/',
  '/brands/bonfiglioli/',
  '/industries/',
  '/contact/',
  '/enquiry/',
  '/audit/',
]

const AUDITS = ['color-contrast', 'link-name', 'button-name', 'image-alt', 'label']

const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless=new', '--no-sandbox'] })
let failures = 0

for (const route of ROUTES) {
  const r = await lighthouse(BASE + route, {
    port: chrome.port,
    output: 'json',
    logLevel: 'silent',
    onlyAudits: AUDITS,
  })
  const bad = AUDITS.map((id) => r.lhr.audits[id]).filter((a) => a && a.score === 0)
  if (bad.length === 0) {
    console.log(`PASS  ${route}`)
    continue
  }
  failures += bad.length
  console.log(`FAIL  ${route}`)
  for (const a of bad) {
    console.log(`        ${a.id}`)
    for (const item of a.details?.items ?? []) {
      const why = (item.node?.explanation ?? '').replace(/\s+/g, ' ').slice(0, 120)
      console.log(`          ${why}`)
      console.log(`            ${(item.node?.snippet ?? '').slice(0, 100)}`)
    }
  }
}

await chrome.kill()
console.log(failures === 0 ? '\nclean' : `\n${failures} failing audits`)
process.exit(failures === 0 ? 0 : 1)
