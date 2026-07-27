/**
 * 從 URL 獲取推廣代碼（與 AI-PT 相同邏輯）。
 * 另相容 HashRouter：#/?ref=xxx
 */
export function getReferralCode(): string | null {
  const fromSearch = new URLSearchParams(window.location.search).get('ref')
  if (fromSearch) return fromSearch

  const hash = window.location.hash
  const qIndex = hash.indexOf('?')
  if (qIndex >= 0) {
    return new URLSearchParams(hash.slice(qIndex + 1)).get('ref')
  }
  return null
}
