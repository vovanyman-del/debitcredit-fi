import { useI18n } from '../i18n/context';
import PageHeader from '../components/PageHeader';
import CtaBand from '../components/CtaBand';

const stroke = (d: string) => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
);

export default function ServicesPage() {
  const { t } = useI18n();

  const sections = [
    { data: t.services.bookkeeping, icon: stroke('M4 5a2 2 0 012-2h11a1 1 0 011 1v14a1 1 0 01-1 1H6a2 2 0 00-2 2V5zM8 7h7M8 11h7') },
    { data: t.services.tax, icon: stroke('M9 7h6M9 11h6M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2zm5-6.5l-2 4') },
    { data: t.services.payroll, icon: stroke('M17 20h5v-2a3 3 0 00-5.4-1.8M17 20H7m10 0v-2a4 4 0 00-.6-2M7 20H2v-2a3 3 0 015.4-1.8M7 20v-2c0-.7.1-1.3.4-1.9m0 0a5 5 0 019.2 0M15 7a3 3 0 11-6 0 3 3 0 016 0z') },
    { data: t.services.formation, icon: stroke('M5 21V5a2 2 0 012-2h6a2 2 0 012 2v16M15 21h4V9a2 2 0 00-2-2h-2M8 7h2M8 11h2M8 15h2') },
    { data: t.services.consulting, icon: stroke('M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 16l-4.9 2.6.9-5.5-4-3.9 5.5-.8z') },
  ];

  return (
    <div className="bg-canvas text-ink-900">
      <PageHeader eyebrow={t.nav.services} title={t.services.title} subtitle={t.services.subtitle} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="space-y-6">
          {sections.map((section, i) => (
            <div key={i} className="rounded-2xl border border-ink-900/10 bg-white p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">{section.icon}</div>
                <h2 className="text-xl sm:text-2xl font-bold text-ink-900">{section.data.title}</h2>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                {section.data.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-ink-700/80">
                    <svg className="w-5 h-5 text-brand-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <CtaBand />
    </div>
  );
}
