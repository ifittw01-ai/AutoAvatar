import { siteContent } from '../content/siteContent'
import { formatPrice, paymentConfig } from '../config/payment'
import { SectionHeader, PendingBadge } from './ui/SectionHeader'
import { OfferCard } from './OfferCard'
import { Disclaimer } from './Disclaimer'

export function CurriculumSection() {
  const { curriculum } = siteContent
  const modules = curriculum.modules.filter((m) => m.enabled)

  return (
    <section id="curriculum" className="section-pad bg-mist scroll-mt-24">
      <div className="container-page">
        <SectionHeader
          eyebrow={curriculum.eyebrow}
          title={curriculum.title}
          subtitle={curriculum.subtitle}
        />

        <div className="mt-12 space-y-4">
          {modules.map((mod) => (
            <article
              key={mod.number}
              className="grid gap-5 rounded-[1.5rem] border border-line bg-white p-6 shadow-[var(--shadow-card)] lg:grid-cols-[88px_1fr_auto] lg:items-start"
            >
              <div className="font-display text-4xl font-extrabold text-accent/80">
                {mod.number}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-xl font-bold text-ink">{mod.title}</h3>
                  <PendingBadge show={mod.replaceHint} />
                </div>
                <p className="mt-3 text-sm font-medium text-accent-deep">
                  解決：{mod.problem}
                </p>
                <p className="mt-2 text-sm font-medium text-ink">完成：{mod.result}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-slate">{mod.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {mod.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full bg-mist px-3 py-1 text-xs font-medium text-slate"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-line bg-paper px-4 py-3 text-right lg:min-w-[140px]">
                <p className="text-xs text-slate">單項價值</p>
                <p className="mt-1 font-display text-2xl font-bold text-ink">
                  {formatPrice(mod.valueAmount)}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm font-medium text-slate">{curriculum.totalValueLabel}</p>
          <p className="font-display mt-1 text-3xl font-extrabold text-ink sm:text-4xl">
            {formatPrice(curriculum.totalValueAmount)}
          </p>
          <p className="mt-2 text-sm text-slate">
            今日優惠價{' '}
            <span className="font-semibold text-accent-deep">
              {formatPrice(paymentConfig.salePrice)}
            </span>
          </p>
        </div>

        <div id="pricing" className="mt-10 scroll-mt-28">
          <OfferCard />
        </div>

        <div className="mx-auto mt-6 max-w-xl">
          <Disclaimer />
        </div>
      </div>
    </section>
  )
}
