import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, MessageCircle, Phone } from 'lucide-react'
import { CATEGORIES, PRODUCTS, byCategory } from '@/data/products'
import { detailFor } from '@/data/product-details'
import { PEOPLE } from '@/data/company'
import { whatsappProduct, telUrl } from '@/lib/whatsapp'
import { canonical, breadcrumbSchema, jsonLd, SITE_URL, SITE_NAME } from '@/lib/seo'
import { PageHeader } from '@/components/sections/PageHeader'
import { ProductChip } from '@/components/ui/ProductChip'
import { Reveal } from '@/components/ui/Reveal'

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ category: p.category, product: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; product: string }>
}): Promise<Metadata> {
  const { product } = await params
  const p = PRODUCTS.find((x) => x.slug === product)
  if (!p) return {}
  const d = detailFor(p.slug)
  return {
    title: `${p.name}, Rajkot`,
    description: d
      ? `${d.summary.split('. ')[0]}. Price on request from Gohil's Group, Dhebar Road, Rajkot.`
      : `${p.name}. Price on request from Gohil's Group, Rajkot.`,
    alternates: { canonical: canonical(`products/${p.category}/${p.slug}`) },
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ category: string; product: string }>
}) {
  const { category, product } = await params
  const p = PRODUCTS.find((x) => x.slug === product && x.category === category)
  if (!p) notFound()

  const cat = CATEGORIES.find((c) => c.slug === p.category)!
  const detail = detailFor(p.slug)
  const siblings = byCategory(p.category).filter((s) => s.slug !== p.slug)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: detail?.summary ?? cat.blurb,
    category: cat.name,
    brand: { '@type': 'Brand', name: SITE_NAME },
    ...(p.image ? { image: `${SITE_URL}/products/${p.image}.webp` } : {}),
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStoreOnly',
      url: canonical(`products/${p.category}/${p.slug}`),
      seller: { '@id': `${SITE_URL}/#organization` },
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Products', path: 'products' },
            { name: cat.name, path: `products/${cat.slug}` },
            { name: p.name, path: `products/${cat.slug}/${p.slug}` },
          ]),
        )}
      />

      <PageHeader title={p.name} seam={p.side === 'build' ? '0.5' : '0.1'}>
        <p className="mt-3 font-mono text-data text-fg-muted">
          {p.side === 'build' ? 'Built by Gohil Engitech Co.' : 'Supplied by Gohil Industrial Co.'}
          {'  '}
          <Link href={`/products/${cat.slug}`} className="text-fg-accent underline underline-offset-4">
            {cat.name}
          </Link>
        </p>
      </PageHeader>

      <section
        data-seam={p.side === 'build' ? '0.45' : '0.08'}
        className="container-page section-y pt-6"
      >
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            {/* image */}
            <div>
              <div
                className="media-frame aspect-[4/3] rounded-md border bg-card p-8"
                style={{ borderColor: 'var(--line-hairline)' }}
              >
                {p.image ? (
                  <Image
                    src={`/products/${p.image}.webp`}
                    alt={p.alt}
                    width={660}
                    height={450}
                    sizes="(max-width: 1024px) 92vw, 460px"
                    priority
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <p className="font-mono text-micro text-fg-muted">
                    Photograph on the way from the workshop
                  </p>
                )}
              </div>
            </div>

            <div>
              {detail ? (
                <p className="max-w-[58ch] text-body-l text-fg-muted">{detail.summary}</p>
              ) : null}

              <p className="mt-6 font-mono text-data text-fg-accent">Price on request</p>

              {detail ? (
                <>
                  <h2 className="mt-10 text-h3">Specification</h2>
                  <dl className="mt-4 max-w-[42rem]">
                    {detail.specs.map((s) => (
                      <div
                        key={s.label}
                        className="flex flex-col gap-0.5 border-b py-3 last:border-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                        style={{ borderColor: 'var(--line-hairline)' }}
                      >
                        <dt className="text-caption text-fg-muted">{s.label}</dt>
                        <dd className="m-0 font-mono text-data text-fg sm:text-right">{s.value}</dd>
                      </div>
                    ))}
                  </dl>

                  {/*
                    Visible, not buried in a comment. These figures are typical
                    for the category, not a statement of what is on the shelf,
                    and the visitor is told so plainly. Remove this block when
                    the client supplies real figures. See product-details.ts.
                  */}
                  {detail.demo ? (
                    <p
                      className="mt-5 max-w-[58ch] rounded-md border-l-2 py-2 pl-4 text-caption text-fg-muted"
                      style={{ borderColor: 'var(--color-orange)' }}
                    >
                      These are typical figures for this type of unit, shown so you can see the
                      shape of the range. Confirm the exact specification with us before ordering.
                    </p>
                  ) : null}

                  <h2 className="mt-10 text-h3">Typical applications</h2>
                  <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-2 p-0">
                    {detail.applications.map((a) => (
                      <li
                        key={a}
                        className="rounded-sm border px-3 py-1.5 text-caption text-fg-muted"
                        style={{ borderColor: 'var(--line-hairline)' }}
                      >
                        {a}
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a
                  href={whatsappProduct(p.name, `/products/${cat.slug}/${p.slug}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-sm px-[22px] py-[14px] font-semibold text-white"
                  style={{ backgroundColor: 'var(--color-whatsapp)' }}
                >
                  <MessageCircle className="size-5" aria-hidden="true" />
                  Enquire on WhatsApp
                </a>
                <a
                  href={telUrl(PEOPLE[0].phone)}
                  className="inline-flex items-center gap-2 rounded-sm border px-[18px] py-[13px] font-semibold text-fg"
                  style={{ borderColor: 'var(--line-strong)' }}
                >
                  <Phone className="size-4" aria-hidden="true" />
                  {PEOPLE[0].phoneDisplay.replace('+91 ', '')}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {siblings.length > 0 ? (
        <section
          data-seam={p.side === 'build' ? '0.4' : '0.12'}
          className="container-page section-y pt-0"
        >
          <Reveal>
            <h2 className="text-h2">Also in {cat.name.toLowerCase()}</h2>
            <ul className="product-grid mt-8">
              {siblings.map((s) => (
                <li key={s.slug}>
                  <ProductChip product={s} />
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      ) : null}

      <section className="container-page pb-16">
        <Link href={`/products/${cat.slug}`} className="divisions__link !mt-0">
          <ArrowLeft className="size-4" aria-hidden="true" />
          All {cat.name.toLowerCase()}
        </Link>
      </section>
    </>
  )
}
