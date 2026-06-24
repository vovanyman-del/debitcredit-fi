import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { I18nProvider, useI18n } from './i18n/context';
import { pageMeta } from './seo';
import Header from './components/Header';
import Footer from './components/Footer';

// Statically imported so the active route renders inline during SSR/prerender —
// no Suspense boundary, so the prerendered <main> holds the real content (not a
// JS-revealed hidden template). This keeps the pre-rendered HTML readable
// without JS and avoids the hydration layout shift. For an 11-page brochure the
// merged main chunk is small, and in-app navigation becomes instant.
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import PricingPage from './pages/PricingPage';
import VaavoPage from './pages/VaavoPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ForAccountantsPage from './pages/ForAccountantsPage';
import EntrepreneurGuidePage from './pages/EntrepreneurGuidePage';
import SwitchAccountantPage from './pages/SwitchAccountantPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import GuideHubPage from './pages/GuideHubPage';
import GuidePage from './pages/GuidePage';
import NotFoundPage from './pages/NotFoundPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// Keep the document <title> and meta description localized on client-side
// navigation (the prerendered head is correct on first load; this stops the
// previous locale's title lingering after an in-app language/page switch).
function DocumentHead() {
  const { pathname } = useLocation();
  const { t, locale } = useI18n();
  useEffect(() => {
    const basePath = pathname.replace(/^\/(en|ru|et|uk)(?=\/|$)/, '') || '/';
    const { title, description } = pageMeta(t, basePath, locale);
    if (title) document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && description) meta.setAttribute('content', description);
  }, [pathname, t, locale]);
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
      <Route path="opas" element={<GuideHubPage />} />
      <Route path="opas/:slug" element={<GuidePage />} />
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
          <DocumentHead />
          <Routes>
            <Route path="/*">
              {AppRoutes()}
            </Route>
          </Routes>
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
