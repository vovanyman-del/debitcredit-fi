import { type ReactNode } from 'react';
import { useI18n } from '../i18n/context';
import PageHeader from '../components/PageHeader';
import CtaBand from '../components/CtaBand';

const featureIcons: Record<string, ReactNode> = {
  ai: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  bank: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10l9-5 9 5M5 10v8m4-8v8m6-8v8m4-8v8M3 21h18" /></svg>,
  files: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}><path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>,
  messages: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a8 8 0 01-11.6 7.1L4 20l.9-5.4A8 8 0 1121 12z" /></svg>,
  analytics: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  aiHelper: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}><path strokeLinecap="round" strokeLinejoin="round" d="M8.2 9c.5-1.2 2-2 3.8-2 2.2 0 4 1.3 4 3 0 1.4-1.3 2.6-3 2.9-.5.1-1 .5-1 1.1m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
};

export default function VaavoPage() {
  const { t } = useI18n();
  const inv = t.home.invisible;
  const features = Object.entries(t.vaavo.features) as [string, { title: string; desc: string }][];

  return (
    <div className="bg-canvas text-ink-900">
      <PageHeader eyebrow={t.vaavo.free} title={t.vaavo.title} subtitle={t.vaavo.subtitle} />

      {/* Invisible → visible (dark, live panel like home) */}
      <section className="bg-ink-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-400">{inv.eyebrow}</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold leading-tight">{inv.title}</h2>
            <p className="mt-4 text-lg text-white/70 leading-relaxed">{inv.lead}</p>
            <ul className="mt-8 space-y-5">
              {[inv.bank, inv.photo, inv.language].map((it, i) => (
                <li key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 text-brand-400 flex items-center justify-center shrink-0">
                    {[featureIcons.bank, featureIcons.files, featureIcons.messages][i]}
                  </div>
                  <div>
                    <div className="font-semibold">{it.title}</div>
                    <div className="text-sm text-white/60 mt-0.5">{it.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-ink-800 p-6">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-white">{inv.panelTitle}</span>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-brand-400"><span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" /> LIVE</span>
            </div>
            <div className="mt-6 flex items-end gap-2 h-40">
              {[42, 58, 50, 72, 64, 88, 70, 95].map((v, i) => (
                <span key={i} className={`flex-1 rounded-t ${i % 3 === 2 ? 'bg-brand-500' : 'bg-white/15'}`} style={{ height: `${v}%` }} />
              ))}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 font-mono">
              {[['48 920 €', t.home.heroCard.turnover], ['12 840 €', 'ALV'], ['1 248 €', t.home.heroCard.result]].map(([v, l], i) => (
                <div key={i} className="rounded-xl bg-white/5 p-3">
                  <div className="text-[10px] uppercase tracking-wider text-white/40 font-sans">{l}</div>
                  <div className="mt-1 text-sm font-semibold text-white">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(([key, feat]) => (
            <div key={key} className="rounded-2xl border border-ink-900/10 bg-white p-6 hover:border-brand-400/60 hover:shadow-sm transition-all">
              <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">{featureIcons[key]}</div>
              <h3 className="mt-5 text-base font-bold text-ink-900">{feat.title}</h3>
              <p className="mt-2 text-sm text-ink-700/70 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>

        {/* Tech highlight */}
        <div className="mt-12 rounded-2xl border border-ink-900/10 bg-white p-8 sm:p-10">
          <p className="text-ink-700/80 leading-relaxed text-lg">{t.vaavo.techHighlight}</p>
        </div>
      </div>

      <CtaBand />
    </div>
  );
}
