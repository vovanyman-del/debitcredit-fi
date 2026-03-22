import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/context';
import { packages } from '../data/pricing';

const serviceIcons = [
  <svg key="book" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
  <svg key="tax" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  <svg key="form" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
  <svg key="pay" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
];

const stepNumbers = ['01', '02', '03', '04'];

export default function HomePage() {
  const { t, localePath } = useI18n();
  const featured = [packages[0], packages[2], packages[4]]; // micro, basic, large

  const serviceData = [
    t.home.services.bookkeeping,
    t.home.services.tax,
    t.home.services.formation,
    t.home.services.payroll,
  ];

  const steps = [t.home.howItWorks.step1, t.home.howItWorks.step2, t.home.howItWorks.step3, t.home.howItWorks.step4];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(13,148,136,0.2),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              {t.home.hero.title}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-primary-100 leading-relaxed max-w-2xl">
              {t.home.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                to={localePath('/yhteystiedot')}
                className="inline-flex justify-center items-center px-8 py-3.5 bg-white text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-colors shadow-lg"
              >
                {t.home.hero.cta}
              </Link>
              <Link
                to={localePath('/vaavo')}
                className="inline-flex justify-center items-center px-8 py-3.5 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
              >
                {t.home.hero.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-warm-50 border-b border-warm-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-12 text-sm font-medium text-warm-500">
            <span>{t.home.trust.ytunnus}</span>
            <span>{t.home.trust.clients}</span>
            <span>{t.home.trust.location}</span>
          </div>
        </div>
      </section>

      {/* Popular packages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-warm-900">{t.home.packages.title}</h2>
          <p className="mt-3 text-warm-500 text-lg">{t.home.packages.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {featured.map((pkg, i) => {
            const name = t.pricing.packageNames[pkg.id as keyof typeof t.pricing.packageNames];
            return (
              <div key={pkg.id} className={`relative rounded-2xl border p-6 lg:p-8 ${i === 1 ? 'border-primary-300 bg-primary-50/50 shadow-lg ring-1 ring-primary-200' : 'border-warm-200 bg-white'}`}>
                {i === 1 && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-full">Popular</div>}
                <h3 className="text-xl font-bold text-warm-900">{name}</h3>
                <div className="mt-3">
                  <span className="text-3xl font-bold text-warm-900">{pkg.price.toFixed(2).replace('.', ',')} &euro;</span>
                  <span className="text-warm-500 text-sm">{t.home.packages.perMonth}</span>
                </div>
                <p className="mt-2 text-sm text-warm-500">{pkg.vouchers} {t.pricing.vouchers}</p>
                <ul className="mt-5 space-y-2.5">
                  {(t.pricing.packageFeatures[pkg.id as keyof typeof t.pricing.packageFeatures] || []).slice(0, 4).map((feat, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-warm-700">
                      <svg className="w-4 h-4 text-accent-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link
                  to={localePath('/hinnasto')}
                  className={`mt-6 block text-center py-2.5 rounded-lg text-sm font-semibold transition-colors ${i === 1 ? 'bg-primary-600 text-white hover:bg-primary-700' : 'bg-warm-100 text-warm-700 hover:bg-warm-200'}`}
                >
                  {t.pricing.requestQuote}
                </Link>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-8">
          <Link to={localePath('/hinnasto')} className="text-primary-600 font-medium hover:text-primary-700 text-sm">
            {t.home.packages.viewAll} &rarr;
          </Link>
        </div>
      </section>

      {/* Services */}
      <section className="bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <h2 className="text-3xl sm:text-4xl font-bold text-warm-900 text-center mb-12">{t.home.services.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceData.map((svc, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-warm-200 hover:border-primary-200 hover:shadow-md transition-all">
                <div className="text-primary-600 mb-4">{serviceIcons[i]}</div>
                <h3 className="text-lg font-semibold text-warm-900 mb-2">{svc.title}</h3>
                <p className="text-sm text-warm-500 leading-relaxed">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-12 border-b border-warm-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-lg font-medium text-warm-400 mb-8">{t.home.partners.title}</h2>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            <span className="text-2xl font-bold text-warm-300 hover:text-[#00529B] transition-colors cursor-default">Fennia</span>
            <span className="text-2xl font-bold text-warm-300 hover:text-[#0054A0] transition-colors cursor-default">If</span>
            <span className="text-2xl font-bold text-warm-300 hover:text-[#00A651] transition-colors cursor-default">LähiTapiola</span>
            <span className="text-2xl font-bold text-warm-300 hover:text-[#6C5CE7] transition-colors cursor-default">Wamo</span>
          </div>
        </div>
      </section>

      {/* Vaavo teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="bg-gradient-to-br from-accent-600 to-accent-700 rounded-3xl p-8 sm:p-12 lg:p-16 text-white">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold">{t.home.vaavo.title}</h2>
            <p className="mt-4 text-lg text-accent-100 leading-relaxed">{t.home.vaavo.desc}</p>
            <Link
              to={localePath('/vaavo')}
              className="inline-flex items-center mt-6 px-6 py-3 bg-white text-accent-700 font-semibold rounded-xl hover:bg-accent-50 transition-colors"
            >
              {t.home.vaavo.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <h2 className="text-3xl sm:text-4xl font-bold text-warm-900 text-center mb-12">{t.home.howItWorks.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-100 text-primary-600 font-bold text-lg mb-4">
                  {stepNumbers[i]}
                </div>
                <h3 className="text-lg font-semibold text-warm-900 mb-2">{step.title}</h3>
                <p className="text-sm text-warm-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
