import type { NextConfig } from 'next'

/**
 * Static export, for Cloudflare Pages at gohilengitech.pages.dev.
 *
 * Every route on this site is already static or SSG. There is no API route,
 * no server action and no server component that needs a runtime, because the
 * enquiry path is WhatsApp deep links rather than a backend. So a plain static
 * export is the correct target: no adapter, no worker, no cold start.
 *
 * Consequence: next/image cannot optimise on demand, so `unoptimized` is on
 * and the assets in public/ already ship in their final format. The build
 * scripts emit WebP for exactly this reason.
 */
const nextConfig: NextConfig = {
  output: 'export',

  images: {
    unoptimized: true,
  },

  // Cloudflare Pages serves /path/ cleanly; trailing slashes keep relative
  // asset paths and the sitemap consistent between local and deployed.
  trailingSlash: true,
}

export default nextConfig
