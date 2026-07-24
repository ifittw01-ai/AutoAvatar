import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle2, Mail } from 'lucide-react'
import { formatPrice, paymentConfig } from '../config/payment'
import { loadSession } from '../lib/payment/paymentService'
import { siteContent } from '../content/siteContent'

export function PaymentSuccessPage() {
  const [params] = useSearchParams()
  const session = loadSession()
  const orderId = params.get('order') || session?.orderId || '【訂單編號位置】'
  const email = session?.buyerEmail || '【購買者 Email 位置】'
  const amount = session?.amount ?? paymentConfig.salePrice
  const hasAccessUrl = Boolean(paymentConfig.courseAccessUrl)
  const support = paymentConfig.supportEmail || '【客服 Email 待設定】'

  useEffect(() => {
    document.title = `付款成功｜${paymentConfig.productName}`
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-mist">
      <div className="container-page flex min-h-screen items-center justify-center py-12">
        <div className="w-full max-w-xl rounded-[1.75rem] border border-line bg-white p-8 text-center shadow-[var(--shadow-soft)] sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft text-accent-deep">
            <CheckCircle2 size={34} />
          </div>
          <h1 className="font-display mt-5 text-3xl font-bold text-ink">
            {siteContent.paymentSuccess.title}
          </h1>
          <p className="mt-3 text-slate">{paymentConfig.productName}</p>

          <div className="mt-6 space-y-2 rounded-2xl bg-mist px-5 py-4 text-left text-sm text-slate">
            <p>
              購買者 Email：<span className="font-medium text-ink">{email}</span>
            </p>
            <p>
              訂單編號：<span className="font-medium text-ink">{orderId}</span>
            </p>
            <p>
              付款金額：
              <span className="font-medium text-ink">{formatPrice(amount)}</span>
            </p>
          </div>

          <div className="mt-6 text-left">
            <p className="font-display text-base font-bold text-ink">下一步</p>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate">
              {siteContent.paymentSuccess.nextSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>

          <div className="mt-6 rounded-2xl border border-line bg-paper px-4 py-3 text-left text-sm text-slate">
            <p className="flex items-start gap-2">
              <Mail size={16} className="mt-0.5 shrink-0 text-accent" />
              {hasAccessUrl
                ? '你也可以直接前往課程平台開始學習。'
                : '課程登入與使用資訊將寄送至你購買時填寫的 Email。'}
            </p>
            <p className="mt-2 text-xs">{siteContent.paymentSuccess.noEmailHelp}</p>
            <p className="mt-2 text-xs">客服：{support}</p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            {hasAccessUrl ? (
              <a
                href={paymentConfig.courseAccessUrl}
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-accent px-6 font-semibold text-white hover:bg-accent-deep"
              >
                前往課程
              </a>
            ) : null}
            <Link
              to="/"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-line bg-white px-6 font-semibold text-ink hover:border-accent"
            >
              返回首頁
            </Link>
          </div>

          {import.meta.env.DEV ? (
            <p className="mt-6 text-xs text-gold">
              開發提示：此頁可來自 mock 付款；未發生真實扣款。
            </p>
          ) : null}
        </div>
      </div>
    </div>
  )
}
