import type { Metadata } from 'next'
import { PAGES } from '@/data/pages'
import { PRODUCTS } from '@/data/products'
import { COMPANY } from '@/data/company'
import { PageHeader } from '@/components/sections/PageHeader'
import { ProductChip } from '@/components/ui/ProductChip'
import { Reveal } from '@/components/ui/Reveal'
import { EnquiryCta } from '@/components/sections/EnquiryCta'

const P = PAGES.engitech

export const metadata: Metadata = { title: P.title, description: P.description }

const BUILD = PRODUCTS.filter((p) => p.side === 'build')
const FLAGSHIP = BUILD.find((p) => p.slug === 'stacker-conveyor')!
const REST = BUILD.filter((p) => p.slug !== FLAGSHIP.slug)

export default function EngitechPage() {
  return (
    <>
      <PageHeader marker={P.marker} title={P.h1} lead={P.lead} seam="0.55">
        {/* The name already ends in "Co.", so no extra stop before the tagline. */}
        <p className="mt-4 font-mono text-data text-fg-muted">
          {COMPANY.divisions.engitech.name} {COMPANY.divisions.engitech.tagline}.
        </p>
      </PageHeader>

      {/* The flagship. The only product on the site with published figures,
          because they are the client's own. CONTENT.md 4.4. */}
      <section data-seam="0.6" className="container-page section-y">
        <Reveal>
          <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:items-center">
            <div>
              <h2 className="text-h2">{FLAGSHIP.name}</h2>
              <p className="mt-4 max-w-[46ch] text-body text-fg-muted">
                For loading, unloading and stacking heavy goods. Available for all customised
                order.
              </p>
              <p className="mt-4 max-w-[46ch] text-caption text-fg-muted">
                Photographs of the real machine are on the way from the workshop.
              </p>
            </div>
            <ProductChip product={FLAGSHIP} sizes="(max-width: 768px) 92vw, 520px" wide />
          </div>
        </Reveal>
      </section>

      <section data-seam="0.5" className="container-page section-y pt-0">
        <Reveal>
          <h2 className="text-h2">Also built here</h2>
          <ul className="mt-8 grid list-none grid-cols-2 gap-x-5 gap-y-8 p-0 md:grid-cols-4">
            {REST.map((p) => (
              <li key={p.slug}>
                <ProductChip product={p} />
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-[54ch] text-body text-fg-muted">{P.note}</p>
        </Reveal>
      </section>

      <EnquiryCta
        heading="Send us the drawing."
        body="Length, width, duty and the material you are moving. If you do not have a drawing, a photo of the line is usually enough to start."
        product="Custom machinery enquiry"
        seam="0.5"
      />
    </>
  )
}
