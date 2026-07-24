import {
  formatPrice,
  getResolvedPaymentMode,
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
 * - paymentLink 有值 → 外部結帳（由呼叫端 window.location.assign）
 * - 否則 → 回傳內部路由 path，由 React Router navigate（HashRouter → #/checkout）
 *
 * TODO：串接正式金流 SDK／hosted checkout；信用卡資料只能由金流商安全元件處理。
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

/**
 * 正式環境：尚未串接金流時不可假裝成功。
 */
export function getLiveCheckoutMessage(): string {
  if (import.meta.env.DEV) return ''
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
