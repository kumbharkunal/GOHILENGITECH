/**
 * Product catalogue. CONTENT.md section 6.
 *
 * Every product name is one the client or their own listings actually use.
 * Nothing is invented and nothing is renamed to sound better.
 *
 * `side` is the taxonomy the whole design rests on:
 *   'build'  Gohil Engitech manufactures it. Orange.
 *   'supply' Gohil Industrial is an authorised dealer for it. Steel.
 *
 * The split follows what they say they do, not photo colour alone. IndiaMART's
 * own About Us states they manufacture "Industrial Conveyor, Oil Filling
 * Machine, Industrial Gear Box, Cement Plant Machinery, Industrial Wire", and
 * their banner says "Authorised Dealer" for the branded drives.
 */

export type Side = 'build' | 'supply'

export interface Product {
  slug: string
  name: string
  /** File in public/products, without extension. Null where we have no photo. */
  image: string | null
  alt: string
  side: Side
  category: string
  /** Real specs only. Anything unconfirmed stays out. */
  specs?: { label: string; value: string }[]
  /** True where the side assignment still needs the client to confirm. */
  confirmSide?: boolean
}

export interface Category {
  slug: string
  name: string
  side: Side
  blurb: string
}

export const CATEGORIES: readonly Category[] = [
  {
    slug: 'helical',
    name: 'Helical Gearbox',
    side: 'supply',
    blurb: 'Inline, vertical and parallel shaft. Foot and flange mounting.',
  },
  {
    slug: 'planetary',
    name: 'Planetary Gearbox',
    side: 'supply',
    blurb: 'High torque density for low speed, high load drives.',
  },
  {
    slug: 'worm',
    name: 'Worm Gear',
    side: 'supply',
    blurb: 'Aluminium body, cast iron and universal. Compact right angle reduction.',
  },
  {
    slug: 'customized',
    name: 'Customized Gear',
    side: 'build',
    blurb: 'Built or sourced to your ratio, torque and mounting.',
  },
  {
    slug: 'gear-motors',
    name: 'Gear Motors',
    side: 'supply',
    blurb: 'Gearbox and three phase motor supplied as one unit.',
  },
  {
    slug: 'electric-motors',
    name: 'Electric Motors',
    side: 'supply',
    blurb: 'Three phase, four pole. Foot and flange mounting.',
  },
  {
    slug: 'conveyors',
    name: 'Conveyors',
    side: 'build',
    blurb: 'Stacker, belt, screw, bucket and telescopic. Built to your length.',
  },
  {
    slug: 'blowers',
    name: 'Blowers and Fans',
    side: 'supply',
    blurb: 'Centrifugal blowers and axial flow fans.',
  },
  {
    slug: 'vibro-sifters',
    name: 'Vibro Sifters',
    side: 'build',
    blurb: 'Separator machines for powder and granule screening.',
  },
  {
    slug: 'goods-lifts',
    name: 'Goods Lifts',
    side: 'build',
    blurb: 'Material lifts for godowns and multi floor units.',
  },
  {
    slug: 'welding-consumables',
    name: 'Welding Consumables',
    side: 'supply',
    blurb: 'MIG wires, flux cored wires and welding electrodes.',
  },
  {
    slug: 'oil-mill-machinery',
    name: 'Oil Mill Machinery',
    side: 'build',
    blurb: 'Machinery and spares for groundnut and cottonseed mills.',
  },
] as const

