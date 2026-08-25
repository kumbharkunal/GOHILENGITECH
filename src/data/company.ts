/**
 * Every company fact on the site. Nothing here is invented.
 * Sources and open questions are tracked in CONTENT.md sections 1 and 2.
 *
 * Rule: no em-dash or en-dash in any string that reaches the page.
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

export interface Person {
  name: string
  /** Digits only, country code first. For wa.me and tel: links. */
  phone: string
  /** How the number is written on the page, matching the client's own artwork. */
  phoneDisplay: string
  primary: boolean
}

export const PEOPLE: readonly Person[] = [
  {
    name: 'Shailesh Gohil',
    phone: '919426972346',
    phoneDisplay: '+91 94269 72346',
    primary: true,
  },
  {
    name: 'Kishan Gohil',
    phone: '916354303742',
    phoneDisplay: '+91 63543 03742',
    primary: false,
  },
] as const

/**
 * Roles are deliberately absent. IndiaMART lists Shailesh as Proprietor and
 * Kishan as CEO; TradeIndia lists Kishan as Proprietor. The two directories
 * contradict each other, so the site shows names and numbers only until the
 * client confirms. CONTENT.md 2, open item 4.
 */

export const COMPANY = {
  group: "Gohil's Group",

  divisions: {
    industrial: {
      slug: 'industrial',
      name: 'Gohil Industrial Co.',
      tagline: 'Joining To Automation',
      role: 'supply',
      /** One line, plain, for the divisions block. */
      summary:
        'Authorised dealer for ten drive and motor brands. Helical, planetary, worm and cycloidal gearboxes, gear motors and three phase motors.',
      verb: 'We supply.',
    },
    engitech: {
      slug: 'engitech',
      name: 'Gohil Engitech Co.',
      tagline: 'Engineering to your needs',
      role: 'build',
      summary:
        'Conveyors, blowers, goods lifts and oil mill machinery, fabricated to your drawing or ours. Stacker conveyors up to 33 feet.',
      verb: 'We build.',
    },
  },

  established: 1994,
  email: 'gohil.industrial.co@gmail.com',
  instagram: 'https://www.instagram.com/gohil_industrial_co_',
  facebook: 'https://www.facebook.com/gohilindustrialco.1994/',

  /** Public on TradeIndia. Client to approve before it goes in the footer. */
  gstin: '24ACLPG4254B1Z2',

  address: {
    line1: 'Shop No. 5-6, V. D. Parekh Andh Mahila Vikas Gruh',
    line2: 'Opp. BJP Office, Nr. Water Tank, Dhebar Road (South)',
    city: 'Rajkot',
    pin: '360 002',
    state: 'Gujarat',
    country: 'India',
    /** One line, for tight spaces. */
    short: 'Dhebar Road (South), Rajkot 360 002',
    /** Reconciled from three partial renderings. CONTENT.md 2.1. */
    mapsQuery:
      'Gohil Industrial Co, Dhebar Road South, Opp BJP Office, Rajkot, Gujarat 360002',
  },

  hours: {
    /** From TradeIndia. Opening and closing times are still unknown. */
    days: 'Monday to Sunday',
    times: null as string | null,
  },
} as const

export const PRIMARY_PERSON = PEOPLE[0]
