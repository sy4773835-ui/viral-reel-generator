import { useLang } from '@/i18n/LangContext';
import { ReelScript, scriptToText } from '@/lib/generateScript';
import {
  Copy, Check, RefreshCw, Download, Clapperboard, Megaphone, Hash,
  FileText, Clock, Sparkles, Film, MessageCircle,
} from 'lucide-react';
import { useState } from 'react';

interface Props {
  script: ReelScript | null;
  loading: boolean;
  onRegenerate: () => void;
}

function Skeleton() {
  return (
    <div className="space-y-4">
      <div className="skeleton h-6 w-2/3" />
      <div className="skeleton h-4 w-full" />
      <div className="skeleton h-4 w-5/6" />
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="skeleton h-24 w-full" />
        <div className="skeleton h-24 w-full" />
        <div className="skeleton h-24 w-full" />
        <div className="skeleton h-24 w-full" />
      </div>
      <div className="skeleton h-6 w-1/2" />
    </div>
  );
}

function EmptyState({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
      <div className="grid h-16 w-16 place-items-center rounded-3xl bg-pink-100 text-pink-400 animate-float">
        <Film className="h-8 w-8" />
      </div>
      <h3 className="mt-4 font-display text-lg font-bold text-pink-800">{title}</h3>
      <p className="mt-1.5 max-w-xs text-sm text-pink-600/70">{desc}</p>
    </div>
  );
}

export function OutputPanel({ script, loading, onRegenerate }: Props) {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);

  const toneLabel = script
    ? t.generator.toneOptions.find((o) => o.value === script.tone)?.label ?? script.tone
    : '';

  function handleCopy() {
    if (!script) return;
    const text = scriptToText(script, t);
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleDownload() {
    if (!script) return;
    const text = scriptToText(script, t);
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reel-script-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="card p-5 sm:p-7">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="chip bg-pink-100 text-pink-600">
            <Clapperboard className="h-3.5 w-3.5" />
            {t.output.title}
          </span>
        </div>
        {script && !loading && (
          <div className="flex items-center gap-2">
            <button onClick={onRegenerate} className="btn-ghost px-3 py-2 text-sm" title={t.output.regenerate}>
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">{t.output.regenerate}</span>
            </button>
            <button onClick={handleDownload} className="btn-ghost px-3 py-2 text-sm" title={t.output.download}>
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">{t.output.download}</span>
            </button>
            <button onClick={handleCopy} className="btn-primary px-4 py-2 text-sm" title={t.output.copy}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? t.output.copied : t.output.copy}
            </button>
          </div>
        )}
      </div>

      {loading ? (
        <Skeleton />
      ) : !script ? (
        <EmptyState title={t.output.emptyTitle} desc={t.output.emptyDesc} />
      ) : (
        <div className="space-y-5 animate-fade-up">
          {/* meta chips */}
          <div className="flex flex-wrap gap-2">
            <span className="chip bg-pink-50 text-pink-600 border border-pink-100">
              <Clock className="h-3.5 w-3.5" /> {t.output.duration}: {script.totalDuration}
            </span>
            <span className="chip bg-pink-50 text-pink-600 border border-pink-100">
              <Sparkles className="h-3.5 w-3.5" /> {t.output.tone}: {toneLabel}
            </span>
            <span className="chip bg-pink-50 text-pink-600 border border-pink-100">
              <Film className="h-3.5 w-3.5" /> {t.output.scenes}: {script.scenes.length}
            </span>
          </div>

          {/* Hook */}
          <section className="rounded-2xl bg-gradient-to-br from-pink-50 to-rose-100/60 border border-pink-100 p-4">
            <div className="flex items-center gap-2 text-pink-600">
              <Sparkles className="h-4 w-4" />
              <h3 className="text-sm font-bold uppercase tracking-wide">{t.output.hookLabel}</h3>
            </div>
            <p className="mt-2 text-lg font-semibold text-pink-900 leading-snug">{script.hook}</p>
          </section>

          {/* Scenes */}
          <section>
            <div className="flex items-center gap-2 text-pink-600 mb-3">
              <Film className="h-4 w-4" />
              <h3 className="text-sm font-bold uppercase tracking-wide">{t.output.scriptLabel}</h3>
            </div>
            <ol className="space-y-3">
              {script.scenes.map((s) => (
                <li
                  key={s.index}
                  className="group relative rounded-2xl border border-pink-100 bg-white/70 p-4 transition hover:border-pink-300 hover:shadow-soft"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-rose-gradient text-xs font-bold text-white">
                      {s.index}
                    </span>
                    <span className="chip bg-pink-100 text-pink-600 text-[11px]">
                      <Clock className="h-3 w-3" /> {s.duration}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-pink-900">
                    <span className="font-semibold text-pink-600">🎥 </span>{s.visual}
                  </p>
                  <p className="mt-1.5 text-sm text-pink-900/90">
                    <span className="font-semibold text-pink-600">🎙️ </span>{s.voiceover}
                  </p>
                  <p className="mt-1.5 text-sm text-pink-900/80">
                    <span className="font-semibold text-pink-600">📝 </span>{s.onScreenText}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          {/* CTA */}
          <section className="rounded-2xl bg-pink-50 border border-pink-100 p-4">
            <div className="flex items-center gap-2 text-pink-600">
              <Megaphone className="h-4 w-4" />
              <h3 className="text-sm font-bold uppercase tracking-wide">{t.output.ctaLabel}</h3>
            </div>
            <p className="mt-2 text-base font-medium text-pink-900">{script.cta}</p>
          </section>

          {/* Caption */}
          <section className="rounded-2xl bg-white/70 border border-pink-100 p-4">
            <div className="flex items-center gap-2 text-pink-600">
              <FileText className="h-4 w-4" />
              <h3 className="text-sm font-bold uppercase tracking-wide">{t.output.captionLabel}</h3>
            </div>
            <p className="mt-2 whitespace-pre-line text-sm text-pink-900/90 leading-relaxed">{script.caption}</p>
          </section>

          {/* Hashtags */}
          <section className="rounded-2xl bg-white/70 border border-pink-100 p-4">
            <div className="flex items-center gap-2 text-pink-600 mb-2">
              <Hash className="h-4 w-4" />
              <h3 className="text-sm font-bold uppercase tracking-wide">{t.output.hashtagsLabel}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {script.hashtags.map((h) => (
                <span key={h} className="chip bg-pink-100 text-pink-600 text-xs">#{h}</span>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
