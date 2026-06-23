import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/context';
import type { Translations } from '../i18n/context';
import { packages, company } from '../data/pricing';

/* ---------- small inline icons (brand-green, stroke) ---------- */
const icon = (path: React.ReactNode) => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
    {path}
  </svg>
);
const IconRocket = icon(<path strokeLinecap="round" strokeLinejoin="round" d="M5 15l-1.5 4.5L8 18m3.5-9.5a6 6 0 018-8 6 6 0 01-8 8zm0 0L8 12l4 4 3.5-3.5M9 16a3 3 0 00-3 3" />);
const IconSwitch = icon(<path strokeLinecap="round" strokeLinejoin="round" d="M4 7h13l-3-3m3 3l-3 3M20 17H7l3-3m-3 3l3 3" />);
const IconEye = icon(<path strokeLinecap="round" strokeLinejoin="round" d="M2.5 12S5.5 5.5 12 5.5 21.5 12 21.5 12 18.5 18.5 12 18.5 2.5 12 2.5 12zM12 15a3 3 0 100-6 3 3 0 000 6z" />);
const IconBank = icon(<path strokeLinecap="round" strokeLinejoin="round" d="M3 10l9-5 9 5M5 10v8m4-8v8m6-8v8m4-8v8M3 21h18" />);
const IconCamera = icon(<path strokeLinecap="round" strokeLinejoin="round" d="M4 8h3l1.5-2h7L17 8h3a1 1 0 011 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1zm8 9a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" />);
const IconChat = icon(<path strokeLinecap="round" strokeLinejoin="round" d="M21 12a8 8 0 01-11.6 7.1L4 20l.9-5.4A8 8 0 1121 12z" />);
const IconBook = icon(<path strokeLinecap="round" strokeLinejoin="round" d="M4 5a2 2 0 012-2h11a1 1 0 011 1v14a1 1 0 01-1 1H6a2 2 0 00-2 2V5zM8 7h7M8 11h7" />);
const IconTax = icon(<path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6M9 11h6M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2zm5-6.5l-2 4" />);
const IconBuilding = icon(<path strokeLinecap="round" strokeLinejoin="round" d="M5 21V5a2 2 0 012-2h6a2 2 0 012 2v16M15 21h4V9a2 2 0 00-2-2h-2M8 7h2M8 11h2M8 15h2" />);
const IconPay = icon(<path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18v10H3zM3 11h18M7 15h4" />);
const Check = (
  <svg className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const fmt = (n: number) => n.toFixed(2).replace('.', ',');

export default function HomePage() {
  const { t, localePath } = useI18n();
  const h = t.home;
  const featured = [packages[0], packages[2], packages[4]]; // micro, basic, large

  const services = [
    { ...h.services.bookkeeping, icon: IconBook },
    { ...h.services.tax, icon: IconTax },
    { ...h.services.formation, icon: IconBuilding },
    { ...h.services.payroll, icon: IconPay },
  ];
  const steps = [h.howItWorks.step1, h.howItWorks.step2, h.howItWorks.step3, h.howItWorks.step4];
  const personas = [
    { ...h.personas.opening, icon: IconRocket, to: '/yrittajaksi' },
    { ...h.personas.switching, icon: IconSwitch, to: '/vaihda-tilitoimistoa' },
    { ...h.personas.blackbox, icon: IconEye, to: '/vaavo' },
  ];
  const statItems = [
    { v: h.stats.years, l: h.stats.yearsLabel },
    { v: h.stats.launches, l: h.stats.launchesLabel },
    { v: h.stats.salaries, l: h.stats.salariesLabel },
    { v: h.stats.declarations, l: h.stats.declarationsLabel },
  ];
  const numberItems = [...statItems, { v: h.numbers.reports, l: h.numbers.reportsLabel }];

  return (
    <div className="bg-canvas text-ink-900">
      {/* ===== 2. HERO ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(18,154,106,0.10),transparent_60%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 text-center">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.12em] text-brand-600">
            — {h.hero.eyebrow}
          </p>
          <h1 className="mt-5 text-[clamp(1.875rem,8vw,2.5rem)] sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] sm:leading-[1.04] text-ink-900">
            {h.hero.title}
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-ink-700/80 leading-relaxed max-w-2xl mx-auto">
            {h.hero.subtitle}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to={localePath('/yhteystiedot')} className="inline-flex justify-center items-center px-7 py-3.5 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-colors shadow-sm shadow-brand-500/20">
              {h.hero.cta}
            </Link>
            <Link to={localePath('/vaavo')} className="inline-flex justify-center items-center px-7 py-3.5 border border-ink-900/15 text-ink-900 font-semibold rounded-xl hover:border-brand-500 hover:text-brand-600 transition-colors">
              {h.hero.ctaSecondary}
            </Link>
          </div>
        </div>

        {/* Live Vaavo card */}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <VaavoCard h={h} />
        </div>

        {/* Stats bar */}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pb-16 sm:pb-20">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-8 sm:gap-y-0 sm:divide-x divide-ink-900/10 text-center">
            {statItems.map((s, i) => (
              <div key={i} className="px-2">
                <div className="text-xl sm:text-2xl font-bold text-ink-900 whitespace-nowrap">{s.v}</div>
                <div className="mt-1 text-xs sm:text-sm text-ink-700/75">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. PERSONAS ===== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-600">{h.personas.eyebrow}</p>
        <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-ink-900 max-w-2xl leading-tight">{h.personas.title}</h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {personas.map((p) => (
            <div key={p.to} className="rounded-2xl border border-ink-900/10 bg-white p-7 flex flex-col">
              <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">{p.icon}</div>
              <h3 className="mt-5 text-lg font-bold text-ink-900">{p.title}</h3>
              <p className="mt-2 text-sm text-ink-700/75 leading-relaxed flex-1">{p.desc}</p>
              <Link to={localePath(p.to)} className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700">
                {p.cta} <span aria-hidden>→</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 4. INVISIBLE → VISIBLE (dark) ===== */}
      <section className="bg-ink-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-400">{h.invisible.eyebrow}</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold leading-tight">{h.invisible.title}</h2>
            <p className="mt-4 text-lg text-white/70 leading-relaxed">{h.invisible.lead}</p>
            <ul className="mt-8 space-y-5">
              {[
                { ...h.invisible.bank, icon: IconBank },
                { ...h.invisible.photo, icon: IconCamera },
                { ...h.invisible.language, icon: IconChat },
              ].map((it, i) => (
                <li key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 text-brand-400 flex items-center justify-center shrink-0">{it.icon}</div>
                  <div>
                    <div className="font-semibold">{it.title}</div>
                    <div className="text-sm text-white/60 mt-0.5">{it.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <DarkPanel title={h.invisible.panelTitle} />
        </div>
      </section>

      {/* ===== 5. SERVICES ===== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <h2 className="text-3xl sm:text-4xl font-bold text-ink-900 mb-12">{h.services.title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((svc, i) => (
            <div key={i} className="rounded-2xl border border-ink-900/10 bg-white p-6 hover:border-brand-400/60 hover:shadow-sm transition-all">
              <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">{svc.icon}</div>
              <h3 className="mt-5 text-base font-bold text-ink-900">{svc.title}</h3>
              <p className="mt-2 text-sm text-ink-700/75 leading-relaxed">{svc.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 6. HOW IT WORKS ===== */}
      <section className="bg-white border-y border-ink-900/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-600">{h.howItWorks.eyebrow}</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-ink-900 mb-12">{h.howItWorks.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((step, i) => (
              <div key={i} className="rounded-2xl border border-ink-900/10 bg-canvas p-6">
                <div className="text-sm font-mono font-semibold text-brand-600">#{i + 1}</div>
                <h3 className="mt-3 text-base font-bold text-ink-900">{step.title}</h3>
                <p className="mt-2 text-sm text-ink-700/75 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 7. PRICING ===== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-600">{h.packages.eyebrow}</p>
        <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-ink-900">{h.packages.title}</h2>
        <p className="mt-3 text-ink-700/75 text-lg max-w-2xl">{h.packages.subtitle}</p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {featured.map((pkg, i) => {
            const popular = i === 1;
            const name = t.pricing.packageNames[pkg.id as keyof typeof t.pricing.packageNames];
            const feats = (t.pricing.packageFeatures[pkg.id as keyof typeof t.pricing.packageFeatures] || []).slice(0, 4);
            return (
              <div
                key={pkg.id}
                className={`relative rounded-2xl p-7 ${popular ? 'bg-ink-900 text-white shadow-xl md:-mt-3 md:pb-9' : 'bg-white text-ink-900 border border-ink-900/10'}`}
              >
                {popular && (
                  <div className="absolute -top-3 left-7 bg-brand-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {h.packages.popular}
                  </div>
                )}
                <h3 className={`text-lg font-bold ${popular ? 'text-white' : 'text-ink-900'}`}>{name}</h3>
                <p className={`mt-1 text-xs ${popular ? 'text-white/70' : 'text-ink-700/75'}`}>
                  {t.pricing.packageTargets[pkg.id as keyof typeof t.pricing.packageTargets]}
                </p>
                <div className="mt-5 flex items-baseline gap-1.5">
                  <span className="text-4xl font-extrabold font-mono tracking-tight">{fmt(pkg.price)}&nbsp;€</span>
                  <span className={`text-sm ${popular ? 'text-white/70' : 'text-ink-700/75'}`}>{h.packages.perMonth}</span>
                </div>
                <p className={`mt-1 text-xs font-medium ${popular ? 'text-brand-400' : 'text-brand-600'}`}>{h.packages.vaavoIncluded}</p>
                <ul className="mt-6 space-y-2.5">
                  {feats.map((f, j) => (
                    <li key={j} className={`flex items-start gap-2 text-sm ${popular ? 'text-white/80' : 'text-ink-700/80'}`}>
                      {Check}
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={localePath('/hinnasto')}
                  className={`mt-7 block text-center py-2.5 rounded-lg text-sm font-semibold transition-colors ${popular ? 'bg-brand-600 text-white hover:bg-brand-700' : 'bg-ink-900/5 text-ink-900 hover:bg-ink-900/10'}`}
                >
                  {h.packages.choose} «{name}»
                </Link>
              </div>
            );
          })}
        </div>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-ink-700/75">{h.packages.note}</p>
          <Link to={localePath('/hinnasto')} className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700">
            {h.packages.viewAll} <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* ===== 8. TEAM (named accountant) ===== */}
      <section className="bg-white border-y border-ink-900/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-600">{h.team.eyebrow}</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-ink-900 max-w-2xl leading-tight">{h.team.title}</h2>
          <p className="mt-4 text-lg text-ink-700/75 max-w-2xl">{h.team.subtitle}</p>
          <div className="mt-10 max-w-xl rounded-2xl border border-ink-900/10 bg-canvas p-7 flex gap-5 items-start">
            <div className="w-16 h-16 rounded-2xl bg-ink-900 text-white flex items-center justify-center text-xl font-bold shrink-0">
              {h.team.name.split(' ').map((w) => w[0]).join('')}
            </div>
            <div>
              <div className="text-lg font-bold text-ink-900">{h.team.name}</div>
              <div className="text-sm text-brand-600 font-medium">{h.team.role}</div>
              <div className="mt-1 text-xs font-mono text-ink-700/75">{h.team.langs}</div>
              <p className="mt-3 text-sm text-ink-700/75 leading-relaxed">{h.team.desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 9. TESTIMONIAL ===== */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-7xl leading-none font-serif text-brand-500/30" aria-hidden>“</div>
        <blockquote className="-mt-6 text-xl sm:text-2xl font-medium text-ink-900 leading-relaxed">
          {h.testimonial.quote}
        </blockquote>
        <div className="mt-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-500/15 text-brand-700 flex items-center justify-center font-bold">
            {h.testimonial.author[0]}
          </div>
          <div>
            <div className="font-semibold text-ink-900">{h.testimonial.author}</div>
            <div className="text-sm text-ink-700/75">{h.testimonial.company}</div>
          </div>
        </div>
      </section>

      {/* ===== IN NUMBERS ===== */}
      <section className="bg-white border-y border-ink-900/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-600">{h.numbers.eyebrow}</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-ink-900 max-w-2xl leading-tight">{h.numbers.title}</h2>
          <p className="mt-4 text-lg text-ink-700/75 max-w-2xl">{h.numbers.subtitle}</p>
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {numberItems.map((s, i) => (
              <div key={i} className="rounded-2xl border border-ink-900/10 bg-canvas p-6 text-center">
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-brand-600 tracking-tight whitespace-nowrap">{s.v}</div>
                <div className="mt-2 text-sm text-ink-700/75 leading-snug">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 10. FINAL CTA (green band) ===== */}
      <section className="bg-brand-600">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight">{h.finalCta.title}</h2>
          <p className="mt-3 text-lg text-white">{h.finalCta.subtitle}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to={localePath('/yhteystiedot')} className="inline-flex justify-center items-center px-7 py-3.5 bg-white text-brand-700 font-semibold rounded-xl hover:bg-brand-50 transition-colors">
              {h.finalCta.cta}
            </Link>
            <a href={company.social.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center items-center gap-2 px-7 py-3.5 border border-white/40 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              {h.finalCta.whatsapp}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ===== Live Vaavo overview card (hero) — illustrative figures ===== */
function VaavoCard({ h }: { h: Translations['home'] }) {
  const c = h.heroCard;
  return (
    <div className="rounded-2xl border border-ink-900/10 bg-white shadow-xl shadow-ink-900/5 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-ink-900/8">
        <div className="flex items-center gap-2 text-sm">
          <span className="font-bold text-ink-900">{c.brand}</span>
          <span className="text-ink-700/75">· {c.badge} · 2025</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-600">
          <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" /> {c.live}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-px bg-ink-900/8">
        {/* Turnover */}
        <div className="bg-white p-4 sm:p-5">
          <div className="text-[10px] uppercase tracking-wider text-ink-700/75">{c.turnover}</div>
          <div className="mt-1 text-base sm:text-xl font-bold font-mono text-ink-900">48&nbsp;920,00&nbsp;€</div>
          <div className="mt-2 flex items-end gap-1 h-8">
            {[40, 55, 48, 70, 62, 85].map((v, i) => (
              <span key={i} className="flex-1 rounded-sm bg-brand-500/80" style={{ height: `${v}%` }} />
            ))}
          </div>
        </div>
        {/* VAT */}
        <div className="bg-white p-4 sm:p-5">
          <div className="text-[10px] uppercase tracking-wider text-ink-700/75">{c.vat}</div>
          <div className="mt-1 text-base sm:text-xl font-bold font-mono text-ink-900">12&nbsp;840&nbsp;€</div>
          <div className="mt-2 flex items-end gap-1 h-8">
            {[30, 45, 38, 52, 60, 48].map((v, i) => (
              <span key={i} className="flex-1 rounded-sm bg-ink-900/15" style={{ height: `${v}%` }} />
            ))}
          </div>
        </div>
        {/* Result */}
        <div className="bg-brand-50/60 p-4 sm:p-5">
          <div className="text-[10px] uppercase tracking-wider text-brand-700">{c.result}</div>
          <div className="mt-1 text-base sm:text-xl font-bold font-mono text-brand-700">1&nbsp;248,00&nbsp;€</div>
          <div className="mt-2 flex items-end gap-1 h-8">
            {[20, 35, 30, 48, 55, 72].map((v, i) => (
              <span key={i} className="flex-1 rounded-sm bg-brand-500" style={{ height: `${v}%` }} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 px-5 py-3 border-t border-ink-900/8 bg-canvas">
        <p className="text-xs text-ink-700/75 truncate">
          <span className="font-semibold text-ink-900">{c.owner}:</span> «{c.ownerNote}»
        </p>
        <span className="shrink-0 inline-flex items-center gap-1.5 text-xs font-medium text-brand-700 bg-brand-50 border border-brand-100 rounded-full px-3 py-1">
          📷 {c.scan}
        </span>
      </div>
    </div>
  );
}

/* ===== Dark Vaavo reports panel (section 4) ===== */
function DarkPanel({ title }: { title: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-ink-800 p-6">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-white">{title}</span>
        <span className="text-white/70 font-mono text-xs">2025</span>
      </div>
      <div className="mt-6 flex items-end gap-2 h-40">
        {[42, 58, 50, 72, 64, 88, 70, 95].map((v, i) => (
          <span key={i} className={`flex-1 rounded-t ${i % 3 === 2 ? 'bg-brand-500' : 'bg-white/15'}`} style={{ height: `${v}%` }} />
        ))}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-white/5 p-3">
          <div className="text-[10px] uppercase tracking-wider text-white/70">100 %</div>
          <div className="mt-1 text-sm font-semibold text-white">ALV</div>
        </div>
        <div className="rounded-xl bg-white/5 p-3">
          <div className="text-[10px] uppercase tracking-wider text-white/70">LIVE</div>
          <div className="mt-1 text-sm font-semibold text-brand-400">online</div>
        </div>
      </div>
    </div>
  );
}
