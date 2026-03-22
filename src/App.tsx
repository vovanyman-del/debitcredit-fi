import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { I18nProvider } from './i18n/context';
import Header from './components/Header';
import Footer from './components/Footer';

// Eagerly loaded (above the fold)
import HomePage from './pages/HomePage';

// Lazy-loaded pages
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const VaavoPage = lazy(() => import('./pages/VaavoPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ForAccountantsPage = lazy(() => import('./pages/ForAccountantsPage'));
const EntrepreneurGuidePage = lazy(() => import('./pages/EntrepreneurGuidePage'));
const SwitchAccountantPage = lazy(() => import('./pages/SwitchAccountantPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppRoutes() {
  return (
    <>
      <Route index element={<HomePage />} />
      <Route path="palvelut" element={<ServicesPage />} />
      <Route path="hinnasto" element={<PricingPage />} />
      <Route path="vaavo" element={<VaavoPage />} />
      <Route path="meista" element={<AboutPage />} />
      <Route path="yhteystiedot" element={<ContactPage />} />
      <Route path="tilitoimistoille" element={<ForAccountantsPage />} />
      <Route path="yrittajaksi" element={<EntrepreneurGuidePage />} />
      <Route path="vaihda-tilitoimistoa" element={<SwitchAccountantPage />} />
      <Route path="tietosuoja" element={<PrivacyPage />} />
      <Route path="kayttoehdot" element={<TermsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </>
  );
}

function Layout() {
  return (
    <I18nProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <ScrollToTop />
          <Suspense fallback={<div className="flex-1" />}>
            <Routes>
              <Route path="/*">
                {AppRoutes()}
              </Route>
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </I18nProvider>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/en/*" element={<Layout />} />
      <Route path="/ru/*" element={<Layout />} />
      <Route path="/et/*" element={<Layout />} />
      <Route path="/uk/*" element={<Layout />} />
      <Route path="/*" element={<Layout />} />
    </Routes>
  );
}
