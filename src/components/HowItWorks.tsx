import { useLang } from '@/i18n/LangContext';
import { PencilLine, SlidersHorizontal, Wand2 } from 'lucide-react';

const icons = [PencilLine, SlidersHorizontal, Wand2];

export function HowItWorks() {
  const { t } = useLang();
  return (
    <section id="how" className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <span className="chip bg-white/70 border border-pink-200 text-pink-600 mx-auto">
            <Wand2 className="h-3.5 w-3.5" /> {t.how.badge}
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-pink-900 sm:text-4xl text-balance">{t.how.title}</h2>
          <p className="mt-3 mx-auto max-w-2xl text-pink-700/70 sm:text-lg text-balance">{t.how.subtitle}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3 relative">
          {/* connector line */}
          <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-pink-200 via-pink-300 to-pink-200" />
          {t.how.steps.map((step, i) => {
            const Icon = icons[i] ?? PencilLine;
            return (
              <div key={step.title} className="relative text-center animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="relative mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-white border border-pink-200 shadow-card">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-rose-gradient text-white shadow-soft">
                    <Icon className="h-7 w-7" />
                  </div>
                  <span className="absolute -top-2 -right-2 grid h-7 w-7 place-items-center rounded-full bg-pink-600 text-xs font-bold text-white shadow">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-pink-900">{step.title}</h3>
                <p className="mt-1.5 text-sm text-pink-700/70 max-w-xs mx-auto">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
