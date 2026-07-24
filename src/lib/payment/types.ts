export type PaymentOutcome = 'success' | 'failed' | 'cancelled'

export interface CheckoutBuyer {
  name: string
  email: string
  country: string
  address: string
  promoCode: string
}

export interface PaymentSession {
  orderId: string
  productName: string
  amount: number
  currency: string
  buyerEmail: string
  buyerName: string
  createdAt: string
  outcome: PaymentOutcome
}

export interface StartPaymentInput {
  buyer: CheckoutBuyer
  outcome?: PaymentOutcome
}

export interface StartPaymentResult {
  ok: boolean
  message: string
  session?: PaymentSession
  redirectPath?: string
}
