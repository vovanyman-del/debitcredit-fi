import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/context';
import { packages, additionalServices } from '../data/pricing';
import PageHeader from '../components/PageHeader';
import CtaBand from '../components/CtaBand';

const eur = (n: number) => n.toFixed(2).replace('.', ',');

function AccordionSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-ink-900/10 rounded-2xl overflow-hidden bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-ink-900/[0.02] transition-colors text-left"
      >
        <span className="font-semibold text-ink-900">{title}</span>
        <svg className={`w-5 h-5 text-ink-700/40 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-6 py-4 border-t border-ink-900/8">{children}</div>}
    </div>
  );
}

export default function PricingPage() {
  const { t, localePath } = useI18n();
  const hp = t.home.packages;

  const sectionData: { key: keyof typeof additionalServices; label: string }[] = [
    { key: 'accounting', label: t.pricing.sections.accounting },
    { key: 'annualReports', label: t.pricing.sections.annualReports },
    { key: 'companyFormation', label: t.pricing.sections.companyFormation },
    { key: 'consulting', label: t.pricing.sections.consulting },
  ];

  return (
    <div className="bg-canvas text-ink-900">
      <PageHeader eyebrow={hp.eyebrow} title={t.pricing.title} subtitle={t.pricing.subtitle} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        {/* All packages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {packages.map((pkg) => {
            const popular = pkg.id === 'basic';
            const isCustom = pkg.id === 'custom';
            const name = t.pricing.packageNames[pkg.id as keyof typeof t.pricing.packageNames];
            const target = t.pricing.packageTargets[pkg.id as keyof typeof t.pricing.packageTargets];
            const features = t.pricing.packageFeatures[pkg.id as keyof typeof t.pricing.packageFeatures] || [];
            return (
              <div
                key={pkg.id}
                className={`relative rounded-2xl p-6 flex flex-col ${popular ? 'bg-ink-900 text-white shadow-xl' : 'bg-white text-ink-900 border border-ink-900/10'}`}
              >
                {popular && (
                  <div className="absolute -top-3 left-6 bg-brand-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {hp.popular}
                  </div>
                )}
                <h3 className={`text-lg font-bold ${popular ? 'text-white' : 'text-ink-900'}`}>{name}</h3>
                {!isCustom ? (
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold font-mono tracking-tight">{eur(pkg.price)}&nbsp;€</span>
                    <span className={`text-sm ${popular ? 'text-white/50' : 'text-ink-700/50'}`}>{t.pricing.perMonth}</span>
                  </div>
                ) : (
                  <div className="mt-3 text-lg font-semibold text-brand-600">{t.pricing.customTitle}</div>
                )}
                <p className={`mt-2 text-xs ${popular ? 'text-white/50' : 'text-ink-700/50'}`}>{target}</p>
                {pkg.vouchers && (
                  <p className={`mt-1 text-xs font-mono ${popular ? 'text-brand-400' : 'text-brand-600'}`}>{pkg.vouchers} {t.pricing.vouchers}</p>
                )}
                {pkg.extraVoucherPrice && (
                  <p className={`mt-1 text-xs ${popular ? 'text-white/40' : 'text-ink-700/40'}`}>{t.pricing.extraVoucher}: {eur(pkg.extraVoucherPrice)} €</p>
                )}
                <ul className="mt-4 space-y-2 flex-1">
                  {features.map((feat, j) => (
                    <li key={j} className={`flex items-start gap-2 text-sm ${popular ? 'text-white/80' : 'text-ink-700/80'}`}>
                      <svg className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={localePath('/yhteystiedot')}
                  className={`mt-5 block text-center py-2.5 rounded-lg text-sm font-semibold transition-colors ${popular ? 'bg-brand-500 text-white hover:bg-brand-600' : 'bg-ink-900/5 text-ink-900 hover:bg-ink-900/10'}`}
                >
                  {t.pricing.requestQuote}
                </Link>
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-sm text-ink-700/50">{t.pricing.note}</p>

        {/* Additional services */}
        <h2 className="text-2xl sm:text-3xl font-bold text-ink-900 mt-16 mb-6">{t.pricing.additional}</h2>
        <div className="space-y-3">
          {sectionData.map(({ key, label }) => (
            <AccordionSection key={key} title={label}>
              <div className="divide-y divide-ink-900/8">
                {additionalServices[key].map((svc, i) => {
                  const name = t.pricing.serviceNames[svc.name as keyof typeof t.pricing.serviceNames] || svc.name;
                  const unit = t.pricing.serviceUnits[svc.unit as keyof typeof t.pricing.serviceUnits] || svc.unit;
                  const note = svc.note ? (t.pricing.serviceNotes[svc.note as keyof typeof t.pricing.serviceNotes] || svc.note) : null;
                  return (
                    <div key={i} className="flex items-start justify-between py-3 gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-ink-900">{name}</div>
                        {note && <div className="text-xs text-ink-700/50 mt-0.5">{note}</div>}
                      </div>
                      <div className="text-sm font-semibold text-ink-900 whitespace-nowrap font-mono">
                        {eur(svc.price)} € <span className="text-ink-700/50 font-sans">{unit}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </AccordionSection>
          ))}
        </div>

        {/* Soft CTA */}
        <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/60 p-6 text-center">
          <p className="text-ink-900 font-medium">{hp.note}</p>
          <Link to={localePath('/yhteystiedot')} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-600">
            {t.pricing.requestQuote} <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      <CtaBand />
    </div>
  );
}
