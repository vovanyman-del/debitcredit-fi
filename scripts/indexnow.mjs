// IndexNow — notify participating search engines (Bing, Yandex, Seznam, Naver…)
// of the site's URLs. Reads dist/sitemap.xml and submits all <loc> URLs in one
// bulk request. Google does NOT use IndexNow (it has its own crawl), so this
// complements — not replaces — Google Search Console.
//
// The key is published at https://debitcredit.fi/<KEY>.txt (public/<KEY>.txt),
// which proves ownership to the IndexNow API.
//
// Run AFTER a deploy (so the key file is live):  npm run seo:indexnow

import { readFileSync } from 'node:fs';

const KEY = '811a12ae78ba8369c6d667dcc9330c9d';
const HOST = 'debitcredit.fi';
const ORIGIN = `https://${HOST}`;

const xml = readFileSync(new URL('../dist/sitemap.xml', import.meta.url), 'utf8');
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

if (!urlList.length) {
  console.error('No <loc> URLs in dist/sitemap.xml — run `npm run build` first.');
  process.exit(1);
}

const body = { host: HOST, key: KEY, keyLocation: `${ORIGIN}/${KEY}.txt`, urlList };

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
});

console.log(`IndexNow: submitted ${urlList.length} URLs → HTTP ${res.status} ${res.statusText}`);
// 200 = accepted, 202 = received (pending key validation). 4xx = problem.
const text = await res.text().catch(() => '');
if (text.trim()) console.log(text.trim());
if (res.status >= 400) process.exit(1);
