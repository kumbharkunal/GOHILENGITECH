import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { DEALERS } from '@/data/dealers'
import { COMPANY } from '@/data/company'
import { PageHeader } from '@/components/sections/PageHeader'
import { Reveal } from '@/components/ui/Reveal'
import { EnquiryCta } from '@/components/sections/EnquiryCta'

export function generateStaticParams() {
  return DEALERS.map((d) => ({ brand: d.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string }>
}): Promise<Metadata> {
  const { brand } = await params
  const d = DEALERS.find((x) => x.slug === brand)
  if (!d) return {}
  return {
    // These pages exist for a real search: "Bonfiglioli dealer Rajkot".
    title: `${d.name} Dealer in Rajkot`,
    description: `Gohil Industrial Co. is an authorised dealer for ${d.name}. Dhebar Road, Rajkot. Price on request.`,
  }
}

export default async function BrandPage({
  params,
}: {
  params: Promise<{ brand: string }>
}) {
  const { brand } = await params
  const d = DEALERS.find((x) => x.slug === brand)
  if (!d) notFound()

  return (
    <>
      <PageHeader
        title={`${d.name} in Rajkot`}
        lead={`${COMPANY.divisions.industrial.name} is an authorised dealer for ${d.name}. Price on request.`}
        seam="0.1"
      />

      <section data-seam="0.08" className="container-page section-y pt-4">
        <Reveal>
          <div
            className="flex max-w-[34rem] items-center gap-8 rounded-md border bg-card p-8"
            style={{ borderColor: 'var(--line-hairline)' }}
          >
            <Image
              src={`/dealers/${d.slug}.webp`}
              alt={d.alt}
              width={140}
              height={70}
              className="dealer-mark w-32 shrink-0 object-contain"
            />
            <p className="text-caption text-fg-muted">
              Authorised Dealer
              <br />
              <span className="font-mono text-data text-fg">{d.name}</span>
            </p>
          </div>

          <p className="mt-10 max-w-[62ch] text-body text-fg-muted">
            Send us the model number, the ratio and the mounting, or a photo of the nameplate
            on the unit you are replacing. We will confirm what we hold and quote against it.
          </p>

          {/*
            No stock claim, no lead time, no product list. Those are the things
            the client has not confirmed yet, and a dealer page that invents
            them is exactly the kind of page this build exists to replace.
            CONTENT.md open item 1.
          */}
          <p className="mt-5 max-w-[62ch] text-caption text-fg-muted">
            We are a dealer for {d.name}, not the manufacturer. Trademarks belong to their
            owners.
          </p>
        </Reveal>
      </section>

      <EnquiryCta
        heading={`Enquire about ${d.name}`}
        body="Model number or nameplate photo is the fastest way. If we do not hold it, we will tell you what fits instead."
        product={`${d.name} enquiry`}
        seam="0.15"
      />

      <section className="container-page pb-16">
        <Link href="/brands" className="divisions__link !mt-0">
          <ArrowLeft className="size-4" aria-hidden="true" />
          All principals
        </Link>
      </section>
    </>
  )
}
