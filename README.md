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

Deploy on Cloudflare Pages with build command `npm run build` and output directory `out`.

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
python scripts/build-qr.mjs        # QR codes
python scripts/build-og.py         # Open Graph card
```

The mark was rebuilt as vector from the raster and verified at 98.6% pixel agreement against the source.

**Third party trademarks:** the dealer marks are cropped from the client's own banner and never downloaded from the brands' own sites. They render permanently greyscale so they stay subordinate to Gohil's own mark, and the section is labelled "Authorised Dealer", which is the client's own wording.

## Before launch

- [ ] Client confirms every dealership listed is current. This is the only real legal exposure in the build.
- [ ] Confirm Shop No. 5 or 5-6
- [ ] Opening and closing times, so `openingHours` can go into the schema
- [ ] Real photography for the five held slots (see `CONTENT.md` 10)
- [ ] Decide whether `/audit` and `/tokens` ship
- [ ] Verify the `LocalBusiness` geo coordinates, currently Rajkot city centre rather than a precise pin
