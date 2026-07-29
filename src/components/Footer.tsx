import { useLang } from '@/i18n/LangContext';
import { Sparkles, Heart } from 'lucide-react';

export function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();
  const anchors = ['#features', '#how', '#faq'];

  return (
    <footer className="px-4 pb-10 pt-8 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="card p-6 sm:p-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-start">
            <div className="text-center sm:text-left max-w-sm">
              <div className="flex items-center justify-center gap-2 sm:justify-start">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-rose-gradient shadow-soft">
                  <Sparkles className="h-4 w-4 text-white" />
                </span>
                <span className="font-display text-lg font-extrabold text-pink-700">{t.footer.brand}</span>
              </div>
              <p className="mt-2 text-sm text-pink-700/70">{t.footer.desc}</p>
            </div>

            <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {t.footer.links.map((l, i) => (
                <a
                  key={l.label}
                  href={anchors[i]}
                  className="text-sm font-medium text-pink-600 transition hover:text-pink-700"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-pink-100 pt-5 sm:flex-row">
            <p className="text-xs text-pink-600/70">© {year} {t.footer.brand}. {t.footer.rights}</p>
            <p className="flex items-center gap-1.5 text-xs text-pink-600/70">
              {t.footer.madeWith} <Heart className="h-3.5 w-3.5 fill-pink-500 text-pink-500" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
