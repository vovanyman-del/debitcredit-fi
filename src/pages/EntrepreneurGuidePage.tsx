import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/context';

export default function EntrepreneurGuidePage() {
  const { t, localePath } = useI18n();
  const s = t.guide.sections;

  return (
    <div>
      <section className="bg-gradient-to-br from-accent-600 to-accent-700 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">{t.guide.title}</h1>
          <p className="mt-4 text-lg text-accent-100 max-w-2xl">{t.guide.subtitle}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <p className="text-lg text-warm-600 mb-12 leading-relaxed">{t.guide.intro}</p>

        {/* Business forms */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-warm-900 mb-4">{s.forms.title}</h2>
          <p className="text-warm-600 mb-6">{s.forms.intro}</p>
          <div className="space-y-4">
            {s.forms.items.map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-warm-200 p-5">
                <h3 className="font-semibold text-warm-900 mb-1">{item.title}</h3>
                <p className="text-sm text-warm-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Registration */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-warm-900 mb-4">{s.registration.title}</h2>
          <p className="text-warm-600 mb-6">{s.registration.intro}</p>
          <ol className="space-y-3">
            {s.registration.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-600 text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                <span className="text-warm-700 text-sm">{item}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Taxes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-warm-900 mb-4">{s.taxes.title}</h2>
          <p className="text-warm-600 mb-6">{s.taxes.intro}</p>
          <div className="space-y-4">
            {s.taxes.items.map((item, i) => (
              <div key={i} className="bg-warm-50 rounded-xl border border-warm-200 p-5">
                <h3 className="font-semibold text-warm-900 mb-1">{item.title}</h3>
                <p className="text-sm text-warm-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Accountant */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-warm-900 mb-4">{s.accountant.title}</h2>
          <ul className="space-y-3">
            {s.accountant.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-warm-700">
                <svg className="w-5 h-5 text-accent-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Starttiraha */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-warm-900 mb-4">{s.starttiraha.title}</h2>
          <div className="bg-accent-50 rounded-xl border border-accent-200 p-6">
            <p className="text-warm-700 leading-relaxed">{s.starttiraha.desc}</p>
          </div>
        </section>

        {/* Common mistakes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-warm-900 mb-4">{s.mistakes.title}</h2>
          <ul className="space-y-3">
            {s.mistakes.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-warm-700">
                <svg className="w-5 h-5 text-red-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <div className="bg-primary-50 rounded-2xl p-8 text-center border border-primary-100">
          <p className="text-lg text-warm-700 mb-6">{t.guide.cta}</p>
          <Link
            to={localePath('/yhteystiedot')}
            className="inline-flex items-center px-8 py-3.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
          >
            {t.guide.ctaButton}
          </Link>
        </div>
      </div>
    </div>
  );
}
