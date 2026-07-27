import { publicAsset } from '../lib/publicAsset'
import { siteContent } from '../content/siteContent'

export function HeroVisual() {
  const { hero } = siteContent
  const ig = hero.instagram

  return (
    <div className="relative mx-auto w-full max-w-[540px]">
      <div className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(circle_at_30%_20%,rgba(15,156,148,0.22),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(201,149,42,0.16),transparent_50%)] blur-2xl" />

      <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0b1424] shadow-[var(--shadow-soft)]">
        <div className="border-b border-white/10 bg-white/[0.04] px-4 py-3">
          <p className="text-sm font-semibold text-white">AI 分身作品展示</p>
          <p className="mt-0.5 text-xs text-white/55">同一角色・多種服裝與場景</p>
        </div>

        <div className="relative bg-white">
          <img
            src={publicAsset(ig.galleryImage)}
            alt={hero.visualAlt}
            className="block h-auto w-full object-cover"
            width={1080}
            height={1080}
          />
        </div>
      </div>

      <div className="absolute -left-2 top-16 hidden rounded-2xl border border-line bg-white/95 px-3 py-2 shadow-[var(--shadow-card)] sm:block">
        <p className="text-[11px] font-semibold tracking-wide text-accent-deep">同一分身</p>
        <p className="text-xs text-slate">外型穩定一致</p>
      </div>

      <div className="absolute -right-1 bottom-20 hidden rounded-2xl border border-line bg-white/95 px-3 py-2 shadow-[var(--shadow-card)] sm:block">
        <p className="text-[11px] font-semibold tracking-wide text-accent-deep">換裝換場</p>
        <p className="text-xs text-slate">多種場景應用</p>
      </div>
    </div>
  )
}
