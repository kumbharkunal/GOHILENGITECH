import type { Metadata } from 'next'
import Link from 'next/link'
import { PAGES } from '@/data/pages'
import { CATEGORIES, byCategory } from '@/data/products'
import { PageHeader } from '@/components/sections/PageHeader'
import { ProductChip } from '@/components/ui/ProductChip'
import { Reveal } from '@/components/ui/Reveal'
import { EnquiryCta } from '@/components/sections/EnquiryCta'

const P = PAGES.products

export const metadata: Metadata = { title: P.title, description: P.description }

export default function ProductsPage() {
  const build = CATEGORIES.filter((c) => c.side === 'build')
  const supply = CATEGORIES.filter((c) => c.side === 'supply')

  return (
    <>
      <PageHeader title={P.h1} lead={P.lead} seam="0.3" />

      {(
        [
          { key: 'build', label: 'What we build', list: build, seam: '0.55' },
          { key: 'supply', label: 'What we supply', list: supply, seam: '0.1' },
        ] as const
      ).map((group) => (
        <section
          key={group.key}
          data-seam={group.seam}
          className="container-page section-y pt-4"
        >
          <Reveal>
            <h2 className="text-h2">{group.label}</h2>
            <ul className="mt-8 grid list-none grid-cols-2 gap-x-5 gap-y-9 p-0 md:grid-cols-4">
              {group.list.map((c) => {
                const lead = byCategory(c.slug).find((p) => p.image)
                const sample = byCategory(c.slug)[0]
                return (
                  <li key={c.slug}>
                    <Link href={`/products/${c.slug}`} className="block">
                      {lead ? (
                        <ProductChip product={lead} />
                      ) : sample ? (
                        <ProductChip product={sample} />
                      ) : null}
                      <h3 className="mt-3 text-h3">{c.name}</h3>
                      <p className="mt-1.5 text-caption text-fg-muted">{c.blurb}</p>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </Reveal>
        </section>
      ))}

      <EnquiryCta
        heading="Price on request."
        body="Industrial pricing moves with quantity, ratio and lead time, so we quote rather than publish. Tell us the duty and you will get a real number."
        product="Product enquiry"
      />
    </>
  )
}
