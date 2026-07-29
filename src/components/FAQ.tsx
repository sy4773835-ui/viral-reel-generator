import { useState } from 'react';
import { useLang } from '@/i18n/LangContext';
import { ChevronDown, HelpCircle } from 'lucide-react';

export function FAQ() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <span className="chip bg-white/70 border border-pink-200 text-pink-600 mx-auto">
            <HelpCircle className="h-3.5 w-3.5" /> {t.faq.badge}
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-pink-900 sm:text-4xl text-balance">{t.faq.title}</h2>
          <p className="mt-3 text-pink-700/70 sm:text-lg text-balance">{t.faq.subtitle}</p>
        </div>

        <div className="mt-10 space-y-3">
          {t.faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="card overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-pink-900">{item.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-pink-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-sm leading-relaxed text-pink-700/80">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
