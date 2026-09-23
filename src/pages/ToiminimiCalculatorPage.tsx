import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n, type Locale } from '../i18n/context';
import PageHeader from '../components/PageHeader';
import CtaBand from '../components/CtaBand';
import { getGuide, keepAmountsTogether as keep } from '../data/guides';
import { calculateToiminimiTax2026, TAX_2026 } from '../data/calculators/toiminimiTax2026';

// Formatting is done by hand, not with Intl: the prerendered HTML and the browser must produce
// byte-identical strings, otherwise hydration mismatches (ICU versions differ in spaces).
const NBSP = String.fromCharCode(160);
const MINUS = String.fromCharCode(8722);

function euros(n: number, locale: Locale): string {
  const v = Math.round(n);
  const digits = String(Math.abs(v)).replace(/\B(?=(\d{3})+(?!\d))/g, locale === 'en' ? ',' : NBSP);
  const sign = v < 0 ? MINUS : '';
  return locale === 'en' ? `${sign}€${digits}` : `${sign}${digits}${NBSP}€`;
}

function percent(x: number, locale: Locale): string {
  const s = (x * 100).toFixed(1);
  if (locale === 'en') return `${s}%`;
  if (locale === 'et') return `${s.replace('.', ',')}%`;
  return `${s.replace('.', ',')}${NBSP}%`;
}

// "40 000", "40000,5" and "40.000" in fi/ru/et/uk; "40,000" and "40000.5" in en.
function parseNumber(s: string, locale: Locale): number {
  let x = s.replace(/\s/g, '');
  if (locale === 'en') x = x.replace(/,/g, '');
  else if (x.includes(',')) x = x.replace(/\./g, '').replace(',', '.');
  else if (/^\d{1,3}(\.\d{3})+$/.test(x)) x = x.replace(/\./g, '');
  const v = Number(x);
  return Number.isFinite(v) ? v : 0;
}

const SOURCES = {
  taxBases: 'https://www.vero.fi/syventavat-vero-ohjeet/paatokset/47363/verohallinnon-paatos-ennakonpidatysprosenttien-laskentaperusteista-palkkatuloa-varten-ja-ennakonkannossa-maarattavan-ennakkoveron-laskentaperusteista-vuodelle-2026/',
  scale: 'https://www.vero.fi/henkiloasiakkaat/verokortti-ja-veroilmoitus/tulot/ansiotulot/',
  municipal: 'https://www.vero.fi/syventavat-vero-ohjeet/paatokset/47465/kuntien-ja-seurakuntien-tuloveroprosentit-vuonna-2026/',
  yel: 'https://www.etk.fi/ajankohtaista/tyoelakemaksut-vuonna-2026/',
};

const inputCls =
  'w-full px-4 py-2.5 border border-ink-900/15 rounded-xl bg-white text-ink-900 focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 outline-none transition-shadow';

