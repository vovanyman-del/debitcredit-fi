import { useState, useSyncExternalStore, type FormEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useI18n } from '../i18n/context';
import { company } from '../data/pricing';
import { PLANS, planPriceCents } from '../data/pricingV3';
import { parseSelection, type Selection } from '../data/signup';
import { money, fill } from '../data/priceFormat';
import PageHeader from '../components/PageHeader';

const inputCls =
  'w-full px-4 py-2.5 border border-ink-900/15 rounded-xl bg-white text-ink-900 focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 outline-none transition-shadow';

const noopSubscribe = () => () => {};

/**
 * «Valitse tämä paketti» in state A (pricing-page-v3-spec.md §3.4): /yhteystiedot?aloitus=1&plan=…
 * shows a short start form with the chosen package and price. The pages are prerendered without a
 * query string, so the choice is read only after hydration (server snapshot = nothing chosen).
 * DRAFT: the start form never posts — it shows a demo notice instead of calling /api/contact.
 */
function StartForm({ sel }: { sel: Selection }) {
  const { t, locale, localePath } = useI18n();
  const v3 = t.pricing.v3;
  const st = v3.start;
  const [demoShown, setDemoShown] = useState(false);
  const plan = PLANS.find((p) => p.id === sel.plan)!;
  const planName = v3.plans[sel.plan].name;
  const price = money(planPriceCents(plan, sel.payslips), locale);
  const siteWord = sel.site === 'yes' ? st.siteYes : sel.site === 'no' ? st.siteNo : sel.site === 'have' ? st.siteHave : '';
  const message = [
    fill(st.msgPlan, { plan: planName }),
    sel.form ? fill(st.msgForm, { form: sel.form === 'tmi' ? st.formTmi : st.formOy }) : '',
    fill(st.msgVolume, { docs: sel.docs2 !== undefined && sel.docs2 !== sel.docs ? `${sel.docs}–${sel.docs2}` : sel.docs, payslips: sel.payslips }),
    siteWord ? fill(st.msgSite, { site: siteWord }) : '',
  ].filter(Boolean).join(' ');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDemoShown(true);
  };

  return (
    <div className="bg-canvas text-ink-900">
      <PageHeader eyebrow={st.eyebrow} title={fill(st.title, { plan: planName, price })} subtitle={st.text} />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        {demoShown ? (
          <div role="status" data-start-demo className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-900 font-medium">{st.demo}</div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-5" data-start-form>
            <div>
              <label htmlFor="start-name" className="block text-sm font-medium text-ink-700 mb-1.5">{t.contact.form.name}</label>
              <input id="start-name" name="name" type="text" autoComplete="name" required className={inputCls} />
            </div>
            <div>
              <label htmlFor="start-email" className="block text-sm font-medium text-ink-700 mb-1.5">{t.contact.form.email}</label>
              <input id="start-email" name="email" type="email" autoComplete="email" required className={inputCls} />
            </div>
            <div>
              <label htmlFor="start-phone" className="block text-sm font-medium text-ink-700 mb-1.5">{t.contact.form.phone}</label>
              <input id="start-phone" name="phone" type="tel" autoComplete="tel" className={inputCls} />
            </div>
            <div>
              <label htmlFor="start-company" className="block text-sm font-medium text-ink-700 mb-1.5">{st.company}</label>
              <input id="start-company" name="company" type="text" autoComplete="organization" className={inputCls} />
            </div>
            <div>
              <label htmlFor="start-message" className="block text-sm font-medium text-ink-700 mb-1.5">{st.message}</label>
              <textarea id="start-message" name="message" rows={4} defaultValue={message} className={`${inputCls} resize-none`} />
            </div>
            <button type="submit" className="w-full sm:w-auto px-8 py-3 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-colors">{st.submit}</button>
            <p className="text-xs text-ink-700/70 leading-relaxed">
              {t.contact.form.privacyNotice}{' '}
              <Link to={localePath('/tietosuoja')} className="underline hover:text-brand-600">{t.nav.privacy}</Link>
            </p>
          </form>
        )}
        <Link to={localePath('/hinnasto')} className="mt-8 inline-flex font-semibold text-brand-700 hover:underline">{st.back}</Link>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const { search } = useLocation();
  const hydrated = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const selection = hydrated ? parseSelection(search) : null;
  if (selection) return <StartForm key={search} sel={selection} />;
  return <ContactForm />;
}

