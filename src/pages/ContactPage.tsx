import { useState, type FormEvent } from 'react';
import { useI18n } from '../i18n/context';
import { company } from '../data/pricing';
import PageHeader from '../components/PageHeader';

const inputCls =
  'w-full px-4 py-2.5 border border-ink-900/15 rounded-xl bg-white text-ink-900 focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 outline-none transition-shadow';

export default function ContactPage() {
  const { t } = useI18n();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

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
    { label: 'Telegram', href: company.social.telegram },
    { label: 'Facebook', href: company.social.facebook },
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
                {error && <p role="alert" className="text-red-700 text-sm">{error}</p>}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? '...' : t.contact.form.submit}
                </button>
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
