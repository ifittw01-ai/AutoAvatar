import { useEffect, useState } from 'react'
import { siteContent } from '../content/siteContent'
import { PurchaseCTA } from './ui/PurchaseCTA'

export function MobileStickyCTA() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const offer = document.getElementById('pricing')
    if (!offer) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!(entry.isIntersecting && entry.intersectionRatio > 0.15))
      },
      { threshold: [0.15, 0.3] },
    )
    observer.observe(offer)
    return () => observer.disconnect()
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 p-3 backdrop-blur md:hidden">
      <PurchaseCTA fullWidth label={siteContent.ctaLabels.sticky} showPrice={false} />
    </div>
  )
}
