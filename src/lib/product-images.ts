import { readdirSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Which product photographs actually have a small variant on disk.
 *
 * Why this exists. A chip in a grid asks for `<slug>@sm.webp`, which the
 * encoder in scripts/optimize-images.py produces alongside the full width
 * file. Drop a photograph into public/products without running `npm run
 * images` and the small file is simply absent, at which point:
 *
 *   - in dev the request falls past the static handler into the router,
 *     which tries to read "welding-consumables@sm.webp" as a [category]
 *     param and throws a generateStaticParams error that says nothing
 *     about the real problem;
 *   - in the export it ships as a broken image.
 *
 * That failure has now been hit once per photograph added. So rather than
 * trusting the encoder to have been run, look: read the directory once at
 * module load and fall back to the full width file when the small one is
 * missing. A heavier image is a performance regression; a broken one is a
 * bug, and this trades the second for the first until the encoder is run.
 *
 * The readdir happens once per build, not per render, because a module body
 * in a static export is evaluated once.
 *
 * Server components only. There is no `server-only` guard because the package
 * is not a dependency and this repo's deploy install is fragile enough already;
 * the bare `node:fs` import below fails the build just as loudly if a client
 * component ever reaches for this.
 */

function readVariants(): ReadonlySet<string> {
  try {
    return new Set(
      readdirSync(join(process.cwd(), 'public', 'products')).filter((f) =>
        f.endsWith('@sm.webp'),
      ),
    )
  } catch {
    // No directory at all. Every lookup then reports "no small variant",
    // which degrades to full width images rather than failing the build.
    return new Set()
  }
}

const SMALL_VARIANTS = readVariants()

/**
 * The src a chip should use for this image slug at the given size.
 * `wide` callers always take the full width file.
 */
export function productImageSrc(image: string, wide: boolean): string {
  if (wide) return `/products/${image}.webp`
  return SMALL_VARIANTS.has(`${image}@sm.webp`)
    ? `/products/${image}@sm.webp`
    : `/products/${image}.webp`
}
