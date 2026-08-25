import { MessageCircle, Phone } from 'lucide-react'
import { PEOPLE, PRIMARY_PERSON } from '@/data/company'
import { composeEnquiry, whatsappUrl, telUrl } from '@/lib/whatsapp'
import { Reveal } from '@/components/ui/Reveal'

/**
 * Closing call to action for an inner page.
 *
 * The WhatsApp message is prefilled with the product context, so Shailesh opens
 * the chat already knowing what the enquiry is about rather than starting from
 * a blank "hi". That prefill is the whole conversion path on this site, since
 * there is no email backend. CONTENT.md 7.
 */
export function EnquiryCta({
  heading,
  body,
  product,
  seam = '0.42',
}: {
  heading: string
  body: string
  product: string
  seam?: string
}) {
  const text = composeEnquiry({ product })
  return (
    <section data-seam={seam} className="container-page section-y pt-0">
      <Reveal>
        <div
          className="rounded-md border bg-card p-7 md:p-10"
          style={{ borderColor: 'var(--line-hairline)' }}
        >
          <h2 className="text-h2">{heading}</h2>
          <p className="mt-4 max-w-[54ch] text-body text-fg-muted">{body}</p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href={whatsappUrl(text)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm px-[22px] py-[14px] font-semibold text-white"
              style={{ backgroundColor: 'var(--color-whatsapp)' }}
            >
              <MessageCircle className="size-5" aria-hidden="true" />
              WhatsApp enquiry
            </a>
            {PEOPLE.map((p) => (
              <a
                key={p.phone}
                href={telUrl(p.phone)}
                className="inline-flex items-center gap-2 rounded-sm border px-[18px] py-[13px] font-semibold text-fg"
                style={{ borderColor: 'var(--line-strong)' }}
              >
                <Phone className="size-4" aria-hidden="true" />
                {p.name.split(' ')[0]} {p.phoneDisplay.replace('+91 ', '')}
              </a>
            ))}
          </div>
          <p className="mt-5 text-caption text-fg-muted">
            Or call {PRIMARY_PERSON.name} directly. Both numbers reach the shop.
          </p>
        </div>
      </Reveal>
    </section>
  )
}
