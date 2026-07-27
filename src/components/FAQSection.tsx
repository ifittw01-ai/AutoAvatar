import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { siteContent } from '../content/siteContent'
import { SectionHeader } from './ui/SectionHeader'
import { PurchaseCTA } from './ui/PurchaseCTA'

export function FAQSection() {
  const { faq, ctaLabels } = siteContent
  const items = faq.items
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const baseId = useId()

  return (
    <section id="faq" className="section-pad bg-mist scroll-mt-24">
      <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeader eyebrow={faq.eyebrow} title={faq.title} />
          <div className="mt-8 hidden lg:block">
            <PurchaseCTA label={ctaLabels.faq} showPrice={false} />
          </div>
        </div>

        <div className="space-y-3">
          {items.map((item, index) => {
            const open = openIndex === index
            const panelId = `${baseId}-panel-${index}`
            const buttonId = `${baseId}-button-${index}`

            return (
              <div
                key={item.question}
                className="overflow-hidden rounded-[1.25rem] border border-line bg-white shadow-[var(--shadow-card)]"
              >
                <button
                  id={buttonId}
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(open ? null : index)}
                >
                  <span className="font-display text-base font-semibold text-ink">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`shrink-0 text-slate transition ${open ? 'rotate-180' : ''}`}
                    size={18}
                    aria-hidden
                  />
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!open}
                  className="border-t border-line px-5 py-4 text-[15px] leading-relaxed text-slate"
                >
                  {item.answer}
                </div>
              </div>
            )
          })}
        </div>

        <div className="lg:hidden">
          <PurchaseCTA fullWidth label={ctaLabels.faq} showPrice={false} />
        </div>
      </div>
    </section>
  )
}
