/**
 * Site level SEO constants and JSON-LD builders. Phase 8.
 *
 * This is a greenfield domain with zero authority, so local search is the whole
 * game. Targets are in CONTENT.md 8.2.
 *
 * Honesty carries into the structured data exactly as it does into the copy:
 * openingHours is omitted rather than guessed, because we only know the days
 * and not the times. A wrong opening time in schema is worse than none, since
 * Google will show it.
 */

import { COMPANY, PEOPLE } from '@/data/company'
import { CATEGORIES } from '@/data/products'

export const SITE_URL = 'https://gohilengitech.pages.dev'
export const SITE_NAME = "Gohil's Group"

export function canonical(path = '/'): string {
  const clean = path === '/' ? '/' : `/${path.replace(/^\/|\/$/g, '')}/`
  return `${SITE_URL}${clean}`
}

const ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: `${COMPANY.address.line1}, ${COMPANY.address.line2}`,
  addressLocality: COMPANY.address.city,
  postalCode: COMPANY.address.pin.replace(/\s/g, ''),
  addressRegion: COMPANY.address.state,
  addressCountry: 'IN',
}

export function organisationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: [COMPANY.divisions.industrial.name, COMPANY.divisions.engitech.name],
    url: SITE_URL,
    logo: `${SITE_URL}/brand/g-mark.svg`,
    foundingDate: String(COMPANY.established),
    email: COMPANY.email,
    telephone: PEOPLE.map((p) => `+${p.phone}`),
    address: ADDRESS,
    sameAs: [COMPANY.instagram, COMPANY.facebook],
  }
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#localbusiness`,
    name: SITE_NAME,
    description:
      'Authorised dealer for industrial gearboxes and motors, and manufacturer of conveyors, blowers and oil mill machinery. Rajkot, Gujarat, since 1994.',
    url: SITE_URL,
    image: `${SITE_URL}/og.png`,
    telephone: `+${PEOPLE[0].phone}`,
    email: COMPANY.email,
    address: ADDRESS,
    // Rajkot city centre. Deliberately not a precise pin: we have not verified
    // the exact coordinates of the shop, and a wrong pin sends a buyer to the
    // wrong door. Replace once the client confirms.
    geo: { '@type': 'GeoCoordinates', latitude: 22.2916, longitude: 70.7933 },
    areaServed: [
      { '@type': 'State', name: 'Gujarat' },
      { '@type': 'Country', name: 'India' },
    ],
    // openingHours is intentionally absent. We know the days (Monday to
    // Sunday) but not the times, and schema with a guessed time is worse than
    // schema without it. CONTENT.md open item 3.
    paymentAccepted: 'Cash, Cheque, DD, Online transfer',
    foundingDate: String(COMPANY.established),
    sameAs: [COMPANY.instagram, COMPANY.facebook],
  }
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: canonical(t.path),
    })),
  }
}

export function productSchema(category: (typeof CATEGORIES)[number]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: category.name,
    description: category.blurb,
    category: 'Industrial power transmission',
    brand: { '@type': 'Brand', name: SITE_NAME },
    // No price, no availability. Both would be fabricated: their own listings
    // contradict each other on price by five times, and stock is unconfirmed.
    // An offer block with invented data is exactly the failure this build
    // exists to avoid. CONTENT.md section 5.
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStoreOnly',
      url: canonical(`products/${category.slug}`),
      seller: { '@id': `${SITE_URL}/#organization` },
    },
  }
}

export function faqSchema(faqs: readonly { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

/** Renders a JSON-LD block. Kept in one place so escaping is handled once. */
export function jsonLd(data: object) {
  return {
    __html: JSON.stringify(data).replace(/</g, '\\u003c'),
  }
}
