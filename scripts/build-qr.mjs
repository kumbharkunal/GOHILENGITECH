/**
 * Generate a first party QR for the contact page.
 *
 * The client's existing QR (decoded off client-assets image 2) routes through
 * https://vqr.vc/2MQrcZnm3, a third party shortener they do not control and
 * which can expire or be re-pointed. This one encodes the destination directly.
 *
 * Their original is error correction level L. This uses M, which survives a
 * poorer camera and a printed banner better at a negligible size cost.
 *
 * Run:  node scripts/build-qr.mjs
 */

import QRCode from 'qrcode'
import { writeFile, mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const OUT = join(HERE, '..', 'public', 'brand')

const TARGETS = [
  {
    slug: 'qr-instagram',
    url: 'https://www.instagram.com/gohil_industrial_co_',
    note: 'decoded from the client QR in image 2, shortener removed',
  },
  {
    slug: 'qr-whatsapp-shailesh',
    url: 'https://wa.me/919426972346',
    note: 'direct WhatsApp to Shailesh Gohil',
  },
]

await mkdir(OUT, { recursive: true })

for (const { slug, url, note } of TARGETS) {
  const svg = await QRCode.toString(url, {
    type: 'svg',
    errorCorrectionLevel: 'M',
    margin: 2,
    color: { dark: '#0E1012', light: '#00000000' },
  })
  // Make it inherit colour so it works on mist and on ink without a second file.
  const themed = svg
    .replace(/stroke="#0E1012"/g, 'stroke="currentColor"')
    .replace('<svg ', '<svg role="img" aria-label="QR code" ')
  const path = join(OUT, `${slug}.svg`)
  await writeFile(path, themed, 'utf8')
  console.log(`  ${slug}.svg  ${(themed.length / 1024).toFixed(1)} KB  ->  ${url}`)
  console.log(`    ${note}`)
}