export default function ToiminimiCalculatorPage() {
  const { t, locale, localePath } = useI18n();
  const c = t.calc;
  const decimal = (n: number) => (locale === 'en' ? n.toFixed(2) : n.toFixed(2).replace('.', ','));

  const [profit, setProfit] = useState('40000');
  const [yelIncome, setYelIncome] = useState('20000');
  const [starter, setStarter] = useState(true);
  const [municipal, setMunicipal] = useState(decimal(TAX_2026.averageMunicipalRate));
  const [church, setChurch] = useState('0');

  const r = useMemo(
    () => calculateToiminimiTax2026({
      profit: parseNumber(profit, locale),
      yelIncome: parseNumber(yelIncome, locale),
      starter,
      municipalRate: parseNumber(municipal, locale),
      churchRate: parseNumber(church, locale),
    }),
    [profit, yelIncome, starter, municipal, church, locale],
  );
  const yelBelowMinimum = parseNumber(yelIncome, locale) > 0 && !r.yelInsured;
  const related = getGuide('toiminimen-verotus');

  // Whole euros on screen: the total is the sum of the shown rows and «you keep» is profit minus
  // that total, so the figures on the page always add up.
  const rows: { label: string; value: number }[] = [
    { label: c.rowYel, value: r.yel },
    { label: c.rowState, value: r.stateTax },
    { label: c.rowMunicipal, value: r.municipalTax },
    ...(r.churchTax > 0 ? [{ label: c.rowChurch, value: r.churchTax }] : []),
    { label: c.rowHealth, value: r.healthCare + r.dailyAllowance },
    { label: c.rowYle, value: r.yleTax },
  ].map((row) => ({ ...row, value: Math.round(row.value) }));
  const totalShown = rows.reduce((sum, row) => sum + row.value, 0);
  const netShown = Math.round(Math.max(0, parseNumber(profit, locale))) - totalShown;

  return (
    <div className="bg-canvas text-ink-900">
      <PageHeader eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Inputs */}
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="calc-profit" className="block text-sm font-medium text-ink-700 mb-1.5">{c.profitLabel}</label>
              <input id="calc-profit" type="text" inputMode="decimal" value={profit} onChange={(e) => setProfit(e.target.value)} aria-describedby="calc-profit-hint" className={inputCls} />
              <p id="calc-profit-hint" className="mt-1.5 text-xs text-ink-700/70">{keep(c.profitHint)}</p>
            </div>
            <div>
              <label htmlFor="calc-yel" className="block text-sm font-medium text-ink-700 mb-1.5">{c.yelLabel}</label>
              <input id="calc-yel" type="text" inputMode="decimal" value={yelIncome} onChange={(e) => setYelIncome(e.target.value)} aria-describedby="calc-yel-hint" className={inputCls} />
              <p id="calc-yel-hint" className="mt-1.5 text-xs text-ink-700/70">{keep(c.yelHint)}</p>
            </div>
            <label className="flex items-start gap-3 text-sm text-ink-700">
              <input type="checkbox" checked={starter} onChange={(e) => setStarter(e.target.checked)} className="mt-0.5 h-4 w-4 accent-brand-600" />
              <span>{keep(c.starterLabel)}</span>
            </label>
            <div>
              <label htmlFor="calc-municipal" className="block text-sm font-medium text-ink-700 mb-1.5">{c.municipalLabel}</label>
              <input id="calc-municipal" type="text" inputMode="decimal" value={municipal} onChange={(e) => setMunicipal(e.target.value)} aria-describedby="calc-municipal-hint" className={inputCls} />
              <p id="calc-municipal-hint" className="mt-1.5 text-xs text-ink-700/70">{keep(c.municipalHint)}</p>
            </div>
            <div>
              <label htmlFor="calc-church" className="block text-sm font-medium text-ink-700 mb-1.5">{c.churchLabel}</label>
              <input id="calc-church" type="text" inputMode="decimal" value={church} onChange={(e) => setChurch(e.target.value)} aria-describedby="calc-church-hint" className={inputCls} />
              <p id="calc-church-hint" className="mt-1.5 text-xs text-ink-700/70">{keep(c.churchHint)}</p>
            </div>
          </form>

          {/* Result */}
          <section aria-live="polite" className="rounded-2xl border border-ink-900/10 bg-white p-6 self-start">
            <h2 className="text-lg font-bold text-ink-900">{c.resultTitle}</h2>
            {yelBelowMinimum && <p className="mt-3 text-sm text-amber-800 bg-amber-50 rounded-lg px-3 py-2">{keep(c.belowMinYel)}</p>}
            <dl className="mt-4 divide-y divide-ink-900/8">
              {rows.map((row) => (
                <div key={row.label} className="flex items-start justify-between gap-4 py-2.5">
                  <dt className="text-sm text-ink-700">{row.label}</dt>
                  <dd className="text-sm font-semibold tabular-nums whitespace-nowrap">{euros(row.value, locale)}</dd>
                </div>
              ))}
              <div className="flex items-start justify-between gap-4 py-2.5">
                <dt className="text-sm font-semibold text-ink-900">{c.rowTotal}</dt>
                <dd className="text-sm font-bold tabular-nums whitespace-nowrap">{euros(totalShown, locale)}</dd>
              </div>
            </dl>
            <div className="mt-4 rounded-xl bg-brand-50 border border-brand-100 p-4">
              <p className="text-sm text-ink-700">{c.netYear}</p>
              <p className="mt-1 text-3xl font-extrabold tabular-nums tracking-tight text-ink-900" data-calc-net>{euros(netShown, locale)}</p>
              <p className="mt-1 text-sm text-ink-700">{euros(netShown / 12, locale)} {c.netMonth}</p>
            </div>
            <p className="mt-3 text-xs text-ink-700/75">{c.share}: {percent(r.shareOfProfit, locale)}</p>
          </section>
        </div>

        <section className="mt-12 max-w-3xl">
          <h2 className="text-xl font-bold text-ink-900">{c.assumptionsTitle}</h2>
          <ul className="mt-3 list-disc pl-5 space-y-1.5 text-ink-700 leading-relaxed">
            {c.assumptions.map((a) => <li key={a}>{keep(a)}</li>)}
          </ul>
          {related && (
            <Link to={localePath(`/opas/${related.slug}`)} className="mt-4 inline-flex font-semibold text-brand-700 hover:underline">
              {related.content[locale].title} →
            </Link>
          )}
        </section>

        <section className="mt-10 rounded-2xl border border-brand-100 bg-brand-50 p-6 max-w-3xl">
          <h2 className="text-xl font-bold text-ink-900">{c.ctaTitle}</h2>
          <p className="mt-3 text-ink-700 leading-relaxed">{keep(c.ctaText)}</p>
          <Link to={localePath('/yhteystiedot')} className="mt-3 inline-flex font-semibold text-brand-700 hover:underline">{c.ctaButton} →</Link>
        </section>

        <section className="mt-10 max-w-3xl">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-700/75">{c.sourcesTitle}</h2>
          <ul className="mt-3 space-y-1.5 text-sm">
            <li><a href={SOURCES.taxBases} target="_blank" rel="noopener noreferrer" className="text-brand-700 hover:underline">{c.srcTaxBases}</a></li>
            <li><a href={SOURCES.scale} target="_blank" rel="noopener noreferrer" className="text-brand-700 hover:underline">{c.srcScale}</a></li>
            <li><a href={SOURCES.municipal} target="_blank" rel="noopener noreferrer" className="text-brand-700 hover:underline">{c.srcMunicipal}</a></li>
            <li><a href={SOURCES.yel} target="_blank" rel="noopener noreferrer" className="text-brand-700 hover:underline">{c.srcYel}</a></li>
          </ul>
        </section>
      </div>

      <CtaBand />
    </div>
  );
}
