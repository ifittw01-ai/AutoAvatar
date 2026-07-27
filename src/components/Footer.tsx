import { siteContent } from '../content/siteContent'

export function Footer() {
  const { legal } = siteContent

  return (
    <footer className="border-t border-line bg-paper">
      <div className="container-page flex flex-col gap-2 py-5 text-xs text-slate sm:flex-row sm:items-center sm:justify-between">
        <p>{legal.copyright}</p>
        <p>有實體課程 安全可靠</p>
      </div>
    </footer>
  )
}
