import { Reveal } from '@/components/ui/Reveal'

/**
 * Shared header for inner pages.
 *
 * One h1 per page, marker optional and only where it carries a real unit.
 * The seam value is passed through so each page still tells the seam which
 * side of the business it belongs to.
 */
export function PageHeader({
  marker,
  title,
  lead,
  seam,
  children,
}: {
  marker?: string
  title: string
  lead?: string
  seam: string
  children?: React.ReactNode
}) {
  return (
    <section data-seam={seam} className="container-page pb-4 pt-12 md:pt-20">
      <Reveal>
        {marker ? <p className="marker">{marker}</p> : null}
        <h1 className={marker ? 'mt-3 text-h1' : 'text-h1'}>{title}</h1>
        {lead ? <p className="mt-5 max-w-[58ch] text-body-l text-fg-muted">{lead}</p> : null}
        {children}
      </Reveal>
    </section>
  )
}
