import type { Metadata } from 'next'
import { PAGES, ABOUT_FACTS } from '@/data/pages'
import { COMPANY, PEOPLE } from '@/data/company'
import { telUrl } from '@/lib/whatsapp'
import { PageHeader } from '@/components/sections/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { EnquiryCta } from '@/components/sections/EnquiryCta'

const P = PAGES.about

export const metadata: Metadata = { title: P.title, description: P.description }

export default function AboutPage() {
  const { industrial, engitech } = COMPANY.divisions

  return (
    <>
      <PageHeader marker={P.marker} title={P.h1} lead={P.lead} seam="0.42" />

      {/* The two firms, stated plainly. The distinction matters and must not be
          blurred: they manufacture machinery, and they are an authorised dealer
          for the branded drives. CONTENT.md section 1. */}
      <section data-seam="0.45" className="container-page section-y pt-6">
        <Reveal>
          <div className="divisions">
            {[industrial, engitech].map((d) => (
              <article key={d.slug} className="divisions__card" data-side={d.role}>
                <p className="divisions__verb">{d.verb}</p>
                <h2 className="mt-3 text-h3">{d.name}</h2>
                <p className="marker mt-1">{d.tagline}</p>
                <p className="mt-4 text-body text-fg-muted">{d.summary}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Facts only. No headcount, no turnover. The two directories contradict
          each other on employees, and a revenue figure would work against the
          job this site has to do. CONTENT.md 2.4. */}
      <section data-seam="0.62" className="on-ink" style={{ backgroundColor: 'var(--color-ink)' }}>
        <div className="container-page section-y">
          <Reveal>
            <h2 className="text-h2" style={{ color: 'var(--color-mist)' }}>
              The firm
            </h2>
            <dl className="mt-8 max-w-[46rem]">
              {ABOUT_FACTS.map((f) => (
                <div
                  key={f.label}
                  className="flex flex-col gap-1 border-b py-4 last:border-0 md:flex-row md:items-baseline md:justify-between md:gap-8"
                  style={{ borderColor: 'rgb(151 152 154 / 0.22)' }}
                >
                  <dt className="text-caption" style={{ color: 'var(--color-steel)' }}>
                    {f.label}
                  </dt>
                  <dd
                    className="m-0 font-mono text-data md:text-right"
                    style={{ color: 'var(--color-mist)' }}
                  >
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* People. Names and numbers only. IndiaMART and TradeIndia disagree on
          who is proprietor, so no role titles until the client confirms.
          CONTENT.md open item 4. */}
      <section data-seam="0.4" className="container-page section-y">
        <Reveal>
          <h2 className="text-h2">The people</h2>
          <p className="mt-4 max-w-[54ch] text-body text-fg-muted">
            A family firm. Both numbers reach the shop on Dhebar Road.
          </p>
          <div className="mt-8 grid gap-4 md:max-w-[46rem] md:grid-cols-2">
            {PEOPLE.map((p) => (
              <a
                key={p.phone}
                href={telUrl(p.phone)}
                className="rounded-md border bg-card px-5 py-5"
                style={{ borderColor: 'var(--line-hairline)' }}
              >
                <p className="text-h3">{p.name}</p>
                <p className="mt-1 font-mono text-data text-fg-muted">{p.phoneDisplay}</p>
              </a>
            ))}
          </div>
          <p className="mt-6 max-w-[54ch] text-caption text-fg-muted">
            Photographs of Shailesh-bhai and Kishan-bhai at the shop are on the way.
          </p>
        </Reveal>
      </section>

      <EnquiryCta
        heading="Come to the counter."
        body="Shop No. 5-6, opposite the BJP office on Dhebar Road South. Open Monday to Sunday. Message first and we will have it ready."
        product="General enquiry"
      />
    </>
  )
}
