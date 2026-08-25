/**
 * Provenance registry. Every factual claim the site makes, and where it came
 * from. Rendered at /audit, which is noindex.
 *
 * Why this exists: this is a pitch build for a real business with a real
 * reputation, and the brief's hard rule is that nothing is fabricated. A rule
 * kept by discipline alone is a rule that eventually slips. This makes it
 * mechanical, gives the client one link to sign off rather than a document,
 * and demonstrates that nothing on the site was invented.
 *
 * The site-facing copy stays clean. No markers appear in the UI.
 */

export type Source =
  | 'image-1'
  | 'image-2'
  | 'image-3'
  | 'instagram'
  | 'indiamart'
  | 'tradeindia'
  | 'inferred'
  | 'client-todo'

export type Status = 'verified' | 'confirm' | 'inferred' | 'excluded'

export interface Claim {
  claim: string
  where: string
  source: Source[]
  status: Status
  note?: string
}

export const SOURCE_LABEL: Record<Source, string> = {
  'image-1': 'Client banner (image 1)',
  'image-2': 'Client orange panel (image 2)',
  'image-3': 'Client light panel (image 3)',
  instagram: 'Their Instagram',
  indiamart: 'IndiaMART listing',
  tradeindia: 'TradeIndia listing',
  inferred: 'Inference',
  'client-todo': 'Awaiting client',
}

export const STATUS_LABEL: Record<Status, string> = {
  verified: 'Verified',
  confirm: 'Needs client confirmation',
  inferred: 'Inference, phrased as suitability',
  excluded: 'Deliberately not published',
}

