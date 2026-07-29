import { useLang } from '@/i18n/LangContext';
import { Tone } from '@/lib/generateScript';
import { Wand2, Loader2, Lightbulb, AlertCircle } from 'lucide-react';
import { useState } from 'react';

const MAX_CHARS = 280;

interface Props {
  idea: string;
  setIdea: (s: string) => void;
  tone: Tone;
  setTone: (t: Tone) => void;
  onGenerate: () => void;
  loading: boolean;
  error: string | null;
}

export function GeneratorPanel({ idea, setIdea, tone, setTone, onGenerate, loading, error }: Props) {
  const { t } = useLang();
  const [touched, setTouched] = useState(false);

  const charCount = idea.length;

  return (
    <div className="card p-5 sm:p-7">
      <div className="mb-4 flex items-center gap-2">
        <span className="chip bg-pink-100 text-pink-600">
          <Wand2 className="h-3.5 w-3.5" />
          {t.generator.badge}
        </span>
      </div>

      <h2 className="font-display text-2xl font-bold text-pink-900 sm:text-3xl">{t.generator.title}</h2>
      <p className="mt-1.5 text-sm text-pink-700/70 sm:text-base">{t.generator.subtitle}</p>

      <div className="mt-6">
        <label htmlFor="idea" className="block text-sm font-semibold text-pink-800">
          {t.generator.ideaLabel}
        </label>
        <textarea
          id="idea"
          value={idea}
          onChange={(e) => setIdea(e.target.value.slice(0, MAX_CHARS))}
          onBlur={() => setTouched(true)}
          placeholder={t.generator.ideaPlaceholder}
          rows={3}
          className="field-input mt-2 resize-none text-base"
          aria-describedby="idea-hint"
        />
        <div id="idea-hint" className="mt-1.5 flex items-center justify-between gap-2">
          <span className="text-xs text-pink-500/80 flex items-center gap-1">
            <Lightbulb className="h-3.5 w-3.5" />
            {t.generator.ideaHint}
          </span>
          <span className={`text-xs font-medium tabular-nums ${charCount > MAX_CHARS - 30 ? 'text-pink-600' : 'text-pink-400'}`}>
            {t.generator.charCount(charCount, MAX_CHARS)}
          </span>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold text-pink-800">{t.generator.toneLabel}</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {t.generator.toneOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setTone(opt.value as Tone)}
                className={`chip transition-all duration-200 ${
                  tone === opt.value
                    ? 'bg-rose-gradient text-white shadow-soft'
                    : 'bg-white/80 border border-pink-200 text-pink-600 hover:border-pink-300'
                }`}
                aria-pressed={tone === opt.value}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs font-semibold text-pink-500/80 mb-2">{t.generator.examplesLabel}</p>
        <div className="flex flex-wrap gap-2">
          {t.generator.examples.map((ex) => (
            <button
              key={ex}
              onClick={() => setIdea(ex)}
              className="rounded-full border border-pink-200 bg-white/60 px-3 py-1.5 text-xs text-pink-600 transition hover:bg-white hover:border-pink-300 hover:shadow-sm text-left"
            >
              {ex.length > 42 ? ex.slice(0, 42) + '…' : ex}
            </button>
          ))}
        </div>
      </div>

      {error && (touched || loading === false) && (
        <div className="mt-4 flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm text-red-700 animate-pop">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <button
        onClick={onGenerate}
        disabled={loading}
        className="btn-primary mt-6 w-full text-base"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            {t.generator.generating}
          </>
        ) : (
          <>
            <Wand2 className="h-5 w-5" />
            {t.generator.generateBtn}
          </>
        )}
      </button>

      {loading && (
        <p className="mt-2 text-center text-xs text-pink-500/80 animate-pulse">{t.generator.generatingHint}</p>
      )}
    </div>
  );
}
