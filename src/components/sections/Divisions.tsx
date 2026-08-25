/**
 * The two firms. DESIGN.md 5.5, layout family A.
 *
 * This is the brand's actual structure, so the layout should make it obvious in
 * two seconds: two blocks, one per division, each carrying its own verb and
 * colour side. Orange is Engitech, what they build. Steel is Industrial, what
 * they supply.
 *
 * Note what this section does NOT do: it does not draw a diagonal between the
 * two cards. That would be a per-section angled divider, which DESIGN.md 8
 * bans outright, and it is the move that turns this design into every template
 * with angled section breaks. There is exactly one seam, and it is already
 * travelling behind this section. The split is carried by colour and verb.
 */

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { COMPANY } from '@/data/company'
import { HOME } from '@/data/home'
import { Reveal } from '@/components/ui/Reveal'

const { industrial, engitech } = COMPANY.divisions

export function Divisions() {
  return (
    <section data-seam="0.45" className="container-page section-y">
      <Reveal>
        <h2 className="text-h2">{HOME.divisions.heading}</h2>
        <div className="divisions mt-10">
          {[industrial, engitech].map((d) => (
            <article key={d.slug} className="divisions__card" data-side={d.role}>
              <p className="divisions__verb">{d.verb}</p>
              <h3 className="mt-3 text-h3">{d.name}</h3>
              <p className="marker mt-1">{d.tagline}</p>
              <p className="mt-4 max-w-[46ch] text-body text-fg-muted">{d.summary}</p>
              <Link href={`/${d.slug}`} className="divisions__link">
                {d.role === 'build' ? 'What we build' : 'What we supply'}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
