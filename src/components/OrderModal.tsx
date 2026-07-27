import { useCallback, useEffect, useRef, useState, type FormEvent, type MouseEvent } from 'react'
import { GOOGLE_SCRIPT_URL, LINE_QR_URL } from '../config/registration'
import { useOrderModal } from '../context/OrderModalContext'
import { getReferralCode } from '../lib/registration/getReferralCode'
import '../styles/orderModal.css'

interface RegionOption {
  id: string
  text: string
}

const COUNTRY_OPTIONS = [
  { code: 'TW', label: '台灣 Taiwan' },
  { code: 'MY', label: '馬來西亞 Malaysia (Kuala Lumpur)' },
] as const

const INDUSTRY_OPTIONS = [
  { value: 'spiritual', label: '身心靈導師' },
  { value: 'beauty', label: '美容 / 美髮' },
  { value: 'education', label: '教育 / 培訓' },
  { value: 'insurance', label: '保險 / 金融' },
  { value: 'realestate', label: '房地產' },
  { value: 'consultant', label: '諮詢顧問' },
  { value: 'freelancer', label: '自由工作者' },
  { value: 'coach', label: '個人教練' },
  { value: 'ecommerce', label: '電商 / 微商' },
  { value: 'other', label: '其他' },
] as const

function getDefaultRegions(country: string): RegionOption[] {
  if (country === 'MY') {
    return [{ id: 'my1', text: '待定 - 吉隆坡地點' }]
  }
  return [{ id: 'tw1', text: '待定 - 台灣地點' }]
}

