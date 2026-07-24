import { Check } from 'lucide-react'
import { siteContent } from '../content/siteContent'
import { formatPrice, paymentConfig } from '../config/payment'
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

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
        <p className="text-sm text-white/50">
          課程總價值{' '}
          <span className="line-through">
            {formatPrice(paymentConfig.originalPrice)}
          </span>
        </p>
        <p className="mt-1 text-sm font-medium text-accent-soft">今日限定特惠價</p>
        <p className="font-display mt-1 text-5xl font-extrabold">
          {formatPrice(paymentConfig.salePrice)}
        </p>
        <p className="mt-3 text-sm text-white/65">{pricing.paymentType}</p>
        <p className="mt-1 text-sm text-white/55">{pricing.accessNote}</p>
      </div>

      <PurchaseCTA fullWidth className="mt-6" label={ctaLabels.offer} />
      <p className="mt-4 text-center text-xs leading-relaxed text-white/45">
        {pricing.footnote}
      </p>
    </div>
  )
}
