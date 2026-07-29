import { useLang } from '@/i18n/LangContext';
import { Sparkles, Play, ArrowRight, Wand2 } from 'lucide-react';

export function Hero({ onStart, onHow }: { onStart: () => void; onHow: () => void }) {
  const { t } = useLang();

  return (
    <section id="top" className="relative px-4 pt-12 pb-8 sm:px-6 sm:pt-16 lg:pt-20">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white/70 px-4 py-1.5 text-sm font-semibold text-pink-600 backdrop-blur animate-fade-up">
          <Sparkles className="h-4 w-4 text-pink-500" />
          {t.hero.badge}
        </div>

        <h1 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-pink-900 text-balance animate-fade-up animate-delay-100 sm:text-5xl lg:text-6xl">
          {t.hero.titleLead}{' '}
          <span className="gradient-text">{t.hero.titleHighlight}</span>{' '}
          <span className="text-pink-900/80">{t.hero.titleTrail}</span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-pink-900/70 sm:text-lg animate-fade-up animate-delay-200 text-balance">
          {t.hero.subtitle}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 animate-fade-up animate-delay-300 sm:flex-row">
          <button onClick={onStart} className="btn-primary w-full sm:w-auto">
            <Wand2 className="h-5 w-5" />
            {t.hero.primaryCta}
            <ArrowRight className="h-4 w-4" />
          </button>
          <button onClick={onHow} className="btn-ghost w-full sm:w-auto">
            <Play className="h-4 w-4" />
            {t.hero.secondaryCta}
          </button>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-6 animate-fade-up animate-delay-500">
          {t.hero.stats.map((s) => (
            <div key={s.label} className="card px-3 py-4 sm:px-5">
              <div className="font-display text-2xl font-extrabold gradient-text sm:text-3xl">{s.value}</div>
              <div className="mt-1 text-xs font-medium text-pink-700/70 sm:text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
