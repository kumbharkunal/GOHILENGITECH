/**
 * PLACEHOLDER PRODUCT DETAIL DATA. NOT SUPPLIED BY THE CLIENT.
 *
 * ============================================================================
 * READ THIS BEFORE THE SITE GOES LIVE
 * ============================================================================
 *
 * Every specification in this file is representative of the product category,
 * not a statement about what Gohil's Group actually stocks or builds. The
 * figures are ordinary commercial ranges for each type of unit. They are here
 * so the demo has something real-looking to show, at the client's request.
 *
 * They must be replaced with the client's own figures, or removed, before
 * launch. Publishing them as fact would be the same mistake their current
 * Instagram makes, and the whole point of this build is to fix that.
 *
 * Everything here is flagged `demo: true`, surfaces on /audit under "Needs
 * client confirmation", and renders on the page behind a visible notice. This
 * is the only file in the project containing invented content. Deleting it
 * removes all of it.
 *
 * The one genuine exception is the stacker conveyor, whose Model G3, 33 feet,
 * 2 HP and 24 inch belt come from the client's own Instagram post. It is
 * marked `demo: false`.
 * ============================================================================
 */

export interface Spec {
  label: string
  value: string
}

export interface ProductDetail {
  /** Two or three plain sentences. Written the way an engineer would explain it. */
  summary: string
  specs: Spec[]
  applications: string[]
  /** false only where the figures come from the client's own material. */
  demo: boolean
}

