import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n, type Locale } from '../i18n/context';
import { additionalServices } from '../data/pricing';
import {
  PLANS,
  EXTRA_DOC_TIERS,
  TOIMINIMI_EXTRA_DOC_CENTS,
  PAYROLL_CENTS,
  E_INVOICE_CENTS,
  ANNUAL_HOURLY_CENTS,
  SMALL_DIFFERENCE_CENTS,
  BUNDLES,
  firstExtraDocCents,
  yearQuote,
  nearestMarketProfile,
  type CompanyForm,
  type MonthPrice,
} from '../data/pricingV3';
import PageHeader from '../components/PageHeader';
import CtaBand from '../components/CtaBand';

// Formatting is done by hand, not with Intl: the prerendered HTML and the browser must produce
// byte-identical strings, otherwise hydration mismatches (ICU versions differ in spaces).
const NBSP = String.fromCharCode(160);
const MINUS = String.fromCharCode(8722);

function groupThousands(n: number, locale: Locale): string {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, locale === 'en' ? ',' : NBSP);
}

/** Integer cents → "1 339,25 €" (fi/ru/et/uk) or "€1,339.25" (en). */
function money(cents: number, locale: Locale): string {
  const abs = Math.abs(Math.round(cents));
  const whole = groupThousands(Math.floor(abs / 100), locale);
  const frac = String(abs % 100).padStart(2, '0');
  const sign = cents < 0 ? MINUS : '';
  return locale === 'en' ? `${sign}€${whole}.${frac}` : `${sign}${whole},${frac}${NBSP}€`;
}

/** Whole euros → "2 066 €" / "€2,066". */
function euros(eur: number, locale: Locale): string {
  const whole = groupThousands(Math.abs(Math.round(eur)), locale);
  return locale === 'en' ? `€${whole}` : `${whole}${NBSP}€`;
}

function hoursText(halfHours: number, unit: string, locale: Locale): string {
  const half = halfHours % 2 === 1 ? (locale === 'en' ? '.5' : ',5') : '';
  return `${Math.floor(halfHours / 2)}${half}${NBSP}${unit}`;
}

type Forms = { one: string; few: string; many: string };

function plural(n: number, forms: Forms, locale: Locale): string {
  if (locale === 'ru' || locale === 'uk') {
    const m10 = n % 10;
    const m100 = n % 100;
    if (m10 === 1 && m100 !== 11) return forms.one;
    if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return forms.few;
    return forms.many;
  }
  return n === 1 ? forms.one : forms.many;
}

function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));
}

/** Whole non-negative count from free text ("20", " 20 ", "20 kpl"); empty → 0. */
function parseCount(s: string): number {
  const digits = s.replace(/[^\d]/g, '').slice(0, 5);
  return digits ? Number(digits) : 0;
}

/** "180", "180,50", "1 200" and "1.200" in fi/ru/et/uk; "1,200" and "180.50" in en → cents. */
function parseCents(s: string, locale: Locale): number {
  let x = s.replace(/[\s€]/g, '');
  if (locale === 'en') x = x.replace(/,/g, '');
  else if (x.includes(',')) x = x.replace(/\./g, '').replace(',', '.');
  else if (/^\d{1,3}(\.\d{3})+$/.test(x)) x = x.replace(/\./g, '');
  const v = Number(x);
  return Number.isFinite(v) && v > 0 ? Math.round(v * 100) : 0;
}

function AccordionSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-ink-900/10 rounded-2xl overflow-hidden bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-ink-900/[0.02] transition-colors text-left"
      >
        <span className="font-semibold text-ink-900">{title}</span>
        <svg className={`w-5 h-5 text-ink-700/75 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-6 py-4 border-t border-ink-900/8">{children}</div>}
    </div>
  );
}

const inputCls =
  'w-full px-4 py-2.5 border border-ink-900/15 rounded-xl bg-white text-ink-900 focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 outline-none transition-shadow';

export default function PricingPage() {
  const { t, locale, localePath } = useI18n();
  const hp = t.home.packages;
  const v3 = t.pricing.v3;
  const ex = v3.extras;
  const c = v3.calculator;
  const bu = v3.bundles;
  const m = (cents: number) => money(cents, locale);
  const count = (n: number, forms: Forms) => `${n} ${plural(n, forms, locale)}`;

  const sectionData: { key: keyof typeof additionalServices; label: string }[] = [
    { key: 'accounting', label: t.pricing.sections.accounting },
    { key: 'annualReports', label: t.pricing.sections.annualReports },
    { key: 'companyFormation', label: t.pricing.sections.companyFormation },
    { key: 'consulting', label: t.pricing.sections.consulting },
  ];

  // Calculator state. Defaults: an Oy with 20 documents and one employee, no current price.
  const [form, setForm] = useState<CompanyForm>('oy');
  const [docs, setDocs] = useState('20');
  const [uneven, setUneven] = useState(false);
  const [docsLow, setDocsLow] = useState('20');
  const [docsHigh, setDocsHigh] = useState('40');
  const [payroll, setPayroll] = useState('1');
  const [current, setCurrent] = useState('');
  const [site, setSite] = useState<'' | 'yes' | 'no' | 'have'>('');

  const lowDocs = uneven ? parseCount(docsLow) : parseCount(docs);
  const highDocs = uneven ? parseCount(docsHigh) : parseCount(docs);
  const payrollCount = parseCount(payroll);
  const quote = yearQuote({ form, docsLow: lowDocs, docsHigh: highDocs, payroll: payrollCount });
  const currentCents = parseCents(current, locale);

  const monthLine = (mp: MonthPrice) => {
    const parts = [`${v3.plans[mp.plan.id].name} ${m(mp.plan.priceCents)}`];
    if (mp.extraDocs > 0) parts.push(`${count(mp.extraDocs, v3.units.doc)} × ${m(mp.extraDocCents)}`);
    if (mp.extraPayroll > 0) parts.push(`${count(mp.extraPayroll, v3.units.payroll)} × ${m(PAYROLL_CENTS)}`);
    const sum = parts.length > 1 ? ` = ${m(mp.totalCents)}` : '';
    return `${parts.join(' + ')}${sum}${t.pricing.perMonth}`;
  };

  const profileLabel = (pf: CompanyForm, docsN: number, payrollN: number) =>
    fill(c.profile, {
      form: pf === 'tmi' ? c.profileTmi : c.profileOy,
      docs: count(docsN, v3.units.doc),
      payroll: payrollN > 0 ? count(payrollN, v3.units.payroll) : c.profileNoPayroll,
    });

  const market = quote.kind === 'price' && currentCents === 0
    ? nearestMarketProfile(form, (Math.min(lowDocs, highDocs) + Math.max(lowDocs, highDocs)) / 2, payrollCount)
    : null;
  const diffCents = quote.kind === 'price' ? currentCents * 12 - quote.totalCents : 0;

  return (
    <div className="bg-canvas text-ink-900">
      <PageHeader eyebrow={hp.eyebrow} title={t.pricing.title} subtitle={t.pricing.subtitle} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        {/* Five packages */}
        <div data-shot="cards" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-4 gap-y-6 pt-3">
          {PLANS.map((plan) => {
            const p = v3.plans[plan.id];
            const popular = plan.id === 'basic';
            const included = plan.includedPayroll > 0
              ? fill(v3.includedWithPayroll, { docs: count(plan.includedDocs, v3.units.doc), payroll: count(plan.includedPayroll, v3.units.payroll) })
              : fill(v3.included, { docs: count(plan.includedDocs, v3.units.doc) });
            // The dash stays with the word before it, so a wrapped line never starts with «—».
            const extra = (plan.includedPayroll > 0
              ? fill(v3.extraLine, { doc: m(firstExtraDocCents(plan)), payroll: m(PAYROLL_CENTS) })
              : fill(v3.extraLineNoPayroll, { doc: m(firstExtraDocCents(plan)) })).replace(/ — /g, `${NBSP}— `);
            const muted = popular ? 'text-white/70' : 'text-ink-700/75';
            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-5 flex flex-col ${popular ? 'bg-ink-900 text-white shadow-xl' : 'bg-white text-ink-900 border border-ink-900/10'}`}
              >
                {popular && (
                  <div className="absolute -top-3 left-5 bg-brand-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {hp.popular}
                  </div>
                )}
                <h3 className={`text-lg font-bold ${popular ? 'text-white' : 'text-ink-900'}`}>{p.name}</h3>
                <p className={`mt-1 text-sm font-semibold leading-snug lg:min-h-[3.75em] ${popular ? 'text-brand-400' : 'text-brand-700'}`}>{p.headline}</p>
                <p className={`mt-4 text-xs font-medium ${muted}`}>{v3.from}</p>
                <div className="flex flex-wrap items-baseline gap-x-1">
                  <span className="text-2xl xl:text-3xl font-extrabold font-mono tracking-tight whitespace-nowrap">{m(plan.priceCents)}</span>
                  <span className={`text-sm ${muted}`}>{t.pricing.perMonth}</span>
                </div>
                <ul className="mt-4 space-y-2 flex-1">
                  {p.portal.map((line) => (
                    <li key={line} className={`flex items-start gap-2 text-sm ${popular ? 'text-white/85' : 'text-ink-700/85'}`}>
                      <svg className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                <div className={`mt-5 pt-4 border-t text-xs leading-relaxed ${popular ? 'border-white/15' : 'border-ink-900/10'} ${muted}`}>
                  <p className={`font-medium ${popular ? 'text-white/85' : 'text-ink-700'}`}>{included}</p>
                  <p className="mt-2">{v3.extraOnlyBusy} {extra}</p>
                </div>
                <Link
                  to={localePath('/yhteystiedot')}
                  className={`mt-5 block text-center py-2.5 rounded-lg text-sm font-semibold transition-colors ${popular ? 'bg-brand-600 text-white hover:bg-brand-700' : 'bg-ink-900/5 text-ink-900 hover:bg-ink-900/10'}`}
                >
                  {t.pricing.requestQuote}
                </Link>
              </div>
            );
          })}
        </div>

        <div data-shot="below-cards" className="mt-6 space-y-2 text-sm text-ink-700 max-w-5xl">
          <p>{v3.everyPackage}</p>
          <p><span className="font-semibold">{v3.toseDefinition.split('?')[0]}?</span>{v3.toseDefinition.slice(v3.toseDefinition.indexOf('?') + 1)}</p>
          <p className="text-ink-700/75">{t.pricing.note}</p>
        </div>

        {/* Beyond the package */}
        <section data-shot="extras" className="mt-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink-900">{ex.title}</h2>

          <div className="mt-6 rounded-2xl bg-ink-900 text-white p-6 sm:p-8">
            <p className="text-xl sm:text-2xl font-bold leading-snug">{ex.software}</p>
            <p className="mt-3 text-white/75 leading-relaxed max-w-3xl">{t.pricing.portalIncluded}</p>
            <Link to={localePath('/vaavo')} className="mt-3 inline-flex font-semibold text-brand-400 hover:underline">{t.home.hero.ctaSecondary} →</Link>
          </div>

          <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="rounded-2xl border border-ink-900/10 bg-white p-6">
              <h3 className="font-bold text-ink-900">{ex.docTitle}</h3>
              <p className="mt-2 text-sm text-ink-700/80">{ex.docText}</p>
              <dl className="mt-3 divide-y divide-ink-900/8">
                {EXTRA_DOC_TIERS.map((tier) => (
                  <div key={tier.from} className="flex items-start justify-between gap-4 py-2.5">
                    <dt className="text-sm text-ink-700">{fill(ex.tierRange, { from: tier.from, to: tier.to })}</dt>
                    <dd className="text-sm font-semibold font-mono whitespace-nowrap">{m(tier.cents)}</dd>
                  </div>
                ))}
                <div className="flex items-start justify-between gap-4 py-2.5">
                  <dt className="text-sm text-ink-700">{ex.toiminimiDoc}</dt>
                  <dd className="text-sm font-semibold font-mono whitespace-nowrap">{m(TOIMINIMI_EXTRA_DOC_CENTS)}</dd>
                </div>
                <div className="flex items-start justify-between gap-4 py-2.5">
                  <dt className="text-sm text-ink-700">{ex.over200Title}</dt>
                  <dd className="text-sm font-semibold whitespace-nowrap">{ex.over200Text}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl border border-ink-900/10 bg-white p-6">
              <dl className="divide-y divide-ink-900/8">
                <div className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <dt className="font-bold text-ink-900">{ex.payrollTitle}</dt>
                    <dd className="text-sm font-semibold font-mono whitespace-nowrap">{m(PAYROLL_CENTS)} <span className="font-sans text-ink-700/75">{ex.perPiece}</span></dd>
                  </div>
                  <p className="mt-1.5 text-sm text-ink-700/80">{ex.payrollText}</p>
                </div>
                <div className="py-3">
                  <div className="flex items-start justify-between gap-4">
                    <dt className="font-bold text-ink-900">{ex.eInvoiceTitle}</dt>
                    <dd className="text-sm font-semibold font-mono whitespace-nowrap">{m(E_INVOICE_CENTS)} <span className="font-sans text-ink-700/75">{ex.perPiece}</span></dd>
                  </div>
                  <p className="mt-1.5 text-sm text-ink-700/80">{ex.eInvoiceText}</p>
                </div>
                <div className="pt-3">
                  <div className="flex items-start justify-between gap-4">
                    <dt className="font-bold text-ink-900">{ex.annualTitle}</dt>
                    <dd className="text-sm font-semibold font-mono whitespace-nowrap">{m(ANNUAL_HOURLY_CENTS)} <span className="font-sans text-ink-700/75">{ex.perHour}</span></dd>
                  </div>
                  <p className="mt-1.5 text-sm text-ink-700/80">{ex.annualText}</p>
                </div>
              </dl>
            </div>
          </div>

          <ul className="mt-5 space-y-2 text-ink-700">
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-brand-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              <span className="font-medium">{ex.cheapest}</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-brand-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              <span className="font-medium">{ex.transfer}</span>
            </li>
          </ul>
        </section>

        {/* Business bundles: shown as coming, prices indicative, never in the calculator total */}
        <section id="yrityspaketit" data-shot="bundles" className="mt-16">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-ink-900">{bu.title}</h2>
            <span className="rounded-full bg-amber-100 text-amber-900 text-xs font-semibold px-3 py-1">{bu.badge}</span>
          </div>
          <p className="mt-2 text-ink-700/80 max-w-3xl">{bu.lead}</p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
            {BUNDLES.map((b) => {
              const text = bu[b.id];
              return (
                <div key={b.id} className="rounded-2xl border border-dashed border-ink-900/20 bg-white p-6 flex flex-col">
                  <h3 className="text-lg font-bold text-ink-900">{text.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-brand-700">{text.audience}</p>
                  <p className="mt-3 text-sm text-ink-700/80">{fill(bu.price, { price: euros(b.fromEur, locale), months: b.months })}</p>
                  <ul className="mt-4 space-y-2 flex-1">
                    {text.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-ink-700/85">
                        <svg className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to={localePath('/yhteystiedot')} className="mt-5 inline-flex font-semibold text-brand-700 hover:underline">{bu.cta} →</Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* Calculator: everything is computed in the browser */}
        <section id="laskuri" data-shot="calc" className="mt-16 rounded-3xl border border-ink-900/10 bg-white p-5 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink-900">{c.title}</h2>
          <p className="mt-2 text-ink-700/80">{c.lead}</p>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <fieldset>
                <legend className="block text-sm font-medium text-ink-700 mb-1.5">{c.formLabel}</legend>
                <div className="grid grid-cols-2 gap-2">
                  {(['tmi', 'oy'] as const).map((f) => (
                    <label
                      key={f}
                      className={`cursor-pointer rounded-xl border px-4 py-2.5 text-sm font-semibold text-center transition-colors ${form === f ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-ink-900/15 bg-white text-ink-700 hover:bg-ink-900/[0.03]'}`}
                    >
                      <input type="radio" name="calc-form" value={f} checked={form === f} onChange={() => setForm(f)} className="sr-only" />
                      {f === 'tmi' ? c.formTmi : c.formOy}
                    </label>
                  ))}
                </div>
              </fieldset>

              {!uneven ? (
                <div>
                  <label htmlFor="calc-docs" className="block text-sm font-medium text-ink-700 mb-1.5">{c.docsLabel}</label>
                  <input id="calc-docs" type="text" inputMode="numeric" value={docs} onChange={(e) => setDocs(e.target.value)} className={inputCls} />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="calc-docs-low" className="block text-sm font-medium text-ink-700 mb-1.5">{c.docsLowLabel}</label>
                    <input id="calc-docs-low" type="text" inputMode="numeric" value={docsLow} onChange={(e) => setDocsLow(e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <label htmlFor="calc-docs-high" className="block text-sm font-medium text-ink-700 mb-1.5">{c.docsHighLabel}</label>
                    <input id="calc-docs-high" type="text" inputMode="numeric" value={docsHigh} onChange={(e) => setDocsHigh(e.target.value)} className={inputCls} />
                  </div>
                </div>
              )}
              <label className="flex items-start gap-3 text-sm text-ink-700 -mt-2">
                <input
                  type="checkbox"
                  checked={uneven}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setDocsLow(docs);
                      setDocsHigh(docs);
                    } else {
                      setDocs(docsHigh);
                    }
                    setUneven(e.target.checked);
                  }}
                  className="mt-0.5 h-4 w-4 accent-brand-600"
                />
                <span>{c.unevenLabel}{uneven && <span className="block text-xs text-ink-700/70 mt-0.5">{c.unevenHint}</span>}</span>
              </label>

              <div>
                <label htmlFor="calc-payroll" className="block text-sm font-medium text-ink-700 mb-1.5">{c.payrollLabel}</label>
                <input id="calc-payroll" type="text" inputMode="numeric" value={payroll} onChange={(e) => setPayroll(e.target.value)} aria-describedby="calc-payroll-hint" className={inputCls} />
                <p id="calc-payroll-hint" className="mt-1.5 text-xs text-ink-700/70">{c.payrollHint}</p>
              </div>

              <div>
                <label htmlFor="calc-current" className="block text-sm font-medium text-ink-700 mb-1.5">{c.currentLabel}</label>
                <input id="calc-current" type="text" inputMode="decimal" value={current} onChange={(e) => setCurrent(e.target.value)} aria-describedby="calc-current-hint" className={inputCls} />
                <p id="calc-current-hint" className="mt-1.5 text-xs text-ink-700/70">{c.currentHint}</p>
              </div>

              <fieldset>
                <legend className="block text-sm font-medium text-ink-700 mb-1.5">{c.siteLabel}</legend>
                <div className="grid grid-cols-3 gap-2">
                  {([['yes', c.siteYes], ['no', c.siteNo], ['have', c.siteHave]] as const).map(([value, label]) => (
                    <label
                      key={value}
                      className={`cursor-pointer rounded-xl border px-3 py-2.5 text-sm font-semibold text-center transition-colors ${site === value ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-ink-900/15 bg-white text-ink-700 hover:bg-ink-900/[0.03]'}`}
                    >
                      <input type="radio" name="calc-site" value={value} checked={site === value} onChange={() => setSite(value)} className="sr-only" />
                      {label}
                    </label>
                  ))}
                </div>
              </fieldset>
            </form>

            <section aria-live="polite" className="rounded-2xl border border-ink-900/10 bg-canvas p-5 sm:p-6 self-start">
              <h3 className="text-lg font-bold text-ink-900">{c.resultTitle}</h3>
              {quote.kind === 'quote' ? (
                <div className="mt-4">
                  <p className="font-semibold text-ink-900">{c.quoteTitle}</p>
                  <p className="mt-1 text-sm text-ink-700">{c.quoteText}</p>
                </div>
              ) : (
                <>
                  <div className="mt-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-ink-700/70">{c.planLabel}</p>
                    {quote.uneven ? (
                      <dl className="mt-1 space-y-1">
                        <div><dt className="inline text-sm text-ink-700/80">{c.quietMonth}: </dt><dd className="inline text-sm font-semibold">{monthLine(quote.low)}</dd></div>
                        <div><dt className="inline text-sm text-ink-700/80">{c.busyMonth}: </dt><dd className="inline text-sm font-semibold">{monthLine(quote.high)}</dd></div>
                      </dl>
                    ) : (
                      <p className="mt-1 text-sm font-semibold">{monthLine(quote.low)}</p>
                    )}
                  </div>
                  <dl className="mt-4 divide-y divide-ink-900/8">
                    <div className="flex items-start justify-between gap-4 py-2.5">
                      <dt className="text-sm text-ink-700">{quote.uneven ? c.rowBookkeepingUneven : c.rowBookkeeping}</dt>
                      <dd className="text-sm font-semibold tabular-nums whitespace-nowrap">{m(quote.bookkeepingCents)}</dd>
                    </div>
                    <div className="flex items-start justify-between gap-4 py-2.5">
                      <dt className="text-sm text-ink-700">{fill(c.rowAnnual, { hours: hoursText(quote.annualHalfHours, c.hoursUnit, locale), rate: m(ANNUAL_HOURLY_CENTS) })}</dt>
                      <dd className="text-sm font-semibold tabular-nums whitespace-nowrap">{m(quote.annualCents)}</dd>
                    </div>
                    <div className="flex items-start justify-between gap-4 py-2.5">
                      <dt className="text-sm font-semibold text-ink-900">{c.rowTotal}</dt>
                      <dd className="text-lg font-extrabold tabular-nums whitespace-nowrap" data-calc-total>{m(quote.totalCents)}</dd>
                    </div>
                  </dl>

                  {currentCents > 0 ? (
                    <div className="mt-4 rounded-xl bg-brand-50 border border-brand-100 p-4">
                      <p className="text-sm text-ink-700">{c.diffTitle}</p>
                      {diffCents > 0 ? (
                        <>
                          <p className="mt-1 text-3xl font-extrabold tabular-nums tracking-tight text-ink-900" data-calc-diff>{euros(diffCents / 100, locale)}</p>
                          <p className="mt-1 text-sm text-ink-700">{fill(c.diffText, { amount: euros(diffCents / 100, locale) })}</p>
                          {diffCents < SMALL_DIFFERENCE_CENTS && <p className="mt-2 text-sm font-medium text-amber-800">{c.diffSmall}</p>}
                        </>
                      ) : (
                        <p className="mt-1 text-sm font-medium text-ink-900">{c.diffNone}</p>
                      )}
                      <p className="mt-2 text-xs text-ink-700/75">{fill(c.diffNote, { current: m(currentCents), year: m(currentCents * 12) })}</p>
                    </div>
                  ) : market ? (
                    <div className="mt-4 rounded-xl bg-white border border-ink-900/10 p-4">
                      <p className="text-sm text-ink-700">{c.marketTitle}</p>
                      <p className="mt-1 text-3xl font-extrabold tabular-nums tracking-tight text-ink-900" data-calc-market>{euros(market.medianEur, locale)}</p>
                      <p className="mt-1 text-sm text-ink-700">{fill(c.marketText, { amount: euros(market.medianEur, locale) })}</p>
                      <p className="mt-2 text-xs text-ink-700/75">{fill(c.marketMeta, { profile: profileLabel(market.form, market.docs, market.payroll), firms: market.firms })}</p>
                      <p className="mt-1 text-xs text-ink-700/75">{c.marketSoftware}</p>
                    </div>
                  ) : (
                    <p className="mt-4 text-sm text-ink-700/80">{c.marketNone}</p>
                  )}
                </>
              )}
              {site === 'yes' && (
                <a href="#yrityspaketit" data-calc-site className="mt-4 block text-sm font-semibold text-brand-700 hover:underline">{c.siteResult} →</a>
              )}
              <Link to={localePath('/yhteystiedot')} className="mt-4 inline-flex font-semibold text-brand-700 hover:underline">{c.cta} →</Link>
            </section>
          </div>
          <p className="mt-6 text-xs text-ink-700/75 max-w-3xl">{c.disclaimer}</p>
        </section>

        <section className="mt-14 max-w-3xl">
          <h2 className="text-xl font-bold text-ink-900">{t.pricing.consultationTitle}</h2>
          <p className="mt-3 text-ink-700 leading-relaxed">{t.pricing.consultationIncluded}</p>
        </section>

        {/* Referral offer */}
        <section id="suosittele" className="mt-10 rounded-2xl border border-brand-100 bg-brand-50 p-6">
          <h2 className="text-xl font-bold text-ink-900">{t.pricing.referralTitle}</h2>
          <p className="mt-3 text-ink-700 leading-relaxed">{t.pricing.referralText}</p>
          <Link to={localePath('/yhteystiedot')} className="mt-3 inline-flex font-semibold text-brand-700 hover:underline">{t.pricing.referralCta} →</Link>
        </section>

        {/* Additional services */}
        <h2 className="text-2xl sm:text-3xl font-bold text-ink-900 mt-16 mb-6">{t.pricing.additional}</h2>
        <div className="space-y-3">
          {sectionData.map(({ key, label }) => (
            <AccordionSection key={key} title={label}>
              <div className="divide-y divide-ink-900/8">
                {additionalServices[key].map((svc, i) => {
                  const name = t.pricing.serviceNames[svc.name as keyof typeof t.pricing.serviceNames] || svc.name;
                  const unit = t.pricing.serviceUnits[svc.unit as keyof typeof t.pricing.serviceUnits] || svc.unit;
                  const note = svc.note ? (t.pricing.serviceNotes[svc.note as keyof typeof t.pricing.serviceNotes] || svc.note) : null;
                  return (
                    <div key={i} className="flex items-start justify-between py-3 gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-ink-900">{name}</div>
                        {note && <div className="text-xs text-ink-700/75 mt-0.5">{note}</div>}
                      </div>
                      <div className="text-sm font-semibold text-ink-900 whitespace-nowrap font-mono">
                        {m(Math.round(svc.price * 100))} <span className="text-ink-700/75 font-sans">{unit}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </AccordionSection>
          ))}
        </div>

        {/* Soft CTA */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/60 p-6 text-center">
          <p className="text-ink-900 font-medium">{hp.note}</p>
          <Link to={localePath('/yhteystiedot')} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-600">
            {t.pricing.requestQuote} <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      <CtaBand />
    </div>
  );
}
