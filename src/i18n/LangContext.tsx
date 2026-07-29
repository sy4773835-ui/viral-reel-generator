import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { translations, type Lang, type Translation } from './translations';

interface LangContextValue {
  lang: Lang;
  t: Translation;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
}

const LangContext = createContext<LangContextValue | undefined>(undefined);

const STORAGE_KEY = 'reelgenie-lang';

function getInitialLang(): Lang {
  if (typeof window === 'undefined') return 'hi';
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'hi' || stored === 'en') return stored;
  } catch {
    /* ignore */
  }
  const browser = (navigator.language || '').toLowerCase();
  if (browser.startsWith('hi')) return 'hi';
  return 'en';
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = lang;
    document.body.classList.toggle('font-hindi', lang === 'hi');
  }, [lang]);

  const value = useMemo<LangContextValue>(
    () => ({
      lang,
      t: translations[lang],
      setLang: setLangState,
      toggleLang: () => setLangState((p) => (p === 'hi' ? 'en' : 'hi')),
    }),
    [lang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}
