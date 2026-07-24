import type { ReactNode } from 'react'
import { showReplaceHints } from '../../config/displayMode'

interface PendingBadgeProps {
  show?: boolean
  children?: ReactNode
}

/** 小型「待替換」標記，不破壞銷售頁視覺 */
export function PendingBadge({
  show = true,
  children = '待替換',
}: PendingBadgeProps) {
  if (!show || !showReplaceHints) return null
  return (
    <span className="inline-flex items-center rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 text-[10px] font-medium tracking-wide text-gold/90">
      {children}
    </span>
  )
}

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  light?: boolean
  pending?: boolean
  align?: 'left' | 'center'
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  light = false,
  pending = false,
  align = 'left',
}: SectionHeaderProps) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <div
        className={`mb-3 flex flex-wrap items-center gap-2 ${align === 'center' ? 'justify-center' : ''}`}
      >
        {eyebrow ? (
          <p
            className={`text-sm font-semibold tracking-[0.08em] uppercase ${
              light ? 'text-accent-soft' : 'text-accent-deep'
            }`}
          >
            {eyebrow}
          </p>
        ) : null}
        <PendingBadge show={pending} />
      </div>
      <h2
        className={`font-display text-3xl leading-tight font-bold text-balance sm:text-4xl ${
          light ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${light ? 'text-white/75' : 'text-slate'}`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}
