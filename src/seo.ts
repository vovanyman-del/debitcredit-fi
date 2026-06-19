// Per-route, per-locale SEO metadata — single source of truth for the
// pre-rendered <head> and for sitemap.xml. Pure module (no React / no DOM),
// consumed at build time by prerender.mjs via the SSR bundle (entry-server).
//
// Page titles/descriptions are derived from the existing i18n translations so
// they stay localized and in sync with the visible copy (never edited here).

import { fi } from './i18n/fi';
import { en } from './i18n/en';
import { ru } from './i18n/ru';
import { et } from './i18n/et';
import { uk } from './i18n/uk';
import { company } from './data/pricing';

type Translations = typeof fi;

export type Locale = 'fi' | 'en' | 'ru' | 'et' | 'uk';

export const SITE = 'https://debitcredit.fi';
const BRAND = 'Tilitoimisto Debit Credit';

export const LOCALES: Locale[] = ['fi', 'en', 'ru', 'et', 'uk'];

const translations: Record<Locale, Translations> = { fi, en, ru, et, uk };

const OG_LOCALE: Record<Locale, string> = {
  fi: 'fi_FI',
  en: 'en_US',
  ru: 'ru_RU',
  et: 'et_EE',
  uk: 'uk_UA',
};

// Mirrors the route table in src/App.tsx and prerender.mjs (404 excluded).
export const BASE_PATHS = [
  '/',
  '/palvelut',
  '/hinnasto',
  '/vaavo',
  '/meista',
  '/yhteystiedot',
  '/tilitoimistoille',
  '/yrittajaksi',
  '/vaihda-tilitoimistoa',
  '/tietosuoja',
  '/kayttoehdot',
] as const;

const SITEMAP_HINTS: Record<string, { priority: string; changefreq: string }> = {
  '/': { priority: '1.0', changefreq: 'weekly' },
  '/hinnasto': { priority: '0.9', changefreq: 'monthly' },
  '/palvelut': { priority: '0.8', changefreq: 'monthly' },
  '/yhteystiedot': { priority: '0.8', changefreq: 'monthly' },
  '/vaavo': { priority: '0.7', changefreq: 'monthly' },
  '/yrittajaksi': { priority: '0.7', changefreq: 'monthly' },
  '/meista': { priority: '0.6', changefreq: 'monthly' },
  '/vaihda-tilitoimistoa': { priority: '0.6', changefreq: 'monthly' },
  '/tilitoimistoille': { priority: '0.5', changefreq: 'monthly' },
  '/tietosuoja': { priority: '0.3', changefreq: 'yearly' },
  '/kayttoehdot': { priority: '0.3', changefreq: 'yearly' },
};

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const withBrand = (title: string) => `${title} | ${BRAND}`;

/** Page-specific title + description, derived from localized i18n copy. */
function pageMeta(t: Translations, basePath: string): { title: string; description: string } {
  switch (basePath) {
    case '/':
      return { title: t.meta.title, description: t.meta.description };
    case '/palvelut':
      return { title: withBrand(t.services.title), description: t.services.subtitle };
    case '/hinnasto':
      return { title: withBrand(t.pricing.title), description: t.pricing.subtitle };
    case '/vaavo':
      return { title: withBrand(t.vaavo.title), description: t.vaavo.subtitle };
    case '/meista':
      return { title: withBrand(t.about.title), description: t.about.subtitle };
    case '/yhteystiedot':
      return { title: withBrand(t.contact.title), description: t.contact.subtitle };
    case '/tilitoimistoille':
      return { title: withBrand(t.forAccountants.title), description: t.forAccountants.subtitle };
    case '/yrittajaksi':
      return { title: withBrand(t.guide.title), description: t.guide.subtitle };
    case '/vaihda-tilitoimistoa':
      return { title: withBrand(t.switchAccountant.title), description: t.switchAccountant.subtitle };
    case '/tietosuoja':
      // No subtitle in i18n → fall back to the localized site description.
      return { title: withBrand(t.privacy.title), description: t.meta.description };
    case '/kayttoehdot':
      return { title: withBrand(t.terms.title), description: t.meta.description };
    default:
      return { title: t.meta.title, description: t.meta.description };
  }
}

/** Locale-prefixed path for a base path (fi has no prefix). */
export function pathFor(locale: Locale, basePath: string): string {
  if (locale === 'fi') return basePath;
  return basePath === '/' ? `/${locale}` : `/${locale}${basePath}`;
}

/** Absolute canonical URL. */
export function urlFor(locale: Locale, basePath: string): string {
  const p = pathFor(locale, basePath);
  return `${SITE}${p === '/' ? '/' : p}`;
}

