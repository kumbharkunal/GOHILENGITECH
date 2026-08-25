/**
 * WhatsApp message composition. CONTENT.md section 7.
 *
 * The client chose a WhatsApp-only enquiry path, so there is no server
 * endpoint. Every enquiry is composed here, URL encoded, and opened as a
 * wa.me deep link. That means no deliverability risk and no spam surface,
 * and it lands in the inbox Shailesh actually checks.
 *
 * A wa.me link cannot carry a file attachment. Rather than ship a file input
 * that silently fails, the form tells the visitor to attach their drawing in
 * the chat that opens. CONTENT.md 7.
 */

import { PRIMARY_PERSON } from '@/data/company'

const SITE = 'gohilgroup.com'

/** wa.me caps out well below this, but a long RFQ should still be safe. */
const MAX_TEXT = 1800

export interface EnquiryFields {
  name?: string
  company?: string
  city?: string
  product?: string
  application?: string
  ratio?: string
  power?: string
  inputRpm?: string
  mounting?: string
  quantity?: string
  requiredBy?: string
  page?: string
}

const LABELS: Record<keyof EnquiryFields, string> = {
  name: 'Name',
  company: 'Company',
  city: 'City',
  product: 'Product',
  application: 'Application',
  ratio: 'Ratio',
  power: 'Power',
  inputRpm: 'Input RPM',
  mounting: 'Mounting',
  quantity: 'Quantity',
  requiredBy: 'Required by',
  page: 'Page',
}

const ORDER: (keyof EnquiryFields)[] = [
  'name',
  'company',
  'city',
  'product',
  'application',
  'ratio',
  'power',
  'inputRpm',
  'mounting',
  'quantity',
  'requiredBy',
  'page',
]

/**
 * Build the plain text body. Only fields with a value are included, so a
 * one line product enquiry stays one line.
 */
export function composeEnquiry(fields: EnquiryFields, heading = 'Enquiry'): string {
  const rows = ORDER.filter((k) => {
    const v = fields[k]
    return typeof v === 'string' && v.trim().length > 0
  })
  if (rows.length === 0) return `${heading} via ${SITE}`

  const width = Math.max(...rows.map((k) => LABELS[k].length)) + 1
  const body = rows
    .map((k) => `${(LABELS[k] + ':').padEnd(width + 1)} ${String(fields[k]).trim()}`)
    .join('\n')

  return `${heading} via ${SITE}\n\n${body}`.slice(0, MAX_TEXT)
}

/** Ratio finder result, phrased the way an engineer would write it. */
export function composeRatioEnquiry(
  inputRpm: number,
  outputRpm: number,
  ratio: string,
  families: string[],
): string {
  return composeEnquiry(
    {
      inputRpm: `${inputRpm} rpm`,
      product: families.length ? families.join(', ') : undefined,
      ratio: `i = 1:${ratio} for ${outputRpm} rpm output`,
    },
    'Ratio enquiry',
  )
}

/** Full wa.me URL. Pass digits only, country code first. */
export function whatsappUrl(text: string, phone: string = PRIMARY_PERSON.phone): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
}

/** Convenience for the action bar and any plain "message us" button. */
export function whatsappGeneral(phone: string = PRIMARY_PERSON.phone): string {
  return whatsappUrl(`Enquiry via ${SITE}\n\n`, phone)
}

/** Convenience for a product page or card. */
export function whatsappProduct(productName: string, path?: string): string {
  return whatsappUrl(
    composeEnquiry({ product: productName, page: path ? `${SITE}${path}` : undefined }),
  )
}

/** tel: href from the same digits. */
export function telUrl(phone: string): string {
  return `tel:+${phone}`
}
