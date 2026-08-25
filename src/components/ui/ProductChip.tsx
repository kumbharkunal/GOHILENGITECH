import Image from 'next/image'
import type { Product } from '@/data/products'

/**
 * The unit that carries the real cut-out photography. DESIGN.md 4.5.
 *
 * These images are small. The largest is 222x150. Native size is the 2x asset,
 * so a chip renders them at around half, which is the only honest way to use
 * them. Nothing here is ever stretched to hero size. DESIGN.md 8.1.
 *
 * Hover is suppressed on touch via @media (hover: hover) in the stylesheet,
 * because 70 percent of this audience has no pointer.
 */

export function ProductChip({
  product,
  sizes = '(max-width: 768px) 45vw, 220px',
  priority = false,
}: {
  product: Product
  sizes?: string
  priority?: boolean
}) {
  return (
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
        ) : product.specs ? (
          // No photograph yet, but real published specifications. Show the
          // numbers rather than an empty photo box: this is a spec sheet, which
          // is the document the buyer already reads, not a fake preview.
          <dl className="product-chip__specs">
            {product.specs.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        ) : (
          // An honest empty slot. Real client photography is requested in
          // CONTENT.md 10.3.
          <span className="product-chip__pending font-mono text-micro">Photo to come</span>
        )}
      </div>
      <figcaption className="product-chip__name">{product.name}</figcaption>
    </figure>
  )
}
