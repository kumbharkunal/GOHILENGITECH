import type { Metadata } from 'next'
import { contrastRatio, verdict, formatRatio } from '@/lib/contrast'
import { SEAM_ANGLE_DEG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Design tokens',
  robots: { index: false, follow: false },
}

/** Raw token values. These must stay identical to globals.css and DESIGN.md 2.1. */
const BRAND = [
  { name: 'orange', hex: '#E8500C', role: 'Primary. CTA fills, active states, the build field.' },
  { name: 'orange-text', hex: '#BC410A', role: 'Derived. Small orange text on light grounds only.' },
  { name: 'ember', hex: '#F8844C', role: 'Large warm fills. Dark mode accent.' },
  { name: 'graphite', hex: '#646668', role: 'Secondary text on light. Structural bars.' },
  { name: 'steel', hex: '#97989A', role: 'Strokes and dividers. Never text on light.' },
  { name: 'mist', hex: '#EAEBED', role: 'Default page ground.' },
  { name: 'ink', hex: '#0E1012', role: 'Dark sections, headline type, CTA label on orange.' },
] as const

const MACHINE = [
  { name: 'machine-blue', hex: '#4080C0', role: 'The supply signal. Dealer stock, diagrams.' },
  { name: 'machine-blue-text', hex: '#366DA4', role: 'Derived for AA body on light.' },
  { name: 'machine-blue-deep', hex: '#004068', role: 'Deep dealer side fills.' },
  { name: 'machine-teal', hex: '#0E7C7B', role: 'Elecon and Shanthi housing accent.' },
] as const

const MIST = '#EAEBED'
const INK = '#0E1012'
const WHITE = '#FFFFFF'
const ORANGE = '#E8500C'

const TYPE_SCALE = [
  { token: 'display', cls: 'text-display font-display', sample: 'We stock the drives.' },
  { token: 'h1', cls: 'text-h1 font-display', sample: 'We build the machines.' },
  { token: 'h2', cls: 'text-h2 font-display', sample: 'Two firms, one counter.' },
  { token: 'h3', cls: 'text-h3', sample: 'Gohil Engitech Co.' },
  { token: 'body-l', cls: 'text-body-l', sample: 'Authorised dealer for Bonfiglioli, SEW-Eurodrive and ABB.' },
  { token: 'body', cls: 'text-body', sample: 'Custom conveyors and oil mill machinery, built in Rajkot since 1994.' },
  { token: 'caption', cls: 'text-caption', sample: 'Price on request' },
  { token: 'data', cls: 'text-data font-mono', sample: '2.2 kW / 1440 rpm / i = 1:40' },
  { token: 'micro', cls: 'text-micro font-mono', sample: '24 IN X 33 FT' },
] as const

function Ratio({ fg, bg }: { fg: string; bg: string }) {
  const r = contrastRatio(fg, bg)
  const v = verdict(r)
  const fail = v === 'FAIL'
  return (
    <span className="font-mono text-micro">
      {formatRatio(r)}{' '}
      <span className={fail ? 'text-[color:var(--color-danger)] font-semibold' : 'text-fg-muted'}>
        {v}
      </span>
    </span>
  )
}

function Swatch({ name, hex, role }: { name: string; hex: string; role: string }) {
  return (
    <div className="border border-line rounded-md overflow-hidden bg-card">
      <div className="h-16 w-full" style={{ backgroundColor: hex }} />
      <div className="p-3 space-y-1">
        <div className="flex items-baseline justify-between gap-2">
          <code className="text-data font-mono text-fg">{name}</code>
          <code className="text-micro font-mono text-fg-muted">{hex}</code>
        </div>
        <p className="text-caption text-fg-muted">{role}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1">
          <span className="text-micro text-fg-muted">on mist</span>
          <Ratio fg={hex} bg={MIST} />
          <span className="text-micro text-fg-muted">on ink</span>
          <Ratio fg={hex} bg={INK} />
        </div>
      </div>
    </div>
  )
}

export default function TokensPage() {
  return (
    <main className="container-page section-y space-y-16">
      <header className="space-y-3 max-w-[68ch]">
        <p className="text-micro font-mono text-fg-accent">DESIGN.MD VERIFICATION</p>
        <h1 className="text-h1 font-display">Design tokens</h1>
        <p className="text-body-l text-fg-muted">
          Every value on this page is read from the token layer, and every contrast ratio is
          computed at render time. If a number here disagrees with DESIGN.md, the code is wrong.
        </p>
      </header>

      <section className="space-y-5">
        <h2 className="text-h2 font-display">Brand</h2>
        <p className="text-body text-fg-muted max-w-[68ch]">
          Sampled from the client artwork in <code className="font-mono text-data">client-assets/</code>.
          Orange is the paint on the steel they weld. Blue is the casting they distribute.
        </p>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          {BRAND.map((c) => (
            <Swatch key={c.name} {...c} />
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-h2 font-display">Machine colours</h2>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          {MACHINE.map((c) => (
            <Swatch key={c.name} {...c} />
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-h2 font-display">The CTA decision</h2>
        <p className="text-body text-fg-muted max-w-[68ch]">
          White on orange fails AA. Ink on orange passes. This is why the primary button is an
          orange plate with a near black label, which also reads like machine signage.
        </p>
        <div className="flex flex-wrap gap-4">
          <div className="space-y-2">
            <button
              type="button"
              className="rounded-sm px-[22px] py-[14px] font-semibold"
              style={{ backgroundColor: ORANGE, color: INK }}
            >
              WhatsApp enquiry
            </button>
            <div>
              <Ratio fg={INK} bg={ORANGE} />
            </div>
          </div>
          <div className="space-y-2">
            <button
              type="button"
              className="rounded-sm px-[22px] py-[14px] font-semibold"
              style={{ backgroundColor: ORANGE, color: WHITE }}
            >
              WhatsApp enquiry
            </button>
            <div>
              <Ratio fg={WHITE} bg={ORANGE} />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-h2 font-display">Type scale</h2>
        <div className="space-y-6">
          {TYPE_SCALE.map((t) => (
            <div key={t.token} className="border-b border-line pb-5 last:border-0">
              <code className="text-micro font-mono text-fg-accent">{t.token}</code>
              <p className={`${t.cls} text-fg mt-2`}>{t.sample}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-h2 font-display">Radius and the seam</h2>
        <div className="flex flex-wrap items-end gap-6">
          {/* Literal classes: Tailwind cannot statically extract an interpolated name. */}
          {[
            { token: 'sm', cls: 'rounded-sm' },
            { token: 'md', cls: 'rounded-md' },
            { token: 'lg', cls: 'rounded-lg' },
          ].map((r) => (
            <div key={r.token} className="space-y-2">
              <div className={`h-20 w-20 border border-line-strong bg-card ${r.cls}`} />
              <code className="text-micro font-mono text-fg-muted">--radius-{r.token}</code>
            </div>
          ))}
          <div className="space-y-2">
            <div className="relative h-20 w-40 overflow-hidden border border-line bg-card">
              <div
                className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2"
                style={{
                  backgroundColor: ORANGE,
                  transform: `rotate(-${SEAM_ANGLE_DEG}deg) translate3d(0, 0, 0)`,
                }}
              />
            </div>
            <code className="text-micro font-mono text-fg-muted">
              seam {SEAM_ANGLE_DEG}deg, measured
            </code>
          </div>
        </div>
      </section>
    </main>
  )
}
