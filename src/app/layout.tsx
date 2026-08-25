import type { Metadata, Viewport } from 'next'
import { Anybody, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import '@/styles/globals.css'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { SeamLayer } from '@/components/layout/SeamLayer'
import { Header } from '@/components/layout/Header'
import { PageLoader } from '@/components/layout/PageLoader'
import { Footer } from '@/components/layout/Footer'
import { Z } from '@/lib/constants'
import { SITE_URL, SITE_NAME, canonical, organisationSchema, localBusinessSchema, jsonLd } from '@/lib/seo'

/**
 * Display face. Variable on both wght (100-900) and wdth (50-150).
 * Set wide, it echoes the client's own Eurostile Extended wordmark.
 * DESIGN.md 3.1
 */
const anybody = Anybody({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-anybody',
  axes: ['wdth'],
})

/** Body and UI. DESIGN.md 3.1 */
const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plex-sans',
})

/**
 * Data face. IBM Plex Mono has no variable cut on Google Fonts,
 * so the weights used by the `data` and `micro` tokens are declared here.
 * DESIGN.md 3.2
 */
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plex-mono',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: canonical('/') },
  title: {
    default: "Gohil's Group, Gearbox and Conveyor Supplier in Rajkot",
    template: "%s | Gohil's Group",
  },
  description:
    'Authorised dealer for Bonfiglioli, SEW-Eurodrive, ABB and Elecon gearboxes. Custom conveyors, blowers and oil mill machinery built in Rajkot since 1994.',
  applicationName: "Gohil's Group",
  authors: [{ name: "Gohil's Group" }],
  formatDetection: { telephone: true, address: true },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_IN',
    url: SITE_URL,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og.png'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  // Light theme only, so one colour.
  themeColor: '#EAEBED',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      className={`${anybody.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body>
        {/* Organization and LocalBusiness sit on every page. Per page schema
            (Product, FAQPage, BreadcrumbList) is added by the page itself. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(organisationSchema())}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(localBusinessSchema())}
        />
        <SmoothScroll>
          <PageLoader />
          {/* The seam sits behind everything. Sections stay transparent so it
              reads through them. DESIGN.md 1.3 */}
          <SeamLayer />
          <Header />
          <main
            id="main"
            className="relative pt-[72px]"
            style={{ zIndex: Z.content }}
          >
            {children}
          </main>
          <div className="relative" style={{ zIndex: Z.content }}>
            <Footer />
          </div>
        </SmoothScroll>
      </body>
    </html>
  )
}
