import { useI18n } from '../i18n/context';

export default function PrivacyPage() {
  const { t } = useI18n();

  return (
    <div>
      <section className="bg-warm-50 border-b border-warm-200 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-warm-900">{t.privacy.title}</h1>
          <p className="mt-2 text-sm text-warm-400">{t.privacy.lastUpdated}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {t.privacy.sections.map((section, i) => (
            <div key={i}>
              <h2 className="text-xl font-semibold text-warm-900 mb-3">{section.title}</h2>
              <p className="text-warm-600 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
