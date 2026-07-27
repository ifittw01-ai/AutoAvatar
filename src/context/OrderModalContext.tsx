import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

interface OrderModalContextValue {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const OrderModalContext = createContext<OrderModalContextValue | null>(null)

export function OrderModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = useCallback(() => {
    setIsOpen(true)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeModal = useCallback(() => {
    setIsOpen(false)
    document.body.style.overflow = 'auto'
  }, [])

  const value = useMemo(
    () => ({ isOpen, openModal, closeModal }),
    [isOpen, openModal, closeModal],
  )

  return (
    <OrderModalContext.Provider value={value}>{children}</OrderModalContext.Provider>
  )
}

export function useOrderModal() {
  const ctx = useContext(OrderModalContext)
  if (!ctx) {
    throw new Error('useOrderModal must be used within OrderModalProvider')
  }
  return ctx
}
