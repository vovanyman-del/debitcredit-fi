import { useEffect, useState, useSyncExternalStore } from 'react';
import { useI18n, type Locale } from '../i18n/context';

// Hydration-safe "are we on the client yet?" flag. Returns false during SSR and
// the first client render (so the pre-rendered markup is static and hydration
// matches), then true after commit — without a setState-in-effect.
const noopSubscribe = () => () => {};
function useHydrated() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

// Self-contained strings for the demo. The demo has its OWN language switcher
// (it swaps the labels in place without navigating), so it can't rely on the
// route-driven `t` — it carries its own dictionary for all five locales.
interface DemoStrings {
  eyebrow: string;
  title: string;
  note: string; // small "example" tag — this is illustrative sample data
  steps: { title: string; caption: string }[]; // exactly 4
  fields: { supplier: string; amount: string; vat: string; date: string };
  ledger: {
    heading: string;
    debit: string;
    credit: string;
    purchases: string;
    vatAcct: string;
    bank: string;
    done: string;
  };
  dash: { heading: string; turnover: string; vat: string; result: string };
  added: string; // short verb tying step 3 → step 4 ("recorded")
}

// Illustrative sample receipt — identical numbers across locales (a Finnish
// café receipt: net 38,64 + ALV 9,86 = 48,50 €).
const RECEIPT = { store: 'Kahvila Aalto', date: '12.06.2026', gross: '48,50 €', vat: '9,86 €', net: '38,64 €' };
const BARS = [38, 52, 46, 64, 58, 80, 70, 92];

const STRINGS: Record<Locale, DemoStrings> = {
  ru: {
    eyebrow: 'Как это работает',
    title: 'Сняли чек — и видите свои цифры',
    note: 'пример',
    steps: [
      { title: 'Снимок чека', caption: 'Сфотографируйте чек прямо в приложении' },
      { title: 'Распознано', caption: 'Поставщик, сумма, ALV и дата — сами' },
      { title: 'В учёте', caption: 'Появляется проводка — готово' },
      { title: 'Видно сразу', caption: 'Оборот, ALV и результат — онлайн' },
    ],
    fields: { supplier: 'Поставщик', amount: 'Сумма', vat: 'ALV 25,5 %', date: 'Дата' },
    ledger: { heading: 'Проводка', debit: 'Дебет', credit: 'Кредит', purchases: 'Покупки', vatAcct: 'ALV 25,5 %', bank: 'Банк', done: 'готово' },
    dash: { heading: 'Ваши цифры', turnover: 'Оборот', vat: 'ALV', result: 'Результат' },
    added: 'учтено',
  },
  uk: {
    eyebrow: 'Як це працює',
    title: 'Зняли чек — і бачите свої цифри',
    note: 'приклад',
    steps: [
      { title: 'Знімок чека', caption: 'Сфотографуйте чек просто в застосунку' },
      { title: 'Розпізнано', caption: 'Постачальник, сума, ALV і дата — самі' },
      { title: 'В обліку', caption: 'З’являється проводка — готово' },
      { title: 'Видно одразу', caption: 'Оборот, ALV і результат — онлайн' },
    ],
    fields: { supplier: 'Постачальник', amount: 'Сума', vat: 'ALV 25,5 %', date: 'Дата' },
    ledger: { heading: 'Проводка', debit: 'Дебет', credit: 'Кредит', purchases: 'Закупівлі', vatAcct: 'ALV 25,5 %', bank: 'Банк', done: 'готово' },
    dash: { heading: 'Ваші цифри', turnover: 'Оборот', vat: 'ALV', result: 'Результат' },
    added: 'враховано',
  },
  et: {
    eyebrow: 'Kuidas see töötab',
    title: 'Pildistasid tšeki — näed kohe oma numbreid',
    note: 'näide',
    steps: [
      { title: 'Pildista tšekk', caption: 'Tee tšekist pilt otse rakenduses' },
      { title: 'Tuvastatud', caption: 'Tarnija, summa, ALV ja kuupäev — ise' },
      { title: 'Raamatupidamises', caption: 'Tekib kanne — valmis' },
      { title: 'Näed kohe', caption: 'Käive, ALV ja tulemus — reaalajas' },
    ],
    fields: { supplier: 'Tarnija', amount: 'Summa', vat: 'ALV 25,5 %', date: 'Kuupäev' },
    ledger: { heading: 'Kanne', debit: 'Deebet', credit: 'Kreedit', purchases: 'Ostud', vatAcct: 'ALV 25,5 %', bank: 'Pank', done: 'valmis' },
    dash: { heading: 'Sinu numbrid', turnover: 'Käive', vat: 'ALV', result: 'Tulemus' },
    added: 'arvestatud',
  },
  fi: {
    eyebrow: 'Näin se toimii',
    title: 'Kuvasit kuitin — näet heti omat lukusi',
    note: 'esimerkki',
    steps: [
      { title: 'Kuvaa kuitti', caption: 'Ota kuva kuitista suoraan sovelluksessa' },
      { title: 'Tunnistettu', caption: 'Toimittaja, summa, ALV ja päivä — itsestään' },
      { title: 'Kirjanpidossa', caption: 'Kirjaus syntyy — valmis' },
      { title: 'Näet heti', caption: 'Liikevaihto, ALV ja tulos — reaaliaikaisesti' },
    ],
    fields: { supplier: 'Toimittaja', amount: 'Summa', vat: 'ALV 25,5 %', date: 'Päivä' },
    ledger: { heading: 'Kirjaus', debit: 'Debet', credit: 'Kredit', purchases: 'Ostot', vatAcct: 'ALV 25,5 %', bank: 'Pankki', done: 'valmis' },
    dash: { heading: 'Omat lukusi', turnover: 'Liikevaihto', vat: 'ALV', result: 'Tulos' },
    added: 'kirjattu',
  },
  en: {
    eyebrow: 'How it works',
    title: 'Snap a receipt — and see your numbers',
    note: 'example',
    steps: [
      { title: 'Snap the receipt', caption: 'Photograph the receipt right in the app' },
      { title: 'Recognised', caption: 'Supplier, amount, VAT and date — automatically' },
      { title: 'Booked', caption: 'A journal entry appears — done' },
      { title: 'See it instantly', caption: 'Turnover, VAT and result — in real time' },
    ],
    fields: { supplier: 'Supplier', amount: 'Amount', vat: 'VAT 25.5%', date: 'Date' },
    ledger: { heading: 'Journal entry', debit: 'Debit', credit: 'Credit', purchases: 'Purchases', vatAcct: 'VAT 25.5%', bank: 'Bank', done: 'done' },
    dash: { heading: 'Your numbers', turnover: 'Turnover', vat: 'VAT', result: 'Result' },
    added: 'recorded',
  },
};

