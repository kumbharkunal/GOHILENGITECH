'use client'

/**
 * The Ratio Finder.
 *
 * Deliberately NOT a second signature. Plain box, mono figures, no animation.
 * The seam is the one bold thing on this site; this is a quiet tool sitting
 * next to it.
 *
 * It does the site's actual job better than a hero animation would. An
 * engineer who has just worked out that they need a 1:40 reduction is far
 * likelier to send an enquiry than one who watched a gear spin, and the
 * WhatsApp message arrives with the calculation already in it.
 *
 * Honesty note: the ranges below are the normal commercial spans for each
 * family, not a claim about what Gohil holds. The result says "typically
 * covered by", and the enquiry asks them to confirm. What is actually in stock
 * is an open question for the client. CONTENT.md open item 7.
 */

import { useMemo, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { composeRatioEnquiry, whatsappUrl } from '@/lib/whatsapp'

/** Normal commercial reduction spans, single or double stage. */
const FAMILIES: { name: string; min: number; max: number; note: string }[] = [
  { name: 'Helical', min: 2, max: 70, note: 'efficient, continuous duty' },
  { name: 'Planetary', min: 3, max: 100, note: 'high torque, compact' },
  { name: 'Worm', min: 5, max: 100, note: 'right angle, often self locking' },
  { name: 'Cycloidal', min: 6, max: 119, note: 'shock load tolerant' },
  { name: 'Bevel helical', min: 5, max: 200, note: 'right angle, high power' },
]

export function RatioFinder() {
  // 1440 rpm is a four pole motor at 50 Hz. A real default, not a placeholder.
  const [input, setInput] = useState('1440')
  const [output, setOutput] = useState('36')

  const { ratio, matches, valid } = useMemo(() => {
    const i = parseFloat(input)
    const o = parseFloat(output)
    if (!isFinite(i) || !isFinite(o) || i <= 0 || o <= 0 || o > i) {
      return { ratio: null as number | null, matches: [], valid: false }
    }
    const r = i / o
    return { ratio: r, matches: FAMILIES.filter((f) => r >= f.min && r <= f.max), valid: true }
  }, [input, output])

  // One decimal only when it earns it. A page about precision should not
  // print "1:6.0".
  const ratioText = ratio
    ? (ratio >= 10 ? ratio.toFixed(0) : ratio.toFixed(1).replace(/\.0$/, ''))
    : ''

  const href = ratio
    ? whatsappUrl(
        composeRatioEnquiry(
          parseFloat(input),
          parseFloat(output),
          ratioText,
          // Only name the families when the ratio actually narrows it down.
          // A list of all five tells Shailesh nothing he does not know.
          matches.length <= 3 ? matches.map((m) => m.name) : [],
        ),
      )
    : '#'

  return (
    <div
      className="max-w-[46rem] rounded-md border bg-card p-6 md:p-8"
      style={{ borderColor: 'var(--line-hairline)' }}
    >
      <h2 className="text-h3">Find your ratio</h2>
      <p className="mt-2 max-w-[52ch] text-caption text-fg-muted">
        Enter the motor speed and the output speed you need.
      </p>

      <div className="field-grid mt-4">
        <div className="field">
          <label htmlFor="rf-in">
            Input speed <span className="field__hint">rpm</span>
          </label>
          <input
            id="rf-in"
            type="number"
            inputMode="numeric"
            min={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="rf-out">
            Output speed <span className="field__hint">rpm</span>
          </label>
          <input
            id="rf-out"
            type="number"
            inputMode="numeric"
            min={1}
            value={output}
            onChange={(e) => setOutput(e.target.value)}
          />
        </div>
      </div>

      <div
        className="mt-2 border-t pt-6"
        style={{ borderColor: 'var(--line-hairline)' }}
        aria-live="polite"
      >
        {valid && ratio ? (
          <>
            <p className="font-mono text-h2 text-fg">i = 1:{ratioText}</p>
            {matches.length > 0 ? (
              <>
                <p className="mt-4 text-caption text-fg-muted">Typically covered by</p>
                <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2 p-0">
                  {matches.map((m) => (
                    <li key={m.name} className="flex items-baseline gap-2">
                      <span className="text-body font-semibold text-fg">{m.name}</span>
                      <span className="text-caption text-fg-muted">{m.note}</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="mt-4 max-w-[52ch] text-body text-fg-muted">
                That is outside a normal single unit reduction. It is usually done with two
                stages or a gear motor plus a drive. Send it over and we will work it out.
              </p>
            )}
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-sm px-[20px] py-[13px] font-semibold text-white"
              style={{ backgroundColor: 'var(--color-whatsapp)' }}
            >
              <MessageCircle className="size-5" aria-hidden="true" />
              Send this on WhatsApp
            </a>
            <p className="mt-4 max-w-[52ch] text-caption text-fg-muted">
              These are the normal ranges for each family, not a stock list. Ask us and we
              will tell you what we hold.
            </p>
          </>
        ) : (
          <p className="max-w-[52ch] text-body text-fg-muted">
            Output speed needs to be a positive number, and lower than the input speed.
          </p>
        )}
      </div>
    </div>
  )
}
