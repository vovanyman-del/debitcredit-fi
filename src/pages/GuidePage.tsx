import { Link, useParams } from 'react-router-dom';
import { useI18n } from '../i18n/context';
import { getGuide, relatedGuides } from '../data/guides';
import GuideBlocks from '../components/GuideBlocks';
import NotFoundPage from './NotFoundPage';

export default function GuidePage() {
  const { t, locale, localePath } = useI18n();
  const { slug } = useParams<{ slug: string }>();
  const guide = slug ? getGuide(slug) : undefined;

  if (!guide) return <NotFoundPage />;

  const g = t.guides;
  const c = guide.content[locale];
  const related = relatedGuides(guide.slug, 3);

  return (
    <div className="bg-canvas text-ink-900">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-ink-900/5 bg-canvas">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(18,154,106,0.08),transparent_60%)]" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-10 sm:pb-12">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-xs font-medium text-ink-700/70">
            <Link to={localePath('/')} className="hover:text-brand-600">{t.nav.home}</Link>
            <span className="px-1.5" aria-hidden="true">/</span>
            <Link to={localePath('/opas')} className="hover:text-brand-600">{g.eyebrow}</Link>
          </nav>
          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight leading-[1.1] text-ink-900">{c.title}</h1>
          <p className="mt-4 text-lg text-ink-700 leading-relaxed">{c.lead}</p>
          <p className="mt-5 text-xs text-ink-700/60">
            {g.updated} {guide.dateModified}
          </p>
        </div>
      </section>

      {/* Body */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <GuideBlocks body={c.body} />

        {/* FAQ */}
        {c.faq.length > 0 && (
          <section className="mt-14">
            <h2 className="text-2xl font-bold tracking-tight text-ink-900">{g.faqTitle}</h2>
            <dl className="mt-6 space-y-5">
              {c.faq.map((item, i) => (
                <div key={i} className="rounded-2xl border border-ink-900/10 bg-white p-5">
                  <dt className="font-semibold text-ink-900">{item.q}</dt>
                  <dd className="mt-2 text-ink-700/90 leading-relaxed">{item.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {/* In-content CTA */}
        <div className="mt-14 rounded-2xl bg-ink-900 text-white p-7 sm:p-9">
          <h2 className="text-xl sm:text-2xl font-bold">{g.ctaTitle}</h2>
          <p className="mt-2 text-white/80 leading-relaxed">{g.ctaText}</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              to={localePath('/yhteystiedot')}
              className="inline-flex justify-center items-center px-6 py-3 bg-white text-brand-700 font-semibold rounded-xl hover:bg-brand-50 transition-colors"
            >
              {t.home.hero.cta}
            </Link>
            <Link
              to={localePath('/palvelut')}
              className="inline-flex justify-center items-center px-6 py-3 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
            >
              {t.nav.services}
            </Link>
          </div>
        </div>

        {/* Read also — internal cross-links */}
        {related.length > 0 && (
          <section className="mt-14 border-t border-ink-900/10 pt-8">
            <h2 className="text-lg font-bold text-ink-900">{g.relatedTitle}</h2>
            <ul className="mt-4 space-y-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    to={localePath(`/opas/${r.slug}`)}
                    className="group inline-flex items-start gap-2 text-ink-700 hover:text-brand-700"
                  >
                    <svg aria-hidden="true" className="mt-1 w-4 h-4 shrink-0 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    <span className="font-medium group-hover:underline">{r.content[locale].title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-10">
          <Link to={localePath('/opas')} className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700">
            <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            {g.backToHub}
          </Link>
        </div>
      </article>
    </div>
  );
}
