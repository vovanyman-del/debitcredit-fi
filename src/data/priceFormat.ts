// Price formatting shared by the pricing page and the start form. Done by hand, not with Intl: the
// prerendered HTML and the browser must produce byte-identical strings, otherwise hydration
// mismatches (ICU versions differ in spaces).
import type { Locale } from '../i18n/context';

export const NBSP = String.fromCharCode(160);
const MINUS = String.fromCharCode(8722);

function groupThousands(n: number, locale: Locale): string {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, locale === 'en' ? ',' : NBSP);
}

/** Integer cents → "1 339,25 €" (fi/ru/et/uk) or "€1,339.25" (en). */
export function money(cents: number, locale: Locale): string {
  const abs = Math.abs(Math.round(cents));
  const whole = groupThousands(Math.floor(abs / 100), locale);
  const frac = String(abs % 100).padStart(2, '0');
  const sign = cents < 0 ? MINUS : '';
  return locale === 'en' ? `${sign}€${whole}.${frac}` : `${sign}${whole},${frac}${NBSP}€`;
}

/** Whole euros → "2 066 €" / "€2,066". */
export function euros(eur: number, locale: Locale): string {
  const whole = groupThousands(Math.abs(Math.round(eur)), locale);
  return locale === 'en' ? `€${whole}` : `${whole}${NBSP}€`;
}

export type Forms = { one: string; few: string; many: string };

export function plural(n: number, forms: Forms, locale: Locale): string {
  if (locale === 'ru' || locale === 'uk') {
    const m10 = n % 10;
    const m100 = n % 100;
    if (m10 === 1 && m100 !== 11) return forms.one;
    if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return forms.few;
    return forms.many;
  }
  return n === 1 ? forms.one : forms.many;
}

export function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));
}
