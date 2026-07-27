import { Check } from 'lucide-react'
import { siteContent } from '../content/siteContent'
import { PurchaseCTA } from './ui/PurchaseCTA'
import { PendingBadge } from './ui/SectionHeader'

export function OfferCard() {
  const { pricing, ctaLabels } = siteContent

  return (
    <div className="mx-auto max-w-xl rounded-[1.75rem] border border-ink/10 bg-ink p-7 text-white shadow-[var(--shadow-soft)] sm:p-9">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-sm font-semibold tracking-wide text-accent-soft uppercase">購買方案</p>
        <PendingBadge />
      </div>

      <h3 className="font-display mt-3 text-2xl font-bold sm:text-3xl">
        {pricing.courseName}
      </h3>

      <ul className="mt-6 space-y-3">
        {pricing.includes.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-white/80">
            <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent-soft">
              <Check size={13} aria-hidden />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
        <p className="font-display text-center text-2xl leading-snug font-extrabold text-white sm:text-3xl md:text-4xl">
          {pricing.accessNote}
        </p>
      </div>

      <PurchaseCTA fullWidth className="mt-6" label={ctaLabels.offer} showPrice={false} />
    </div>
  )
}
