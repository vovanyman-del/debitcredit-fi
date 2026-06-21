import { useI18n } from '../i18n/context';
import PageHeader from '../components/PageHeader';
import CtaBand from '../components/CtaBand';

const stroke = (d: string) => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
);

export default function ForAccountantsPage() {
  const { t } = useI18n();

  const features = [
    { ...t.forAccountants.features.ai, icon: stroke('M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z') },
    { ...t.forAccountants.features.bank, icon: stroke('M3 10l9-5 9 5M5 10v8m4-8v8m6-8v8m4-8v8M3 21h18') },
    { ...t.forAccountants.features.workspace, icon: stroke('M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z') },
    { ...t.forAccountants.features.messaging, icon: stroke('M21 12a8 8 0 01-11.6 7.1L4 20l.9-5.4A8 8 0 1121 12z') },
  ];

  return (
    <div className="bg-canvas text-ink-900">
      <PageHeader eyebrow={t.nav.forAccountants} title={t.forAccountants.title} subtitle={t.forAccountants.subtitle} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <p className="text-lg text-ink-700/80 max-w-3xl mb-12 leading-relaxed">{t.forAccountants.intro}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {features.map((feat, i) => (
            <div key={i} className="rounded-2xl border border-ink-900/10 bg-white p-6 sm:p-8">
              <div className="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">{feat.icon}</div>
              <h3 className="mt-5 text-lg font-bold text-ink-900">{feat.title}</h3>
              <p className="mt-2 text-ink-700/75 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <CtaBand />
    </div>
  );
}
