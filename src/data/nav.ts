/**
 * Navigation. CONTENT.md section 3.
 * Labels are plain nouns. No marketing words, no sequential numbering.
 */

export interface NavItem {
  label: string
  href: string
  /** Shown only in the mobile overlay, where there is room for a line of context. */
  hint: string
}

export const NAV: readonly NavItem[] = [
  { label: 'Products', href: '/products', hint: 'Gearboxes, conveyors, motors' },
  { label: 'Industrial', href: '/industrial', hint: 'Ex-stock drives we supply' },
  { label: 'Engitech', href: '/engitech', hint: 'Machinery we build' },
  { label: 'Brands', href: '/brands', hint: 'Authorised dealer network' },
  { label: 'Industries', href: '/industries', hint: 'Where our machines work' },
  { label: 'About', href: '/about', hint: 'The group since 1994' },
  { label: 'Contact', href: '/contact', hint: 'Call the counter' },
] as const

/** Labels reused across the action bar and the overlay, so they never drift. */
export const ACTIONS = {
  call: 'Call',
  whatsapp: 'WhatsApp',
  enquiry: 'Enquiry',
  sendEnquiry: 'Send enquiry',
  enquirySent: 'Enquiry sent',
  whatsappEnquiry: 'WhatsApp enquiry',
  menuOpen: 'Open menu',
  menuClose: 'Close menu',
  skipToContent: 'Skip to content',
} as const
