import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { SalesPage } from './pages/SalesPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { PaymentSuccessPage } from './pages/PaymentSuccessPage'
import { PaymentCancelledPage } from './pages/PaymentCancelledPage'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<SalesPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment-success" element={<PaymentSuccessPage />} />
        <Route path="/payment-cancelled" element={<PaymentCancelledPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}
