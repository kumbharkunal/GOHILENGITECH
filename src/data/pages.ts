/**
 * Inner page copy. CONTENT.md sections 4, 6 and 8.
 *
 * Titles and descriptions match the SEO table in CONTENT.md 8.1 so the two do
 * not drift. Local search targets are in CONTENT.md 8.2.
 */

export const PAGES = {
  industrial: {
    title: 'Gohil Industrial Co., Authorised Gearbox Dealer, Rajkot',
    description:
      'Ex-stock helical, planetary, worm and cycloidal drives from ten authorised principals.',
    h1: 'We supply the drives.',
    lead: 'Authorised dealer for ten drive and motor brands. Helical, planetary, worm and cycloidal gearboxes, gear motors and three phase motors. Price on request.',
    marker: 'i = 1:5 to 1:100',
    note: 'Ask for the ratio, the input speed and the mounting, and we will tell you what we hold.',
  },

  engitech: {
    title: 'Gohil Engitech Co., Custom Machinery, Rajkot',
    description:
      'Stacker conveyors, screw conveyors, blowers, goods lifts and oil mill machinery, built to your specification.',
    h1: 'We build the machines.',
    lead: 'Conveyors, blowers, goods lifts and oil mill machinery, fabricated at the shop on Dhebar Road to your drawing or ours.',
    marker: '24 in x 33 ft',
    note: 'Send a drawing, a photo of the line, or just the duty. We will come back with a specification.',
  },

  products: {
    title: 'Industrial Gearboxes, Conveyors and Motors, Rajkot',
    description:
      'Helical, planetary, worm and cycloidal gearboxes, gear motors, conveyors, blowers and vibro sifters. Price on request.',
    h1: 'Everything we carry.',
    lead: 'Twelve categories across the two firms. Orange is what we build, steel is what we supply.',
  },

  brands: {
    title: "Authorised Dealer Network, Gohil's Group Rajkot",
    description:
      'Bonfiglioli, SEW-Eurodrive, ABB, Elecon, Shanthi Gears, TGPL, Radicon PBL Siemens, Havells, Rotomotive and Crompton Greaves.',
    h1: 'Authorised Dealer',
    lead: 'Ten principals, held or ordered to your specification. We are a dealer for these brands, not the manufacturer.',
  },

  industries: {
    title: 'Industries We Serve, Rajkot and Saurashtra',
    description:
      'Oil mills, pharmaceutical and food processing, cement and bulk handling, ceramics, foundries and engineering.',
    h1: 'Where our machines work',
    lead: 'Some of this is evidenced by work we have done. Some is what the equipment suits. The difference is marked on each entry, because it matters.',
  },

  about: {
    title: "About Gohil's Group, Trading in Rajkot Since 1994",
    description:
      'Sole proprietorship trading on Dhebar Road since 1994. Manufacturer, distributor and supplier of industrial drives and machinery.',
    h1: 'Two firms, one counter.',
    lead: 'Gohil Industrial Co. and Gohil Engitech Co. have traded from the same shop on Dhebar Road since 1994.',
    marker: 'est. 1994',
  },
} as const

/**
 * Facts on /about. Every line is verifiable from the client's own listings.
 * No headcount and no turnover: the two directories contradict each other on
 * employees, and a turnover figure would work against the site's job.
 * CONTENT.md 2.4.
 */
export const ABOUT_FACTS: readonly { label: string; value: string }[] = [
  { label: 'Established', value: '1994' },
  { label: 'Legal status', value: 'Sole proprietorship' },
  { label: 'Nature of business', value: 'Manufacturer, distributor and supplier' },
  { label: 'Location', value: 'Dhebar Road (South), Rajkot' },
  { label: 'Dispatch', value: 'By road, across India' },
  { label: 'Payment', value: 'Cash, cheque, DD or online transfer' },
  { label: 'Working days', value: 'Monday to Sunday' },
] as const
