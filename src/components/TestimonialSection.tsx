import { Star } from 'lucide-react'
import { siteContent } from '../content/siteContent'
import { SectionHeader, PendingBadge } from './ui/SectionHeader'
import { Disclaimer } from './Disclaimer'

export function TestimonialSection() {
  const list = siteContent.testimonials

  return (
    <section className="section-pad bg-paper">
      <div className="container-page">
        <SectionHeader
          eyebrow="學員見證"
          title="學員們最近的成果回饋"
          subtitle="以下為可替換占位見證，正式上線前請換成已授權的真實學員內容。"
          pending
        />

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {list.map((item) => (
            <article
              key={`${item.name}-${item.headline}`}
              className="flex flex-col rounded-[1.5rem] border border-line bg-white p-6 shadow-[var(--shadow-card)]"
            >
              <div className="mb-4 flex items-center gap-3">
                {item.photo ? (
                  <img
                    src={item.photo}
                    alt={`${item.name} 的照片`}
                    className="h-14 w-14 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-mist font-display text-lg font-bold text-accent-deep">
                    {item.name.replace(/【.*?】/g, '').trim().slice(0, 1) || '學'}
                  </div>
                )}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-display font-bold text-ink">{item.name}</p>
                    <PendingBadge show={item.replaceHint} />
                  </div>
                  <p className="text-sm text-slate">{item.role}</p>
                </div>
              </div>

              <div className="mb-2 flex gap-0.5 text-gold" aria-label="五星評價">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>

              <h3 className="font-display text-lg font-bold text-ink">{item.headline}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/90">
                「{item.quote}」
              </p>

              <div className="mt-4 space-y-1 border-t border-line pt-4 text-xs text-slate">
                <p>原本：{item.problem}</p>
                <p className="text-accent-deep">之後：{item.result}</p>
                <p>成果：{item.resultMetric}</p>
                <p className="flex flex-wrap items-center gap-2">
                  <span>{item.socialHandle}</span>
                  {item.showVerifiedBadge ? (
                    <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-semibold text-accent-deep">
                      已驗證
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate/70">驗證標籤位置</span>
                  )}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8">
          <Disclaimer />
        </div>
      </div>
    </section>
  )
}