export const CLAIMS: readonly Claim[] = [
  // --- identity ---
  { claim: "Umbrella brand is Gohil's Group", where: 'Global', source: ['image-1', 'image-2'], status: 'verified' },
  { claim: 'Gohil Industrial Co., tagline Joining To Automation', where: 'Global', source: ['image-2', 'instagram'], status: 'verified' },
  { claim: 'Gohil Engitech Co., tagline Engineering to your needs', where: 'Global', source: ['image-2'], status: 'verified' },
  { claim: 'Established 1994', where: 'Home, About, Footer', source: ['indiamart', 'tradeindia'], status: 'verified', note: 'The only number published anywhere on the site.' },
  { claim: 'Sole proprietorship', where: 'About', source: ['indiamart'], status: 'verified' },
  { claim: 'Manufacturer, distributor and supplier', where: 'About', source: ['indiamart', 'tradeindia'], status: 'verified', note: 'They manufacture machinery and are an authorised dealer for the branded drives. The two are never blurred.' },
  { claim: 'Dispatch by road across India', where: 'Home, About', source: ['indiamart'], status: 'verified' },
  { claim: 'Payment by cash, cheque, DD or online', where: 'About', source: ['indiamart'], status: 'verified' },

  // --- contact ---
  { claim: 'Shailesh Gohil, +91 94269 72346', where: 'Global', source: ['image-1', 'image-3', 'instagram'], status: 'verified' },
  { claim: 'Kishan Gohil, +91 63543 03742', where: 'Global', source: ['image-1', 'image-3', 'instagram'], status: 'verified' },
  { claim: 'Email gohil.industrial.co@gmail.com', where: 'Global', source: ['image-2'], status: 'verified' },
  { claim: 'Instagram gohil_industrial_co_', where: 'Contact', source: ['image-2'], status: 'verified', note: 'Decoded from the QR code in image 2, which routed through a vqr.vc shortener. Our QR points at the destination directly.' },
  { claim: 'Shop No. 5-6, V. D. Parekh Andh Mahila Vikas Gruh, Opp. BJP Office, Nr. Water Tank, Dhebar Road (South), Rajkot 360 002', where: 'Global', source: ['image-1', 'image-3', 'tradeindia'], status: 'confirm', note: 'One address, three partial renderings. TradeIndia carries both landmarks in one string, which proves they are the same place. Only Shop No. 5 versus 5-6 is genuinely open.' },
  { claim: 'Working days Monday to Sunday', where: 'About, Contact, Footer', source: ['tradeindia'], status: 'verified' },
  { claim: 'Opening and closing times', where: 'Not shown', source: ['client-todo'], status: 'confirm', note: 'Unknown. LocalBusiness openingHours stays out of the schema until answered.' },
  { claim: 'Role titles, proprietor versus CEO', where: 'Not shown', source: ['indiamart', 'tradeindia'], status: 'confirm', note: 'IndiaMART says Shailesh is proprietor and Kishan is CEO. TradeIndia says Kishan is proprietor. The site shows names and numbers only.' },
  { claim: 'GSTIN 24ACLPG4254B1Z2', where: 'Not shown, behind a flag', source: ['tradeindia'], status: 'confirm', note: 'Public on TradeIndia. Recommended for the footer once approved: Indian B2B buyers read a visible GSTIN as a trust signal.' },

  // --- dealer network ---
  { claim: 'Authorised dealer for TGPL, Havells, Elecon, Shanthi Gears, Radicon PBL Siemens, Bonfiglioli, ABB, SEW-Eurodrive, Rotomotive, Crompton Greaves', where: 'Home, Brands, Industrial', source: ['image-1'], status: 'confirm', note: 'HIGHEST PRIORITY. A lapsed dealership shown as active is the most serious risk in this build. Logos are cropped from the client banner only, never downloaded from the brands.' },
  { claim: 'Cosmo Weld as an eleventh principal', where: 'Not shown', source: ['tradeindia'], status: 'confirm', note: 'Appears on TradeIndia as Cosmo Weld MIG Wire but not on the banner. Held back until confirmed.' },
  { claim: 'Section labelled exactly "Authorised Dealer"', where: 'Home, Brands', source: ['image-1'], status: 'verified', note: "The client's own wording. Never upgraded to Partners or Trusted by." },

  // --- products ---
  { claim: 'Ten item capability list, verbatim including capitalisation', where: 'Home', source: ['image-3'], status: 'verified' },
  { claim: 'Four gear families: Helical, Planetary, Worm, Customized', where: 'Home, Products', source: ['image-1'], status: 'verified' },
  { claim: 'Stacker Conveyor, Model G3, 33 feet, 2 HP, 24 inch belt', where: 'Home, Engitech', source: ['instagram'], status: 'verified', note: "The client's own published figures. The only product on the site with specifications." },
  { claim: 'Product photography, 21 cut-outs', where: 'Throughout', source: ['image-1', 'image-3'], status: 'verified', note: 'Cut from the client artwork. Largest is 222x150, so nothing is enlarged past native size.' },
  { claim: 'Ratio span 1:5 to 1:100', where: 'Home, Industrial', source: ['inferred'], status: 'inferred', note: 'Normal commercial span for these families, consistent with their listings. What they actually hold is unconfirmed.' },
  { claim: 'Blowers and axial fans are supplied rather than built', where: 'Products', source: ['inferred'], status: 'confirm', note: 'Assigned to the supply side on the balance of evidence. Client to confirm which they manufacture.' },
  { claim: 'No prices anywhere', where: 'Global', source: ['indiamart', 'tradeindia'], status: 'excluded', note: 'Their own listings price the same cycloidal gearbox at Rs 5,000 and Rs 25,000. Price on request throughout.' },

  {
    claim: 'Product specifications on the detail pages',
    where: '/products/[category]/[product]',
    source: ['client-todo'],
    status: 'confirm',
    note: "PLACEHOLDER, and the only invented content on the site. Typical commercial figures for each category, added at the client's request so the demo has something to show. Not a statement of what Gohil stocks or builds. All of it lives in src/data/product-details.ts, is flagged demo:true, and renders behind a visible notice on the page. Replace with their own figures or delete the file before launch. The stacker conveyor is the exception: its Model G3, 33 feet, 2 HP and 24 inch belt come from their own Instagram post.",
  },

  // --- industries ---
  { claim: 'Groundnut and cottonseed oil mills', where: 'Home, Industries', source: ['instagram', 'image-3'], status: 'verified', note: 'Their own posts show the stacker conveyor handling jute sacks in a godown, and they list oil mill machinery and spares.' },
  { claim: 'Pharmaceutical and food processing', where: 'Industries', source: ['image-3'], status: 'verified', note: 'They list Pharma Equipment themselves. Labelled "In our range", not as existing customers.' },
  { claim: 'Cement and bulk handling', where: 'Industries', source: ['indiamart'], status: 'verified', note: 'Cement plant machinery appears in their own About Us text.' },
  { claim: 'Ceramics (Morbi), foundries, Jamnagar engineering', where: 'Industries', source: ['inferred'], status: 'inferred', note: 'Market context only. Labelled "Suited to" on the page, never as customers.' },

  // --- deliberately excluded ---
  { claim: 'Annual turnover, Rs 4 Crores', where: 'Not shown', source: ['tradeindia'], status: 'excluded', note: 'Publicly self-declared, but publishing it works directly against the goal of looking like an established supplier.' },
  { claim: 'Employee count', where: 'Not shown', source: ['indiamart', 'tradeindia'], status: 'excluded', note: 'IndiaMART says 11 to 25, TradeIndia says 8. The sources contradict, so no headcount is published.' },
  { claim: 'IndiaMART seller rating', where: 'Not shown', source: ['indiamart'], status: 'excluded', note: 'Never surfaced, embedded or linked.' },
  { claim: 'ISO, CE or any certification', where: 'Not shown', source: ['client-todo'], status: 'excluded', note: 'No certification appears in any source. None is claimed anywhere on the site.' },
  { claim: 'AI generated product images from their Instagram', where: 'Not used', source: ['instagram'], status: 'excluded', note: 'All three are computer generated illustrations, and one carries the logo of another company, "GC Grain Conveyors Inc.". Worth telling the client so they can take it down.' },
  { claim: 'Stock photography of any kind', where: 'Not used', source: ['client-todo'], status: 'excluded', note: 'Five photo slots are held open for real client photography. CONTENT.md 10.1.' },
] as const

export const BY_STATUS = (s: Status) => CLAIMS.filter((c) => c.status === s)
