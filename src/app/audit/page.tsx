import type { Metadata } from 'next'
import { CLAIMS, BY_STATUS, SOURCE_LABEL, STATUS_LABEL, type Status } from '@/data/claims'

export const metadata: Metadata = {
  title: 'Content audit',
  robots: { index: false, follow: false },
}

const ORDER: Status[] = ['confirm', 'inferred', 'verified', 'excluded']

const TONE: Record<Status, string> = {
  confirm: 'var(--color-orange)',
  inferred: 'var(--color-machine-blue)',
  verified: 'var(--color-graphite)',
  excluded: 'var(--color-steel)',
}

export default function AuditPage() {
  return (
    // A dense table page. The seam stays well out of the way.
    <section data-seam="0.06" className="container-page section-y">
      <p className="marker">INTERNAL. NOT INDEXED.</p>
      <h1 className="mt-3 text-h1">Content audit</h1>
      <p className="mt-5 max-w-[68ch] text-body-l text-fg-muted">
        Every factual claim on this site and where it came from. Nothing here was invented. The
        items at the top are the ones we need Shailesh-bhai or Kishan-bhai to confirm before
        launch.
      </p>

      <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
        {ORDER.map((s) => (
          <p key={s} className="font-mono text-data">
            <span style={{ color: TONE[s] }}>{BY_STATUS(s).length}</span>{' '}
            <span className="text-fg-muted">{STATUS_LABEL[s].toLowerCase()}</span>
          </p>
        ))}
        <p className="font-mono text-data text-fg-muted">{CLAIMS.length} total</p>
      </div>

      {ORDER.map((status) => (
        <section key={status} className="mt-14">
          <h2 className="text-h2" style={{ color: TONE[status] }}>
            {STATUS_LABEL[status]}
          </h2>
          <ul className="mt-6 list-none p-0">
            {BY_STATUS(status).map((c) => (
              <li
                key={c.claim}
                className="grid gap-2 border-b py-5 last:border-0 md:grid-cols-[minmax(0,34ch)_minmax(0,16ch)_1fr] md:gap-8"
                style={{ borderColor: 'var(--line-hairline)' }}
              >
                <p className="text-body text-fg">{c.claim}</p>
                <p className="font-mono text-micro text-fg-muted">
                  {c.where}
                  <br />
                  {c.source.map((s) => SOURCE_LABEL[s]).join(', ')}
                </p>
                <p className="max-w-[62ch] text-caption text-fg-muted">{c.note ?? ''}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </section>
  )
}
