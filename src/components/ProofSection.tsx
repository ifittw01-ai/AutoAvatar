import { siteContent } from '../content/siteContent'
import { PurchaseCTA } from './ui/PurchaseCTA'
import { SectionHeader } from './ui/SectionHeader'

export function ProofSection() {
  const { proof, ctaLabels } = siteContent
  if (!proof.enabled) return null

  return (
    <section className="section-pad bg-paper" aria-labelledby="proof-title">
      <div className="container-page">
        <SectionHeader
          eyebrow={proof.eyebrow}
          title={proof.title}
          subtitle={proof.subtitle}
          pending={proof.replaceHint}
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {proof.highlights.map((item) => (
            <article
              key={item.label}
              className="rounded-[1.5rem] border border-line bg-white p-6 shadow-[var(--shadow-card)]"
            >
              <p className="text-sm font-medium text-slate">{item.label}</p>
              <p className="font-display mt-3 text-3xl font-bold text-ink">{item.value}</p>
              <p className="mt-2 text-sm text-slate">{item.note}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 max-w-3xl space-y-3 text-slate">
          {proof.body.map((paragraph) => (
            <p key={paragraph} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-8">
          <PurchaseCTA label={ctaLabels.proof} />
        </div>
      </div>
    </section>
  )
}
