'use client'

/**
 * Lazy boundary for the enquiry form.
 *
 * react-hook-form and zod are about 78 KB gzipped between them. Because two
 * routes use the form, the bundler hoists them into a shared chunk that every
 * page then downloads, including the home page, which has no form on it. That
 * alone put the home page 56 KB over the JS budget.
 *
 * Splitting it here keeps that weight in a chunk that is only fetched on the
 * pages that actually render a form.
 */

import dynamic from 'next/dynamic'

export const EnquiryForm = dynamic(
  () => import('./EnquiryForm').then((m) => m.EnquiryForm),
  {
    ssr: false,
    // Reserve the height so the swap does not shift the page. DESIGN.md 9.3
    loading: () => <div className="min-h-[36rem] max-w-[46rem]" aria-hidden="true" />,
  },
)
