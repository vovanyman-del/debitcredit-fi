import { useI18n } from '../i18n/context';
import PageHeader from '../components/PageHeader';
import CtaBand from '../components/CtaBand';

export default function SwitchAccountantPage() {
  const { t } = useI18n();

  return (
    <div className="bg-canvas text-ink-900">
      <PageHeader eyebrow={t.nav.switchAccountant} title={t.switchAccountant.title} subtitle={t.switchAccountant.subtitle} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <p className="text-lg text-ink-700/80 mb-12 leading-relaxed">{t.switchAccountant.intro}</p>

        {/* Steps */}
        <h2 className="text-2xl sm:text-3xl font-bold text-ink-900 mb-8">{t.switchAccountant.steps.title}</h2>
        <div className="space-y-5 mb-16">
          {t.switchAccountant.steps.items.map((step, i) => (
            <div key={i} className="flex gap-4 rounded-2xl border border-ink-900/10 bg-white p-5">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-brand-50 text-brand-600 font-bold font-mono flex items-center justify-center">
                {i + 1}
              </div>
              <div>
                <h3 className="font-bold text-ink-900 mb-1">{step.title}</h3>
                <p className="text-sm text-ink-700/70 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <h2 className="text-2xl sm:text-3xl font-bold text-ink-900 mb-6">{t.switchAccountant.benefits.title}</h2>
        <ul className="space-y-3">
          {t.switchAccountant.benefits.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-ink-700/80">
              <svg className="w-5 h-5 text-brand-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <CtaBand />
    </div>
  );
}
