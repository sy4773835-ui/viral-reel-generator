import { useEffect, useRef, useState } from 'react';
import { LangProvider, useLang } from '@/i18n/LangContext';
import { AuthProvider, useAuth } from '@/auth/AuthContext';
import { BackgroundDecor } from '@/components/BackgroundDecor';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { GeneratorPanel } from '@/components/GeneratorPanel';
import { OutputPanel } from '@/components/OutputPanel';
import { Features } from '@/components/Features';
import { HowItWorks } from '@/components/HowItWorks';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { AuthModal } from '@/components/AuthModal';
import { generateReelScript, type ReelScript, type Tone } from '@/lib/generateScript';
import { Lock, LogIn } from 'lucide-react';

function LoginGate({ onLogin }: { onLogin: () => void }) {
  const { t } = useLang();

  return (
    <div className="card p-8 text-center sm:p-12 animate-fade-in">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-pink-100 text-pink-500 animate-float">
        <Lock className="h-8 w-8" />
      </div>
      <h3 className="mt-5 font-display text-2xl font-bold text-pink-900">{t.gate.title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm text-pink-600/70 sm:text-base">{t.gate.subtitle}</p>
      <button onClick={onLogin} className="btn-primary mt-6">
        <LogIn className="h-5 w-5" />
        {t.gate.cta}
      </button>
      <p className="mt-3 text-xs text-pink-400">{t.gate.note}</p>
    </div>
  );
}

function AppContent() {
  const { t, lang } = useLang();
  const { user, loading: authLoading } = useAuth();
  const [idea, setIdea] = useState('');
  const [tone, setTone] = useState<Tone>('energetic');
  const [script, setScript] = useState<ReelScript | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const generatorRef = useRef<HTMLDivElement>(null);

  // Open the auth modal from any element marked with data-login-trigger
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest('[data-login-trigger]');
      if (target) {
        e.preventDefault();
        setAuthOpen(true);
      }
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  function validate(): boolean {
    const trimmed = idea.trim();
    if (!trimmed) {
      setError(t.generator.errors.empty);
      return false;
    }
    if (trimmed.length < 10) {
      setError(t.generator.errors.tooShort);
      return false;
    }
    setError(null);
    return true;
  }

  async function handleGenerate() {
    if (!user) {
      setAuthOpen(true);
      return;
    }
    if (!validate()) return;
    setLoading(true);
    setError(null);
    try {
      const result = await generateReelScript(idea, tone, lang);
      setScript(result);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'UNKNOWN';
      if (msg === 'INVALID_RESPONSE') {
        setError(t.generator.errors.invalidResponse);
      } else {
        setError(t.generator.errors.apiError);
      }
    } finally {
      setLoading(false);
    }
  }

  function scrollToGenerator() {
    generatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  const canGenerate = !!user && !authLoading;

  return (
    <div className="relative min-h-screen">
      <BackgroundDecor />
      <Header />
      <main>
        <Hero onStart={scrollToGenerator} onHow={() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })} />

        <section ref={generatorRef} className="px-4 py-8 sm:px-6 sm:py-12">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2 lg:items-start">
            {canGenerate ? (
              <GeneratorPanel
                idea={idea}
                setIdea={setIdea}
                tone={tone}
                setTone={setTone}
                onGenerate={handleGenerate}
                loading={loading}
                error={error}
              />
            ) : (
              <LoginGate onLogin={() => setAuthOpen(true)} />
            )}
            <div className="lg:sticky lg:top-24">
              <OutputPanel script={script} loading={loading} onRegenerate={handleGenerate} />
            </div>
          </div>
        </section>

        <Features />
        <HowItWorks />
        <FAQ />
      </main>
      <Footer />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LangProvider>
        <AppContent />
      </LangProvider>
    </AuthProvider>
  );
}
