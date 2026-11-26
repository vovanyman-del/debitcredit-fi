// Where «Valitse tämä paketti» leads (pricing-page-v3-spec.md §3.4). One switch for the cards, the
// calculator and the site header.
//
// State A (SIGNUP_OPEN = false, now): the site's own short start form on /yhteystiedot with the
// chosen package filled in. In this draft the form does not send anything.
// State B (SIGNUP_OPEN = true): the Vaavo signup door with the choice as URL parameters. Turn it on
// only when all three hold: the door is open on prod, the signup prices by the v3 grid with the
// same package names, and the signup carries these parameters through its e-mail step.
import type { Locale } from '../i18n/context';
import type { CompanyForm, PlanId } from './pricingV3';

export const SIGNUP_OPEN = false;
export const SIGNUP_URL = 'https://vaavo.app/rekisteroidy';

export type SiteAnswer = 'yes' | 'no' | 'have';

export interface Selection {
  plan: PlanId;
  /** Absent on Basic, Medium and Large cards: the signup asks the company form itself. */
  form?: CompanyForm;
  docs: number;
  /** The busy month's documents when the visitor said the months vary. */
  docs2?: number;
  payslips: number;
  site?: SiteAnswer;
  src: 'hinnasto-card' | 'hinnasto-calc';
}

function query(sel: Selection): URLSearchParams {
  const q = new URLSearchParams();
  q.set('plan', sel.plan);
  if (sel.form) q.set('form', sel.form);
  q.set('docs', String(sel.docs));
  if (sel.docs2 !== undefined && sel.docs2 !== sel.docs) q.set('docs2', String(sel.docs2));
  q.set('payslips', String(sel.payslips));
  if (sel.site) q.set('site', sel.site);
  q.set('src', sel.src);
  return q;
}

/**
 * The address for a choice. State A returns a site path without the locale prefix (the caller wraps
 * it in localePath); state B returns the absolute signup URL.
 */
export function startHref(sel: Selection, locale: Locale): string {
  const q = query(sel);
  if (SIGNUP_OPEN) {
    q.set('lang', locale);
    return `${SIGNUP_URL}?${q.toString()}`;
  }
  q.set('aloitus', '1');
  return `/yhteystiedot?${q.toString()}`;
}

/** Reads a choice back on the start form; anything malformed is dropped, never guessed. */
export function parseSelection(search: string): Selection | null {
  const q = new URLSearchParams(search);
  if (q.get('aloitus') !== '1') return null;
  const plans: PlanId[] = ['toiminimi', 'start', 'basic', 'medium', 'large'];
  const plan = q.get('plan') as PlanId | null;
  if (!plan || !plans.includes(plan)) return null;
  const int = (k: string) => {
    const v = q.get(k);
    return v !== null && /^\d{1,3}$/.test(v) ? Number(v) : undefined;
  };
  const form = q.get('form');
  const site = q.get('site');
  return {
    plan,
    form: form === 'tmi' || form === 'oy' ? form : undefined,
    docs: int('docs') ?? 0,
    docs2: int('docs2'),
    payslips: int('payslips') ?? 0,
    site: site === 'yes' || site === 'no' || site === 'have' ? site : undefined,
    src: q.get('src') === 'hinnasto-calc' ? 'hinnasto-calc' : 'hinnasto-card',
  };
}
