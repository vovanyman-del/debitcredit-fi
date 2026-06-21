import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/context';

export default function NotFoundPage() {
  const { t, localePath } = useI18n();

  return (
    <div className="bg-canvas text-ink-900 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
      <h1 className="text-7xl font-extrabold font-mono text-brand-500/30 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-ink-900 mb-3">{t.common.notFoundTitle}</h2>
      <p className="text-ink-700/75 mb-8 max-w-md mx-auto">{t.common.notFoundDesc}</p>
      <Link
        to={localePath('/')}
        className="inline-flex items-center px-6 py-3 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-colors"
      >
        {t.common.backToHome}
      </Link>
    </div>
  );
}
