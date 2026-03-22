import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/context';

export default function ServicesPage() {
  const { t, localePath } = useI18n();

  const sections = [
    { data: t.services.bookkeeping, icon: '📊' },
    { data: t.services.tax, icon: '💰' },
    { data: t.services.payroll, icon: '👥' },
    { data: t.services.formation, icon: '💼' },
    { data: t.services.consulting, icon: '🎯' },
  ];

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">{t.services.title}</h1>
          <p className="mt-4 text-lg text-primary-100 max-w-2xl">{t.services.subtitle}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="space-y-12">
          {sections.map((section, i) => (
            <div key={i} className="bg-white rounded-2xl border border-warm-200 p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{section.icon}</span>
                <h2 className="text-2xl font-bold text-warm-900">{section.data.title}</h2>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {section.data.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-warm-700">
                    <svg className="w-5 h-5 text-accent-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to={localePath('/yhteystiedot')}
            className="inline-flex items-center px-8 py-3.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors shadow-lg"
          >
            {t.services.cta}
          </Link>
        </div>
      </div>
    </div>
  );
}
