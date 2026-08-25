import Link from 'next/link'
import { ArrowRight, MessageCircle, Phone } from 'lucide-react'
import { COMPANY, PEOPLE } from '@/data/company'
import { HOME } from '@/data/home'
import { CATEGORIES, PRODUCTS, byCategory } from '@/data/products'
import { INDUSTRIES } from '@/data/industries'
import { whatsappGeneral, telUrl } from '@/lib/whatsapp'
import { Hero } from '@/components/sections/Hero'
import { Divisions } from '@/components/sections/Divisions'
import { ProductRange } from '@/components/sections/ProductRange'
import { Dealers } from '@/components/sections/Dealers'
import { Marquee } from '@/components/ui/Marquee'
import { ProductChip } from '@/components/ui/ProductChip'
import { Reveal } from '@/components/ui/Reveal'

/**
 * Home page.
 *
 * Section order is the IA. The data-seam value on each section encodes which
 * division the content belongs to, which is what makes the seam travel.
 *
 * Layout families, so no two consecutive sections share one (DESIGN.md 5.5):
 *   1 statement  2 paired cards  3 horizontal strip  4 asymmetric array
 *   5 category cards  6 logo grid  7 inverted panel  8 list  9 split
 *
 * Section markers are budgeted at three for the whole page: the build range,
 * the supply range, and 1994. Everything else is named in plain language.
 */

const BUILD = PRODUCTS.filter((p) => p.side === 'build')
const GEAR_FAMILIES = CATEGORIES.filter((c) =>
  ['helical', 'planetary', 'worm', 'customized'].includes(c.slug),
)

export default function Home() {
  return (
    <>
      <Hero />
      <Divisions />

      {/* 3. Capability strip. The ten items exactly as the client lists them. */}
      <section data-seam="0.2" className="section-y">
        <div className="container-page">
          <Reveal>
            <h2 className="text-h2">{HOME.capabilities.heading}</h2>
          </Reveal>
        </div>
        <div className="container-page mt-8">
          <Marquee items={HOME.capabilities.items} />
        </div>
      </section>

      {/* 4. What we build. Orange advances. */}
      <ProductRange
        marker={HOME.build.marker}
        heading={HOME.build.heading}
        body={HOME.build.body}
        products={BUILD}
        side="build"
        seam="0.55"
        href="/engitech"
        linkLabel="Everything we build"
      />

      {/* 5. What we supply. Steel returns. Category led, so it does not repeat
          the asymmetric array above. */}
      <section data-seam="0.08" className="container-page section-y">
        <Reveal>
          <p className="marker">{HOME.supply.marker}</p>
          <h2 className="mt-3 text-h2">{HOME.supply.heading}</h2>
          <p className="mt-4 max-w-[54ch] text-body text-fg-muted">{HOME.supply.body}</p>
          <ul className="mt-10 grid list-none grid-cols-2 gap-x-5 gap-y-8 p-0 md:grid-cols-4">
            {GEAR_FAMILIES.map((c) => {
              const lead = byCategory(c.slug).find((p) => p.image)
              return (
                <li key={c.slug}>
                  <Link href={`/products/${c.slug}`} className="block">
                    {lead ? <ProductChip product={lead} href={false} /> : null}
                    <h3 className="mt-3 text-h3">{c.name}</h3>
                    <p className="mt-1.5 text-caption text-fg-muted">{c.blurb}</p>
                  </Link>
                </li>
              )
            })}
          </ul>
          <Link href="/industrial" className="divisions__link mt-8">
            The full range
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </section>

      <Dealers />

      {/* 7. Since 1994. The one inverted panel on the page. Every sentence is
          verifiable, and 1994 is the only number published anywhere on the
          site. DESIGN.md 8.1 records why an inverted section is allowed here. */}
      <section data-seam="0.62" className="on-ink" style={{ backgroundColor: 'var(--color-ink)' }}>
        <div className="container-page section-y">
          <Reveal>
            <p className="marker">{HOME.since.marker}</p>
            <h2 className="mt-3 text-h2" style={{ color: 'var(--color-mist)' }}>
              {HOME.since.heading}
            </h2>
            <p className="mt-5 max-w-[62ch] text-body-l" style={{ color: 'var(--color-steel)' }}>
              {HOME.since.body}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 8. Industries. Phrasing follows the evidence, not the ambition. */}
      <section data-seam="0.22" className="container-page section-y">
        <Reveal>
          <h2 className="text-h2">Where our machines work</h2>
          <ul className="mt-8 list-none p-0">
            {INDUSTRIES.map((ind) => (
              <li
                key={ind.slug}
                className="grid gap-1 border-b py-5 last:border-0 md:grid-cols-[minmax(0,24ch)_1fr] md:gap-8"
                style={{ borderColor: 'var(--line-hairline)' }}
              >
                <h3 className="text-h3">{ind.name}</h3>
                <p className="max-w-[62ch] text-body text-fg-muted">{ind.line}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* 9. Contact. */}
      <section data-seam="0.42" className="container-page section-y">
        <Reveal>
          <h2 className="text-h2">{HOME.contact.heading}</h2>
          <p className="mt-4 max-w-[46ch] text-body-l text-fg-muted">{HOME.contact.body}</p>
          <div className="mt-8 grid gap-4 md:max-w-[46rem] md:grid-cols-2">
            {PEOPLE.map((p) => (
              <a
                key={p.phone}
                href={telUrl(p.phone)}
                className="flex items-center justify-between gap-4 rounded-md border bg-card px-5 py-4"
                style={{ borderColor: 'var(--line-hairline)' }}
              >
                <span className="flex items-center gap-2.5 text-h3">
                  <Phone className="size-5 text-fg-muted" aria-hidden="true" />
                  {p.name}
                </span>
                <span className="font-mono text-data">{p.phoneDisplay}</span>
              </a>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-5">
            <a
              href={whatsappGeneral()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm px-[22px] py-[14px] font-semibold text-white"
              style={{ backgroundColor: 'var(--color-whatsapp)' }}
            >
              <MessageCircle className="size-5" aria-hidden="true" />
              WhatsApp enquiry
            </a>
            <Link href="/contact" className="divisions__link !mt-0">
              {HOME.contact.link}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <address className="mt-8 block max-w-[52ch] not-italic text-caption text-fg-muted">
            {COMPANY.address.line1}, {COMPANY.address.line2}, {COMPANY.address.city}{' '}
            {COMPANY.address.pin}. {COMPANY.hours.days}.
          </address>
        </Reveal>
      </section>
    </>
  )
}
