import type { Metadata } from 'next'
import { PageHeader } from '@/components/sections/PageHeader'
import { EnquiryForm } from '@/components/sections/EnquiryFormLazy'
import { RatioFinder } from '@/components/sections/RatioFinder'
import { Reveal } from '@/components/ui/Reveal'
import { GENERAL_FAQ } from '@/data/faq'

export const metadata: Metadata = {
  title: 'Send an Enquiry',
  description:
    'Tell us the ratio, power, speed and mounting. The form opens WhatsApp with your enquiry written out.',
}

export default function EnquiryPage() {
  return (
    <>
      <PageHeader
        title="Send an enquiry."
        lead="Fill in what you know. Name and category are all we strictly need; the rest just gets you a faster quote."
        seam="0.3"
      />

      <section data-seam="0.28" className="container-page pb-4 pt-2">
        <Reveal>
          <EnquiryForm />
        </Reveal>
      </section>

      <section data-seam="0.2" className="container-page section-y">
        <Reveal>
          <RatioFinder />
        </Reveal>
      </section>

      <section data-seam="0.25" className="container-page section-y pt-0">
        <Reveal>
          <h2 className="text-h2">Before you ask</h2>
          <dl className="mt-8 max-w-[68ch]">
            {GENERAL_FAQ.map((f) => (
              <div
                key={f.q}
                className="border-b py-5 last:border-0"
                style={{ borderColor: 'var(--line-hairline)' }}
              >
                <dt className="text-h3">{f.q}</dt>
                <dd className="mt-2 text-body text-fg-muted">{f.a}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>
    </>
  )
}
