import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/context';
import PageHeader from '../components/PageHeader';
import CtaBand from '../components/CtaBand';
import { guides } from '../data/guides';

export default function GuideHubPage() {
  const { t, locale, localePath } = useI18n();
  const g = t.guides;

  return (
    <div className="bg-canvas text-ink-900">
      <PageHeader eyebrow={g.eyebrow} title={g.hubTitle} subtitle={g.hubSubtitle} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {guides.map((guide) => {
            const c = guide.content[locale];
            return (
              <Link
                key={guide.slug}
                to={localePath(`/opas/${guide.slug}`)}
                className="group flex flex-col rounded-2xl border border-ink-900/10 bg-white p-6 hover:border-brand-400/60 hover:shadow-sm transition-all"
              >
                <h2 className="text-lg font-bold text-ink-900 group-hover:text-brand-700 transition-colors">{c.title}</h2>
                <p className="mt-2 flex-1 text-sm text-ink-700/80 leading-relaxed">{c.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                  {g.read}
                  <svg aria-hidden="true" className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      <CtaBand />
    </div>
  );
}
