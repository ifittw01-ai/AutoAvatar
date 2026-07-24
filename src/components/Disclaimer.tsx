import { siteContent } from '../content/siteContent'

export function Disclaimer() {
  return (
    <p className="rounded-2xl border border-line bg-mist/70 px-5 py-4 text-xs leading-relaxed text-slate sm:text-sm">
      {siteContent.disclaimer.text}
    </p>
  )
}