function ContactForm() {
  const { t, localePath } = useI18n();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [source, setSource] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) setSubmitted(true);
      else setError(t.contact.form.error);
    } catch {
      setError(t.contact.form.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const social = [
    { label: 'WhatsApp', href: company.social.whatsapp },
    { label: 'LinkedIn', href: company.social.linkedin },
  ];

  return (
    <div className="bg-canvas text-ink-900">
      <PageHeader eyebrow={t.nav.contact} title={t.contact.title} subtitle={t.contact.subtitle} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Form */}
          <div>
            {submitted ? (
              <div role="status" className="rounded-2xl border border-brand-100 bg-brand-50/60 p-8 text-center">
                <svg aria-hidden="true" className="w-12 h-12 text-brand-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-lg font-semibold text-ink-900">{t.contact.form.success}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot — hidden from humans, bots fill it */}
                <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-ink-700 mb-1.5">{t.contact.form.name}</label>
                  <input id="contact-name" name="name" type="text" autoComplete="name" required className={inputCls} />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-ink-700 mb-1.5">{t.contact.form.email}</label>
                  <input id="contact-email" name="email" type="email" autoComplete="email" required className={inputCls} />
                </div>
                <div>
                  <label htmlFor="contact-phone" className="block text-sm font-medium text-ink-700 mb-1.5">{t.contact.form.phone}</label>
                  <input id="contact-phone" name="phone" type="tel" autoComplete="tel" className={inputCls} />
                </div>
                <div>
                  <label htmlFor="contact-company" className="block text-sm font-medium text-ink-700 mb-1.5">{t.contact.form.company}</label>
                  <input id="contact-company" name="company" type="text" autoComplete="organization" className={inputCls} />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-ink-700 mb-1.5">{t.contact.form.message}</label>
                  <textarea id="contact-message" name="message" rows={5} required className={`${inputCls} resize-none`} />
                </div>
                <div>
                  <label htmlFor="contact-source" className="block text-sm font-medium text-ink-700 mb-1.5">{t.contact.form.sourceLabel}</label>
                  <select id="contact-source" name="source" value={source} onChange={(e) => setSource(e.target.value)} aria-describedby="contact-source-hint" className={inputCls}>
                    <option value="">{t.contact.form.sourceEmpty}</option>
                    {Object.entries(t.contact.form.sources).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                  <p id="contact-source-hint" className="mt-1.5 text-xs text-ink-700/70">{t.contact.form.sourceHint}</p>
                </div>
                {/* Referral bonus: the referrer's name tells us who gets the €100 discount. */}
                {source === 'referral' && (
                  <div>
                    <label htmlFor="contact-referrer" className="block text-sm font-medium text-ink-700 mb-1.5">{t.contact.form.referrerLabel}</label>
                    <input id="contact-referrer" name="referrer" type="text" maxLength={200} aria-describedby="contact-referrer-hint" className={inputCls} />
                    <p id="contact-referrer-hint" className="mt-1.5 text-xs text-ink-700/70">{t.contact.form.referrerHint}</p>
                  </div>
                )}
                {error && <p role="alert" className="text-red-700 text-sm">{error}</p>}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? '...' : t.contact.form.submit}
                </button>
                <p className="text-xs text-ink-700/70 leading-relaxed">
                  {t.contact.form.privacyNotice}{' '}
                  <Link to={localePath('/tietosuoja')} className="underline hover:text-brand-600">{t.nav.privacy}</Link>
                </p>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="rounded-2xl border border-ink-900/10 bg-white p-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-700/75 mb-2">{t.contact.info.phone}</h3>
                <a href={`tel:${company.phone}`} className="text-brand-600 hover:text-brand-700 font-semibold font-mono">{company.phone}</a>
              </div>
              <div className="rounded-2xl border border-ink-900/10 bg-white p-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-700/75 mb-2">{t.contact.info.email}</h3>
                <a href={`mailto:${company.email}`} className="text-brand-600 hover:text-brand-700 font-semibold break-all">{company.email}</a>
              </div>
            </div>
            <div className="rounded-2xl border border-ink-900/10 bg-white p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-700/75 mb-2">{t.contact.info.address}</h3>
              <p className="text-ink-900">{company.address}</p>
            </div>
            <div className="rounded-2xl border border-ink-900/10 bg-white p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-700/75 mb-2">{t.contact.info.hours}</h3>
              <p className="text-ink-900">{t.contact.info.hoursValue}</p>
            </div>
            <div className="rounded-2xl border border-ink-900/10 bg-white p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-700/75 mb-3">{t.contact.info.social}</h3>
              <div className="flex flex-wrap gap-2">
                {social.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1.5 rounded-lg bg-brand-50 text-brand-700 text-sm font-medium hover:bg-brand-100 transition-colors"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
            <p className="text-sm font-mono text-brand-600 px-1">{t.about.languages}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
