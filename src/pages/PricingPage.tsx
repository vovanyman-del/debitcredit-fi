// Pricing page v3 draft, built by vaavo-wt/plans/market/pricing-page-v3-spec.md (sections 2–5).
import { useState, type ReactNode } from 'react';
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
  type Plan,
} from '../data/pricingV3';
import { SIGNUP_OPEN, startHref, type Selection, type SiteAnswer } from '../data/signup';
import { money, euros, plural, fill, NBSP, type Forms } from '../data/priceFormat';
import PageHeader from '../components/PageHeader';
import CtaBand from '../components/CtaBand';

const APP_STORE_URL = 'https://apps.apple.com/fi/app/vaavo/id6761450083';
const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=fi.vaavo.app';

function hoursText(halfHours: number, unit: string, locale: Locale): string {
  const half = halfHours % 2 === 1 ? (locale === 'en' ? '.5' : ',5') : '';
  return `${Math.floor(halfHours / 2)}${half}${NBSP}${unit}`;
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

function Check({ className = 'text-brand-500' }: { className?: string }) {
  return (
    <svg className={`w-4 h-4 mt-0.5 shrink-0 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function AccordionSection({ title, children }: { title: string; children: ReactNode }) {
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

/** «Valitse tämä paketti»: the site's start form now, the signup door once SIGNUP_OPEN is on. */
function StartButton({ sel, className, children }: { sel: Selection; className: string; children: ReactNode }) {
  const { locale, localePath } = useI18n();
  const href = startHref(sel, locale);
  return SIGNUP_OPEN
    ? <a href={href} className={className}>{children}</a>
    : <Link to={localePath(href)} className={className}>{children}</Link>;
}

/** The company form a card implies: Toiminimi and Start know it, the larger packages let signup ask. */
function cardForm(plan: Plan): CompanyForm | undefined {
  if (plan.id === 'toiminimi') return 'tmi';
  if (plan.id === 'start') return 'oy';
  return undefined;
}

export default function PricingPage() {
  const { t, locale, localePath } = useI18n();
  const hp = t.home.packages;
  const v3 = t.pricing.v3;
  const ex = v3.extras;
  const c = v3.calculator;
  const bu = v3.bundles;
  const cmp = v3.compare;
  const m = (cents: number) => money(cents, locale);
  const count = (n: number, forms: Forms) => `${n} ${plural(n, forms, locale)}`;

  const sectionData: { key: keyof typeof additionalServices; label: string }[] = [
    { key: 'accounting', label: t.pricing.sections.accounting },
    { key: 'annualReports', label: t.pricing.sections.annualReports },
    { key: 'companyFormation', label: t.pricing.sections.companyFormation },
    { key: 'consulting', label: t.pricing.sections.consulting },
  ];

  // Medium and Large carry two prices; the card's button follows the one the visitor picked.
  const [cardPayroll, setCardPayroll] = useState<Record<string, boolean>>({ medium: true, large: true });

  // Calculator state. Defaults: an Oy with 20 documents and one employee, no current price.
  const [form, setForm] = useState<CompanyForm>('oy');
  const [docs, setDocs] = useState('20');
  const [uneven, setUneven] = useState(false);
  const [docsLow, setDocsLow] = useState('20');
  const [docsHigh, setDocsHigh] = useState('40');
  const [payroll, setPayroll] = useState('1');
  const [current, setCurrent] = useState('');
  const [site, setSite] = useState<'' | SiteAnswer>('');

  const lowDocs = Math.min(uneven ? parseCount(docsLow) : parseCount(docs), uneven ? parseCount(docsHigh) : parseCount(docs));
  const highDocs = Math.max(uneven ? parseCount(docsLow) : parseCount(docs), uneven ? parseCount(docsHigh) : parseCount(docs));
  const payrollCount = parseCount(payroll);
  // OPEN QUESTIONS (spec §7.1, §7.2): a toiminimi with wages is priced Basic and up, and its annual
  // report by the hour — both as in the v3 grid until the founder decides (see pricingV3.ts).
  const quote = yearQuote({ form, docsLow: lowDocs, docsHigh: highDocs, payroll: payrollCount });
  const currentCents = parseCents(current, locale);

  const monthDetail = (mp: MonthPrice) => {
    const parts = [`${v3.plans[mp.plan.id].name} ${m(mp.baseCents)}`];
    if (mp.extraDocs > 0) parts.push(`${count(mp.extraDocs, v3.units.doc)} × ${m(mp.extraDocCents)}`);
    if (mp.extraPayroll > 0) parts.push(`${count(mp.extraPayroll, v3.units.payroll)} × ${m(PAYROLL_CENTS)}`);
    return parts.length > 1 ? parts.join(' + ') : '';
  };

  const profileLabel = (pf: CompanyForm, docsN: number, payrollN: number) =>
    fill(c.profile, {
      form: pf === 'tmi' ? c.profileTmi : c.profileOy,
      docs: count(docsN, v3.units.doc),
      payroll: payrollN > 0 ? count(payrollN, v3.units.payroll) : c.profileNoPayroll,
    });

  const market = quote.kind === 'price' && currentCents === 0 ? nearestMarketProfile(form, (lowDocs + highDocs) / 2, payrollCount) : null;
  const diffCents = quote.kind === 'price' ? currentCents * 12 - quote.totalCents : 0;
  const calcSelection: Selection | null = quote.kind === 'price'
    ? {
        plan: quote.low.plan.id,
        form,
        docs: lowDocs,
        docs2: uneven ? highDocs : undefined,
        payslips: payrollCount,
        site: site || undefined,
        src: 'hinnasto-calc',
      }
    : null;

  const chooseLabel = SIGNUP_OPEN ? v3.chooseB : v3.chooseA;
  const primaryBtn = 'inline-flex items-center justify-center rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700 transition-colors';

  const compareRows = (plan: Plan) => {
    const p = v3.plans[plan.id];
    return [
      { label: cmp.forWhom, value: p.forWhom },
      {
        label: cmp.price,
        value: plan.noPayrollPriceCents !== undefined
          ? `${p.priceNoPayroll} ${m(plan.noPayrollPriceCents)}\n${p.pricePayroll} ${m(plan.priceCents)}`
          : m(plan.priceCents),
      },
      { label: cmp.docs, value: String(plan.includedDocs) },
      { label: cmp.payroll, value: plan.includedPayroll > 0 ? String(plan.includedPayroll) : cmp.none },
      { label: cmp.nextDoc, value: m(firstExtraDocCents(plan)) },
      { label: cmp.nextPayroll, value: plan.includedPayroll > 0 ? m(PAYROLL_CENTS) : cmp.toBasic },
      { label: cmp.portal, value: cmp.portalValue },
      { label: cmp.base, value: cmp.baseValue },
      { label: cmp.annual, value: fill(cmp.annualValue, { rate: m(ANNUAL_HOURLY_CENTS) }) },
    ];
  };

  return (
    <div className="bg-canvas text-ink-900">
      {/* 1. Main message */}
      <PageHeader eyebrow={v3.hero.eyebrow} title={v3.hero.title} subtitle={SIGNUP_OPEN ? v3.hero.textB : v3.hero.textA}>
        <div className="flex flex-wrap gap-3">
          <a href="#laskuri" className={primaryBtn}>{v3.hero.ctaCalc}</a>
          <a href="#paketit" className="inline-flex items-center justify-center rounded-xl border border-ink-900/15 bg-white px-5 py-3 text-sm font-semibold text-ink-900 hover:bg-ink-900/[0.03] transition-colors">{v3.hero.ctaPlans}</a>
        </div>
        <ul data-shot="facts" className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-2 text-sm font-medium text-ink-700">
          {[fill(v3.hero.factFrom, { price: m(PLANS[0].priceCents) }), ...v3.hero.facts].map((fact) => (
            <li key={fact} className="flex items-start gap-2"><Check className="text-brand-600" /><span>{fact}</span></li>
          ))}
        </ul>
      </PageHeader>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        {/* 2. Five packages */}
        <div id="paketit" data-shot="cards" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-4 gap-y-6 pt-3 scroll-mt-24">
          {PLANS.map((plan) => {
            const p = v3.plans[plan.id];
            const popular = plan.id === 'basic';
            const twoPrices = plan.noPayrollPriceCents !== undefined;
            const withPayroll = cardPayroll[plan.id] ?? true;
            const muted = popular ? 'text-white/70' : 'text-ink-700/75';
            const included = plan.id === 'basic'
              ? fill(v3.includedWithPayroll, { docs: count(plan.includedDocs, v3.units.doc), payroll: count(plan.includedPayroll, v3.units.payroll) })
              : fill(v3.included, { docs: count(plan.includedDocs, v3.units.doc) });
            const sel: Selection = {
              plan: plan.id,
              form: cardForm(plan),
              docs: plan.includedDocs,
              payslips: twoPrices && !withPayroll ? 0 : plan.includedPayroll,
              src: 'hinnasto-card',
            };
            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-5 flex flex-col ${popular ? 'bg-ink-900 text-white shadow-xl' : 'bg-white text-ink-900 border border-ink-900/10'}`}
              >
                {popular && (
                  <div className="absolute -top-3 left-5 bg-brand-600 text-white text-xs font-semibold px-3 py-1 rounded-full">{hp.popular}</div>
                )}
                <h3 className={`text-lg font-bold ${popular ? 'text-white' : 'text-ink-900'}`}>{p.name}</h3>
                <p className={`mt-1 text-sm font-semibold leading-snug lg:min-h-[3.75em] ${popular ? 'text-brand-400' : 'text-brand-700'}`}>{p.forWhom}</p>

                {twoPrices ? (
                  <fieldset className="mt-3 space-y-1.5 min-w-0">
                    <legend className="sr-only">{p.name}</legend>
                    {[false, true].map((wp) => (
                      <label
                        key={String(wp)}
                        className={`block rounded-lg border px-2.5 py-1.5 cursor-pointer ${withPayroll === wp ? 'border-brand-600 bg-brand-50' : 'border-ink-900/10'}`}
                      >
                        <input
                          type="radio"
                          name={`card-${plan.id}`}
                          checked={withPayroll === wp}
                          onChange={() => setCardPayroll((s) => ({ ...s, [plan.id]: wp }))}
                          className="sr-only"
                        />
                        <span className="block text-xs text-ink-700">{wp ? p.pricePayroll : p.priceNoPayroll}</span>
                        <span className="block text-xl font-extrabold font-mono tracking-tight whitespace-nowrap">{m(wp ? plan.priceCents : plan.noPayrollPriceCents!)}</span>
                      </label>
                    ))}
                    <p className={`text-xs ${muted}`}>{t.pricing.perMonth.trim()}</p>
                  </fieldset>
                ) : (
                  <>
                    <p className={`mt-3 text-xs font-medium ${muted}`}>{v3.from}</p>
                    <div className="flex flex-wrap items-baseline gap-x-1">
                      <span className="text-2xl xl:text-3xl font-extrabold font-mono tracking-tight whitespace-nowrap">{m(plan.priceCents)}</span>
                      <span className={`text-sm ${muted}`}>{t.pricing.perMonth}</span>
                    </div>
                  </>
                )}

                <p className={`mt-3 text-sm font-semibold ${popular ? 'text-white' : 'text-ink-900'}`}>{included}</p>
                <ul className="mt-3 space-y-2 flex-1">
                  {p.lines.map((line) => (
                    <li key={line} className={`flex items-start gap-2 text-sm ${popular ? 'text-white/85' : 'text-ink-700/85'}`}>
                      <Check />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                {plan.includedPayroll === 0 && <p className={`mt-3 text-xs ${muted}`}>{v3.toBasic}</p>}
                <a href="#vaavo" className={`mt-3 text-xs font-semibold hover:underline ${popular ? 'text-brand-400' : 'text-brand-700'}`}>{v3.allVaavo}</a>
                <StartButton
                  sel={sel}
                  className={`mt-5 block text-center py-2.5 rounded-lg text-sm font-semibold transition-colors ${popular ? 'bg-brand-600 text-white hover:bg-brand-700' : 'bg-ink-900 text-white hover:bg-ink-900/85'}`}
                >
                  {chooseLabel}
                </StartButton>
                <p className={`mt-2 text-xs leading-snug ${muted}`}>
                  {SIGNUP_OPEN ? (plan.id === 'toiminimi' ? v3.underBTmi : v3.underBOther) : v3.underA}
                </p>
              </div>
            );
          })}
        </div>

        {/* 3. Under the cards */}
        <div data-shot="below-cards" className="mt-6 space-y-2 text-sm text-ink-700 max-w-5xl">
          <a href="#yksilollinen" className="inline-flex font-semibold text-brand-700 hover:underline">{v3.noFit}</a>
          <p>{v3.everyPackage}</p>
          <p><span className="font-semibold">{v3.toseTitle}</span> {v3.toseText}</p>
          <p className="text-ink-700/75">{t.pricing.note}</p>
        </div>

        {/* 4. Package comparison, folded */}
        <details data-shot="compare" className="mt-8 rounded-2xl border border-ink-900/10 bg-white">
          <summary className="cursor-pointer px-6 py-4 font-semibold text-ink-900">{cmp.title}</summary>
          <div className="hidden md:block overflow-x-auto border-t border-ink-900/8 px-6 pb-6">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="py-3 pr-4 text-left font-medium text-ink-700/75" />
                  {PLANS.map((plan) => <th key={plan.id} className="py-3 px-3 text-left font-bold text-ink-900">{v3.plans[plan.id].name}</th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-900/8">
                {compareRows(PLANS[0]).map((row, i) => (
                  <tr key={row.label}>
                    <th scope="row" className="py-2.5 pr-4 text-left font-medium text-ink-700 align-top">{row.label}</th>
                    {PLANS.map((plan) => <td key={plan.id} className="py-2.5 px-3 align-top text-ink-900 whitespace-pre-line">{compareRows(plan)[i].value}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="md:hidden border-t border-ink-900/8 divide-y divide-ink-900/8">
            {PLANS.map((plan) => (
              <details key={plan.id} className="px-6">
                <summary className="cursor-pointer py-3 font-semibold text-ink-900">{v3.plans[plan.id].name}</summary>
                <dl className="pb-4 space-y-2">
                  {compareRows(plan).map((row) => (
                    <div key={row.label} className="flex justify-between gap-4 text-sm">
                      <dt className="text-ink-700/80">{row.label}</dt>
                      <dd className="text-right text-ink-900 whitespace-pre-line">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </details>
            ))}
          </div>
        </details>

        {/* 5. What you get in Vaavo */}
        <section id="vaavo" data-shot="vaavo" className="mt-16 scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink-900">{v3.vaavo.title}</h2>
          <p className="mt-2 text-ink-700/80 max-w-3xl">{v3.vaavo.intro}</p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {v3.vaavo.tiles.map((tile) => (
              <div key={tile.title} className="rounded-2xl border border-ink-900/10 bg-white p-5">
                <h3 className="font-bold text-ink-900 leading-snug">{tile.title}</h3>
                <ul className="mt-3 space-y-2">
                  {tile.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-ink-700/85"><Check /><span>{item}</span></li>
                  ))}
                </ul>
                {tile.note && <p className="mt-3 text-xs text-ink-700/70">{tile.note}</p>}
              </div>
            ))}
          </div>
          <p className="mt-5 font-semibold text-ink-900">{v3.vaavo.footer}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Link to={localePath('/vaavo')} className="font-semibold text-brand-700 hover:underline">{v3.vaavo.more}</Link>
            <a href={APP_STORE_URL} className="inline-flex rounded-xl bg-ink-900 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">{t.vaavo.apps.appStore}<span aria-hidden="true" className="ml-2">↗</span></a>
            <a href={GOOGLE_PLAY_URL} className="inline-flex rounded-xl bg-ink-900 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">{t.vaavo.apps.googlePlay}<span aria-hidden="true" className="ml-2">↗</span></a>
          </div>
        </section>

        {/* 6. Calculator: everything is computed in the browser */}
        <section id="laskuri" data-shot="calc" className="mt-16 rounded-3xl border border-ink-900/10 bg-white p-5 sm:p-8 scroll-mt-24">
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
              <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-700/70">{c.resultTitle}</h3>
              {quote.kind === 'quote' ? (
                <div className="mt-3">
                  <p className="text-lg font-bold text-ink-900">{c.quoteTitle}</p>
                  <p className="mt-1 text-sm text-ink-700">{c.quoteText}</p>
                  <Link to={localePath('/yhteystiedot')} className={`mt-4 ${primaryBtn}`}>{c.quoteCta}</Link>
                </div>
              ) : (
                <>
                  {((quote.uneven ? [[c.quietMonth, quote.low], [c.busyMonth, quote.high]] : [['', quote.low]]) as [string, MonthPrice][]).map(([label, mp]) => (
                    <div key={label} className="mt-2">
                      {label && <p className="text-xs text-ink-700/75">{label}</p>}
                      <p className="text-2xl font-extrabold tracking-tight text-ink-900" data-calc-month>
                        {v3.plans[mp.plan.id].name} · {m(mp.totalCents)}<span className="text-sm font-medium text-ink-700/75">{t.pricing.perMonth}</span>
                      </p>
                      {monthDetail(mp) && <p className="text-xs text-ink-700/75">{monthDetail(mp)}</p>}
                    </div>
                  ))}
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-ink-700/70">{c.includesTitle}</p>
                  <ul className="mt-1.5 space-y-1">
                    {c.includes.map((line) => <li key={line} className="flex items-start gap-2 text-sm text-ink-700"><Check />{line}</li>)}
                  </ul>
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
                  {site === 'yes' && (
                    <a href="#yrityspaketit" data-calc-site className="mt-4 block text-sm font-semibold text-brand-700 hover:underline">{c.siteResult} →</a>
                  )}
                  {calcSelection && (
                    <StartButton sel={calcSelection} className={`mt-5 w-full ${primaryBtn}`}>{chooseLabel}</StartButton>
                  )}
                </>
              )}
              <p className="mt-4 text-xs text-ink-700/75">{c.caption}</p>
            </section>
          </div>

          {/* Phone: price and button stay in view while the calculator is on screen */}
          {quote.kind === 'price' && calcSelection && (
            <div data-calc-sticky className="lg:hidden sticky bottom-0 -mx-5 sm:-mx-8 mt-6 -mb-5 sm:-mb-8 rounded-b-3xl border-t border-ink-900/10 bg-white/95 backdrop-blur-sm px-5 py-3 flex items-center justify-between gap-3">
              <p className="text-sm font-bold text-ink-900">
                {v3.plans[quote.low.plan.id].name} · {m(quote.low.totalCents)}<span className="font-medium text-ink-700/75">{t.pricing.perMonth}</span>
              </p>
              <StartButton sel={calcSelection} className="shrink-0 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white">{chooseLabel}</StartButton>
            </div>
          )}
        </section>

        {/* 7. A busier month: the full surcharge list */}
        <section data-shot="extras" className="mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink-900">{ex.title}</h2>
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-5">
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
                {[
                  { title: ex.payrollTitle, price: m(PAYROLL_CENTS), unit: ex.perPiece, text: ex.payrollText },
                  { title: ex.eInvoiceTitle, price: m(E_INVOICE_CENTS), unit: ex.perPiece, text: ex.eInvoiceText },
                  { title: ex.annualTitle, price: m(ANNUAL_HOURLY_CENTS), unit: ex.perHour, text: ex.annualText },
                ].map((row) => (
                  <div key={row.title} className="py-3 first:pt-0 last:pb-0">
                    <div className="flex items-start justify-between gap-4">
                      <dt className="font-bold text-ink-900">{row.title}</dt>
                      <dd className="text-sm font-semibold font-mono whitespace-nowrap">{row.price} <span className="font-sans text-ink-700/75">{row.unit}</span></dd>
                    </div>
                    <p className="mt-1.5 text-sm text-ink-700/80">{row.text}</p>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <p className="mt-5 flex items-start gap-2 font-medium text-ink-700"><Check className="text-brand-600" /><span>{ex.cheapest}</span></p>
        </section>

        {/* 8. Business bundles 2027: shown as coming, prices indicative, never in the calculator total */}
        <section id="yrityspaketit" data-shot="bundles" className="mt-16 scroll-mt-24">
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
                      <li key={item} className="flex items-start gap-2 text-sm text-ink-700/85"><Check /><span>{item}</span></li>
                    ))}
                  </ul>
                  <Link to={localePath('/yhteystiedot')} className="mt-5 inline-flex font-semibold text-brand-700 hover:underline">{bu.cta} →</Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* 9. Questions and answers */}
        <section data-shot="faq" className="mt-16 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink-900">{v3.faq.title}</h2>
          <div className="mt-6 divide-y divide-ink-900/10 rounded-2xl border border-ink-900/10 bg-white">
            {v3.faq.items.map((item) => (
              <details key={item.q} className="px-6">
                <summary className="cursor-pointer py-4 font-semibold text-ink-900">{item.q}</summary>
                <p className="pb-4 text-ink-700 leading-relaxed">{SIGNUP_OPEN && item.aB ? item.aB : item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* 10. The one place for a tailored offer */}
        <section id="yksilollinen" data-shot="custom" className="mt-16 rounded-2xl border border-ink-900/10 bg-white p-6 sm:p-8 scroll-mt-24">
          <h2 className="text-xl sm:text-2xl font-bold text-ink-900">{v3.custom.title}</h2>
          <p className="mt-2 text-ink-700">{v3.custom.lead}:</p>
          <ul className="mt-3 space-y-1.5">
            {v3.custom.items.map((item) => <li key={item} className="flex items-start gap-2 text-ink-700"><Check />{item}</li>)}
          </ul>
          <Link to={localePath('/yhteystiedot')} className={`mt-5 ${primaryBtn}`}>{v3.custom.cta}</Link>
        </section>

        {/* 11. Earlier blocks */}
        <section className="mt-14 max-w-3xl">
          <h2 className="text-xl font-bold text-ink-900">{t.pricing.consultationTitle}</h2>
          <p className="mt-3 text-ink-700 leading-relaxed">{t.pricing.consultationIncluded}</p>
        </section>

        <section id="suosittele" className="mt-10 rounded-2xl border border-brand-100 bg-brand-50 p-6">
          <h2 className="text-xl font-bold text-ink-900">{t.pricing.referralTitle}</h2>
          <p className="mt-3 text-ink-700 leading-relaxed">{t.pricing.referralText}</p>
          <Link to={localePath('/yhteystiedot')} className="mt-3 inline-flex font-semibold text-brand-700 hover:underline">{t.pricing.referralCta} →</Link>
        </section>

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
      </div>

      <CtaBand />
    </div>
  );
}
