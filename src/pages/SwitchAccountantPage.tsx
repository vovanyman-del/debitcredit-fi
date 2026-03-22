import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/context';

export default function SwitchAccountantPage() {
  const { t, localePath } = useI18n();

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">{t.switchAccountant.title}</h1>
          <p className="mt-4 text-lg text-primary-100 max-w-2xl">{t.switchAccountant.subtitle}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <p className="text-lg text-warm-600 mb-12 leading-relaxed">{t.switchAccountant.intro}</p>

        {/* Steps */}
        <h2 className="text-2xl font-bold text-warm-900 mb-8">{t.switchAccountant.steps.title}</h2>
        <div className="space-y-6 mb-16">
          {t.switchAccountant.steps.items.map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className="shrink-0 w-10 h-10 rounded-xl bg-primary-100 text-primary-600 font-bold flex items-center justify-center">
                {i + 1}
              </div>
              <div>
                <h3 className="font-semibold text-warm-900 mb-1">{step.title}</h3>
                <p className="text-sm text-warm-600">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <h2 className="text-2xl font-bold text-warm-900 mb-6">{t.switchAccountant.benefits.title}</h2>
        <ul className="space-y-3 mb-16">
          {t.switchAccountant.benefits.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-warm-700">
              <svg className="w-5 h-5 text-accent-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm">{item}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="bg-accent-50 rounded-2xl p-8 text-center border border-accent-200">
          <p className="text-lg font-semibold text-warm-900 mb-4">{t.switchAccountant.cta}</p>
          <Link
            to={localePath('/yhteystiedot')}
            className="inline-flex items-center px-8 py-3.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
          >
            {t.switchAccountant.ctaButton}
          </Link>
        </div>
      </div>
    </div>
  );
}
