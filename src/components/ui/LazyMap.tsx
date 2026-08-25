'use client'

/**
 * The shop on a map, without the map costing anything on load.
 *
 * A Google Maps embed pulls well over a megabyte of script, tiles and fonts
 * from three third party origins. Dropping a bare iframe into the contact page
 * would put all of that on the critical path of a page whose actual job is a
 * phone number.
 *
 * So the iframe does not exist until it is nearly on screen. An
 * IntersectionObserver with a generous rootMargin mounts it a screen early,
 * which is far enough ahead that it has painted by the time it is scrolled to,
 * and `loading="lazy"` is kept as a second line for the same reason. Until then
 * the slot holds a styled placeholder at the identical aspect ratio, so nothing
 * reflows when the real thing arrives.
 *
 * No API key: the /maps?q=&output=embed form is the keyless embed, which is
 * what lets this ship from a static export with no runtime.
 */

import { useEffect, useRef, useState } from 'react'
import { MapPin } from 'lucide-react'
import { COMPANY } from '@/data/company'

export function LazyMap({ className }: { className?: string }) {
  const slot = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const el = slot.current
    if (!el) return

    // No observer support, or a reader who has already scrolled past: just
    // mount it rather than leaving a permanent placeholder.
    if (typeof IntersectionObserver === 'undefined') {
      setShow(true)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true)
          io.disconnect()
        }
      },
      { rootMargin: '600px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const src = `https://www.google.com/maps?q=${encodeURIComponent(
    COMPANY.address.mapsQuery,
  )}&output=embed`

  return (
    <div
      ref={slot}
      className={`map-slot ${className ?? ''}`}
      style={{ borderColor: 'var(--line-hairline)' }}
    >
      {show ? (
        <iframe
          src={src}
          title={`Map showing ${COMPANY.divisions.industrial.name}, ${COMPANY.address.short}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="map-slot__placeholder">
          <MapPin className="size-6 text-fg-muted" aria-hidden="true" />
          <span className="text-caption text-fg-muted">{COMPANY.address.short}</span>
        </div>
      )}
    </div>
  )
}
