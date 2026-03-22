import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { I18nProvider } from './i18n/context';
import Header from './components/Header';
import Footer from './components/Footer';
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
      <Route path="/:lang/*" element={<Layout />} />
      <Route path="/*" element={<Layout />} />
    </Routes>
  );
}
