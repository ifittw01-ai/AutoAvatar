import {
  formatPrice,
  getResolvedPaymentMode,
  hasPaynowQr,
  paymentConfig,
} from '../../config/payment'
import type {
  PaymentSession,
  StartPaymentInput,
  StartPaymentResult,
} from './types'

const SESSION_KEY = 'aa_payment_session'

/**
 * 統一購買入口判斷。
 *
 * - paymentLink 有值 → 外部結帳
 * - 否則 → /checkout（PayNow QR 或內部結帳）
 */
export function shouldUseExternalPayment(): boolean {
  return (
    getResolvedPaymentMode() === 'external-link' &&
    Boolean(paymentConfig.paymentLink)
  )
}

export function getExternalPaymentLink(): string {
  return paymentConfig.paymentLink
}

export function getCheckoutPath(): string {
  return paymentConfig.checkoutPath
}

/**
 * 買家確認已完成 PayNow 掃碼付款後呼叫。
 * 注意：此為買家自行回報，非金流 webhook 自動對帳。
 */
export async function confirmPaynowPayment(
  input: StartPaymentInput,
): Promise<StartPaymentResult> {
  await wait(500)

  const orderId = `PN-${Date.now().toString(36).toUpperCase()}`
  const session: PaymentSession = {
    orderId,
    productName: paymentConfig.productName,
    amount: paymentConfig.salePrice,
    currency: paymentConfig.currency,
    buyerEmail: input.buyer.email,
    buyerName: input.buyer.name,
    createdAt: new Date().toISOString(),
    outcome: 'success',
  }

  saveSession(session)

  return {
    ok: true,
    message: '已收到你的付款回報，我們會依 Email 提供後續課程資訊。',
    session,
    redirectPath: `${paymentConfig.successPath}?order=${encodeURIComponent(orderId)}`,
  }
}

export async function startMockPayment(
  input: StartPaymentInput,
): Promise<StartPaymentResult> {
  await wait(700)

  const outcome = input.outcome ?? 'success'
  const orderId = `MOCK-${Date.now().toString(36).toUpperCase()}`

  if (outcome === 'cancelled') {
    return {
      ok: false,
      message: '你已取消本次付款，尚未產生扣款。',
      redirectPath: paymentConfig.cancelledPath,
    }
  }

  if (outcome === 'failed') {
    return {
      ok: false,
      message: '付款未完成，請稍後再試或改用其他方式。',
      redirectPath: paymentConfig.cancelledPath,
    }
  }

  const session: PaymentSession = {
    orderId,
    productName: paymentConfig.productName,
    amount: paymentConfig.salePrice,
    currency: paymentConfig.currency,
    buyerEmail: input.buyer.email,
    buyerName: input.buyer.name,
    createdAt: new Date().toISOString(),
    outcome: 'success',
  }

  saveSession(session)

  return {
    ok: true,
    message: `模擬付款成功（${formatPrice(session.amount)}）。此為開發測試，未發生真實扣款。`,
    session,
    redirectPath: `${paymentConfig.successPath}?order=${encodeURIComponent(orderId)}`,
  }
}

export function getLiveCheckoutMessage(): string {
  if (import.meta.env.DEV) return ''
  if (hasPaynowQr() && paymentConfig.provider === 'paynow') return ''
  return '正式付款系統尚待串接'
}

export function saveSession(session: PaymentSession): void {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
  } catch {
    // ignore
  }
}

export function loadSession(): PaymentSession | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    if (!raw) return null
    return JSON.parse(raw) as PaymentSession
  } catch {
    return null
  }
}

export function clearSession(): void {
  try {
    sessionStorage.removeItem(SESSION_KEY)
  } catch {
    // ignore
  }
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
