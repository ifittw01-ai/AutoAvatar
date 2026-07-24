import { siteContent } from '../content/siteContent'
import { SectionHeader } from './ui/SectionHeader'

export function FounderStorySection() {
  const { story } = siteContent
  if (!story.enabled) return null

  return (
    <section className="section-pad bg-mist" aria-labelledby="story-title">
      <div className="container-page grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div>
          <SectionHeader
            eyebrow={story.eyebrow}
            title={story.title}
            pending={story.replaceHint}
          />
          <div className="mt-8 space-y-4">
            {story.paragraphs.map((p) => (
              <p key={p} className="rounded-2xl border border-line bg-white/70 px-5 py-4 leading-relaxed text-slate">
                {p}
              </p>
            ))}
          </div>
        </div>

        <aside className="rounded-[1.75rem] border border-line bg-ink p-7 text-white shadow-[var(--shadow-soft)]">
          <p className="text-sm font-semibold tracking-wide text-accent-soft uppercase">
            這堂課想幫的人
          </p>
          <ul className="mt-5 space-y-4">
            {story.points.map((point) => (
              <li key={point} className="flex gap-3 text-[15px] leading-relaxed text-white/85">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  )
}
