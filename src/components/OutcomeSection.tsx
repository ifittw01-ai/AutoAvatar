import { Sparkles } from 'lucide-react'
import { siteContent } from '../content/siteContent'
import { SectionHeader } from './ui/SectionHeader'

export function OutcomeSection() {
  const { outcomes } = siteContent

  return (
    <section id="outcomes" className="section-pad bg-paper scroll-mt-24">
      <div className="container-page">
        <SectionHeader
          eyebrow={outcomes.eyebrow}
          title={outcomes.title}
          subtitle={outcomes.subtitle}
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {outcomes.items.map((item, index) => (
            <article
              key={item.title}
              className="group rounded-[1.5rem] border border-line bg-white p-6 shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:border-accent/40"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent-deep">
                  <Sparkles size={18} aria-hidden />
                </span>
                <span className="font-display text-sm font-semibold text-slate/60">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="font-display text-lg font-bold text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
