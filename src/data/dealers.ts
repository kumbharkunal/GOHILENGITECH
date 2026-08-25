/**
 * Authorised dealer network. CONTENT.md section 4.7.
 *
 * Third party trademarks. Handling rules, which are not optional:
 *   - marks are cropped from the client's own banner (client-assets image 1)
 *     and never downloaded from a brand's own site
 *   - the section is labelled "Authorised Dealer", the client's exact wording,
 *     never upgraded to Partners, Trusted by, or anything implying endorsement
 *   - rendered permanently greyscale so they stay subordinate to Gohil's mark
 *   - no category label is printed under a logo on the home wall
 *
 * The coverage line below is for the table on /brands, where it is information
 * a buyer wants, not decoration under a logo.
 *
 * CLIENT MUST CONFIRM every dealership listed here is current before launch.
 * A lapsed dealership shown as active is the highest severity risk in the
 * build. CONTENT.md open item 1.
 */

export interface Dealer {
  slug: string
  /** Exactly as it appears on the client's banner. */
  name: string
  /** Alt text. The brand name alone, per DESIGN.md 10.6. */
  alt: string
  /**
   * What this principal actually covers. Shown on /brands only.
   * Marked unconfirmed until the client signs off.
   */
  covers: string | null
  confirmed: boolean
}

export const DEALERS: readonly Dealer[] = [
  { slug: 'tgpl', name: 'TGPL Transtech Gears', alt: 'TGPL Transtech Gears', covers: null, confirmed: false },
  { slug: 'havells', name: 'Havells', alt: 'Havells', covers: null, confirmed: false },
  { slug: 'elecon', name: 'Elecon', alt: 'Elecon', covers: null, confirmed: false },
  { slug: 'shanthi-gears', name: 'Shanthi Gears', alt: 'Shanthi Gears', covers: null, confirmed: false },
  { slug: 'radicon-pbl-siemens', name: 'Radicon PBL Siemens', alt: 'Radicon PBL Siemens', covers: null, confirmed: false },
  { slug: 'bonfiglioli', name: 'Bonfiglioli', alt: 'Bonfiglioli', covers: null, confirmed: false },
  { slug: 'abb', name: 'ABB', alt: 'ABB', covers: null, confirmed: false },
  { slug: 'sew-eurodrive', name: 'SEW-Eurodrive', alt: 'SEW-Eurodrive', covers: null, confirmed: false },
  { slug: 'rotomotive', name: 'Rotomotive', alt: 'Rotomotive', covers: null, confirmed: false },
  { slug: 'crompton-greaves', name: 'Crompton Greaves', alt: 'Crompton Greaves', covers: null, confirmed: false },
] as const

/**
 * Found on TradeIndia (Cosmo Weld MIG Wire) but absent from the banner.
 * Not shown until the client says whether it belongs on the strip.
 */
export const UNCONFIRMED_PRINCIPALS = ['Cosmo Weld'] as const
