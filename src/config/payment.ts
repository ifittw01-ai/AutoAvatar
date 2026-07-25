export type PaymentProvider = 'mock' | 'paynow' | 'stripe' | 'kajabi' | 'paypal'
export type PaymentMode = 'external-link' | 'internal-checkout' | 'qrcode'

const DEFAULT_SITE_URL = 'https://ifittw01-ai.github.io/AutoAvatar/'

function normalizeSiteUrl(url: string): string {
  return url.endsWith('/') ? url : `${url}/`
}

/**
 * 全站價格與付款設定（集中管理，勿在元件內寫死價格）。
 *
 * 目前主要付款方式：PayNow QR Code（結帳頁顯示）。
 * 勿把金流私密金鑰寫進前端。
 */
export const paymentConfig = {
  provider: (import.meta.env.VITE_PAYMENT_PROVIDER as PaymentProvider) || 'paynow',
  mode: (import.meta.env.VITE_PAYMENT_MODE as PaymentMode) || 'qrcode',
  currency: 'TWD',
  currencySymbol: 'NT$',
  productName: 'AI 分身實戰課程',
  salePrice: 2700,
  originalPrice: 31200,
  paymentType: '一次付清・PayNow 掃碼付款',
  paymentLink: import.meta.env.VITE_PAYMENT_LINK?.trim() || '',
  courseAccessUrl: import.meta.env.VITE_COURSE_ACCESS_URL?.trim() || '',
  supportEmail: import.meta.env.VITE_SUPPORT_EMAIL?.trim() || '',
  /** PayNow QR 圖檔（放在 public/images） */
  paynowQrImage: 'images/paynow-qrcode.png',
  paynowLabel: 'PayNow 掃碼付款',
  paynowHint:
    '請使用銀行 App／行動支付掃描下方 QR Code 完成付款。付款後填寫聯絡資料並送出，我們會依 Email 提供課程資訊。',
  /** GitHub Pages 正式站根網址（含尾端斜線） */
  siteUrl: normalizeSiteUrl(
    import.meta.env.VITE_SITE_URL?.trim() || DEFAULT_SITE_URL,
  ),
  successPath: '/payment-success',
  cancelledPath: '/payment-cancelled',
  checkoutPath: '/checkout',
} as const

export const paymentSuccessUrl = `${paymentConfig.siteUrl}#/payment-success`
export const paymentCancelledUrl = `${paymentConfig.siteUrl}#/payment-cancelled`

export function formatPrice(amount: number): string {
  return `${paymentConfig.currencySymbol}${amount}`
}

export function getResolvedPaymentMode(): PaymentMode {
  if (paymentConfig.paymentLink) return 'external-link'
  if (paymentConfig.provider === 'paynow' || paymentConfig.mode === 'qrcode') {
    return 'qrcode'
  }
  return 'internal-checkout'
}

export function hasPaynowQr(): boolean {
  return Boolean(paymentConfig.paynowQrImage)
}

export function priceWithLabel(prefix: string): string {
  return `${prefix}－${formatPrice(paymentConfig.salePrice)}`
}
