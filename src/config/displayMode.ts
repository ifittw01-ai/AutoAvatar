/**
 * 顯示模式：僅控制「待替換」小標記是否顯示，不再隱藏主要銷售區塊。
 */
export type DisplayMode = 'development' | 'production'

const raw = import.meta.env.VITE_DISPLAY_MODE?.toLowerCase()

export const displayMode: DisplayMode =
  raw === 'production' ? 'production' : 'development'

/** 是否顯示小型「待替換」標記（正式也可顯示，避免誤當最終資料） */
export const showReplaceHints =
  displayMode === 'development' ||
  import.meta.env.VITE_SHOW_REPLACE_HINTS === 'true'

/** @deprecated 保留相容；主要區塊一律顯示 */
export const isDevDisplay = displayMode === 'development'
export const isProdDisplay = displayMode === 'production'

export function showPendingContent(_isConfirmed?: boolean): boolean {
  return true
}
