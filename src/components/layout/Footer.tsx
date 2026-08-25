/**
 * Footer. Carries the same facts as the mobile menu, plus the credentials the
 * client has confirmed. Nothing here is unverified.
 *
 * The GSTIN is public on TradeIndia and Indian B2B buyers read a visible one as
 * a trust signal, but it stays behind a flag until the client approves it.
 * CONTENT.md 2.3.
 */

import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { COMPANY, PEOPLE } from '@/data/company'
import { NAV } from '@/data/nav'
import { telUrl } from '@/lib/whatsapp'
import { Lockup } from '@/components/ui/Logo'

/** Flip once the client confirms. CONTENT.md open item 5. */
const SHOW_GSTIN = false

export function Footer() {
  const { address, divisions } = COMPANY
  return (
    <footer className="on-ink relative mt-px" style={{ backgroundColor: 'var(--color-ink)' }}>
      <div className="container-page py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1.3fr]">
          <div>
            <Lockup markClass="h-11 w-11" className="text-[17px]" />
            <p className="mt-5 max-w-[38ch] text-caption" style={{ color: 'var(--color-steel)' }}>
              {divisions.industrial.name}, {divisions.industrial.tagline}.
              <br />
              {divisions.engitech.name}, {divisions.engitech.tagline}.
            </p>
            <p className="mt-4 font-mono text-micro" style={{ color: 'var(--color-steel)' }}>
              RAJKOT, GUJARAT. EST. {COMPANY.established}
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-col gap-2.5">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-caption transition-colors hover:text-mist"
                    style={{ color: 'var(--color-steel)' }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-4">
            {PEOPLE.map((p) => (
              <a
                key={p.phone}
                href={telUrl(p.phone)}
                className="flex items-center justify-between gap-4 border-b pb-2.5"
                style={{ borderColor: 'rgb(151 152 154 / 0.22)', color: 'var(--color-mist)' }}
              >
                <span className="flex items-center gap-2 text-caption">
                  <Phone className="size-4" style={{ color: 'var(--color-steel)' }} aria-hidden="true" />
                  {p.name}
                </span>
                <span className="font-mono text-data">{p.phoneDisplay}</span>
              </a>
            ))}

            <a
              href={`mailto:${COMPANY.email}`}
              className="flex items-center gap-2 text-caption"
              style={{ color: 'var(--color-steel)' }}
            >
              <Mail className="size-4" aria-hidden="true" />
              {COMPANY.email}
            </a>

            <address className="flex items-start gap-2 not-italic text-caption" style={{ color: 'var(--color-steel)' }}>
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>
                {address.line1}
                <br />
                {address.line2}
                <br />
                {address.city} {address.pin}, {address.state}, {address.country}
              </span>
            </address>

            <p className="font-mono text-micro" style={{ color: 'var(--color-steel)' }}>
              {COMPANY.hours.days}
              {COMPANY.hours.times ? `, ${COMPANY.hours.times}` : ''}
            </p>
          </div>
        </div>

        <div
          className="mt-12 flex flex-col gap-2 border-t pt-6 text-micro md:flex-row md:items-center md:justify-between"
          style={{ borderColor: 'rgb(151 152 154 / 0.22)', color: 'var(--color-steel)' }}
        >
          {/* The division names already end in "Co.", so no trailing stop. */}
          <p className="font-mono">
            {COMPANY.group}. {COMPANY.divisions.industrial.name} and{' '}
            {COMPANY.divisions.engitech.name}
          </p>
          {SHOW_GSTIN && <p className="font-mono">GSTIN {COMPANY.gstin}</p>}
        </div>
      </div>
    </footer>
  )
}
