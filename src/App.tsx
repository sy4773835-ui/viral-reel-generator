import { useRef, useState } from 'react';
import { LangProvider, useLang } from '@/i18n/LangContext';
import { BackgroundDecor } from '@/components/BackgroundDecor';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { GeneratorPanel } from '@/components/GeneratorPanel';
import { OutputPanel } from '@/components/OutputPanel';
import { Features } from '@/components/Features';
import { HowItWorks } from '@/components/HowItWorks';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { generateReelScript, type ReelScript, type Tone } from '@/lib/generateScript';

function AppContent() {
  const { t, lang } = useLang();
  const [idea, setIdea] = useState('');
  const [tone, setTone] = useState<Tone>('energetic');
  const [script, setScript] = useState<ReelScript | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const generatorRef = useRef<HTMLDivElement>(null);

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

  function handleGenerate() {
    if (!validate()) return;
    setLoading(true);
    setError(null);
    // simulate generation latency for a premium feel
    window.setTimeout(() => {
      const result = generateReelScript(idea, tone, lang);
      setScript(result);
      setLoading(false);
    }, 1100);
  }

  function scrollToGenerator() {
    generatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className="relative min-h-screen">
      <BackgroundDecor />
      <Header />
      <main>
        <Hero onStart={scrollToGenerator} onHow={() => document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' })} />

        <section ref={generatorRef} className="px-4 py-8 sm:px-6 sm:py-12">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2 lg:items-start">
            <GeneratorPanel
              idea={idea}
              setIdea={setIdea}
              tone={tone}
              setTone={setTone}
              onGenerate={handleGenerate}
              loading={loading}
              error={error}
            />
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
    </div>
  );
}

export default function App() {
  return (
    <LangProvider>
      <AppContent />
    </LangProvider>
  );
}
