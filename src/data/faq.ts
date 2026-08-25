/**
 * Category FAQs. CONTENT.md section 8.3.
 *
 * These feed FAQPage schema and are picked up by AI answer engines, so the
 * honesty bar is the same as everywhere else: answers explain how the
 * equipment works and what we need from the buyer. None of them claims a
 * stock level, a lead time or a capability the client has not confirmed,
 * because those are the answers we do not have yet.
 *
 * Questions are the ones a buyer actually types, not marketing prompts.
 */

export interface Faq {
  q: string
  a: string
}

export const FAQ_BY_CATEGORY: Record<string, readonly Faq[]> = {
  worm: [
    {
      q: 'What ratio worm gearbox do I need for a 1.5 kW conveyor?',
      a: 'Work back from the belt speed. Take the drum diameter, the speed you want in metres per minute, and that gives you the output rpm you need. Divide your motor speed, usually 1440 rpm on a four pole, by that figure and you have the ratio. Send us those numbers and we will confirm the frame size with you.',
    },
    {
      q: 'What is the difference between an aluminium body and a cast iron worm gearbox?',
      a: 'Aluminium bodies are lighter and run cooler in smaller sizes, which suits compact and intermittent duty. Cast iron takes more shock load and more torque, which is why it is the usual choice on heavier continuous drives. Tell us the duty and we will say which one fits.',
    },
    {
      q: 'Can a worm gearbox be back driven?',
      a: 'Often not, and that is frequently the point. At higher ratios a worm set is effectively self locking, which is useful on a lift or an inclined conveyor where you do not want the load running back. Do not rely on it as a brake for safety though. If the application needs holding, specify a brake motor.',
    },
  ],

  helical: [
    {
      q: 'Helical or worm gearbox, which should I use?',
      a: 'Helical is more efficient and runs cooler, so it suits continuous duty and higher power. Worm gives you a compact right angle drive and a high ratio in one stage, which is often simpler to fit. If the drive runs all day, helical usually costs less to run.',
    },
    {
      q: 'Do you supply Bonfiglioli gearboxes in Rajkot?',
      a: 'Yes. We are an authorised dealer for Bonfiglioli along with nine other drive and motor principals. Send us the model number or the duty and we will quote.',
    },
    {
      q: 'What is the difference between inline and parallel shaft helical?',
      a: 'Inline puts the output shaft on the same axis as the motor, which is the compact option. Parallel shaft offsets it, which usually makes the unit shorter overall and easier to mount close to the driven machine. Both come in foot and flange mounting.',
    },
  ],

  planetary: [
    {
      q: 'When is a planetary gearbox worth the extra cost?',
      a: 'When you need high torque in a small envelope. The load is shared across several planet gears, so a planetary unit carries more torque per kilogram than an equivalent helical or worm box. That matters on winches, lifts and slew drives where space is tight.',
    },
  ],

  conveyors: [
    {
      q: 'What size stacker conveyor do I need for a godown?',
      a: 'It comes down to stack height and throw. Our own stacker runs 33 feet on a 2 HP drive with a 24 inch belt, which handles a normal sack stack. Tell us the height you need to reach and the bag weight, and we will size it.',
    },
    {
      q: 'Can you build a conveyor to my drawing?',
      a: 'Yes. That is what Gohil Engitech Co. does. Send a drawing if you have one. If you do not, a photo of the line and the duty is usually enough for us to come back with a specification.',
    },
    {
      q: 'Belt or screw conveyor for bulk material?',
      a: 'Belt suits bagged goods and free flowing material over longer distances and gentler inclines. Screw suits powders, cake and granules, handles steeper angles, and encloses the material. The material and the angle usually decide it for you.',
    },
  ],

  'vibro-sifters': [
    {
      q: 'What does a vibro sifter do?',
      a: 'It separates material by particle size using a vibrating screen deck. Stacking decks gives you several size fractions in one pass. It is standard on powder and granule lines in food, pharma and chemical plants.',
    },
  ],

  'electric-motors': [
    {
      q: 'What speed does a four pole motor run at?',
      a: 'About 1440 rpm at 50 Hz once you allow for slip. Two pole runs near 2880, six pole near 960. Four pole is the usual starting point for gearbox drives, which is why our ratio figures assume it.',
    },
  ],

  'welding-consumables': [
    {
      q: 'What MIG wire size should I use?',
      a: 'Thinner wire for thin sheet and out of position work, heavier wire for thicker plate and higher deposition. We stock 1.2 mm copper coated wire on 15 kg rolls, which covers most general fabrication. Tell us the plate thickness and the process.',
    },
  ],

  'oil-mill-machinery': [
    {
      q: 'Do you supply oil mill spares as well as machinery?',
      a: 'Yes. Oil mill machinery and spares are part of the range. Tell us the machine and the part, and a photo if you have one, and we will identify it.',
    },
  ],
}

/** Questions that apply site wide, used on /contact and the enquiry page. */
export const GENERAL_FAQ: readonly Faq[] = [
  {
    q: 'Do you dispatch outside Gujarat?',
    a: 'Yes. Dispatch is by road, across India.',
  },
  {
    q: 'Why are there no prices on the site?',
    a: 'Industrial pricing moves with quantity, ratio, mounting and lead time. A published number would be stale or wrong for your duty within weeks. Send the specification and you will get a real quote.',
  },
  {
    q: 'How do I reach you fastest?',
    a: 'WhatsApp. Both numbers reach the shop, and a message with the duty on it usually gets a quicker answer than a call, because we can check stock before replying.',
  },
] as const
