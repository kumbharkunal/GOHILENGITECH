/**
 * A range of products, used twice on the home page: once for what Gohil builds
 * and once for what they supply.
 *
 * This was DESIGN.md 5.5 family C, an asymmetric grid where the first item took
 * a 2x2 cell. The client asked for uniform cards instead: to the person who
 * owns the machines, one photograph at twice the size of its neighbours reads
 * as the images being wrong rather than as emphasis. The asymmetric version
 * also only tiled cleanly at 5 or 9 items and orphaned a row at every other
 * count, which it did twice in a week as the catalogue grew.
 *
 * All sizing now lives in .product-grid, shared with every other chip list.
 */

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Product, Side } from '@/data/products'
import { ProductChip } from '@/components/ui/ProductChip'
import { Reveal } from '@/components/ui/Reveal'

export function ProductRange({
  marker,
  heading,
  body,
  products,
  side,
  seam,
  href,
  linkLabel,
}: {
  marker?: string
  heading: string
  body: string
  products: readonly Product[]
  side: Side
  seam: string
  href: string
  linkLabel: string
}) {
  return (
    <section data-seam={seam} className="container-page section-y">
      <Reveal>
        {marker ? <p className="marker">{marker}</p> : null}
        <h2 className={marker ? 'mt-3 text-h2' : 'text-h2'}>{heading}</h2>
        <p className="mt-4 max-w-[54ch] text-body text-fg-muted">{body}</p>

        <ul className="product-grid mt-10" data-side={side}>
          {products.map((p) => (
            <li key={p.slug}>
              <ProductChip product={p} sizes="(max-width: 768px) 45vw, 240px" />
            </li>
          ))}
        </ul>

        <Link href={href} className="divisions__link mt-8">
          {linkLabel}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </Reveal>
    </section>
  )
}