export const PRODUCT_DETAILS: Record<string, ProductDetail> = {
  // ---------------------------------------------------------------- helical
  'helical-inline-gearbox': {
    summary:
      'Inline helical reduction with the output shaft on the same axis as the motor. Helical teeth mesh gradually rather than all at once, so it runs quieter and cooler than a spur or worm drive and suits duty that runs all day.',
    specs: [
      { label: 'Ratio range', value: 'i = 1:5 to 1:180' },
      { label: 'Power', value: '0.18 to 45 kW' },
      { label: 'Output torque', value: 'up to 12,000 Nm' },
      { label: 'Stages', value: '2 or 3' },
      { label: 'Mounting', value: 'Foot or flange' },
      { label: 'Input', value: 'IEC motor adaptor or solid shaft' },
      { label: 'Efficiency', value: 'about 96 percent per stage' },
    ],
    applications: ['Belt conveyors', 'Mixers and agitators', 'Bucket elevators', 'Screw feeders'],
    demo: true,
  },
  'helical-gearbox-fan-cooled': {
    summary:
      'Fan cooled helical unit for continuous running where the duty cycle does not give the housing time to shed heat on its own. The cowl and fan sit on the input side and add nothing to the mounting envelope.',
    specs: [
      { label: 'Ratio range', value: 'i = 1:6 to 1:200' },
      { label: 'Power', value: '0.37 to 30 kW' },
      { label: 'Output torque', value: 'up to 9,000 Nm' },
      { label: 'Cooling', value: 'Shaft mounted fan' },
      { label: 'Mounting', value: 'Foot' },
      { label: 'Duty', value: 'S1 continuous' },
    ],
    applications: ['Continuous conveyor lines', 'Extruders', 'Kiln drives'],
    demo: true,
  },
  'bevel-helical-gearbox': {
    summary:
      'Bevel helical unit for a right angle drive at higher power than a worm can carry efficiently. The bevel stage turns the corner and the helical stages do the reduction, so you keep helical efficiency in a right angle envelope.',
    specs: [
      { label: 'Ratio range', value: 'i = 1:8 to 1:200' },
      { label: 'Power', value: '1.5 to 200 kW' },
      { label: 'Output torque', value: 'up to 50,000 Nm' },
      { label: 'Configuration', value: 'Right angle, twin output shafts' },
      { label: 'Mounting', value: 'Foot or flange' },
      { label: 'Efficiency', value: 'about 94 percent overall' },
    ],
    applications: ['Cooling towers', 'Cement plant drives', 'Heavy conveyors', 'Crushers'],
    demo: true,
  },
  'heavy-duty-gearbox': {
    summary:
      'Heavy duty industrial reducer for shock loading and high radial forces. Cast housing with lifting eyes, forced or splash lubrication depending on speed, and bearings sized for overhung load rather than torque alone.',
    specs: [
      { label: 'Ratio range', value: 'i = 1:10 to 1:400' },
      { label: 'Power', value: '5.5 to 250 kW' },
      { label: 'Output torque', value: 'up to 80,000 Nm' },
      { label: 'Service factor', value: '1.5 to 2.0 typical' },
      { label: 'Lubrication', value: 'Splash or forced' },
      { label: 'Housing', value: 'Cast iron' },
    ],
    applications: ['Ball mills', 'Rotary kilns', 'Crushers', 'Bulk handling'],
    demo: true,
  },

  // -------------------------------------------------------------- gear motors
  'helical-gear-motor': {
    summary:
      'Gearbox and three phase motor supplied as one unit, so the coupling, alignment and guard are handled for you. It is usually the simpler and cheaper choice unless you already have a motor to fit.',
    specs: [
      { label: 'Ratio range', value: 'i = 1:5 to 1:150' },
      { label: 'Motor power', value: '0.18 to 22 kW' },
      { label: 'Input speed', value: '1440 rpm, four pole' },
      { label: 'Output speed', value: '9.6 to 288 rpm' },
      { label: 'Mounting', value: 'Foot or flange' },
      { label: 'Protection', value: 'IP55' },
      { label: 'Insulation', value: 'Class F' },
    ],
    applications: ['Conveyors', 'Packing lines', 'Agitators', 'Feeders'],
    demo: true,
  },
  'helical-gear-motor-inline': {
    summary:
      'Inline gear motor with the reduction stages and the motor on one axis. The longest of the gear motor formats but the narrowest, which matters when you are fitting between frames.',
    specs: [
      { label: 'Ratio range', value: 'i = 1:5 to 1:200' },
      { label: 'Motor power', value: '0.25 to 15 kW' },
      { label: 'Input speed', value: '1440 rpm, four pole' },
      { label: 'Output torque', value: 'up to 3,500 Nm' },
      { label: 'Mounting', value: 'Foot or B5 flange' },
      { label: 'Protection', value: 'IP55' },
    ],
    applications: ['Narrow conveyor frames', 'Dosing screws', 'Small mixers'],
    demo: true,
  },
  'worm-gear-motor-aluminium': {
    summary:
      'Aluminium bodied worm gear motor for light and intermittent duty. The aluminium sheds heat well at small sizes and keeps the weight down where the unit hangs off a frame rather than sitting on a base.',
    specs: [
      { label: 'Ratio range', value: 'i = 1:7.5 to 1:100' },
      { label: 'Motor power', value: '0.09 to 3 kW' },
      { label: 'Input speed', value: '1440 rpm, four pole' },
      { label: 'Output', value: 'Hollow bore or solid shaft' },
      { label: 'Body', value: 'Die cast aluminium' },
      { label: 'Duty', value: 'S1 to S3' },
    ],
    applications: ['Packing machinery', 'Small conveyors', 'Barriers and gates'],
    demo: true,
  },

  // ------------------------------------------------------------- planetary
  'planetary-gearbox': {
    summary:
      'Planetary reduction shares the load across several planet gears at once, so it carries far more torque per kilogram than an equivalent helical or worm unit. That is what you are paying for: torque in a small envelope.',
    specs: [
      { label: 'Ratio range', value: 'i = 1:3 to 1:1000' },
      { label: 'Output torque', value: '500 to 60,000 Nm' },
      { label: 'Stages', value: '1 to 3' },
      { label: 'Backlash', value: 'under 15 arcmin standard' },
      { label: 'Output', value: 'Splined or keyed shaft' },
      { label: 'Mounting', value: 'Bolted flange' },
      { label: 'Efficiency', value: 'about 97 percent per stage' },
    ],
    applications: ['Winches and hoists', 'Slew drives', 'Goods lifts', 'Track drives'],
    demo: true,
  },

  // ------------------------------------------------------------------ worm
  'worm-gearbox-cast-iron': {
    summary:
      'Cast iron worm reducer for right angle drive where the load is heavy or shocky. Cast iron takes more punishment than aluminium and holds shaft alignment better under load. At higher ratios the worm set is effectively self locking, which is useful on a lift or an incline, though it should never be relied on as a brake.',
    specs: [
      { label: 'Ratio range', value: 'i = 1:5 to 1:100' },
      { label: 'Power', value: '0.18 to 15 kW' },
      { label: 'Centre distance', value: '50 to 150 mm' },
      { label: 'Output torque', value: 'up to 2,800 Nm' },
      { label: 'Housing', value: 'Cast iron' },
      { label: 'Worm wheel', value: 'Phosphor bronze' },
      { label: 'Input', value: 'IEC motor flange or solid shaft' },
    ],
    applications: ['Inclined conveyors', 'Goods lifts', 'Oil mill drives', 'Mixers'],
    demo: true,
  },
  'worm-gearbox-flange-mounted': {
    summary:
      'Flange mounted worm unit for bolting directly to the driven machine rather than sitting on a base. Removes the coupling and the alignment job with it.',
    specs: [
      { label: 'Ratio range', value: 'i = 1:7.5 to 1:100' },
      { label: 'Power', value: '0.12 to 7.5 kW' },
      { label: 'Centre distance', value: '40 to 110 mm' },
      { label: 'Output torque', value: 'up to 1,200 Nm' },
      { label: 'Mounting', value: 'Output flange' },
    ],
    applications: ['Machine mounted drives', 'Rotary tables', 'Filling machinery'],
    demo: true,
  },
  'worm-gearbox-foot-mounted': {
    summary:
      'Foot mounted worm reducer, the general purpose format. Sits on a base plate and drives through a coupling, which makes it the easiest to service and the easiest to swap.',
    specs: [
      { label: 'Ratio range', value: 'i = 1:5 to 1:100' },
      { label: 'Power', value: '0.12 to 11 kW' },
      { label: 'Centre distance', value: '40 to 135 mm' },
      { label: 'Output torque', value: 'up to 1,800 Nm' },
      { label: 'Mounting', value: 'Foot' },
    ],
    applications: ['General conveying', 'Agitators', 'Feed screws'],
    demo: true,
  },
  'worm-gearbox-aluminium': {
    summary:
      'Compact aluminium worm gearbox with a hollow output bore, so it slides straight onto the driven shaft. The lightest option in the range and the simplest to fit in a tight space.',
    specs: [
      { label: 'Ratio range', value: 'i = 1:7.5 to 1:100' },
      { label: 'Power', value: '0.09 to 4 kW' },
      { label: 'Centre distance', value: '30 to 90 mm' },
      { label: 'Output', value: 'Hollow bore, 14 to 35 mm' },
      { label: 'Body', value: 'Die cast aluminium' },
    ],
    applications: ['Packing lines', 'Light conveyors', 'Dosing equipment'],
    demo: true,
  },
  'worm-gearbox-universal': {
    summary:
      'Universal worm gearbox with machined mounting faces on several sides, so one unit covers foot, flange and shaft mounted fitting. Useful when the mounting is not settled at the order stage.',
    specs: [
      { label: 'Ratio range', value: 'i = 1:5 to 1:100' },
      { label: 'Power', value: '0.18 to 15 kW' },
      { label: 'Centre distance', value: '50 to 150 mm' },
      { label: 'Mounting', value: 'Foot, flange or shaft mounted' },
      { label: 'Output', value: 'Solid or hollow' },
    ],
    applications: ['Retrofits', 'Mixed plant', 'Replacement drives'],
    demo: true,
  },

  // ------------------------------------------------------------ customized
  'customized-gearbox-flange': {
    summary:
      'Heavy duty unit with a large bolted output hub, built or sourced to the ratio, torque and mounting you need. This is the category for drives that do not come off a standard chart.',
    specs: [
      { label: 'Ratio', value: 'To specification' },
      { label: 'Output torque', value: 'To specification' },
      { label: 'Output', value: 'Bolted hub or shrink disc' },
      { label: 'Housing', value: 'Cast or fabricated' },
      { label: 'Lead time', value: 'Quoted per job' },
    ],
    applications: ['Replacement for an obsolete unit', 'Non standard ratios', 'Special mountings'],
    demo: true,
  },

  // -------------------------------------------------------- electric motors
  'vertical-flange-motor': {
    summary:
      'Three phase induction motor mounted vertically on a flange, shaft up. Standard four pole at 1440 rpm, which is the usual starting point for gearbox drives.',
    specs: [
      { label: 'Power', value: '0.37 to 30 kW' },
      { label: 'Poles', value: '4' },
      { label: 'Speed', value: '1440 rpm at 50 Hz' },
      { label: 'Supply', value: '415 V, 3 phase, 50 Hz' },
      { label: 'Mounting', value: 'B5 flange, vertical' },
      { label: 'Protection', value: 'IP55' },
      { label: 'Insulation', value: 'Class F, Class B rise' },
    ],
    applications: ['Vertical pumps', 'Agitators', 'Mixer drives'],
    demo: true,
  },

  // ------------------------------------------------------------- conveyors
  'stacker-conveyor': {
    // The only entry with the client's own figures. From their Instagram post.
    summary:
      'Mobile stacker for loading, unloading and stacking heavy goods. The boom raises to build a stack and the whole unit wheels to the next bay. Built for sack handling in godowns, and available for all customised order.',
    specs: [
      { label: 'Model', value: 'G3' },
      { label: 'Length', value: '33 feet' },
      { label: 'Drive', value: '2 HP' },
      { label: 'Belt width', value: '24 inch' },
    ],
    applications: ['Godown sack stacking', 'Truck loading', 'Oil mill intake'],
    demo: false,
  },
  'belt-conveyor': {
    summary:
      'Belt conveyor built to your length and duty. Troughing idlers carry bagged and loose material over distance with very little spillage, and the frame is fabricated here rather than bought in.',
    specs: [
      { label: 'Belt width', value: '400 to 1200 mm' },
      { label: 'Length', value: 'To specification' },
      { label: 'Speed', value: '0.3 to 2.5 m per second' },
      { label: 'Capacity', value: 'up to 250 tonnes per hour' },
      { label: 'Drive', value: '0.75 to 15 kW gear motor' },
      { label: 'Frame', value: 'Fabricated mild steel' },
    ],
    applications: ['Bagged goods', 'Bulk material transfer', 'Plant intake and dispatch'],
    demo: true,
  },
  'belt-conveyor-inclined': {
    summary:
      'Inclined cleated belt for lifting material up a grade that a plain belt would let slip back. Cleat height and pitch are set by the material and the angle, and the skirts keep it on the belt.',
    specs: [
      { label: 'Belt width', value: '400 to 800 mm' },
      { label: 'Incline', value: 'up to 35 degrees' },
      { label: 'Cleat height', value: '25 to 60 mm' },
      { label: 'Speed', value: '0.3 to 1.5 m per second' },
      { label: 'Drive', value: '1.5 to 7.5 kW gear motor' },
    ],
    applications: ['Elevating to hoppers', 'Mezzanine feed', 'Granule handling'],
    demo: true,
  },
  'screw-conveyor': {
    summary:
      'Screw conveyor for powders, cake and granules. Fully enclosed, so it contains dust, and it will take a steeper angle than a belt. The flight pitch is set by the material and the throughput.',
    specs: [
      { label: 'Screw diameter', value: '150 to 500 mm' },
      { label: 'Length', value: 'To specification' },
      { label: 'Capacity', value: 'up to 60 cubic metres per hour' },
      { label: 'Incline', value: 'up to 45 degrees' },
      { label: 'Drive', value: '1.5 to 15 kW gear motor' },
      { label: 'Flight', value: 'Mild steel or stainless' },
    ],
    applications: ['Oil cake handling', 'Cement and fly ash', 'Grain and flour', 'Chemical powders'],
    demo: true,
  },

  // ----------------------------------------------------------- vibro sifter
  'vibro-sifter': {
    summary:
      'Vibro sifter separates material by particle size on a vibrating screen deck. Stacking decks gives you several size fractions in one pass. Standard on powder and granule lines in food, pharma and chemical plants.',
    specs: [
      { label: 'Screen diameter', value: '600 to 1500 mm' },
      { label: 'Decks', value: '1 to 4' },
      { label: 'Capacity', value: 'up to 3 tonnes per hour' },
      { label: 'Motor', value: '0.5 to 2 HP vibratory' },
      { label: 'Contact parts', value: 'SS 304 or SS 316' },
      { label: 'Mesh', value: '10 to 200 as required' },
    ],
    applications: ['Pharmaceutical powders', 'Spices and flour', 'Chemical granules', 'Foundry sand'],
    demo: true,
  },

  // ---------------------------------------------------------------- blowers
  'centrifugal-blower': {
    summary:
      'Centrifugal blower for moving air against resistance. The spiral volute converts the impeller speed into pressure, which is what you need for ducted systems rather than open air movement.',
    specs: [
      { label: 'Airflow', value: '500 to 20,000 cubic metres per hour' },
      { label: 'Static pressure', value: 'up to 500 mmWC' },
      { label: 'Impeller', value: 'Backward or forward curved' },
      { label: 'Drive', value: 'Direct coupled or belt' },
      { label: 'Motor', value: '0.5 to 30 HP' },
      { label: 'Outlet', value: 'Rectangular, rotatable' },
    ],
    applications: ['Dust extraction', 'Ducted ventilation', 'Drying systems', 'Ceramic plant'],
    demo: true,
  },
  'axial-flow-fan': {
    summary:
      'Axial fan moves large volumes of air at low pressure, straight through the housing rather than turning it. The right choice for general ventilation, and the wrong one for pushing through long ducting.',
    specs: [
      { label: 'Airflow', value: '1,000 to 60,000 cubic metres per hour' },
      { label: 'Static pressure', value: 'up to 50 mmWC' },
      { label: 'Diameter', value: '300 to 1200 mm' },
      { label: 'Blades', value: 'Cast aluminium, adjustable pitch' },
      { label: 'Motor', value: '0.25 to 15 HP' },
      { label: 'Mounting', value: 'Flanged duct or wall' },
    ],
    applications: ['Shed and godown ventilation', 'Cooling towers', 'Exhaust systems'],
    demo: true,
  },
}

export const detailFor = (slug: string): ProductDetail | undefined => PRODUCT_DETAILS[slug]
