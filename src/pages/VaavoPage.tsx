import { type ReactNode, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/context';

const VaavoDemo = lazy(() => import('../components/VaavoDemo'));

const featureIcons: Record<string, ReactNode> = {
  ai: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  bank: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>,
  files: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>,
  messages: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
  analytics: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  aiHelper: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
};

export default function VaavoPage() {
  const { t, localePath } = useI18n();

  const features = Object.entries(t.vaavo.features) as [string, { title: string; desc: string }][];

  return (
    <div>
      <section className="bg-gradient-to-br from-accent-600 to-accent-700 text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">{t.vaavo.title}</h1>
            <p className="mt-4 text-lg text-accent-100 leading-relaxed">{t.vaavo.subtitle}</p>
            <div className="mt-2 inline-flex items-center px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
              {t.vaavo.free}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive demo */}
      <div className="bg-warm-50 border-b border-warm-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <Suspense fallback={<div className="h-[560px]" />}>
            <VaavoDemo />
          </Suspense>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(([key, feat]) => (
            <div key={key} className="rounded-2xl border border-warm-200 bg-white p-6 hover:border-accent-200 hover:shadow-md transition-all">
              <div className="text-accent-600 mb-4">{featureIcons[key]}</div>
              <h3 className="text-lg font-semibold text-warm-900 mb-2">{feat.title}</h3>
              <p className="text-sm text-warm-500 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>

        {/* Tech highlight */}
        <div className="mt-16 bg-warm-50 rounded-2xl p-8 sm:p-10 border border-warm-200">
          <p className="text-warm-700 leading-relaxed text-lg">{t.vaavo.techHighlight}</p>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-warm-500 mb-4">{t.vaavo.cta}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to={localePath('/yhteystiedot')}
              className="inline-flex justify-center items-center px-8 py-3.5 bg-accent-600 text-white font-semibold rounded-xl hover:bg-accent-700 transition-colors"
            >
              {t.vaavo.ctaButton}
            </Link>
            <Link
              to={localePath('/yhteystiedot')}
              className="inline-flex justify-center items-center px-8 py-3.5 border-2 border-warm-300 text-warm-700 font-semibold rounded-xl hover:bg-warm-50 transition-colors"
            >
              {t.common.contactUs}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
