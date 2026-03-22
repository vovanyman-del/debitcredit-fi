import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n/context';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const { t, localePath } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: t.nav.home },
    { to: '/palvelut', label: t.nav.services },
    { to: '/hinnasto', label: t.nav.pricing },
    { to: '/vaavo', label: t.nav.vaavo },
    { to: '/meista', label: t.nav.about },
    { to: '/yhteystiedot', label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-warm-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to={localePath('/')} className="flex items-center gap-2 font-semibold text-lg text-primary-600 hover:text-primary-700 transition-colors">
            <span className="text-2xl font-bold tracking-tight">DC</span>
            <span className="hidden sm:inline text-warm-800">Debit Credit</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={localePath(link.to)}
                className="px-3 py-2 text-sm font-medium text-warm-600 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Link
              to={localePath('/yhteystiedot')}
              className="hidden sm:inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
            >
              {t.home.hero.cta}
            </Link>
            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 text-warm-600 hover:text-warm-800 rounded-lg hover:bg-warm-100"
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-warm-100 bg-white">
          <nav className="max-w-7xl mx-auto px-4 py-3 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={localePath(link.to)}
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2.5 text-sm font-medium text-warm-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-warm-100">
              <Link
                to={localePath('/yrittajaksi')}
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2.5 text-sm text-warm-500 hover:text-primary-600"
              >
                {t.nav.guide}
              </Link>
              <Link
                to={localePath('/vaihda-tilitoimistoa')}
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2.5 text-sm text-warm-500 hover:text-primary-600"
              >
                {t.nav.switchAccountant}
              </Link>
              <Link
                to={localePath('/tilitoimistoille')}
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2.5 text-sm text-warm-500 hover:text-primary-600"
              >
                {t.nav.forAccountants}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
