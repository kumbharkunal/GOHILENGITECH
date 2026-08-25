/**
 * A range of products, used twice on the home page: once for what Gohil builds
 * and once for what they supply. DESIGN.md 5.5, layout family C.
 *
 * Asymmetric on purpose. A row of equal cards is the banned pattern, and it
 * would also be wrong here: the cut-outs are different shapes and sizes, and
 * forcing them into identical boxes wastes the only real photography we have.
 * The first item takes a wider cell, the rest fill around it.
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

        <ul className="range mt-10" data-side={side}>
          {products.map((p, i) => (
            <li key={p.slug} className={i === 0 ? 'range__lead' : undefined}>
              <ProductChip
                product={p}
                sizes={
                  i === 0
                    ? '(max-width: 768px) 92vw, 420px'
                    : '(max-width: 768px) 45vw, 220px'
                }
              />
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
