import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Check, Lock, Shield } from 'lucide-react'
import { publicAsset } from '../lib/publicAsset'
import { siteContent } from '../content/siteContent'
import { formatPrice, paymentConfig } from '../config/payment'
import {
  getLiveCheckoutMessage,
  startMockPayment,
} from '../lib/payment/paymentService'
import type { CheckoutBuyer, PaymentOutcome } from '../lib/payment/types'
import { Disclaimer } from '../components/Disclaimer'
import { PendingBadge } from '../components/ui/SectionHeader'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function CheckoutPage() {
  const navigate = useNavigate()
  const [buyer, setBuyer] = useState<CheckoutBuyer>({
    name: '',
    email: '',
    country: '',
    address: '',
    promoCode: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutBuyer, string>>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const lock = useRef(false)
  const liveMessage = getLiveCheckoutMessage()
  const showMockTools = import.meta.env.DEV
  const { checkout, pricing, testimonials, brand } = siteContent

  useEffect(() => {
    document.title = `結帳｜${paymentConfig.productName}`
    window.scrollTo(0, 0)
  }, [])

  function update<K extends keyof CheckoutBuyer>(key: K, value: string) {
    setBuyer((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => {
      if (!prev[key]) return prev
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  function validate() {
    const next: Partial<Record<keyof CheckoutBuyer, string>> = {}
    if (!buyer.name.trim()) next.name = '請填寫姓名'
    if (!buyer.email.trim()) next.email = '請填寫 Email'
    else if (!emailPattern.test(buyer.email.trim())) next.email = 'Email 格式不正確'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function pay(outcome: PaymentOutcome) {
    if (lock.current) return
    if (!validate()) return

    if (!showMockTools) {
      setStatus('error')
      setMessage(liveMessage || '正式付款系統尚待串接')
      return
    }

    lock.current = true
    setStatus('submitting')
    setMessage('')

    const result = await startMockPayment({ buyer, outcome })
    lock.current = false

    if (result.redirectPath) {
      navigate(result.redirectPath)
      return
    }

    setStatus('error')
    setMessage(result.message)
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    await pay('success')
  }

  return (
    <div className="min-h-screen bg-mist">
      <header className="border-b border-line bg-paper">
        <div className="container-page flex h-16 items-center justify-between">
          <Link to="/" className="font-display text-lg font-bold text-ink">
            {brand.logoText}
          </Link>
          <Link to="/" className="text-sm font-medium text-slate hover:text-ink">
            返回銷售頁
          </Link>
        </div>
      </header>

      <main className="container-page grid gap-8 py-8 lg:grid-cols-[1.15fr_0.85fr] lg:py-12">
        <div className="space-y-6">
          <section className="rounded-[1.5rem] border border-line bg-white p-6 shadow-[var(--shadow-card)] sm:p-8">
            <div className="flex flex-wrap items-start gap-2">
              <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                {paymentConfig.productName}
              </h1>
              <PendingBadge />
            </div>
            <p className="mt-3 text-base text-slate">{checkout.promise}</p>

            <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-ink">
              <img
                src={publicAsset('images/hero-workspace.svg')}
                alt={checkout.coverAlt}
                className="h-auto w-full opacity-95"
              />
            </div>

            <h2 className="font-display mt-8 text-lg font-bold text-ink">課程包含</h2>
            <ul className="mt-3 space-y-2">
              {pricing.includes.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-slate">
                  <Check className="mt-0.5 shrink-0 text-accent" size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="font-display mt-8 text-lg font-bold text-ink">核心成果</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {siteContent.finalCta.bullets.slice(0, 4).map((item) => (
                <li
                  key={item}
                  className="rounded-xl bg-mist px-3 py-2 text-sm text-slate"
                >
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm text-slate">{checkout.accessMethod}</p>
          </section>

          <section className="rounded-[1.5rem] border border-line bg-white p-6 shadow-[var(--shadow-card)]">
            <h2 className="font-display text-lg font-bold text-ink">學員回饋</h2>
            <div className="mt-4 space-y-4">
              {testimonials.slice(0, 2).map((t) => (
                <blockquote
                  key={t.name}
                  className="rounded-2xl border border-line bg-mist/50 p-4"
                >
                  <p className="font-display text-sm font-bold text-ink">{t.headline}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate">「{t.quote}」</p>
                  <p className="mt-2 text-xs text-slate">
                    {t.name}・{t.role}
                  </p>
                </blockquote>
              ))}
            </div>
            <div className="mt-4">
              <Disclaimer />
            </div>
            <p className="mt-4 text-xs leading-relaxed text-slate">
              {checkout.digitalGoodsNote}
            </p>
          </section>
        </div>

        <aside className="lg:sticky lg:top-8 lg:self-start">
          <form
            onSubmit={onSubmit}
            className="rounded-[1.5rem] border border-line bg-white p-6 shadow-[var(--shadow-soft)] sm:p-7"
            noValidate
          >
            <h2 className="font-display text-xl font-bold text-ink">訂單摘要</h2>

            <div className="mt-5 space-y-2 border-b border-line pb-5 text-sm">
              <div className="flex justify-between gap-3">
                <span className="text-slate">商品</span>
                <span className="font-medium text-ink text-right">{paymentConfig.productName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate">原價</span>
                <span className="text-slate line-through">
                  {formatPrice(paymentConfig.originalPrice)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate">優惠價</span>
                <span className="font-display text-2xl font-bold text-ink">
                  {formatPrice(paymentConfig.salePrice)}
                </span>
              </div>
              <p className="text-xs text-slate">
                {paymentConfig.paymentType}・{paymentConfig.currency}
              </p>
            </div>

            <div className="mt-5 space-y-4">
              <Field label="姓名" required error={errors.name}>
                <input
                  className={inputClass(errors.name)}
                  value={buyer.name}
                  autoComplete="name"
                  onChange={(e) => update('name', e.target.value)}
                />
              </Field>
              <Field label="Email" required error={errors.email}>
                <input
                  type="email"
                  inputMode="email"
                  className={inputClass(errors.email)}
                  value={buyer.email}
                  autoComplete="email"
                  onChange={(e) => update('email', e.target.value)}
                />
              </Field>
              <Field label="國家／地區">
                <input
                  className={inputClass()}
                  value={buyer.country}
                  autoComplete="country-name"
                  onChange={(e) => update('country', e.target.value)}
                />
              </Field>
              <Field label="帳單地址（依金流需求）">
                <input
                  className={inputClass()}
                  value={buyer.address}
                  autoComplete="street-address"
                  onChange={(e) => update('address', e.target.value)}
                />
              </Field>
              <Field label="優惠碼">
                <input
                  className={inputClass()}
                  value={buyer.promoCode}
                  placeholder="若有優惠碼請輸入"
                  onChange={(e) => update('promoCode', e.target.value)}
                />
              </Field>
            </div>

            <div className="mt-5 rounded-2xl border border-dashed border-line bg-mist/60 p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                <Lock size={16} className="text-accent" />
                {checkout.paymentWidgetNote}
              </p>
              <div
                id="payment-element-slot"
                className="mt-3 flex min-h-[88px] items-center justify-center rounded-xl border border-line bg-white px-3 text-center text-xs text-slate"
                data-providers="stripe,kajabi,paypal"
              >
                {checkout.paymentProvidersHint}
              </div>
              <p className="mt-2 flex items-start gap-2 text-xs text-slate">
                <Shield size={14} className="mt-0.5 shrink-0 text-accent" />
                {checkout.secureNote}
              </p>
            </div>

            <div className="mt-5 flex justify-between text-sm font-semibold text-ink">
              <span>總付款金額</span>
              <span className="font-display text-xl">
                {formatPrice(paymentConfig.salePrice)}
              </span>
            </div>

            {status === 'error' || liveMessage ? (
              <p className="mt-4 rounded-xl border border-danger/20 bg-danger/5 px-3 py-2 text-sm text-danger" role="alert">
                {message || liveMessage}
              </p>
            ) : null}

            {showMockTools ? (
              <div className="mt-5 space-y-2">
                <p className="text-xs text-gold">開發／mock 模式：可測試三種結果（不會真實扣款）</p>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-accent px-6 text-base font-semibold text-white transition hover:bg-accent-deep disabled:opacity-60"
                >
                  {status === 'submitting' ? '處理中…' : '模擬付款成功'}
                </button>
                <button
                  type="button"
                  disabled={status === 'submitting'}
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl border border-line bg-white px-6 text-base font-semibold text-ink transition hover:border-accent disabled:opacity-60"
                  onClick={() => pay('failed')}
                >
                  模擬付款失敗
                </button>
                <button
                  type="button"
                  disabled={status === 'submitting'}
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl border border-line bg-white px-6 text-base font-semibold text-ink transition hover:border-accent disabled:opacity-60"
                  onClick={() => pay('cancelled')}
                >
                  模擬取消付款
                </button>
              </div>
            ) : (
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-accent px-6 text-base font-semibold text-white transition hover:bg-accent-deep disabled:opacity-60"
              >
                完成購買
              </button>
            )}
          </form>
        </aside>
      </main>
    </div>
  )
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string
  required?: boolean
  error?: string
  children: ReactNode
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required ? <span className="text-danger"> *</span> : null}
      </label>
      {children}
      {error ? (
        <p className="mt-1 text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

function inputClass(error?: string) {
  return [
    'w-full min-h-12 rounded-2xl border bg-paper px-4 py-3 text-base text-ink outline-none transition',
    'focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/20',
    error ? 'border-danger' : 'border-line',
  ].join(' ')
}
