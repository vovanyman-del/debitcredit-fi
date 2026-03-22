import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/context';

export default function ForAccountantsPage() {
  const { t, localePath } = useI18n();

  const features = [
    { ...t.forAccountants.features.ai, icon: '🤖' },
    { ...t.forAccountants.features.bank, icon: '🏦' },
    { ...t.forAccountants.features.workspace, icon: '📁' },
    { ...t.forAccountants.features.messaging, icon: '💬' },
  ];

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-700 to-primary-900 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">{t.forAccountants.title}</h1>
          <p className="mt-4 text-lg text-primary-200 max-w-2xl">{t.forAccountants.subtitle}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <p className="text-lg text-warm-600 max-w-3xl mb-12">{t.forAccountants.intro}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feat, i) => (
            <div key={i} className="rounded-2xl border border-warm-200 bg-white p-6 sm:p-8">
              <span className="text-3xl">{feat.icon}</span>
              <h3 className="text-xl font-semibold text-warm-900 mt-4 mb-2">{feat.title}</h3>
              <p className="text-warm-500 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-primary-50 rounded-2xl p-8 sm:p-10 text-center border border-primary-100">
          <p className="text-lg text-warm-700 mb-6">{t.forAccountants.cta}</p>
          <Link
            to={localePath('/yhteystiedot')}
            className="inline-flex items-center px-8 py-3.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
          >
            {t.forAccountants.ctaButton}
          </Link>
        </div>
      </div>
    </div>
  );
}
