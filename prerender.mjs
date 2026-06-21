// Static pre-rendering for the Vite SPA.
//
// Runs after the client build (`vite build`) and the SSR build
// (`vite build --ssr src/entry-server.tsx --outDir dist-ssr`). For every route
// in every locale it renders the app to HTML and writes a ready-to-serve
// dist/<route>/index.html, so each URL returns real text without executing JS.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const { render, getHead, get404Head, buildSitemap } = await import(
  pathToFileURL(join(process.cwd(), 'dist-ssr/entry-server.js')).href
);

const template = readFileSync('dist/index.html', 'utf-8');
const ROOT_MARKER = '<div id="root"></div>';
const SEO_MARKER = '<!--seo-head-->';
for (const marker of [ROOT_MARKER, SEO_MARKER, '<html lang="fi">']) {
  if (!template.includes(marker)) {
    throw new Error(`Could not find "${marker}" in dist/index.html`);
  }
}

// Build a route's full HTML: per-locale <html lang>, unique <title>/<meta
// description>, then the canonical/hreflang/OG/JSON-LD block, then the app body.
function injectHead(html, { lang, title, description, head }) {
  return html
    .replace('<html lang="fi">', `<html lang="${lang}">`)
    .replace(/<title>[\s\S]*?<\/title>/, () => `<title>${title}</title>`)
    .replace(/<meta name="description"[^>]*>/, () => `<meta name="description" content="${description}" />`)
    .replace(SEO_MARKER, () => head);
}

// Mirrors the route table in src/App.tsx (the "*" 404 route is intentionally skipped).
const basePaths = [
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
];

// fi has no prefix; the other locales are path-prefixed (see i18n/context.tsx).
const localePrefixes = ['', '/en', '/ru', '/et', '/uk'];

const urls = [];
for (const prefix of localePrefixes) {
  for (const base of basePaths) {
    if (prefix === '') urls.push(base);
    else urls.push(base === '/' ? prefix : prefix + base);
  }
}

let count = 0;
for (const url of urls) {
  const appHtml = await render(url);
  if (!appHtml.trim()) {
    throw new Error(`Empty render output for ${url}`);
  }
  const headData = getHead(url);
  const html = injectHead(template, headData).replace(
    ROOT_MARKER,
    `<div id="root">${appHtml}</div>`,
  );
  const outDir = url === '/' ? 'dist' : join('dist', url);
  mkdirSync(outDir, { recursive: true });
  const outFile = join(outDir, 'index.html');
  writeFileSync(outFile, html);
  count += 1;
  console.log(`  prerendered ${url}  →  ${outFile}  (lang=${headData.lang})`);
}

// Static 404 page: the host serves dist/404.html with a real 404 status for any
// URL that doesn't match a prerendered file (noindex, so junk URLs aren't indexed).
{
  const appHtml = await render('/__not-found__');
  const headData = get404Head();
  const html = injectHead(template, headData).replace(ROOT_MARKER, `<div id="root">${appHtml}</div>`);
  writeFileSync(join('dist', '404.html'), html);
  console.log('  wrote dist/404.html  (noindex)');
}

// Regenerate sitemap.xml from the same route table (all 55 localized URLs),
// stamping today's build date as <lastmod>.
const lastmod = new Date().toISOString().slice(0, 10);
writeFileSync(join('dist', 'sitemap.xml'), buildSitemap(lastmod));
console.log(`  wrote dist/sitemap.xml  (lastmod=${lastmod})`);

console.log(`\n✓ Pre-rendered ${count} routes.`);
