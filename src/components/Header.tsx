import { useState } from 'react';
import { useLang } from '@/i18n/LangContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Sparkles, Menu, X } from 'lucide-react';

export function Header() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  const links = [
    { href: '#features', label: t.nav.features },
    { href: '#how', label: t.nav.howItWorks },
    { href: '#faq', label: t.nav.faq },
  ];

  return (
    <header className="sticky top-0 z-50">
      <div className="glass border-b border-white/60">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="#top" className="flex items-center gap-2 group">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-rose-gradient shadow-pink-glow transition-transform group-hover:scale-105">
              <Sparkles className="h-5 w-5 text-white" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-lg font-extrabold text-pink-700">{t.nav.brand}</span>
              <span className="text-[11px] font-medium text-pink-400">{t.nav.tagline}</span>
            </span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-xl px-3.5 py-2 text-sm font-medium text-pink-700/80 transition hover:bg-white/70 hover:text-pink-700"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>

          <button
            onClick={() => setOpen((p) => !p)}
            className="grid h-10 w-10 place-items-center rounded-xl bg-white/70 border border-pink-200 text-pink-700 md:hidden"
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {open && (
          <div className="md:hidden border-t border-white/50 bg-white/80 backdrop-blur-xl px-4 py-4 space-y-3 animate-fade-in">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-2 text-sm font-medium text-pink-700 hover:bg-pink-50"
              >
                {l.label}
              </a>
            ))}
            <div className="pt-1">
              <LanguageSwitcher />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
