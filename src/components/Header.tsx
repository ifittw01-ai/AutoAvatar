import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { siteContent } from '../content/siteContent'
import { scrollToSection } from '../lib/scrollToSection'
import { PurchaseCTA } from './ui/PurchaseCTA'
import { PendingBadge } from './ui/SectionHeader'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const brand = siteContent.brand

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  function handleNav(sectionId: string) {
    scrollToSection(sectionId)
    setOpen(false)
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b transition ${
        scrolled
          ? 'border-line/80 bg-paper/95 backdrop-blur-md'
          : 'border-transparent bg-paper/80 backdrop-blur-sm'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-[72px]">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-display text-lg font-bold tracking-tight text-ink"
        >
          {brand.logoText}
          <PendingBadge show={brand.replaceHint} />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="主要導覽">
          {siteContent.nav.map((item) => (
            <button
              key={item.id}
              type="button"
              className="text-sm font-medium text-slate transition hover:text-ink"
              onClick={() => handleNav(item.id)}
            >
              {item.label}
            </button>
          ))}
          <PurchaseCTA
            label={siteContent.ctaLabels.header}
            showPrice={false}
            className="min-h-11 px-5 text-sm"
          />
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? '關閉選單' : '開啟選單'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-line bg-paper lg:hidden">
          <nav className="container-page flex flex-col gap-1 py-4" aria-label="手機導覽">
            {siteContent.nav.map((item) => (
              <button
                key={item.id}
                type="button"
                className="rounded-xl px-3 py-3 text-left text-base font-medium text-ink hover:bg-mist"
                onClick={() => handleNav(item.id)}
              >
                {item.label}
              </button>
            ))}
            <PurchaseCTA
              fullWidth
              className="mt-2"
              label={siteContent.ctaLabels.header}
              showPrice={false}
              onClick={() => setOpen(false)}
            />
          </nav>
        </div>
      ) : null}
    </header>
  )
}
