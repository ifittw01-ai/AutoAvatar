import { siteContent } from '../content/siteContent'
import { formatPrice, paymentConfig } from '../config/payment'
import { PurchaseCTA } from './ui/PurchaseCTA'

export function FinalCTA() {
  const { finalCta, ctaLabels } = siteContent

  return (
    <section className="section-pad relative overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(15,156,148,0.22),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(201,149,42,0.12),transparent_35%)]" />
      <div className="container-page relative">
        <p className="text-sm font-semibold tracking-[0.08em] text-accent-soft uppercase">
          {finalCta.eyebrow}
        </p>
        <h2 className="font-display mt-3 max-w-3xl text-3xl leading-tight font-bold text-balance sm:text-4xl lg:text-5xl">
          {finalCta.title}
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
          {finalCta.subtitle}
        </p>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          {finalCta.bullets.map((item) => (
            <li
              key={item}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85"
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <PurchaseCTA label={ctaLabels.final} />
          <p className="text-sm text-white/55">
            今日優惠價 {formatPrice(paymentConfig.salePrice)}・
            {paymentConfig.paymentType}
          </p>
        </div>
      </div>
    </section>
  )
}
