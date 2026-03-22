import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { fi } from './fi';
import { en } from './en';
import { ru } from './ru';
import { et } from './et';
import { uk } from './uk';

export type Locale = 'fi' | 'en' | 'ru' | 'et' | 'uk';
export type Translations = typeof fi;

const translations: Record<Locale, Translations> = { fi, en, ru, et, uk };

export const locales: { code: Locale; label: string; flag: string }[] = [
  { code: 'fi', label: 'Suomi', flag: '\ud83c\uddeb\ud83c\uddee' },
  { code: 'en', label: 'English', flag: '\ud83c\uddec\ud83c\udde7' },
  { code: 'ru', label: '\u0420\u0443\u0441\u0441\u043a\u0438\u0439', flag: '\ud83c\uddf7\ud83c\uddfa' },
  { code: 'et', label: 'Eesti', flag: '\ud83c\uddea\ud83c\uddea' },
  { code: 'uk', label: '\u0423\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0430', flag: '\ud83c\uddfa\ud83c\udde6' },
];

interface I18nContextType {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
  localePath: (path: string) => string;
}

const I18nContext = createContext<I18nContextType>(null!);

export function I18nProvider({ children }: { children: ReactNode }) {
  const params = useParams<{ lang?: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const locale: Locale = (params.lang && params.lang in translations)
    ? params.lang as Locale
    : 'fi';

  const t = translations[locale];

  const localePath = useMemo(() => {
    return (path: string) => {
      if (locale === 'fi') return path;
      return `/${locale}${path}`;
    };
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    const currentPath = location.pathname;
    const stripped = currentPath.replace(/^\/(en|ru|et|uk)/, '') || '/';
    if (newLocale === 'fi') {
      navigate(stripped);
    } else {
      navigate(`/${newLocale}${stripped}`);
    }
  };

  return (
    <I18nContext.Provider value={{ locale, t, setLocale, localePath }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
