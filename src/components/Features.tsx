import { useLang } from '@/i18n/LangContext';
import {
  Sparkles, Clapperboard, Hash, Languages, Clock, Download,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Sparkles, Clapperboard, Hash, Languages, Clock, Download,
};

export function Features() {
  const { t } = useLang();
  return (
    <section id="features" className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <span className="chip bg-white/70 border border-pink-200 text-pink-600 mx-auto">
            <Sparkles className="h-3.5 w-3.5" /> {t.features.badge}
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-pink-900 sm:text-4xl text-balance">{t.features.title}</h2>
          <p className="mt-3 mx-auto max-w-2xl text-pink-700/70 sm:text-lg text-balance">{t.features.subtitle}</p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.features.items.map((item, i) => {
            const Icon = iconMap[item.icon] ?? Sparkles;
            return (
              <div
                key={item.title}
                className="card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-pink-glow animate-fade-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-rose-gradient text-white shadow-soft">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-pink-900">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-pink-700/70">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
