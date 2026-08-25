import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/data/products'
import { detailFor } from '@/data/product-details'

/**
 * The unit that carries the product photography. DESIGN.md 4.5.
 *
 * Every chip links to its own detail page unless `href` is set false, which is
 * how a chip already nested inside a link (a category card) opts out rather
 * than producing nested anchors.
 */

export function ProductChip({
  product,
  sizes = '(max-width: 768px) 45vw, 260px',
  priority = false,
  href = true,
}: {
  product: Product
  sizes?: string
  priority?: boolean
  href?: boolean
}) {
  const detail = detailFor(product.slug)

  const inner = (
    <figure className="product-chip" data-side={product.side}>
      <div className="product-chip__frame">
        {product.image ? (
          <Image
            src={`/products/${product.image}.webp`}
            alt={product.alt}
            width={660}
            height={450}
            sizes={sizes}
            priority={priority}
            className="h-full w-full object-contain"
          />
        ) : detail ? (
          // No photograph yet, but real figures. Show the numbers rather than
          // an empty box: a spec plate is the document the buyer already reads.
          <dl className="product-chip__specs">
            {detail.specs.slice(0, 4).map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <span className="product-chip__pending font-mono text-micro">Photo to come</span>
        )}
      </div>
      <figcaption className="product-chip__name">{product.name}</figcaption>
    </figure>
  )

  if (!href) return inner

  return (
    <Link href={`/products/${product.category}/${product.slug}`} className="block">
      {inner}
    </Link>
  )
}
