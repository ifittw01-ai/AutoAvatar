import { siteContent } from '../content/siteContent'
import { PurchaseCTA } from './ui/PurchaseCTA'
import { PendingBadge } from './ui/SectionHeader'

export function AnnouncementBar() {
  const { announcement, ctaLabels } = siteContent
  if (!announcement.enabled) return null

  return (
    <div className="border-b border-white/10 bg-ink text-white">
      <div className="container-page flex flex-col items-start justify-between gap-3 py-2.5 sm:flex-row sm:items-center">
        <p className="flex flex-wrap items-center gap-2 text-sm leading-relaxed">
          <span>{announcement.text}</span>
          <PendingBadge show={announcement.replaceHint} />
        </p>
        <PurchaseCTA
          label={ctaLabels.announcement}
          className="min-h-10 px-4 text-sm"
        />
      </div>
    </div>
  )
}
