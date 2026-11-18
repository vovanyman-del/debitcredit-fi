// IndexNow for one push: tells Bing (and through it ChatGPT search, Copilot, Yandex…)
// which pages changed, right after Vercel has published them.
// Usage: node scripts/indexnow-changed.mjs <changed file> [<changed file> …]
// Mapping: src/data/guides/<slug>.ts → /opas/<slug> in all five languages;
// changes to texts (src/i18n), pages or index.html → the five home pages and price pages.
// Google does not use IndexNow; it has its own crawl via Search Console.

const KEY = '811a12ae78ba8369c6d667dcc9330c9d';
const HOST = 'debitcredit.fi';
const ORIGIN = `https://${HOST}`;
const LOCALES = ['', '/en', '/ru', '/et', '/uk'];

const files = process.argv.slice(2);
const urls = new Set();
for (const f of files) {
  const guide = f.match(/^src\/data\/guides\/([a-z0-9-]+)\.ts$/);
  if (guide && !['index', 'types'].includes(guide[1])) {
    for (const l of LOCALES) urls.add(`${ORIGIN}${l}/opas/${guide[1]}`);
  } else if (/^(src\/i18n\/|src\/pages\/|src\/components\/|index\.html$)/.test(f)) {
    for (const l of LOCALES) { urls.add(`${ORIGIN}${l}/`.replace(/\/$/, '') || ORIGIN); urls.add(`${ORIGIN}${l}/hinnasto`); }
  }
}
const urlList = [...urls].map((u) => (u === ORIGIN ? `${ORIGIN}/` : u));
if (!urlList.length) { console.log('IndexNow: nothing public changed, skipped.'); process.exit(0); }

// Only send pages that are live (a new page must be deployed first).
const live = [];
for (const u of urlList) {
  const r = await fetch(u, { method: 'HEAD', redirect: 'manual' }).catch(() => null);
  if (r && r.status === 200) live.push(u); else console.log(`not live yet, skipped: ${u} (${r ? r.status : 'error'})`);
}
if (!live.length) { console.log('IndexNow: no live URLs to send.'); process.exit(0); }

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${ORIGIN}/${KEY}.txt`, urlList: live }),
});
console.log(`IndexNow: sent ${live.length} URLs → HTTP ${res.status}`);
live.forEach((u) => console.log('  ' + u));
if (res.status >= 400) process.exit(1);
