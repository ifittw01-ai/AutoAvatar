import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { OrderModalProvider } from './context/OrderModalContext'
import { OrderModal } from './components/OrderModal'
import { SalesPage } from './pages/SalesPage'
import { PaymentSuccessPage } from './pages/PaymentSuccessPage'
import { PaymentCancelledPage } from './pages/PaymentCancelledPage'

export default function App() {
  return (
    <HashRouter>
      <OrderModalProvider>
        <Routes>
          <Route path="/" element={<SalesPage />} />
          {/* 舊結帳路由改導向首頁，報名改走 orderModal */}
          <Route path="/checkout" element={<Navigate to="/" replace />} />
          <Route path="/payment-success" element={<PaymentSuccessPage />} />
          <Route path="/payment-cancelled" element={<PaymentCancelledPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <OrderModal />
      </OrderModalProvider>
    </HashRouter>
  )
}
