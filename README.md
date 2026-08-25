# Gohil's Group

Marketing site for **Gohil's Group**, Rajkot: two sister firms under one mark.

- **Gohil Industrial Co.** ("Joining To Automation") is an authorised dealer for industrial drives.
- **Gohil Engitech Co.** ("Engineering to your needs") manufactures conveyors, blowers and oil mill machinery.

Trading from the same shop on Dhebar Road since 1994.

**Live:** https://gohilengitech.pages.dev

---

## Stack

Next.js 16 (App Router, static export) · TypeScript strict · Tailwind v4 · GSAP 3 + ScrollTrigger · Lenis · lucide-react · react-hook-form + zod

Every route is static or SSG. There is no API route, no server action and no database, because the enquiry path is WhatsApp deep links rather than a backend. That is why `output: 'export'` is the right target for Cloudflare Pages: no adapter, no worker, no cold start.

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export into out/
```

**Cloudflare Pages:** build command `npm run build`, output directory `out`. Nothing else to configure, no adapter and no Workers runtime, because every route is prerendered.

### The lock file must be generated on Linux

```bash
npm run lock:linux    # needs Docker running
```

Do not commit a `package-lock.json` generated on Windows or macOS. This is not
a preference, it is a build failure.

Around 78 packages in this tree are platform specific (`sharp` and its
`@img/*` binaries, mostly), so the dependency graph differs by operating
system, and npm hoists differently as a result. Concretely: on Windows npm
puts `picomatch@2` at the root for `micromatch` and nests `4` under
`tinyglobby`. On Linux it does the opposite. `npm ci` then refuses the lock
with `lock file's picomatch@2.3.2 does not satisfy picomatch@4.0.7`, and the
deploy fails while everything passes locally.

If you run `npm install` on Windows it will silently rewrite the lock back to
the Windows shape. Regenerate with the command above before committing.

## The design

Read **`DESIGN.md` first.** Every colour, size, weight, radius, duration and easing value in the codebase traces back to it. If a value is not in that file, it does not belong in the code.

The short version: everything Gohil *manufactures* is painted orange in their own photographs, and everything they *distribute* is blue or grey casting. That is not a colour choice, it is the paint on the steel they weld, and it maps exactly onto the two divisions. So orange means "we build it" and steel means "we supply it", and one continuous diagonal seam at **38.1 degrees** (measured off their own artwork, not eyeballed) travels through the page as the content moves between the two.

`CONTENT.md` holds every string on the site with its source, and the open questions for the client.

## Honesty rules

This is a real business with a real reputation. These are not style preferences:

- **No fabricated numbers.** 1994 is the only figure published anywhere on the site. No headcount, no turnover, no project counts. Their own two directory listings contradict each other on employees, which is exactly why.
- **No prices.** Their listings price the same cycloidal gearbox at Rs 5,000 and Rs 25,000. Everything is price on request.
- **No unverified certifications.** No ISO or CE badge appears, because no source shows one.
- **Manufacturer and dealer are never blurred.** They build machinery. They are an authorised dealer for the branded gearboxes. Copy keeps the two apart.
- **No stock photography and no AI generated product images.** Photo slots are held open honestly until the client supplies real ones.

Visit **`/audit`** (noindex) for the full provenance table: every claim on the site, its source, and whether the client still needs to confirm it.

## Assets

Everything in `public/brand`, `public/products` and `public/dealers` is generated from the client's own artwork in `client-assets/` by the scripts in `scripts/`. Re-run any of them to regenerate:

```bash
python scripts/build-mark.py       # the ring and G, measured geometry
python scripts/build-lockup.py     # GROUP wordmark and the full lockup
python scripts/build-products.py   # 21 product cut-outs
python scripts/build-dealers.py    # 10 principal marks
python scripts/build-og.py         # Open Graph card
cd scripts && node build-qr.mjs    # QR codes (needs the tooling install below)
```

The Python scripts need `pillow`, `numpy` and `scipy`.

The mark was rebuilt as vector from the raster and verified at 98.6% pixel agreement against the source.

**Third party trademarks:** the dealer marks are cropped from the client's own banner and never downloaded from the brands' own sites. They render permanently greyscale so they stay subordinate to Gohil's own mark, and the section is labelled "Authorised Dealer", which is the client's own wording.

## QA

The QA and asset tooling lives in its own package under `scripts/`, deliberately
not in the root `package.json`. Cloudflare Pages runs `npm clean-install` on
every deploy, and a static site build has no reason to install Lighthouse and a
browser driver. Keeping them separate also stops Lighthouse's Node engine
requirement from constraining the deploy runtime.

```bash
npm run build                 # from the repo root
cd scripts && npm install     # once
npm run serve &               # serves ../out on :4321
npm run qa
```

21 checks: Lighthouse across all four categories, `prefers-reduced-motion`
genuinely emulated, a frame count on the hero under 4x CPU throttle, 200%
zoom, landscape, and the mobile menu's keyboard contract.

**Verified and stable**

| | |
|---|---|
| Accessibility | 96, zero failing audits |
| Best practices | 96 |
| SEO | 100 |
| CLS | 0.000 |
| Hero at 4x CPU throttle | 60fps |
| Reduced motion | loader clears, no content left invisible, light theme holds |
| 200% zoom and landscape | no horizontal overflow, CTA reachable |
| Keyboard | menu opens, Escape closes, focus returns to the trigger |
| Horizontal overflow | none at 320 through 2560, nor on eight inner routes |

**Not trustworthy on a developer machine**

Performance, LCP and TBT swing wildly run to run on an identical build:
performance 63 to 97, LCP 1.82s to 4.52s, TBT 161ms to 880ms, depending only
on what else the machine is doing. `qa.mjs` reports the median of three and
prints the spread so the noise is visible rather than hidden.

The direction is real even if the numbers are not. The site ships about 236 KB
of gzipped JS on the home page, of which roughly 150 KB is the React and Next
runtime and 54 KB is GSAP with ScrollTrigger, so the brief's 180 KB target was
not reachable with the locked stack. The loader also costs LCP directly,
because the hero cannot paint its largest element until the cover clears.

**Measure it properly against the deployed site before quoting a number**, on
throttled mobile:

```bash
npx lighthouse https://gohilengitech.pages.dev --preset=perf --view
```

If performance needs to come up, the one real lever left is deferring GSAP and
ScrollTrigger until after first paint. That moves 54 KB off the critical path
at the cost of the seam appearing a beat late.

## Before launch

- [ ] Client confirms every dealership listed is current. This is the only real legal exposure in the build.
- [ ] Confirm Shop No. 5 or 5-6
- [ ] Opening and closing times, so `openingHours` can go into the schema
- [ ] Real photography for the five held slots (see `CONTENT.md` 10 and `IMAGE-BRIEF.md`)
- [ ] **Replace or delete `src/data/product-details.ts`.** It holds placeholder specifications for 20 products, added so the demo has something to show. Every entry is flagged `demo: true` and shows a visible notice on the page, but none of it is the client's data. Deleting that one file removes all of it.
- [ ] Decide whether `/audit` and `/tokens` ship
- [ ] Verify the `LocalBusiness` geo coordinates, currently Rajkot city centre rather than a precise pin