export function OrderModal() {
  const { isOpen, closeModal } = useOrderModal()
  const modalContentRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const submittingRef = useRef(false)

  const [countryCode, setCountryCode] = useState<'TW' | 'MY'>('TW')
  const [countryText, setCountryText] = useState('台灣 Taiwan')
  const [regionText, setRegionText] = useState('')
  const [regions, setRegions] = useState<RegionOption[]>([])
  const [regionsLoading, setRegionsLoading] = useState(false)
  const [regionError, setRegionError] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState<{ name: string; region: string } | null>(
    null,
  )

  const canSubmit =
    !regionsLoading && Boolean(countryText.trim()) && Boolean(regionText.trim()) && !submitting

  const loadRegionOptions = useCallback(async (country: string) => {
    setRegionsLoading(true)
    setRegionText('')
    setRegions([])
    setRegionError(false)

    try {
      const response = await fetch(
        `${GOOGLE_SCRIPT_URL}?action=getRegions&country=${country}`,
      )
      const result = (await response.json()) as {
        success?: boolean
        regions?: RegionOption[]
      }

      if (result.success && result.regions && result.regions.length > 0) {
        const valid = result.regions.filter((r) => r.text && String(r.text).trim())
        setRegions(valid)
        if (valid.length > 0) {
          setRegionText(valid[0].text.trim())
        }
      } else {
        const fallback = getDefaultRegions(country)
        setRegions(fallback)
        setRegionText(fallback[0]?.text ?? '')
      }
    } catch {
      const fallback = getDefaultRegions(country)
      setRegions(fallback)
      setRegionText(fallback[0]?.text ?? '')
    } finally {
      setRegionsLoading(false)
    }
  }, [])

  const selectCountry = useCallback(
    (code: 'TW' | 'MY') => {
      const option = COUNTRY_OPTIONS.find((c) => c.code === code)
      if (!option) return
      setCountryCode(code)
      setCountryText(option.label)
      void loadRegionOptions(code)
    },
    [loadRegionOptions],
  )

  // 開啟時預設台灣並載入場次；關閉 ESC / 背景點擊
  useEffect(() => {
    if (!isOpen) {
      setSuccess(null)
      return
    }

    selectCountry('TW')

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, closeModal, selectCountry])

  useEffect(() => {
    if (success && modalContentRef.current) {
      modalContentRef.current.scrollTop = 0
    }
  }, [success])

  const resetOrderFormAfterSubmit = () => {
    formRef.current?.reset()
    setRegionError(false)
    setRegionText('')
    setRegions([])
    setCountryCode('TW')
    setCountryText('台灣 Taiwan')
  }

  const validateSelections = () => {
    if (!countryText.trim()) {
      alert('請選擇國家/地區')
      return false
    }
    if (regionsLoading) {
      alert('評估地點載入中，請稍候再提交')
      return false
    }
    if (!regionText.trim()) {
      setRegionError(true)
      document.getElementById('regionCards')?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
      alert('請選擇希望評估的時間地點')
      return false
    }
    setRegionError(false)
    return true
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (submittingRef.current) return

    const form = e.currentTarget
    if (!validateSelections()) return
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    submittingRef.current = true
    setSubmitting(true)

    const userName = (form.elements.namedItem('姓名') as HTMLInputElement).value
    const refCode = getReferralCode()
    const formData = new FormData(form)

    const industrySelect = form.elements.namedItem('行業') as HTMLSelectElement | null
    if (industrySelect && industrySelect.selectedIndex > 0) {
      formData.set('行業', industrySelect.options[industrySelect.selectedIndex].text)
    }

    formData.set('國家地區', countryText.trim())
    formData.set('評估地區', regionText.trim())

    if (refCode) {
      formData.append('推廣代碼', refCode)
    }
    formData.append('ref', refCode || '')

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formData,
      })
      const result = (await response.json()) as { success?: boolean; message?: string }

      if (result.success) {
        setSuccess({ name: userName, region: regionText.trim() })
        resetOrderFormAfterSubmit()
      } else {
        alert(
          '❌ 提交失敗，請稍後再試或直接透過 LINE 聯繫我們\n\n錯誤: ' +
            (result.message || '提交失敗'),
        )
      }
    } catch {
      alert('❌ 網路錯誤，請檢查網路連接後重試')
    } finally {
      submittingRef.current = false
      setSubmitting(false)
    }
  }

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) closeModal()
  }

  const handleSuccessClose = () => {
    window.location.reload()
  }

  return (
    <div
      id="orderModal"
      className={`modal${isOpen ? ' show' : ''}`}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
    >
      <div className="modal-content" ref={modalContentRef}>
        {!success ? (
          <>
            <button type="button" className="close-modal" onClick={closeModal} aria-label="關閉">
              &times;
            </button>
            <div className="modal-header">
              <h2 data-i18n="modal-title">🎉 立即獲取優惠</h2>
              <p className="modal-subtitle" data-i18n="modal-subtitle">
                填寫資料，加入 AI 俱樂部
              </p>
            </div>

            <div className="order-form-wrapper">
              <div className="order-form-main">
                <form
                  id="orderForm"
                  className="order-form"
                  method="POST"
                  ref={formRef}
                  onSubmit={onSubmit}
                  noValidate={false}
                >
                  <div className="form-section">
                    <h3 data-i18n="form-section-title">📋 您的資料</h3>

                    <div className="form-group">
                      <label htmlFor="fullName">
                        <span data-i18n="form-name">姓名(實名制)</span>{' '}
                        <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="姓名"
                        required
                        data-i18n="form-name-placeholder"
                        placeholder="請輸入您的全名"
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="email">
                          <span data-i18n="form-email">電子郵件</span>{' '}
                          <span className="required">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="電子郵件"
                          required
                          data-i18n="form-email-placeholder"
                          placeholder="your@email.com"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="phone">
                          <span data-i18n="form-phone">電話號碼</span>{' '}
                          <span className="required" />
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="電話號碼"
                          data-i18n="form-phone-placeholder"
                          placeholder="+886 912345678"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label id="country-label">
                        <span data-i18n="form-country">國家/地區</span>{' '}
                        <span className="required">*</span>
                      </label>
                      <input
                        type="hidden"
                        id="country"
                        name="國家地區"
                        value={countryText}
                        data-code={countryCode}
                        required
                        readOnly
                      />
                      <div
                        className="option-cards option-cards--country"
                        id="countryCards"
                        role="radiogroup"
                        aria-labelledby="country-label"
                      >
                        {COUNTRY_OPTIONS.map((opt) => (
                          <button
                            key={opt.code}
                            type="button"
                            className={`option-card${countryCode === opt.code ? ' selected' : ''}`}
                            data-value={opt.code}
                            data-i18n={
                              opt.code === 'TW' ? 'form-country-tw' : 'form-country-my'
                            }
                            aria-pressed={countryCode === opt.code}
                            onClick={() => selectCountry(opt.code)}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="form-group form-field-hidden" aria-hidden="true">
                      <label htmlFor="industry">
                        <span data-i18n="form-industry">您的行業</span>{' '}
                        <span className="required">*</span>
                      </label>
                      <select id="industry" name="行業" defaultValue="">
                        <option value="" data-i18n="form-industry-placeholder">
                          請選擇...
                        </option>
                        {INDUSTRY_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label id="region-label">
                        <span data-i18n="form-region">希望評估時間地點</span>{' '}
                        <span className="required">*</span>
                      </label>
                      <input
                        type="hidden"
                        id="region"
                        name="評估地區"
                        value={regionText}
                        required
                        readOnly
                      />
                      <div
                        className={[
                          'option-cards option-cards--region',
                          regionsLoading ? 'is-disabled' : '',
                          regionError ? 'option-cards--error' : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                        id="regionCards"
                        role="radiogroup"
                        aria-labelledby="region-label"
                      >
                        {regionsLoading ? (
                          <p
                            className="option-cards-placeholder"
                            data-i18n="form-region-loading"
                          >
                            載入中...
                          </p>
                        ) : regions.length === 0 ? (
                          <p className="option-cards-placeholder">暫無可用場次</p>
                        ) : (
                          regions.map((region) => {
                            const selected = regionText === region.text.trim()
                            return (
                              <button
                                key={region.id}
                                type="button"
                                className={`option-card${selected ? ' selected' : ''}`}
                                data-value={region.id}
                                aria-pressed={selected}
                                onClick={() => {
                                  setRegionText(region.text.trim())
                                  setRegionError(false)
                                }}
                              >
                                {region.text}
                              </button>
                            )
                          })
                        )}
                      </div>
                      <small
                        style={{
                          color: '#999',
                          fontSize: '0.85rem',
                          marginTop: 5,
                          display: 'block',
                        }}
                        data-i18n="form-region-hint"
                      >
                        💡 地點由系統自動更新
                      </small>
                    </div>

                    <div className="form-group">
                      <label htmlFor="lineId" data-i18n="form-line">
                        LINE ID（選填，方便我們聯繫您）
                      </label>
                      <input
                        type="text"
                        id="lineId"
                        name="LINE_ID"
                        data-i18n="form-line-placeholder"
                        placeholder="請輸入您的 LINE ID"
                      />
                      <small
                        style={{
                          color: '#666',
                          fontSize: '0.85rem',
                          marginTop: 5,
                          display: 'block',
                        }}
                        data-i18n="form-line-hint"
                      >
                        💡 提供 LINE ID 讓我們能更快速為您服務
                      </small>
                    </div>

                    <div className="form-group form-field-hidden" aria-hidden="true">
                      <label htmlFor="whatsapp" data-i18n="form-whatsapp">
                        WhatsApp 號碼（選填）
                      </label>
                      <input
                        type="tel"
                        id="whatsapp"
                        name="WhatsApp號碼"
                        data-i18n="form-whatsapp-placeholder"
                        placeholder="+886 912 345 678"
                      />
                      <small
                        style={{
                          color: '#666',
                          fontSize: '0.85rem',
                          marginTop: 5,
                          display: 'block',
                        }}
                        data-i18n="form-whatsapp-hint"
                      >
                        💡 提供 WhatsApp 讓我們能透過多種方式聯繫您
                      </small>
                    </div>
                  </div>

                  <div className="form-buttons">
                    <button
                      type="submit"
                      id="submitBtn"
                      className="submit-info-btn"
                      disabled={!canSubmit}
                    >
                      <span data-i18n="form-submit">
                        {submitting ? '⏳ 處理中...' : '📝 提交資料'}
                      </span>
                    </button>
                  </div>

                  <div className="secure-notice">
                    <span>🔒</span>
                    <span data-i18n="form-secure">您的資料將安全受到保護</span>
                  </div>
                </form>
              </div>
            </div>
          </>
        ) : (
          <div className="success-page">
            <div className="success-icon" style={{ fontSize: 80, marginBottom: 20 }}>
              ✅
            </div>
            <h2 style={{ color: '#2ecc71', marginBottom: 10 }}>提交成功！</h2>
            <p style={{ fontSize: '1.1rem', color: '#333', marginBottom: 30 }}>
              感謝 <strong>{success.name}</strong>！
              <br />
              您已成功報名
              {success.region ? `，評估地區：${success.region}` : ''}，
            </p>

            <div style={{ margin: '30px auto', maxWidth: 500 }}>
              <h3
                style={{
                  color: '#333',
                  marginBottom: 20,
                  fontSize: '1.3rem',
                  textAlign: 'center',
                }}
              >
                🎉 立即聯繫我們
              </h3>

              <div
                className="contact-section"
                style={{
                  background: 'linear-gradient(135deg, #06C755 0%, #00B900 100%)',
                  padding: 25,
                  borderRadius: 15,
                  boxShadow: '0 4px 15px rgba(6, 199, 85, 0.3)',
                }}
              >
                <h4 style={{ color: 'white', marginBottom: 15, fontSize: '1.1rem' }}>
                  💬 透過 LINE 聯繫
                </h4>
                <div
                  className="qr-code-container"
                  style={{
                    background: 'white',
                    padding: 20,
                    borderRadius: 10,
                    display: 'inline-block',
                    marginBottom: 10,
                  }}
                >
                  <img
                    src={LINE_QR_URL}
                    alt="LINE QR Code"
                    style={{ width: 180, height: 180, display: 'block' }}
                  />
                </div>
                <p
                  style={{
                    color: 'white',
                    fontSize: '0.9rem',
                    opacity: 0.95,
                    marginTop: 10,
                  }}
                >
                  掃描 QR Code 加入 LINE
                  <br />
                  (密碼:13579)
                </p>
              </div>

              <p
                style={{
                  color: '#666',
                  fontSize: '0.9rem',
                  textAlign: 'center',
                  marginTop: 20,
                }}
              >
                ⚡ 掃描 LINE QR Code，我們將立即為您服務
              </p>
            </div>

            <button type="button" className="success-close-btn" onClick={handleSuccessClose}>
              關閉
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
