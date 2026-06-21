import { useState, useRef, useEffect } from 'react';
import { useI18n, locales } from '../i18n/context';

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = locales.find(l => l.code === locale)!;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('keydown', key);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('keydown', key);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`${current.label} — ${current.code.toUpperCase()}`}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-warm-700 hover:text-warm-900 hover:bg-warm-100 transition-colors"
      >
        <span aria-hidden="true">{current.flag}</span>
        <span className="hidden sm:inline">{current.label}</span>
        <svg aria-hidden="true" className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div role="menu" className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-warm-200 py-1 z-50 min-w-[160px]">
          {locales.map(l => (
            <button
              key={l.code}
              role="menuitemradio"
              aria-checked={l.code === locale}
              onClick={() => { setLocale(l.code); setOpen(false); }}
              className={`w-full flex items-center gap-2.5 px-4 py-2 text-sm hover:bg-warm-50 transition-colors ${l.code === locale ? 'text-brand-600 font-semibold' : 'text-warm-700'}`}
            >
              <span aria-hidden="true">{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
