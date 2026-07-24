export type PaymentProvider = 'mock' | 'stripe' | 'kajabi' | 'paypal'
export type PaymentMode = 'external-link' | 'internal-checkout'

const DEFAULT_SITE_URL = 'https://ifittw01-ai.github.io/AutoAvatar/'

function normalizeSiteUrl(url: string): string {
  return url.endsWith('/') ? url : `${url}/`
}

/**
 * 全站價格與付款設定（集中管理，勿在元件內寫死價格）。
 * 目前數字為參考站暫用版面資料，正式上線前請一次替換。
 *
 * TODO（正式金流）：
 * 1. 填入 paymentLink（Kajabi / Stripe Payment Link / PayPal）→ 自動走 external-link
 * 2. 或在 checkout 頁嵌入 Stripe / Kajabi / PayPal 安全元件（勿在前端收信用卡明文）
 * 3. 設定 courseAccessUrl、supportEmail
 * 4. 不得把金流私密金鑰、webhook secret 寫進前端
 */
export const paymentConfig = {
  provider: (import.meta.env.VITE_PAYMENT_PROVIDER as PaymentProvider) || 'mock',
  mode: (import.meta.env.VITE_PAYMENT_MODE as PaymentMode) || 'internal-checkout',
  currency: 'USD',
  currencySymbol: '$',
  productName: 'AI 分身實戰課程',
  salePrice: 27,
  originalPrice: 312,
  paymentType: '一次付清',
  paymentLink: import.meta.env.VITE_PAYMENT_LINK?.trim() || '',
  courseAccessUrl: import.meta.env.VITE_COURSE_ACCESS_URL?.trim() || '',
  supportEmail: import.meta.env.VITE_SUPPORT_EMAIL?.trim() || '',
  /** GitHub Pages 正式站根網址（含尾端斜線） */
  siteUrl: normalizeSiteUrl(
    import.meta.env.VITE_SITE_URL?.trim() || DEFAULT_SITE_URL,
  ),
  /** HashRouter 路徑（導航用，不含 #） */
  successPath: '/payment-success',
  cancelledPath: '/payment-cancelled',
  checkoutPath: '/checkout',
} as const

/** 外部金流回傳成功頁（HashRouter） */
export const paymentSuccessUrl = `${paymentConfig.siteUrl}#/payment-success`

/** 外部金流回傳取消頁（HashRouter） */
export const paymentCancelledUrl = `${paymentConfig.siteUrl}#/payment-cancelled`

export function formatPrice(amount: number): string {
  return `${paymentConfig.currencySymbol}${amount}`
}

export function getResolvedPaymentMode(): PaymentMode {
  if (paymentConfig.paymentLink) return 'external-link'
  return 'internal-checkout'
}

export function priceWithLabel(prefix: string): string {
  return `${prefix}－${formatPrice(paymentConfig.salePrice)}`
}
