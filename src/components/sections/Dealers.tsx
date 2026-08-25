/**
 * Authorised dealer wall. DESIGN.md 4.8 and 5.5, layout family F.
 *
 * Deliberately NOT the usual greyscale-to-colour-on-hover logo strip. That is
 * desktop thinking on a site where most visitors have no pointer, so the whole
 * interaction is dead for them and the wall degrades to a grey strip that says
 * nothing.
 *
 * Instead the marks stay permanently greyscale and each one is a link into
 * that principal's page, so the wall is navigation rather than decoration. It
 * behaves identically on touch and pointer, and "Bonfiglioli dealer Rajkot" is
 * a real search query that now has a real landing page.
 *
 * Logo only. No category label under any mark. Coverage information belongs in
 * the table on /brands, where it is information rather than ornament.
 */

import { HOME } from '@/data/home'
import { DealerWall } from '@/components/ui/DealerWall'
import { Reveal } from '@/components/ui/Reveal'

export function Dealers() {
  return (
    <section data-seam="0.12" className="container-page section-y">
      <Reveal>
        {/* The client's own wording. Never upgraded. */}
        <h2 className="text-h2">{HOME.dealers.heading}</h2>
        <DealerWall className="mt-10" />
      </Reveal>
    </section>
  )
}
