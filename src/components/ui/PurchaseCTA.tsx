import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { formatPrice, paymentConfig } from '../../config/payment'
import { useOrderModal } from '../../context/OrderModalContext'

interface PurchaseCTAProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  /** 按鈕主文案（不含價格）；若 showPrice 為 true 會自動加上 －NT$2700 */
  label: string
  /** 若為 false，不自動附加價格 */
  showPrice?: boolean
  variant?: 'primary' | 'secondary' | 'light'
  fullWidth?: boolean
  children?: ReactNode
  onClick?: () => void
}

const variants = {
  primary:
    'bg-accent text-white shadow-[0_12px_28px_rgba(15,156,148,0.28)] hover:bg-accent-deep hover:-translate-y-0.5',
  secondary:
    'bg-ink text-white hover:bg-ink-soft hover:-translate-y-0.5',
  light:
    'bg-white text-ink border border-line hover:border-accent hover:-translate-y-0.5',
}

/**
 * 全站統一報名 CTA → 開啟 AI-PT 同款 orderModal（Google Sheets 報名）
 */
export function PurchaseCTA({
  label,
  showPrice = true,
  variant = 'primary',
  fullWidth = false,
  className = '',
  type = 'button',
  children,
  onClick,
  ...props
}: PurchaseCTAProps) {
  const { openModal } = useOrderModal()
  const text =
    children ??
    (showPrice ? `${label}－${formatPrice(paymentConfig.salePrice)}` : label)

  return (
    <button
      type={type}
      className={[
        'inline-flex min-h-12 items-center justify-center rounded-2xl px-6 text-base font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-60',
        variants[variant],
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={() => {
        onClick?.()
        openModal()
      }}
      {...props}
    >
      {text}
    </button>
  )
}