export const PRODUCTS: readonly Product[] = [
  // --- supply: the drives ---
  {
    slug: 'helical-inline-gearbox',
    name: 'Helical Gearbox',
    image: 'helical-inline-gearbox',
    alt: 'Blue inline helical gearbox with keyed output shaft and foot mounting',
    side: 'supply',
    category: 'helical',
  },
  {
    slug: 'helical-gearbox-fan-cooled',
    name: 'Helical Gear Box',
    image: 'helical-gearbox-fan-cooled',
    alt: 'Blue fan cooled helical gearbox, foot mounted',
    side: 'supply',
    category: 'helical',
  },
  {
    slug: 'helical-gear-motor',
    name: 'Helical Gear Motor',
    image: 'helical-gear-motor',
    alt: 'Blue helical gear motor with flange mounted three phase motor',
    side: 'supply',
    category: 'gear-motors',
  },
  {
    slug: 'helical-gear-motor-inline',
    name: 'Helical Vertical Gear Box',
    image: 'helical-gear-motor-inline',
    alt: 'Inline helical gear motor with three phase motor and grey barrel housing',
    side: 'supply',
    category: 'gear-motors',
  },
  {
    slug: 'planetary-gearbox',
    name: 'Planetary Gearbox',
    image: 'planetary-gearbox',
    alt: 'Planetary gearbox with splined output shaft and bolted mounting flange',
    side: 'supply',
    category: 'planetary',
  },
  {
    slug: 'worm-gearbox-cast-iron',
    name: 'Casting Worm Gear Box',
    image: 'worm-gearbox-cast-iron',
    alt: 'Cast iron worm reduction gearbox with bronze output shaft and motor flange',
    side: 'supply',
    category: 'worm',
  },
  {
    slug: 'worm-gearbox-flange-mounted',
    name: 'Worm Gear Box',
    image: 'worm-gearbox-flange-mounted',
    alt: 'Cyan worm gearbox with flange mounting face and solid output shaft',
    side: 'supply',
    category: 'worm',
  },
  {
    slug: 'worm-gearbox-foot-mounted',
    name: 'Worm Gear Box',
    image: 'worm-gearbox-foot-mounted',
    alt: 'Cyan foot mounted worm gearbox with solid output shaft',
    side: 'supply',
    category: 'worm',
  },
  {
    slug: 'worm-gearbox-aluminium',
    name: 'Worm Gear Box (Aluminium Body)',
    image: 'worm-gearbox-aluminium',
    alt: 'Compact aluminium body worm gearbox with hollow output bore',
    side: 'supply',
    category: 'worm',
  },
  {
    slug: 'worm-gear-motor-aluminium',
    name: 'Worm Gear Motor',
    image: 'worm-gear-motor-aluminium',
    alt: 'Aluminium body worm gear motor with blue three phase motor',
    side: 'supply',
    category: 'gear-motors',
  },
  {
    slug: 'worm-gearbox-universal',
    name: 'Universal Worm Gear Box',
    image: 'worm-gearbox-universal',
    alt: 'Blue universal worm gearbox with right angle output shaft',
    side: 'supply',
    category: 'worm',
  },
  {
    slug: 'bevel-helical-gearbox',
    name: 'Bevel Helical Gear Box',
    image: 'bevel-helical-gearbox',
    alt: 'Teal bevel helical gearbox unit with twin output shafts',
    side: 'supply',
    category: 'helical',
  },
  {
    slug: 'heavy-duty-gearbox',
    name: 'Industrial Gear Box',
    image: 'heavy-duty-gearbox',
    alt: 'Teal heavy duty industrial gearbox with bronze output shaft',
    side: 'supply',
    category: 'helical',
  },
  {
    slug: 'vertical-flange-motor',
    name: 'Industrial Electric Motor',
    image: 'vertical-flange-motor',
    alt: 'Blue vertical flange mounted three phase electric motor',
    side: 'supply',
    category: 'electric-motors',
    specs: [
      { label: 'Phase', value: 'Three phase' },
      { label: 'Poles', value: '4' },
      { label: 'Mounting', value: 'Foot and flange' },
    ],
  },
  {
    slug: 'centrifugal-blower',
    name: 'Centrifugal Blower',
    image: 'centrifugal-blower',
    alt: 'Blue centrifugal blower with direct coupled motor and rectangular outlet',
    side: 'supply',
    category: 'blowers',
    confirmSide: true,
  },
  {
    slug: 'axial-flow-fan',
    name: 'Axial Flow Fan',
    image: 'axial-flow-fan',
    alt: 'Pair of blue axial flow fans in cylindrical housings',
    side: 'supply',
    category: 'blowers',
    confirmSide: true,
  },
  {
    slug: 'welding-consumables',
    name: 'Welding Consumables',
    image: 'welding-consumables',
    alt: 'Spools of MIG welding wire and packs of welding electrodes',
    side: 'supply',
    category: 'welding-consumables',
  },

  // --- build: what they fabricate ---
  {
    slug: 'stacker-conveyor',
    name: 'Stacker Conveyor',
    image: 'stacker-conveyor',
    alt: 'Mobile stacker conveyor on wheels with inclined rubber belt',
    side: 'build',
    category: 'conveyors',
    // From their own Instagram post. The only product on the site with
    // published specifications, because these are the client's own figures.
    specs: [
      { label: 'Model', value: 'G3' },
      { label: 'Length', value: '33 feet' },
      { label: 'Drive', value: '2 HP' },
      { label: 'Belt width', value: '24 inch' },
    ],
  },
  {
    slug: 'belt-conveyor',
    name: 'Belt Conveyor',
    image: 'belt-conveyor',
    alt: 'Belt conveyor section with troughing idler and support frame',
    side: 'build',
    category: 'conveyors',
  },
  {
    slug: 'belt-conveyor-inclined',
    name: 'Inclined Belt Conveyor',
    image: 'belt-conveyor-inclined',
    alt: 'Inclined cleated belt conveyor with side skirts',
    side: 'build',
    category: 'conveyors',
  },
  {
    slug: 'screw-conveyor',
    name: 'Screw Conveyor',
    image: 'screw-conveyor-auger',
    alt: 'Screw conveyor auger flight',
    side: 'build',
    category: 'conveyors',
  },
  {
    slug: 'vibro-sifter',
    name: 'Vibro Shifter',
    image: 'vibro-sifter',
    alt: 'Vibro sifter separator with three orange clamped screen decks',
    side: 'build',
    category: 'vibro-sifters',
  },
  {
    slug: 'customized-gearbox-flange',
    name: 'Customized Gearbox',
    image: 'customized-gearbox-flange',
    alt: 'Custom-engineered flange-mounted industrial gearbox',
    side: 'build',
    category: 'customized',
  },
  {
    slug: 'goods-lift',
    name: 'Goods Lift',
    image: 'goods-lift',
    alt: 'Industrial goods lift platform with steel guide rails',
    side: 'build',
    category: 'goods-lifts',
  },
  {
    slug: 'oil-mill-machinery',
    name: 'Oil Mill Machinery',
    image: 'oil-mill-machinery',
    alt: 'Oil mill expeller screw press for groundnut and cottonseed',
    side: 'build',
    category: 'oil-mill-machinery',
  },
] as const

export const byCategory = (slug: string) => PRODUCTS.filter((p) => p.category === slug)
export const bySide = (side: Side) => PRODUCTS.filter((p) => p.side === side)
export const withImage = (list: readonly Product[]) => list.filter((p) => p.image)
