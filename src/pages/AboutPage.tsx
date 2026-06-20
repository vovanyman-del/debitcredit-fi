import { useI18n } from '../i18n/context';
import { company } from '../data/pricing';
import PageHeader from '../components/PageHeader';
import CtaBand from '../components/CtaBand';

const stroke = (d: string) => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
);

export default function AboutPage() {
  const { t } = useI18n();
  const a = t.about;

  const values = [
    { ...a.values.transparency, icon: stroke('M2.5 12S5.5 5.5 12 5.5 21.5 12 21.5 12 18.5 18.5 12 18.5 2.5 12 2.5 12zM12 15a3 3 0 100-6 3 3 0 000 6z') },
    { ...a.values.expertise, icon: stroke('M4 5a2 2 0 012-2h11a1 1 0 011 1v14a1 1 0 01-1 1H6a2 2 0 00-2 2V5zM8 7h7M8 11h7') },
    { ...a.values.technology, icon: stroke('M13 2L4.5 13H11l-1 9 8.5-11H12z') },
    { ...a.values.multilingual, icon: stroke('M3 12a9 9 0 1018 0 9 9 0 00-18 0zm9-9c2.5 2.5 2.5 15.5 0 18M3.5 9h17M3.5 15h17') },
  ];

  const facts = [
    { v: a.facts.years, l: a.facts.yearsLabel },
    { v: a.facts.served, l: a.facts.servedLabel },
    { v: a.facts.current, l: a.facts.currentLabel },
  ];

  const partners = [
    { name: 'Fennia', desc: a.partners.fennia },
    { name: 'If', desc: a.partners.if },
    { name: 'LähiTapiola', desc: a.partners.lahitapiola },
    { name: 'Wamo', desc: a.partners.wamo },
  ];

  return (
    <div className="bg-canvas text-ink-900">
      <PageHeader eyebrow={t.nav.about} title={a.title} subtitle={a.subtitle} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        {/* Facts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {facts.map((f, i) => (
            <div key={i} className="rounded-2xl border border-ink-900/10 bg-white p-7">
              <div className="text-4xl font-extrabold font-mono text-brand-600">{f.v}</div>
              <div className="mt-2 text-sm text-ink-700/70">{f.l}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-2 text-ink-700/80">
          <p className="text-base">{a.lifecycle}</p>
        </div>
        <p className="mt-2 text-sm font-mono text-brand-600">{a.languages}</p>

        {/* Story */}
        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink-900 mb-6">{a.story.title}</h2>
          <div className="space-y-4 text-ink-700/80 leading-relaxed text-[1.05rem]">
            <p>{a.story.p1}</p>
            <p>{a.story.p2}</p>
            <p>{a.story.p3}</p>
          </div>
        </div>

        {/* Values */}
        <div className="mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink-900 mb-8">{a.values.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((val, i) => (
              <div key={i} className="rounded-2xl border border-ink-900/10 bg-white p-6">
                <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">{val.icon}</div>
                <h3 className="mt-5 text-base font-bold text-ink-900">{val.title}</h3>
                <p className="mt-2 text-sm text-ink-700/70 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Founder */}
        <div className="mt-16 rounded-2xl bg-ink-900 text-white p-8 sm:p-10 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-400">{a.founder.title}</p>
          <p className="mt-3 text-2xl font-bold">{a.founder.name}</p>
          <p className="mt-3 text-white/70 leading-relaxed">{a.founder.desc}</p>
          <div className="mt-5 pt-5 border-t border-white/10 text-sm text-white/50">
            {company.name} · {company.address} · Y-tunnus {company.ytunnus}
          </div>
        </div>

        {/* Partners */}
        <div className="mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink-900 mb-8">{a.partners.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {partners.map((p) => (
              <div key={p.name} className="rounded-2xl border border-ink-900/10 bg-white p-6 hover:border-brand-400/60 hover:shadow-sm transition-all">
                <h3 className="text-lg font-bold mb-2 text-ink-900">{p.name}</h3>
                <p className="text-sm text-ink-700/70 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CtaBand />
    </div>
  );
}
