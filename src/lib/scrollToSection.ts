/** HashRouter 下避免使用 href="#id"（會破壞路由）。改以滾動定位。 */
export function scrollToSection(sectionId: string): void {
  const id = sectionId.replace(/^#/, '')
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
