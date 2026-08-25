import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PAGES } from '@/data/pages'
import { CATEGORIES, byCategory } from '@/data/products'
import { COMPANY } from '@/data/company'
import { PageHeader } from '@/components/sections/PageHeader'
import { ProductChip } from '@/components/ui/ProductChip'
import { DealerWall } from '@/components/ui/DealerWall'
import { Reveal } from '@/components/ui/Reveal'
import { EnquiryCta } from '@/components/sections/EnquiryCta'

const P = PAGES.industrial

export const metadata: Metadata = { title: P.title, description: P.description }

const SUPPLY_CATEGORIES = CATEGORIES.filter((c) => c.side === 'supply')

export default function IndustrialPage() {
  return (
    <>
      <PageHeader marker={P.marker} title={P.h1} lead={P.lead} seam="0.1">
        {/* The name already ends in "Co.", so no extra stop before the tagline. */}
        <p className="mt-4 font-mono text-data text-fg-muted">
          {COMPANY.divisions.industrial.name} {COMPANY.divisions.industrial.tagline}.
        </p>
      </PageHeader>

      <section data-seam="0.08" className="container-page section-y">
        <Reveal>
          <ul className="grid list-none grid-cols-2 gap-x-5 gap-y-9 p-0 md:grid-cols-3">
            {SUPPLY_CATEGORIES.map((c) => {
              const lead = byCategory(c.slug).find((p) => p.image)
              return (
                <li key={c.slug}>
                  <Link href={`/products/${c.slug}`} className="block">
                    {lead ? <ProductChip product={lead} href={false} /> : null}
                    <h2 className="mt-3 text-h3">{c.name}</h2>
                    <p className="mt-1.5 text-caption text-fg-muted">{c.blurb}</p>
                  </Link>
                </li>
              )
            })}
          </ul>
          <p className="mt-10 max-w-[54ch] text-body text-fg-muted">{P.note}</p>
        </Reveal>
      </section>

      <section data-seam="0.12" className="container-page section-y pt-0">
        <Reveal>
          <h2 className="text-h2">Principals</h2>
          <DealerWall className="mt-8" />
          <Link href="/brands" className="divisions__link mt-8">
            The dealer network
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </section>

      <EnquiryCta
        heading="Tell us the duty."
        body="Ratio, input speed, output speed, kW and mounting. That is usually enough for us to quote."
        product="Drives enquiry"
      />
    </>
  )
}
