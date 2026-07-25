import { ExternalLink, Instagram } from 'lucide-react'
import { siteContent } from '../content/siteContent'

export function HeroVisual() {
  const ig = siteContent.hero.instagram

  return (
    <div className="relative mx-auto w-full max-w-[540px]">
      <div className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(circle_at_30%_20%,rgba(15,156,148,0.22),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(201,149,42,0.16),transparent_50%)] blur-2xl" />

      <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0b1424] shadow-[var(--shadow-soft)]">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-white/[0.04] px-4 py-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white">
              <Instagram size={18} aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">{ig.title}</p>
              <p className="truncate text-xs text-white/55">實際作品與分身內容展示</p>
            </div>
          </div>
          <a
            href={ig.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 text-xs font-semibold text-white transition hover:border-accent/50 hover:bg-accent/15"
          >
            開啟 IG
            <ExternalLink size={13} aria-hidden />
          </a>
        </div>

        <div className="relative bg-white">
          <iframe
            title={`${ig.handle} Instagram 首頁`}
            src={ig.embedUrl}
            className="block h-[520px] w-full border-0 bg-white sm:h-[560px]"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="encrypted-media; clipboard-write"
          />

          {/* Instagram 若阻擋嵌入，仍保留底部可點連結 */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-4 pb-4 pt-10 pointer-events-none sm:hidden">
            <a
              href={ig.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-white text-sm font-semibold text-ink"
            >
              在 Instagram 查看 @{ig.handle}
            </a>
          </div>
        </div>
      </div>

      <div className="absolute -left-2 top-16 hidden rounded-2xl border border-line bg-white/95 px-3 py-2 shadow-[var(--shadow-card)] sm:block">
        <p className="text-[11px] font-semibold tracking-wide text-accent-deep">真實帳號</p>
        <p className="text-xs text-slate">@{ig.handle}</p>
      </div>

      <div className="absolute -right-1 bottom-20 hidden rounded-2xl border border-line bg-white/95 px-3 py-2 shadow-[var(--shadow-card)] sm:block">
        <p className="text-[11px] font-semibold tracking-wide text-accent-deep">作品展示</p>
        <p className="text-xs text-slate">AI 分身內容實例</p>
      </div>
    </div>
  )
}
