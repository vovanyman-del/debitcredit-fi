import { useState, type FormEvent } from 'react';
import { useI18n } from '../i18n/context';
import { company } from '../data/pricing';

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

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(t.contact.form.error);
      }
    } catch {
      setError(t.contact.form.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">{t.contact.title}</h1>
          <p className="mt-4 text-lg text-primary-100 max-w-2xl">{t.contact.subtitle}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            {submitted ? (
              <div className="bg-accent-50 border border-accent-200 rounded-2xl p-8 text-center">
                <svg className="w-12 h-12 text-accent-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-lg font-semibold text-warm-900">{t.contact.form.success}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot — hidden from humans, bots fill it */}
                <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
                <div>
                  <label className="block text-sm font-medium text-warm-700 mb-1.5">{t.contact.form.name}</label>
                  <input name="name" type="text" required className="w-full px-4 py-2.5 border border-warm-300 rounded-xl text-warm-800 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-shadow" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-warm-700 mb-1.5">{t.contact.form.email}</label>
                  <input name="email" type="email" required className="w-full px-4 py-2.5 border border-warm-300 rounded-xl text-warm-800 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-shadow" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-warm-700 mb-1.5">{t.contact.form.phone}</label>
                  <input name="phone" type="tel" className="w-full px-4 py-2.5 border border-warm-300 rounded-xl text-warm-800 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-shadow" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-warm-700 mb-1.5">{t.contact.form.company}</label>
                  <input name="company" type="text" className="w-full px-4 py-2.5 border border-warm-300 rounded-xl text-warm-800 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-shadow" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-warm-700 mb-1.5">{t.contact.form.message}</label>
                  <textarea name="message" rows={5} required className="w-full px-4 py-2.5 border border-warm-300 rounded-xl text-warm-800 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-shadow resize-none" />
                </div>
                {error && (
                  <p className="text-red-600 text-sm">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? '...' : t.contact.form.submit}
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="space-y-8">
            <div className="bg-warm-50 rounded-2xl p-6 border border-warm-200">
              <h3 className="font-semibold text-warm-900 mb-4">{t.contact.info.phone}</h3>
              <a href={`tel:${company.phone}`} className="text-primary-600 hover:text-primary-700 font-medium">{company.phone}</a>
            </div>
            <div className="bg-warm-50 rounded-2xl p-6 border border-warm-200">
              <h3 className="font-semibold text-warm-900 mb-4">{t.contact.info.email}</h3>
              <a href={`mailto:${company.email}`} className="text-primary-600 hover:text-primary-700 font-medium">{company.email}</a>
            </div>
            <div className="bg-warm-50 rounded-2xl p-6 border border-warm-200">
              <h3 className="font-semibold text-warm-900 mb-4">{t.contact.info.address}</h3>
              <p className="text-warm-600">{company.address}</p>
            </div>
            <div className="bg-warm-50 rounded-2xl p-6 border border-warm-200">
              <h3 className="font-semibold text-warm-900 mb-4">{t.contact.info.hours}</h3>
              <p className="text-warm-600">{t.contact.info.hoursValue}</p>
            </div>
            <div className="bg-warm-50 rounded-2xl p-6 border border-warm-200">
              <h3 className="font-semibold text-warm-900 mb-4">{t.contact.info.social}</h3>
              <div className="flex gap-4">
                <a href={company.social.whatsapp} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 font-medium text-sm">WhatsApp</a>
                <a href={company.social.telegram} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 font-medium text-sm">Telegram</a>
                <a href={company.social.facebook} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 font-medium text-sm">Facebook</a>
                <a href={company.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 font-medium text-sm">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
