/**
 * Project constants. DESIGN.md section 5.
 *
 * Never inline an arbitrary z-index or the seam angle anywhere else.
 */

/** Z-index scale. DESIGN.md 5.6 */
export const Z = {
  seam: 0,
  content: 10,
  header: 40,

  menu: 50,
  modal: 60,
} as const

/**
 * The seam angle, measured from client-assets image 2.
 * Linear fit across 38 sampled rows, slope dy/dx = 0.784.
 * DESIGN.md 5.2
 */
export const SEAM_ANGLE_DEG = 38.1

/** Breakpoints in px. DESIGN.md 9.1 */
export const BP = {
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
} as const

/** Motion durations in seconds. DESIGN.md 7.2 */
export const DUR = {
  load: 1.2,
  loadMobile: 0.8,
  header: 0.3,
  reveal: 0.6,
  revealMobile: 0.4,
  hover: 0.25,
  menu: 0.5,
  burger: 0.4,
  counter: 1.0,
} as const

/** Stagger values in seconds. DESIGN.md 7.2 */
export const STAGGER = {
  reveal: 0.06,
  revealMobile: 0.04,
  menuItem: 0.05,
  logo: 0.04,
} as const

/** Scroll distance after which the header goes solid. DESIGN.md 4.9 */
export const HEADER_SOLID_AT = 80
