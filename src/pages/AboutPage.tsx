import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/context';
import { company } from '../data/pricing';

export default function AboutPage() {
  const { t, localePath } = useI18n();

  const values = [
    { ...t.about.values.transparency, icon: '🔍' },
    { ...t.about.values.expertise, icon: '📚' },
    { ...t.about.values.technology, icon: '⚡' },
    { ...t.about.values.multilingual, icon: '🌍' },
  ];

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">{t.about.title}</h1>
          <p className="mt-4 text-lg text-primary-100 max-w-2xl">{t.about.subtitle}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Story */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-warm-900 mb-6">{t.about.story.title}</h2>
          <div className="space-y-4 text-warm-600 leading-relaxed">
            <p>{t.about.story.p1}</p>
            <p>{t.about.story.p2}</p>
            <p>{t.about.story.p3}</p>
          </div>
        </div>

        {/* Values */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-warm-900 text-center mb-10">{t.about.values.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => (
              <div key={i} className="bg-white rounded-2xl border border-warm-200 p-6 text-center">
                <span className="text-3xl">{val.icon}</span>
                <h3 className="text-lg font-semibold text-warm-900 mt-3 mb-2">{val.title}</h3>
                <p className="text-sm text-warm-500">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Founder */}
        <div className="mt-16 bg-warm-50 rounded-2xl p-8 sm:p-10 border border-warm-200 max-w-2xl mx-auto text-center">
          <h2 className="text-xl font-bold text-warm-900 mb-2">{t.about.founder.title}</h2>
          <p className="text-lg font-semibold text-primary-600">{t.about.founder.name}</p>
          <p className="mt-3 text-warm-600">{t.about.founder.desc}</p>
          <div className="mt-4 text-sm text-warm-400">
            {company.name} &middot; {company.address}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            to={localePath('/yhteystiedot')}
            className="inline-flex items-center px-8 py-3.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
          >
            {t.common.contactUs}
          </Link>
        </div>
      </div>
    </div>
  );
}
