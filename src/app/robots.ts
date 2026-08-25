import type { MetadataRoute } from 'next'
import { SITE_URL, canonical } from '@/lib/seo'

/** Required by output: export. These are emitted at build, not per request. */
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Internal working documents, not content.
      disallow: ['/audit/', '/tokens/', '/_dev/'],
    },
    sitemap: canonical('sitemap.xml').replace(/\/$/, ''),
    host: SITE_URL,
  }
}
