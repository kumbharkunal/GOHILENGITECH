import type { Metadata } from 'next'
import { PAGES } from '@/data/pages'
import { INDUSTRIES } from '@/data/industries'
import { PageHeader } from '@/components/sections/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { EnquiryCta } from '@/components/sections/EnquiryCta'

const P = PAGES.industries

export const metadata: Metadata = { title: P.title, description: P.description }

/**
 * Evidence labels are shown on the page, not hidden in a comment.
 *
 * This is unusual and it is deliberate. Most supplier sites list industries
 * they would like to serve as though they already do. Marking which claims
 * rest on real work and which rest on suitability costs nothing and is the
 * difference between a page a buyer can trust and one they discount entirely.
 */
const LABEL: Record<string, string> = {
  'first-party': 'Work we have done',
  listed: 'In our range',
  inferred: 'Suited to',
}

export default function IndustriesPage() {
  return (
    <>
      <PageHeader title={P.h1} lead={P.lead} seam="0.22" />

      <section data-seam="0.3" className="container-page section-y pt-6">
        <Reveal>
          <ul className="list-none p-0">
            {INDUSTRIES.map((ind) => (
              <li
                key={ind.slug}
                className="grid gap-2 border-b py-7 last:border-0 md:grid-cols-[minmax(0,26ch)_1fr] md:gap-10"
                style={{ borderColor: 'var(--line-hairline)' }}
              >
                <div>
                  <h2 className="text-h3">{ind.name}</h2>
                  <p className="marker mt-1.5">{LABEL[ind.evidence]}</p>
                </div>
                <p className="max-w-[64ch] text-body text-fg-muted">{ind.line}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <EnquiryCta
        heading="Not on the list?"
        body="The equipment is general purpose. Tell us what you are moving, screening or driving and we will say whether it fits."
        product="Industry enquiry"
        seam="0.25"
      />
    </>
  )
}
