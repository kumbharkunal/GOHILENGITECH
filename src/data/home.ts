/**
 * Home page copy. CONTENT.md section 4.
 * No string is hardcoded in JSX. DESIGN.md 8, do not rule 16.
 */

export const HOME = {
  hero: {
    /**
     * Two sentences, one per line. The break is the sentence boundary, not a
     * decorative split: the two clauses are the two divisions, which is the
     * whole idea of the site.
     */
    headline: ['We stock the drives.', 'We build the machines.'],
    subline:
      'Authorised dealer for Bonfiglioli, SEW-Eurodrive and ABB. Custom conveyors and oil mill machinery, built in Rajkot since 1994.',
  },

  divisions: { heading: 'Two firms, one counter.' },

  capabilities: {
    heading: 'What we handle.',
    /** Verbatim from image 3, including the client's own capitalisation. */
    items: [
      'Goods Lift',
      'Gear Boxes',
      'Gear Motors',
      'Electric Motors',
      'Mig Wires',
      'Flux Cored Wires',
      'Welding Electrodes',
      'Pharma Equipment',
      'All Type of Conveyors',
      'Oil Mill Machinery & Spares',
    ],
  },

  build: {
    marker: '24 in x 33 ft',
    heading: 'Built in Rajkot.',
    body: 'Fabricated at the shop on Dhebar Road, to your drawing or ours.',
  },

  supply: {
    marker: 'i = 1:5 to 1:100',
    heading: 'Ex-stock drives.',
    body: 'Four gearbox families, plus gear motors and three phase motors. Price on request.',
  },

  dealers: {
    /** The client's own wording. Never upgraded to Partners or Trusted by. */
    heading: 'Authorised Dealer',
  },

  since: {
    marker: 'est. 1994',
    heading: 'Since 1994.',
    body: 'Gohil Industrial Co. has traded on Dhebar Road since 1994. Sole proprietorship. Manufacturer, distributor and supplier. Dispatch by road across India. Payment by cash, cheque, DD or online transfer.',
  },

  contact: {
    heading: 'Call the counter.',
    body: 'Both numbers reach the shop. WhatsApp is usually fastest.',
    link: 'Contact details',
  },
} as const
