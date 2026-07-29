import { useLang } from '@/i18n/LangContext';
import { Languages } from 'lucide-react';

export function LanguageSwitcher() {
  const { lang, setLang, t } = useLang();

  return (
    <div className="inline-flex items-center rounded-full bg-white/70 border border-pink-200 p-1 backdrop-blur shadow-sm">
      <Languages className="h-4 w-4 text-pink-400 ml-2 mr-1 shrink-0" aria-hidden />
      <button
        onClick={() => setLang('hi')}
        className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${
          lang === 'hi'
            ? 'bg-rose-gradient text-white shadow'
            : 'text-pink-600 hover:text-pink-700'
        }`}
        aria-pressed={lang === 'hi'}
        aria-label={t.langSwitch.label + ' Hindi'}
      >
        हिंदी
      </button>
      <button
        onClick={() => setLang('en')}
        className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${
          lang === 'en'
            ? 'bg-rose-gradient text-white shadow'
            : 'text-pink-600 hover:text-pink-700'
        }`}
        aria-pressed={lang === 'en'}
        aria-label={t.langSwitch.label + ' English'}
      >
        English
      </button>
    </div>
  );
}
