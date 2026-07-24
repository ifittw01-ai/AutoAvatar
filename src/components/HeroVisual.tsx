import { publicAsset } from '../lib/publicAsset'

export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[540px]">
      <div className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(circle_at_30%_20%,rgba(15,156,148,0.22),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(201,149,42,0.16),transparent_50%)] blur-2xl" />

      <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-[#132038] via-[#0f1a2d] to-[#0b1424] p-4 shadow-[var(--shadow-soft)] sm:p-5">
        <img
          src={publicAsset('images/hero-workspace.svg')}
          alt="AI 分身內容工作台示意：角色卡、服裝場景切換、短影音與發布介面"
          className="float-soft h-auto w-full"
          width={520}
          height={560}
        />
      </div>

      <div className="absolute -left-2 top-10 hidden rounded-2xl border border-line bg-white/95 px-3 py-2 shadow-[var(--shadow-card)] sm:block">
        <p className="text-[11px] font-semibold tracking-wide text-accent-deep">角色一致</p>
        <p className="text-xs text-slate">外型穩定可重複生成</p>
      </div>

      <div className="absolute -right-1 bottom-16 hidden rounded-2xl border border-line bg-white/95 px-3 py-2 shadow-[var(--shadow-card)] sm:block">
        <p className="text-[11px] font-semibold tracking-wide text-accent-deep">換裝換場</p>
        <p className="text-xs text-slate">同一分身，多種場景</p>
      </div>
    </div>
  )
}
