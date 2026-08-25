import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { CATEGORIES, byCategory } from '@/data/products'
import { PageHeader } from '@/components/sections/PageHeader'
import { ProductChip } from '@/components/ui/ProductChip'
import { Reveal } from '@/components/ui/Reveal'
import { EnquiryCta } from '@/components/sections/EnquiryCta'
import { FAQ_BY_CATEGORY } from '@/data/faq'
import { productSchema, faqSchema, breadcrumbSchema, canonical, jsonLd } from '@/lib/seo'

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category } = await params
  const c = CATEGORIES.find((x) => x.slug === category)
  if (!c) return {}
  return {
    title: `${c.name}, Rajkot`,
    description: `${c.blurb} Price on request from Gohil's Group, Dhebar Road, Rajkot.`,
    alternates: { canonical: canonical(`products/${c.slug}`) },
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  const c = CATEGORIES.find((x) => x.slug === category)
  if (!c) notFound()

  const products = byCategory(c.slug)
  const faqs = FAQ_BY_CATEGORY[c.slug] ?? []

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(productSchema(c))} />
      {faqs.length > 0 ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema(faqs))} />
      ) : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Products', path: 'products' },
            { name: c.name, path: `products/${c.slug}` },
          ]),
        )}
      />
      <PageHeader
        title={c.name}
        lead={c.blurb}
        seam={c.side === 'build' ? '0.55' : '0.1'}
      >
        <p className="mt-4 font-mono text-data text-fg-muted">
          {c.side === 'build' ? 'Built by Gohil Engitech Co.' : 'Supplied by Gohil Industrial Co.'}
        </p>
      </PageHeader>

      <section
        data-seam={c.side === 'build' ? '0.5' : '0.08'}
        className="container-page section-y pt-6"
      >
        <Reveal>
          {products.length > 0 ? (
            <ul className="product-grid">
              {products.map((p) => (
                <li key={p.slug}>
                  <ProductChip product={p} />
                </li>
              ))}
            </ul>
          ) : (
            // Honest empty state: a direction, not a mood. DESIGN.md 8, do 8.
            <p className="max-w-[54ch] text-body text-fg-muted">
              We carry this range but do not have photographs of it online yet. Send us the
              duty on WhatsApp and we will tell you exactly what we hold.
            </p>
          )}
          <p className="mt-8 font-mono text-data text-fg-accent">Price on request</p>
        </Reveal>
      </section>

      {faqs.length > 0 ? (
        <section
          data-seam={c.side === 'build' ? '0.45' : '0.12'}
          className="container-page section-y pt-0"
        >
          <Reveal>
            <h2 className="text-h2">Questions we get asked</h2>
            <dl className="mt-8 max-w-[68ch]">
              {faqs.map((f) => (
                <div
                  key={f.q}
                  className="border-b py-5 last:border-0"
                  style={{ borderColor: 'var(--line-hairline)' }}
                >
                  <dt className="text-h3">{f.q}</dt>
                  <dd className="mt-2 text-body text-fg-muted">{f.a}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>
      ) : null}

      <EnquiryCta
        heading={`Enquire about ${c.name.toLowerCase()}`}
        body="Give us the ratio, the input speed, the power and the mounting. That is usually all we need."
        product={c.name}
        seam={c.side === 'build' ? '0.5' : '0.15'}
      />

      <section className="container-page pb-16">
        <Link href="/products" className="divisions__link !mt-0">
          <ArrowLeft className="size-4" aria-hidden="true" />
          All categories
        </Link>
      </section>
    </>
  )
}
