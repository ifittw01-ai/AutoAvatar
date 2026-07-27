import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CircleAlert } from 'lucide-react'
import { paymentConfig } from '../config/payment'
import { siteContent } from '../content/siteContent'

export function PaymentCancelledPage() {
  const support = paymentConfig.supportEmail || '【客服 Email 待設定】'

  useEffect(() => {
    document.title = `付款未完成｜${paymentConfig.productName}`
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-mist">
      <div className="container-page flex min-h-screen items-center justify-center py-12">
        <div className="w-full max-w-xl rounded-[1.75rem] border border-line bg-white p-8 text-center shadow-[var(--shadow-soft)] sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 text-gold">
            <CircleAlert size={34} />
          </div>
          <h1 className="font-display mt-5 text-3xl font-bold text-ink">
            {siteContent.paymentCancelled.title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-slate">
            {siteContent.paymentCancelled.subtitle}
          </p>

          <div className="mt-6 rounded-2xl bg-mist px-5 py-4 text-sm text-slate">
            <p>本次沒有完成扣款，你的付款方式尚未被收取費用。</p>
            <p className="mt-2">客服：{support}</p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-accent px-6 font-semibold text-white hover:bg-accent-deep"
            >
              返回首頁報名
            </Link>
            <Link
              to="/"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-line bg-white px-6 font-semibold text-ink hover:border-accent"
            >
              返回首頁
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
