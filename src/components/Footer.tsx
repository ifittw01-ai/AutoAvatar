import { Link } from 'react-router-dom'
import { siteContent } from '../content/siteContent'
import { paymentConfig } from '../config/payment'
import { PendingBadge } from './ui/SectionHeader'

export function Footer() {
  const { brand, contact, legal } = siteContent
  const support = paymentConfig.supportEmail || contact.email

  return (
    <footer className="border-t border-line bg-paper">
      <div className="container-page grid gap-8 py-12 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="inline-flex items-center gap-2 font-display text-lg font-bold text-ink">
            {brand.logoText}
            <PendingBadge show={brand.replaceHint} />
          </p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-slate">{brand.tagline}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-ink">聯絡</p>
            <p className="mt-3 text-sm text-slate">
              {support || contact.note || '客服 Email 待設定'}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-ink">法律資訊</p>
            <ul className="mt-3 space-y-2 text-sm text-slate">
              <li>
                {legal.privacyUrl ? (
                  <a className="hover:text-ink" href={legal.privacyUrl}>
                    {legal.privacyLabel}
                  </a>
                ) : (
                  <span>{legal.privacyLabel}</span>
                )}
              </li>
              <li>
                {legal.termsUrl ? (
                  <a className="hover:text-ink" href={legal.termsUrl}>
                    {legal.termsLabel}
                  </a>
                ) : (
                  <span>{legal.termsLabel}</span>
                )}
              </li>
              <li>
                <Link className="hover:text-ink" to="/checkout">
                  前往結帳
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-slate sm:flex-row sm:items-center sm:justify-between">
          <p>{legal.copyright}</p>
          <p>課程直接購買・結帳由金流服務處理</p>
        </div>
      </div>
    </footer>
  )
}
