import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/context';
import { packages, additionalServices } from '../data/pricing';

function AccordionSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-warm-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 bg-warm-50 hover:bg-warm-100 transition-colors text-left"
      >
        <span className="font-semibold text-warm-900">{title}</span>
        <svg className={`w-5 h-5 text-warm-400 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-6 py-4">{children}</div>}
    </div>
  );
}

export default function PricingPage() {
  const { t, localePath } = useI18n();

  const sectionData: { key: keyof typeof additionalServices; label: string }[] = [
    { key: 'accounting', label: t.pricing.sections.accounting },
    { key: 'annualReports', label: t.pricing.sections.annualReports },
    { key: 'companyFormation', label: t.pricing.sections.companyFormation },
    { key: 'consulting', label: t.pricing.sections.consulting },
  ];

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">{t.pricing.title}</h1>
          <p className="mt-4 text-lg text-primary-100 max-w-2xl">{t.pricing.subtitle}</p>
        </div>
      </section>

      {/* Packages */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h2 className="text-2xl font-bold text-warm-900 mb-8">{t.pricing.packages}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {packages.map(pkg => {
            const name = t.pricing.packageNames[pkg.id as keyof typeof t.pricing.packageNames];
            const target = t.pricing.packageTargets[pkg.id as keyof typeof t.pricing.packageTargets];
            const features = t.pricing.packageFeatures[pkg.id as keyof typeof t.pricing.packageFeatures] || [];
            const isCustom = pkg.id === 'custom';

            return (
              <div key={pkg.id} className="rounded-2xl border border-warm-200 bg-white p-6 flex flex-col">
                <h3 className="text-xl font-bold text-warm-900">{name}</h3>
                {!isCustom ? (
                  <div className="mt-2">
                    <span className="text-3xl font-bold text-warm-900">{pkg.price.toFixed(2).replace('.', ',')} &euro;</span>
                    <span className="text-warm-500 text-sm">{t.pricing.perMonth}</span>
                  </div>
                ) : (
                  <div className="mt-2 text-lg font-semibold text-primary-600">{t.pricing.customTitle}</div>
                )}
                <p className="mt-2 text-xs text-warm-400">{target}</p>
                {pkg.vouchers && (
                  <p className="mt-1 text-xs text-warm-400">{pkg.vouchers} {t.pricing.vouchers}</p>
                )}
                {pkg.extraVoucherPrice && (
                  <p className="mt-1 text-xs text-warm-400">{t.pricing.extraVoucher}: {pkg.extraVoucherPrice.toFixed(2).replace('.', ',')} &euro;</p>
                )}
                <ul className="mt-4 space-y-2 flex-1">
                  {features.map((feat, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-warm-600">
                      <svg className="w-4 h-4 text-accent-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link
                  to={localePath('/yhteystiedot')}
                  className="mt-5 block text-center py-2.5 rounded-lg text-sm font-semibold bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                >
                  {isCustom ? t.pricing.requestQuote : t.pricing.requestQuote}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Additional services */}
        <h2 className="text-2xl font-bold text-warm-900 mt-16 mb-6">{t.pricing.additional}</h2>
        <div className="space-y-4">
          {sectionData.map(({ key, label }) => (
            <AccordionSection key={key} title={label}>
              <div className="divide-y divide-warm-100">
                {additionalServices[key].map((svc, i) => {
                  const name = t.pricing.serviceNames[svc.name as keyof typeof t.pricing.serviceNames] || svc.name;
                  const unit = t.pricing.serviceUnits[svc.unit as keyof typeof t.pricing.serviceUnits] || svc.unit;
                  const note = svc.note ? (t.pricing.serviceNotes[svc.note as keyof typeof t.pricing.serviceNotes] || svc.note) : null;
                  return (
                    <div key={i} className="flex items-start justify-between py-3 gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-warm-800">{name}</div>
                        {note && <div className="text-xs text-warm-400 mt-0.5">{note}</div>}
                      </div>
                      <div className="text-sm font-semibold text-warm-900 whitespace-nowrap">
                        {svc.price.toFixed(2).replace('.', ',')} &euro; {unit}
                      </div>
                    </div>
                  );
                })}
              </div>
            </AccordionSection>
          ))}
        </div>

        <p className="mt-8 text-sm text-warm-400 text-center">{t.pricing.note}</p>
      </div>
    </div>
  );
}