/** Split a pre-render URL ("/", "/en", "/ru/hinnasto") into locale + base path. */
export function parseUrl(url: string): { locale: Locale; basePath: string } {
  const seg = url.split('/')[1] ?? '';
  if ((LOCALES as string[]).includes(seg) && seg !== 'fi') {
    const rest = url.slice(seg.length + 1) || '/';
    return { locale: seg as Locale, basePath: rest };
  }
  return { locale: 'fi', basePath: url || '/' };
}

function postalAddress() {
  return {
    '@type': 'PostalAddress',
    streetAddress: 'Haapaniemenkatu 7-9 B, 16. krs',
    postalCode: '00530',
    addressLocality: 'Helsinki',
    addressCountry: 'FI',
  };
}

/** JSON-LD for home + contact only (Organization + LocalBusiness). '' otherwise. */
function jsonLd(locale: Locale, basePath: string): string {
  if (basePath !== '/' && basePath !== '/yhteystiedot') return '';
  const t = translations[locale];

  const organization = {
    '@type': 'Organization',
    '@id': `${SITE}/#organization`,
    name: company.name,
    url: `${SITE}/`,
    email: company.email,
    telephone: company.phone,
    taxID: company.ytunnus, // Finnish Y-tunnus
    vatID: 'FI35127028', // Y-tunnus 3512702-8 → FI + digits
    founder: { '@type': 'Person', name: company.founder },
    description: t.meta.description,
    address: postalAddress(),
  };

  const localBusiness = {
    '@type': ['LocalBusiness', 'AccountingService'],
    '@id': `${SITE}/#localbusiness`,
    name: company.name,
    url: `${SITE}/`,
    image: `${SITE}/favicon.svg`,
    email: company.email,
    telephone: company.phone,
    priceRange: '€€',
    address: postalAddress(),
    areaServed: { '@type': 'City', name: 'Helsinki' },
    openingHours: 'Mo-Fr 09:00-17:00',
    parentOrganization: { '@id': `${SITE}/#organization` },
  };

  const graph = { '@context': 'https://schema.org', '@graph': [organization, localBusiness] };
  // Escape "<" so the JSON can never break out of the <script> element.
  const json = JSON.stringify(graph).replace(/</g, '\\u003c');
  return `    <script type="application/ld+json">${json}</script>`;
}

export interface HeadData {
  lang: Locale;
  title: string; // HTML-escaped, ready for <title>…</title>
  description: string; // HTML-escaped, ready for content="…"
  head: string; // canonical + hreflang + OG/Twitter + JSON-LD block
}

/** Everything needed to build a route's <head>, keyed by pre-render URL. */
export function getHead(url: string): HeadData {
  const { locale, basePath } = parseUrl(url);
  const t = translations[locale];
  const { title, description } = pageMeta(t, basePath);
  const canonical = urlFor(locale, basePath);

  const alternates = LOCALES.map(
    (l) => `    <link rel="alternate" hreflang="${l}" href="${urlFor(l, basePath)}" />`,
  );
  alternates.push(
    `    <link rel="alternate" hreflang="x-default" href="${urlFor('fi', basePath)}" />`,
  );

  const block = [
    `    <link rel="canonical" href="${canonical}" />`,
    ...alternates,
    `    <meta property="og:type" content="website" />`,
    `    <meta property="og:url" content="${canonical}" />`,
    `    <meta property="og:title" content="${esc(title)}" />`,
    `    <meta property="og:description" content="${esc(description)}" />`,
    `    <meta property="og:image" content="${SITE}/favicon.svg" />`,
    `    <meta property="og:locale" content="${OG_LOCALE[locale]}" />`,
    `    <meta property="og:site_name" content="${BRAND}" />`,
    `    <meta name="twitter:card" content="summary" />`,
    `    <meta name="twitter:title" content="${esc(title)}" />`,
    `    <meta name="twitter:description" content="${esc(description)}" />`,
  ];

  const ld = jsonLd(locale, basePath);
  if (ld) block.push(ld);

  return { lang: locale, title: esc(title), description: esc(description), head: block.join('\n') };
}

/** Full sitemap.xml: one <url> per localized URL (55) with hreflang + x-default. */
export function buildSitemap(): string {
  const urls: string[] = [];
  for (const locale of LOCALES) {
    for (const basePath of BASE_PATHS) {
      const hint = SITEMAP_HINTS[basePath];
      const alts = LOCALES.map(
        (l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${urlFor(l, basePath)}"/>`,
      );
      alts.push(
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${urlFor('fi', basePath)}"/>`,
      );
      urls.push(
        `  <url>\n` +
          `    <loc>${urlFor(locale, basePath)}</loc>\n` +
          `${alts.join('\n')}\n` +
          `    <changefreq>${hint.changefreq}</changefreq>\n` +
          `    <priority>${hint.priority}</priority>\n` +
          `  </url>`,
      );
    }
  }
  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n` +
    `        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n` +
    `${urls.join('\n')}\n` +
    `</urlset>\n`
  );
}
