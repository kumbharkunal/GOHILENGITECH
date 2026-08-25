import type { Metadata } from 'next'
import Image from 'next/image'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { COMPANY, PEOPLE } from '@/data/company'
import { GENERAL_FAQ } from '@/data/faq'
import { whatsappGeneral, telUrl } from '@/lib/whatsapp'
import { PageHeader } from '@/components/sections/PageHeader'
import { EnquiryForm } from '@/components/sections/EnquiryFormLazy'
import { Reveal } from '@/components/ui/Reveal'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Call or WhatsApp Shailesh Gohil or Kishan Gohil. Shop No. 5-6, Dhebar Road South, Rajkot 360 002.',
}

export default function ContactPage() {
  const { address, hours } = COMPANY
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.mapsQuery)}`

  return (
    <>
      <PageHeader
        title="Call the counter."
        lead="Both numbers reach the shop on Dhebar Road. WhatsApp is usually fastest, because we can check what we hold before replying."
        seam="0.42"
      />

      <section data-seam="0.4" className="container-page section-y pt-6">
        <Reveal>
          <div className="grid gap-10 md:grid-cols-2">
            <div className="flex flex-col gap-4">
              {PEOPLE.map((p) => (
                <a
                  key={p.phone}
                  href={telUrl(p.phone)}
                  className="flex items-center justify-between gap-4 rounded-md border bg-card px-5 py-4"
                  style={{ borderColor: 'var(--line-hairline)' }}
                >
                  <span className="flex items-center gap-2.5 text-h3">
                    <Phone className="size-5 text-fg-muted" aria-hidden="true" />
                    {p.name}
                  </span>
                  <span className="font-mono text-data">{p.phoneDisplay}</span>
                </a>
              ))}

              <a
                href={whatsappGeneral()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3.5 font-semibold text-white"
                style={{ backgroundColor: 'var(--color-whatsapp)' }}
              >
                <MessageCircle className="size-5" aria-hidden="true" />
                WhatsApp enquiry
              </a>

              <a
                href={`mailto:${COMPANY.email}`}
                className="flex items-center gap-2 text-body text-fg-muted"
              >
                <Mail className="size-4" aria-hidden="true" />
                {COMPANY.email}
              </a>
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-h3">The shop</h2>
                <address className="mt-3 flex items-start gap-2.5 not-italic text-body text-fg-muted">
                  <MapPin className="mt-1 size-5 shrink-0" aria-hidden="true" />
                  <span>
                    {address.line1}
                    <br />
                    {address.line2}
                    <br />
                    {address.city} {address.pin}, {address.state}, {address.country}
                  </span>
                </address>
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="divisions__link"
                >
                  Open in Maps
                </a>
                <p className="mt-4 font-mono text-data text-fg-muted">
                  {hours.days}
                  {hours.times ? `, ${hours.times}` : ''}
                </p>
              </div>

              <div
                className="flex items-center gap-5 rounded-md border bg-card p-5"
                style={{ borderColor: 'var(--line-hairline)' }}
              >
                {/* Our own QR, pointing straight at the destination rather than
                    through the third party shortener on their printed panel. */}
                <Image
                  src="/brand/qr-instagram.svg"
                  alt="QR code linking to the Gohil Industrial Co. Instagram account"
                  width={96}
                  height={96}
                  className="size-24 shrink-0 text-fg"
                />
                <p className="text-caption text-fg-muted">
                  Scan for our Instagram, where we post new machinery.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section data-seam="0.3" className="container-page section-y pt-0">
        <Reveal>
          <h2 className="text-h2">Send an enquiry</h2>
          <p className="mt-4 max-w-[54ch] text-body text-fg-muted">
            Fill in what you know. Name and category are all we strictly need.
          </p>
          <div className="mt-6">
            <EnquiryForm />
          </div>
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
