import { useI18n } from '../i18n/context';
import PageHeader from '../components/PageHeader';
import CtaBand from '../components/CtaBand';

export default function EntrepreneurGuidePage() {
  const { t } = useI18n();
  const s = t.guide.sections;

  return (
    <div className="bg-canvas text-ink-900">
      <PageHeader eyebrow={t.nav.guide} title={t.guide.title} subtitle={t.guide.subtitle} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <p className="text-lg text-ink-700/80 mb-12 leading-relaxed">{t.guide.intro}</p>

        {/* Business forms */}
        <section className="mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink-900 mb-3">{s.forms.title}</h2>
          <p className="text-ink-700/70 mb-6">{s.forms.intro}</p>
          <div className="space-y-3">
            {s.forms.items.map((item, i) => (
              <div key={i} className="rounded-2xl border border-ink-900/10 bg-white p-5">
                <h3 className="font-bold text-ink-900 mb-1">{item.title}</h3>
                <p className="text-sm text-ink-700/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Registration */}
        <section className="mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink-900 mb-3">{s.registration.title}</h2>
          <p className="text-ink-700/70 mb-6">{s.registration.intro}</p>
          <ol className="space-y-3">
            {s.registration.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-brand-50 text-brand-600 text-xs font-bold font-mono shrink-0 mt-0.5">{i + 1}</span>
                <span className="text-ink-700/80 text-sm">{item}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Taxes */}
        <section className="mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink-900 mb-3">{s.taxes.title}</h2>
          <p className="text-ink-700/70 mb-6">{s.taxes.intro}</p>
          <div className="space-y-3">
            {s.taxes.items.map((item, i) => (
              <div key={i} className="rounded-2xl border border-ink-900/10 bg-white p-5">
                <h3 className="font-bold text-ink-900 mb-1">{item.title}</h3>
                <p className="text-sm text-ink-700/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Accountant */}
        <section className="mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink-900 mb-4">{s.accountant.title}</h2>
          <ul className="space-y-3">
            {s.accountant.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-ink-700/80">
                <svg className="w-5 h-5 text-brand-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Starttiraha */}
        <section className="mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink-900 mb-4">{s.starttiraha.title}</h2>
          <div className="rounded-2xl border border-brand-100 bg-brand-50/60 p-6">
            <p className="text-ink-700/80 leading-relaxed">{s.starttiraha.desc}</p>
          </div>
        </section>

        {/* Common mistakes */}
        <section className="mb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink-900 mb-4">{s.mistakes.title}</h2>
          <ul className="space-y-3">
            {s.mistakes.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-ink-700/80">
                <svg className="w-5 h-5 text-red-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <CtaBand />
    </div>
  );
}
