import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/auth/AuthContext';
import { useLang } from '@/i18n/LangContext';
import { LogOut, ChevronDown } from 'lucide-react';

export function UserMenu() {
  const { t } = useLang();
  const { displayName, avatarUrl, initials, user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  async function handleSignOut() {
    setOpen(false);
    await signOut();
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 rounded-2xl border border-pink-200 bg-white/80 py-1.5 pl-1.5 pr-3 backdrop-blur transition hover:bg-white hover:shadow-sm"
        aria-expanded={open}
        aria-label={t.auth.profile}
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={displayName}
            className="h-8 w-8 rounded-xl object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-rose-gradient text-xs font-bold text-white">
            {initials}
          </span>
        )}
        <span className="hidden max-w-[100px] truncate text-sm font-semibold text-pink-800 sm:block">
          {displayName || user?.email}
        </span>
        <ChevronDown className={`h-4 w-4 text-pink-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-60 overflow-hidden rounded-2xl border border-pink-100 bg-white shadow-card animate-fade-in">
          <div className="border-b border-pink-50 px-4 py-3">
            <p className="truncate text-sm font-bold text-pink-900">{displayName || 'User'}</p>
            {user?.email && <p className="truncate text-xs text-pink-500/80">{user.email}</p>}
          </div>
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium text-pink-700 transition hover:bg-pink-50"
          >
            <LogOut className="h-4 w-4" />
            {t.auth.logout}
          </button>
        </div>
      )}
    </div>
  );
}
