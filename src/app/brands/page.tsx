import type { Metadata } from 'next'
import Link from 'next/link'
import { PAGES } from '@/data/pages'
import { DEALERS, UNCONFIRMED_PRINCIPALS } from '@/data/dealers'
import { PageHeader } from '@/components/sections/PageHeader'
import { DealerWall } from '@/components/ui/DealerWall'
import { Reveal } from '@/components/ui/Reveal'
import { EnquiryCta } from '@/components/sections/EnquiryCta'

const P = PAGES.brands

export const metadata: Metadata = { title: P.title, description: P.description }

export default function BrandsPage() {
  return (
    <>
      <PageHeader title={P.h1} lead={P.lead} seam="0.12" />

      <section data-seam="0.1" className="container-page section-y pt-6">
        <Reveal>
          <DealerWall />

          {/*
            The coverage table. On the home wall the marks carry no labels,
            because a category under a logo adds nothing. Here the same
            information is a table cell, which is what a buyer actually wants.
            DESIGN.md 4.8.
          */}
          <table className="mt-12 w-full text-left">
            <caption className="sr-only">Authorised dealer principals</caption>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--line-strong)' }}>
                <th scope="col" className="py-3 text-caption font-semibold">
                  Principal
                </th>
                <th scope="col" className="py-3 text-caption font-semibold">
                  Coverage
                </th>
              </tr>
            </thead>
            <tbody>
              {DEALERS.map((d) => (
                <tr key={d.slug} style={{ borderBottom: '1px solid var(--line-hairline)' }}>
                  <th scope="row" className="py-4 pr-6 align-top font-normal">
                    <Link href={`/brands/${d.slug}`} className="text-body text-fg">
                      {d.name}
                    </Link>
                  </th>
                  <td className="py-4 align-top text-body text-fg-muted">
                    {d.covers ?? (
                      <span className="font-mono text-data">Ask us what we hold</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="mt-8 max-w-[62ch] text-caption text-fg-muted">
            We are an authorised dealer for these brands. We do not manufacture them. The
            machinery we build ourselves is under{' '}
            <Link href="/engitech" className="text-fg-accent underline underline-offset-4">
              Gohil Engitech Co.
            </Link>
            {UNCONFIRMED_PRINCIPALS.length > 0 ? null : null}
          </p>
        </Reveal>
      </section>

      <EnquiryCta
        heading="Looking for a particular make?"
        body="Send the model number or the nameplate photo. If we do not hold it, we will tell you what will fit instead."
        product="Brand enquiry"
      />
    </>
  )
}
