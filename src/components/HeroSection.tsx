import { Check } from 'lucide-react'
import { siteContent } from '../content/siteContent'
import { PurchaseCTA } from './ui/PurchaseCTA'
import { HeroVisual } from './HeroVisual'

export function HeroSection() {
  const { hero, ctaLabels } = siteContent

  return (
    <section id="about" className="relative overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(15,156,148,0.18),transparent_45%),radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.05),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:56px_56px]" />

      <div className="container-page relative grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-24">
        <div className="fade-up">
          <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold tracking-[0.06em] text-accent-soft uppercase">
            {hero.eyebrow}
          </span>

          <h1 className="font-display mt-5 text-4xl leading-[1.12] font-extrabold text-balance sm:text-5xl lg:text-[3.25rem]">
            {hero.title}
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            {hero.subtitle}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <PurchaseCTA label={ctaLabels.hero} />
            <p className="text-sm text-white/55">{hero.secondaryNote}</p>
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {hero.trustPoints.map((point) => (
              <li
                key={point}
                className="flex items-start gap-2.5 rounded-2xl border border-white/10 bg-white/5 px-3.5 py-3 text-sm text-white/85"
              >
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent-soft">
                  <Check size={14} aria-hidden />
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="fade-up" style={{ animationDelay: '120ms' }}>
          <HeroVisual />
        </div>
      </div>
    </section>
  )
}
