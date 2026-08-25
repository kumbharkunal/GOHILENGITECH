/**
 * Industries. CONTENT.md section 4.9.
 *
 * This is the most inference-heavy content on the site, so the honesty rule is
 * mechanical rather than a matter of judgement:
 *
 *   evidence 'first-party'  the client's own material shows it
 *   evidence 'listed'       they list the product category themselves
 *   evidence 'inferred'     market context only
 *
 * Anything not first-party is phrased as suitability ("suited to", "commonly
 * used in"), never as a claim of existing customers, and appears on /audit.
 * No industry implies a customer relationship that has not been confirmed.
 */

export type Evidence = 'first-party' | 'listed' | 'inferred'

export interface Industry {
  slug: string
  name: string
  /** How we are allowed to talk about it, given the evidence. */
  line: string
  evidence: Evidence
  note: string
}

export const INDUSTRIES: readonly Industry[] = [
  {
    slug: 'oil-mills',
    name: 'Groundnut and cottonseed oil mills',
    line: 'Stacker conveyors for sack handling, screw conveyors for cake, plus oil mill machinery and spares.',
    evidence: 'first-party',
    note: "Their own posts show the stacker conveyor handling jute sacks in a godown, and they list oil mill machinery and spares in their own product list.",
  },
  {
    slug: 'pharma-food',
    name: 'Pharmaceutical and food processing',
    line: 'Vibro sifters for powder and granule screening. Pharma equipment listed in their own range.',
    evidence: 'listed',
    note: 'They list Pharma Equipment on their own artwork. Named plants would be inference.',
  },
  {
    slug: 'cement-bulk',
    name: 'Cement and bulk handling',
    line: 'Belt and bucket conveyors, heavy duty gearboxes and blowers for bulk material.',
    evidence: 'listed',
    note: 'Cement plant machinery appears in their own IndiaMART About Us text.',
  },
  {
    slug: 'ceramics',
    name: 'Ceramic tile plants, Morbi',
    line: 'Suited to conveyor lines, blowers and heavy reduction drives.',
    evidence: 'inferred',
    note: 'Market context only. Morbi is the ceramic cluster nearest Rajkot. Client to confirm.',
  },
  {
    slug: 'foundry',
    name: 'Foundries and casting units',
    line: 'Suited to material handling and heavy duty reduction drives.',
    evidence: 'inferred',
    note: 'Market context only. Rajkot has a dense foundry cluster. Client to confirm.',
  },
  {
    slug: 'engineering',
    name: 'Brass and CNC parts, Jamnagar',
    line: 'Suited to gear motors, three phase motors and welding consumables.',
    evidence: 'inferred',
    note: 'Market context only. Client to confirm.',
  },
] as const

export const CONFIRMED_INDUSTRIES = INDUSTRIES.filter((i) => i.evidence !== 'inferred')
export const INFERRED_INDUSTRIES = INDUSTRIES.filter((i) => i.evidence === 'inferred')
