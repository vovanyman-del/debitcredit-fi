import { useI18n } from '../i18n/context';
import PageHeader from '../components/PageHeader';

export default function TermsPage() {
  const { t } = useI18n();

  return (
    <div className="bg-canvas text-ink-900">
      <PageHeader title={t.terms.title}>
        <p className="text-sm text-ink-700/75">{t.terms.lastUpdated}</p>
      </PageHeader>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="space-y-10">
          {t.terms.sections.map((section, i) => (
            <section key={i}>
              <h2 className="flex items-baseline gap-3 text-xl font-bold text-ink-900 mb-3">
                <span className="text-sm font-mono text-brand-600">{String(i + 1).padStart(2, '0')}</span>
                {section.title}
              </h2>
              <p className="text-ink-700/80 leading-relaxed pl-9">{section.content}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
