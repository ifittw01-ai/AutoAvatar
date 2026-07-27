import { Ban } from 'lucide-react'
import { siteContent } from '../content/siteContent'
import { PurchaseCTA } from './ui/PurchaseCTA'

export function ObjectionSection() {
  const { objections, ctaLabels } = siteContent

  return (
    <section className="section-pad bg-ink text-white" aria-labelledby="objection-title">
      <div className="container-page">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.08em] text-accent-soft uppercase">
            {objections.eyebrow}
          </p>
          <h2
            id="objection-title"
            className="font-display mt-3 text-3xl leading-tight font-bold text-balance sm:text-4xl lg:text-5xl"
          >
            {objections.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/70 sm:text-lg">
            {objections.lead}
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {objections.items.map((item) => (
            <article
              key={item.title}
              className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 transition hover:border-accent/40 hover:bg-white/[0.07]"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent-soft">
                <Ban size={18} aria-hidden />
              </div>
              <h3 className="font-display text-xl font-bold">
                <span className="mark">{item.title}</span>
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/70">{item.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 max-w-3xl rounded-[1.75rem] border border-accent/30 bg-accent/10 p-7 sm:p-8">
          <p className="font-display text-2xl font-bold text-balance sm:text-3xl">
            {objections.turn}
          </p>
          <p className="mt-4 text-base leading-relaxed text-white/75">{objections.closing}</p>
          <div className="mt-6">
            <PurchaseCTA label={ctaLabels.objection} showPrice={false} />
          </div>
        </div>
      </div>
    </section>
  )
}
