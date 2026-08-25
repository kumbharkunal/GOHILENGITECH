'use client'

/**
 * Structured RFQ, composed into a WhatsApp message. CONTENT.md 6.2 and 7.
 *
 * There is no server. The client chose a WhatsApp-only path, so this form
 * validates in the browser and then opens wa.me with the enquiry already
 * written out. That means no deliverability risk, no spam surface, and it
 * lands in the inbox Shailesh actually checks.
 *
 * Two consequences of that choice, handled honestly rather than papered over:
 *
 *   1. A wa.me link cannot carry a file. Rather than ship a file input that
 *      silently drops the drawing, the form says to attach it in the chat that
 *      opens. CONTENT.md 7.
 *   2. Desktop visitors without WhatsApp Web get a Copy enquiry button, so the
 *      structured text is never trapped in a link they cannot follow.
 *
 * Only name and product are required. An engineer who knows the ratio will
 * fill the rest in; one who does not should still be able to send something.
 */

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@/lib/zod-resolver'
import { z } from 'zod'
import { Check, Copy, MessageCircle } from 'lucide-react'
import { CATEGORIES } from '@/data/products'
import { PEOPLE } from '@/data/company'
import { ACTIONS } from '@/data/nav'
import { composeEnquiry, whatsappUrl, type EnquiryFields } from '@/lib/whatsapp'

const schema = z.object({
  name: z.string().min(2, 'Please give us a name'),
  company: z.string().optional(),
  city: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email('That does not look like an email').or(z.literal('')).optional(),
  product: z.string().min(1, 'Pick the closest category'),
  application: z.string().optional(),
  ratio: z.string().optional(),
  power: z.string().optional(),
  inputRpm: z.string().optional(),
  mounting: z.string().optional(),
  quantity: z.string().optional(),
  requiredBy: z.string().optional(),
})

type Values = z.infer<typeof schema>

const FIELDS: {
  name: keyof Values
  label: string
  type?: string
  placeholder?: string
  hint?: string
}[] = [
  { name: 'name', label: 'Your name' },
  { name: 'company', label: 'Company' },
  { name: 'city', label: 'City' },
  { name: 'phone', label: 'Phone', type: 'tel', hint: 'WhatsApp preferred' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'application', label: 'Application or machine', placeholder: 'Screw conveyor, groundnut cake' },
  { name: 'ratio', label: 'Ratio', placeholder: '1:40' },
  { name: 'power', label: 'Power', placeholder: '2.2 kW / 3 HP' },
  { name: 'inputRpm', label: 'Input speed', placeholder: '1440 rpm' },
  { name: 'mounting', label: 'Mounting', placeholder: 'Foot, flange' },
  { name: 'quantity', label: 'Quantity', placeholder: '2' },
  { name: 'requiredBy', label: 'Required by', type: 'date' },
]

export function EnquiryForm({ presetProduct }: { presetProduct?: string }) {
  const [recipient, setRecipient] = useState(PEOPLE[0].phone)
  const [copied, setCopied] = useState(false)
  const [sent, setSent] = useState(false)

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { product: presetProduct ?? '', inputRpm: '1440 rpm' },
  })

  const build = (v: Values) => composeEnquiry(v as EnquiryFields)

  const onSubmit = (v: Values) => {
    window.open(whatsappUrl(build(v), recipient), '_blank', 'noopener,noreferrer')
    setSent(true)
  }

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(build(getValues()))
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2400)
    } catch {
      setCopied(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="max-w-[46rem]">
      <div className="field">
        <label htmlFor="product">Product category</label>
        <select id="product" {...register('product')} aria-invalid={!!errors.product}>
          <option value="">Choose a category</option>
          {CATEGORIES.map((c) => (
            <option key={c.slug} value={c.name}>
              {c.name}
            </option>
          ))}
          <option value="Something else">Something else</option>
        </select>
        {errors.product ? <p className="field__error">{errors.product.message}</p> : null}
      </div>

      <div className="field-grid">
        {FIELDS.map((f) => (
          <div key={f.name} className="field">
            <label htmlFor={f.name}>
              {f.label}
              {f.hint ? <span className="field__hint"> {f.hint}</span> : null}
            </label>
            <input
              id={f.name}
              type={f.type ?? 'text'}
              placeholder={f.placeholder}
              aria-invalid={!!errors[f.name]}
              {...register(f.name)}
            />
            {errors[f.name] ? <p className="field__error">{errors[f.name]?.message}</p> : null}
          </div>
        ))}
      </div>

      <fieldset className="field mt-2">
        <legend>Send to</legend>
        <div className="flex flex-wrap gap-4 pt-1">
          {PEOPLE.map((p) => (
            <label key={p.phone} className="flex items-center gap-2 text-body">
              <input
                type="radio"
                name="recipient"
                value={p.phone}
                checked={recipient === p.phone}
                onChange={() => setRecipient(p.phone)}
              />
              {p.name}
              <span className="font-mono text-data text-fg-muted">{p.phoneDisplay}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-sm px-[22px] py-[14px] font-semibold text-white"
          style={{ backgroundColor: 'var(--color-whatsapp)' }}
        >
          <MessageCircle className="size-5" aria-hidden="true" />
          {ACTIONS.sendEnquiry}
        </button>

        <button
          type="button"
          onClick={onCopy}
          className="inline-flex items-center gap-2 rounded-sm border px-[18px] py-[13px] font-semibold text-fg"
          style={{ borderColor: 'var(--line-strong)' }}
        >
          {copied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
          {copied ? 'Copied' : 'Copy enquiry'}
        </button>
      </div>

      {/* Status is a direction, not a mood. DESIGN.md 8, do 9. */}
      <p aria-live="polite" className="mt-5 max-w-[54ch] text-caption text-fg-muted">
        {sent
          ? `${ACTIONS.enquirySent}. Attach your drawing in the WhatsApp chat that just opened.`
          : 'Opens WhatsApp with the enquiry written out. Attach a drawing there if you have one.'}
      </p>
    </form>
  )
}