// Demo language switcher order requested for the product story.
const DEMO_LOCALES: { code: Locale; label: string }[] = [
  { code: 'ru', label: 'RU' },
  { code: 'uk', label: 'UK' },
  { code: 'et', label: 'ET' },
  { code: 'fi', label: 'FI' },
  { code: 'en', label: 'EN' },
];

const STEP_MS = 5000;

export default function VaavoDemo() {
  const { locale } = useI18n();
  // Initial demo language follows the page route → deterministic on server and
  // first client render, so hydration matches. The switcher overrides it later.
  const [demoLocale, setDemoLocale] = useState<Locale>(locale);
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  // Animations + auto-advance start only after mount (post-hydration). The
  // pre-rendered frame is the static, fully-visible step 1.
  const mounted = useHydrated();

  useEffect(() => {
    if (!mounted || paused) return;
    const id = setTimeout(() => setStep((s) => (s + 1) % 4), STEP_MS);
    return () => clearTimeout(id);
  }, [mounted, paused, step]);

  const d = STRINGS[demoLocale];
  // Apply an entrance/loop class only once mounted (keeps SSR markup static).
  const a = (cls: string) => (mounted ? cls : '');

  return (
    <section className="bg-canvas border-y border-ink-900/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Heading + demo language switcher */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
          <div>
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.12em] text-brand-600">{d.eyebrow}</p>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-ink-900 max-w-xl">{d.title}</h2>
          </div>
          <div
            className="flex items-center gap-1 rounded-full border border-ink-900/10 bg-white p-1 shrink-0"
            role="group"
            aria-label="Demo language"
          >
            {DEMO_LOCALES.map((l) => {
              const active = l.code === demoLocale;
              return (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setDemoLocale(l.code)}
                  aria-pressed={active}
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${
                    active ? 'bg-brand-500 text-white' : 'text-ink-700/70 hover:text-ink-900 hover:bg-ink-900/5'
                  }`}
                >
                  {l.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Stage + step rail */}
        <div className="mt-10 grid gap-8 lg:gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] items-center">
          {/* Device stage */}
          <div
            className={`relative rounded-3xl border border-ink-900/10 bg-gradient-to-b from-white to-brand-50/40 p-6 sm:p-10 ${
              paused ? 'vd-paused' : ''
            }`}
            style={{ ['--vd-step' as string]: `${STEP_MS}ms` }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* "example" honesty tag */}
            <span className="absolute top-4 right-4 z-20 rounded-full bg-ink-900/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink-700/60">
              {d.note}
            </span>

            <div className="mx-auto w-[220px] sm:w-[244px]">
              {/* Phone frame */}
              <div className="relative aspect-[9/19] rounded-[2rem] border-[6px] border-ink-900 bg-ink-900 shadow-xl">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 h-5 w-24 rounded-b-2xl bg-ink-900" />
                <div className="absolute inset-[2px] overflow-hidden rounded-[1.6rem] bg-canvas">
                  {/* key forces the entrance animations to replay on each step */}
                  <div key={step} className="absolute inset-0">
                    <Screen step={step} d={d} a={a} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step rail */}
          <ol className="space-y-2.5">
            {d.steps.map((s, i) => {
              const active = i === step;
              return (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => setStep(i)}
                    aria-current={active ? 'step' : undefined}
                    className={`group w-full text-left rounded-2xl border p-4 transition-all ${
                      active
                        ? 'border-brand-400 bg-white shadow-sm'
                        : 'border-ink-900/10 bg-white/40 hover:border-brand-400/50 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                          active ? 'bg-brand-500 text-white' : 'bg-ink-900/5 text-ink-700/60'
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span className={`font-semibold ${active ? 'text-ink-900' : 'text-ink-700/80'}`}>{s.title}</span>
                    </div>
                    <p className="mt-1.5 pl-10 text-sm text-ink-700/60">{s.caption}</p>
                    {/* auto-advance progress bar (only under the active step) */}
                    <div className="mt-2.5 ml-10 h-0.5 overflow-hidden rounded-full bg-ink-900/5" aria-hidden>
                      {active && mounted && <div key={step} className="vd-progress h-full bg-brand-500" />}
                    </div>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ── Per-step phone screens ───────────────────────────────────────────────── */

function Screen({ step, d, a }: { step: number; d: DemoStrings; a: (c: string) => string }) {
  if (step === 0) return <ScreenSnap a={a} />;
  if (step === 1) return <ScreenRecognised d={d} a={a} />;
  if (step === 2) return <ScreenBooked d={d} a={a} />;
  return <ScreenDashboard d={d} a={a} />;
}

/** A small paper-receipt graphic reused in the first two screens. */
function ReceiptCard({ small }: { small?: boolean }) {
  return (
    <div className={`rounded-lg bg-white shadow-sm ring-1 ring-ink-900/10 ${small ? 'p-2.5' : 'p-3'}`}>
      <div className="text-center text-[10px] font-bold tracking-wide text-ink-900">{RECEIPT.store}</div>
      <div className="mx-auto mt-1 h-px w-2/3 bg-ink-900/10" />
      <div className="mt-2 space-y-1">
        {['w-3/4', 'w-1/2', 'w-2/3'].map((w, i) => (
          <div key={i} className="flex items-center justify-between">
            <span className={`h-1.5 rounded-full bg-ink-900/15 ${w}`} />
            <span className="h-1.5 w-5 rounded-full bg-ink-900/10" />
          </div>
        ))}
      </div>
      <div className="mx-auto mt-2 h-px w-full bg-ink-900/10" />
      <div className="mt-1.5 flex items-center justify-between text-[10px] font-bold text-ink-900">
        <span>Σ</span>
        <span className="font-mono">{RECEIPT.gross}</span>
      </div>
    </div>
  );
}

function ScreenSnap({ a }: { a: (c: string) => string }) {
  return (
    <div className="absolute inset-0 flex flex-col bg-ink-900">
      <div className="relative flex flex-1 items-center justify-center p-5">
        {/* viewfinder brackets */}
        {[
          'top-3 left-3 border-l-2 border-t-2 rounded-tl',
          'top-3 right-3 border-r-2 border-t-2 rounded-tr',
          'bottom-3 left-3 border-l-2 border-b-2 rounded-bl',
          'bottom-3 right-3 border-r-2 border-b-2 rounded-br',
        ].map((c, i) => (
          <span key={i} className={`absolute h-6 w-6 border-brand-400/80 ${c}`} />
        ))}
        <div className={`w-32 rotate-[-4deg] ${a('vd-scale-in')}`}>
          <ReceiptCard />
        </div>
      </div>
      {/* shutter bar */}
      <div className="flex h-16 items-center justify-center bg-black/40">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-white/80">
          <span className="h-8 w-8 rounded-full bg-white/90" />
        </span>
      </div>
    </div>
  );
}

function ScreenRecognised({ d, a }: { d: DemoStrings; a: (c: string) => string }) {
  const rows: [string, string][] = [
    [d.fields.supplier, RECEIPT.store],
    [d.fields.amount, RECEIPT.gross],
    [d.fields.vat, RECEIPT.vat],
    [d.fields.date, RECEIPT.date],
  ];
  return (
    <div className="absolute inset-0 flex flex-col gap-2.5 bg-canvas p-3">
      <div className="relative overflow-hidden rounded-lg">
        <ReceiptCard small />
        {/* scanning sweep */}
        <span className={`pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-brand-400/0 via-brand-400/40 to-brand-400/0 ${a('vd-scan')}`} />
      </div>
      <div className="space-y-1.5">
        {rows.map(([label, value], i) => (
          <div
            key={i}
            className={`flex items-center justify-between rounded-lg bg-white px-2.5 py-1.5 ring-1 ring-ink-900/5 ${a('vd-fade-up')}`}
            style={{ animationDelay: `${150 + i * 130}ms` }}
          >
            <span className="text-[10px] font-medium uppercase tracking-wide text-ink-700/50">{label}</span>
            <span className="font-mono text-xs font-semibold text-ink-900">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScreenBooked({ d, a }: { d: DemoStrings; a: (c: string) => string }) {
  const lines: { side: string; acct: string; amount: string; credit?: boolean }[] = [
    { side: d.ledger.debit, acct: d.ledger.purchases, amount: RECEIPT.net },
    { side: d.ledger.debit, acct: d.ledger.vatAcct, amount: RECEIPT.vat },
    { side: d.ledger.credit, acct: d.ledger.bank, amount: RECEIPT.gross, credit: true },
  ];
  return (
    <div className="absolute inset-0 flex flex-col bg-canvas p-3">
      <div className="text-[10px] font-semibold uppercase tracking-wide text-ink-700/50">{d.ledger.heading}</div>
      <div className="mt-2 space-y-1.5">
        {lines.map((l, i) => (
          <div
            key={i}
            className={`flex items-center gap-2 rounded-lg bg-white px-2.5 py-2 ring-1 ring-ink-900/5 ${a('vd-fade-up')}`}
            style={{ animationDelay: `${120 + i * 150}ms` }}
          >
            <span
              className={`rounded px-1.5 py-0.5 text-[9px] font-bold uppercase ${
                l.credit ? 'bg-accent-500/15 text-accent-700' : 'bg-brand-500/15 text-brand-700'
              }`}
            >
              {l.side}
            </span>
            <span className="flex-1 truncate text-[11px] text-ink-900">{l.acct}</span>
            <span className="font-mono text-[11px] font-semibold text-ink-900">{l.amount}</span>
          </div>
        ))}
      </div>
      <div className="mt-auto flex items-center justify-center pb-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full bg-brand-500 px-3 py-1.5 text-xs font-semibold text-white ${a('vd-pop')}`}
          style={{ animationDelay: '560ms' }}
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 10.5l4 4 8-9" />
          </svg>
          {d.ledger.done}
        </span>
      </div>
    </div>
  );
}

function ScreenDashboard({ d, a }: { d: DemoStrings; a: (c: string) => string }) {
  const tiles: [string, string][] = [
    [d.dash.turnover, '48 920 €'],
    [d.dash.vat, '12 840 €'],
    [d.dash.result, '1 248 €'],
  ];
  return (
    <div className="absolute inset-0 flex flex-col bg-canvas p-3">
      <div className="text-[10px] font-semibold uppercase tracking-wide text-ink-700/50">{d.dash.heading}</div>
      <div className="mt-2 grid grid-cols-3 gap-1.5">
        {tiles.map(([label, value], i) => (
          <div
            key={i}
            className={`rounded-lg bg-white p-2 ring-1 ring-ink-900/5 ${a('vd-fade-up')}`}
            style={{ animationDelay: `${100 + i * 110}ms` }}
          >
            <div className="text-[8px] uppercase tracking-wider text-ink-700/45">{label}</div>
            <div className="mt-0.5 font-mono text-[11px] font-bold text-ink-900">{value}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-1 items-end gap-1.5">
        {BARS.map((h, i) => (
          <span
            key={i}
            className={`flex-1 rounded-t ${i === BARS.length - 1 ? 'bg-brand-500' : 'bg-ink-900/10'} ${a('vd-bar')}`}
            style={{ height: `${h}%`, animationDelay: `${200 + i * 70}ms` }}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-end">
        <span
          className={`inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-700 ${a('vd-fade-up')}`}
          style={{ animationDelay: '900ms' }}
        >
          +{RECEIPT.gross} · {d.added}
        </span>
      </div>
    </div>
  );
}
