import type { MetadataRoute } from 'next'
import { canonical } from '@/lib/seo'
import { CATEGORIES } from '@/data/products'
import { DEALERS } from '@/data/dealers'

/** Required by output: export. These are emitted at build, not per request. */
export const dynamic = 'force-static'

/** Internal pages stay out. /audit and /tokens are noindex working documents. */
const STATIC = ['/', 'about', 'industrial', 'engitech', 'products', 'brands', 'industries', 'contact', 'enquiry']

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    ...STATIC.map((p) => ({
      url: canonical(p),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: p === '/' ? 1 : 0.8,
    })),
    ...CATEGORIES.map((c) => ({
      url: canonical(`products/${c.slug}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...DEALERS.map((d) => ({
      url: canonical(`brands/${d.slug}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}
