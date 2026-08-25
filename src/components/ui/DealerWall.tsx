import Image from 'next/image'
import Link from 'next/link'
import { DEALERS } from '@/data/dealers'

/**
 * The logo wall, shared by the home page and /industrial.
 *
 * Logo only. Permanently greyscale. Each mark links to that principal's page,
 * so the wall is navigation rather than decoration and behaves identically on
 * touch and pointer. DESIGN.md 4.8.
 */
export function DealerWall({ className }: { className?: string }) {
  return (
    <ul className={`dealer-wall ${className ?? ''}`}>
      {DEALERS.map((d) => (
        <li key={d.slug}>
          <Link
            href={`/brands/${d.slug}`}
            className="dealer-wall__cell"
            aria-label={`${d.name}, authorised dealer`}
          >
            <Image
              src={`/dealers/${d.slug}.webp`}
              alt={d.alt}
              width={140}
              height={70}
              sizes="(max-width: 768px) 28vw, 140px"
              className="dealer-mark h-auto w-full object-contain"
            />
          </Link>
        </li>
      ))}
    </ul>
  )
}
